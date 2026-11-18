// Mini BGMI - static file server + WebSocket relay (room code + 30 sec join window)
const http = require('http'), fs = require('fs'), path = require('path'), os = require('os');
const { WebSocketServer } = require('ws');
const PORT = process.env.PORT || 8000;
const ROOT = __dirname;
const FILES = { '/': 'index.html', '/index.html': 'index.html', '/three.min.js': 'three.min.js' };
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'application/javascript' };
const MAXP = 16, JOIN_SECS = 30;

const server = http.createServer((req, res) => {
  const url = req.url.split('?')[0];
  const f = FILES[url];
  if (!f) { res.writeHead(404); return res.end('404'); }
  fs.readFile(path.join(ROOT, f), (e, d) => {
    if (e) { res.writeHead(404); return res.end('404'); }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(f)] || 'text/plain', 'Cache-Control': 'no-store' });
    res.end(d);
  });
});

function lanIps() {
  const out = [];
  for (const list of Object.values(os.networkInterfaces()))
    for (const i of list || []) if (i.family === 'IPv4' && !i.internal) out.push(i.address);
  return out;
}

const wss = new WebSocketServer({ server });
const rooms = new Map(); // code -> room
let nextId = 1;

const list = r => [...r.clients.values()].map(c => ({ id: c.id, name: c.name, slot: c.slot }));
function sendTo(c, o) { if (c && c.ws.readyState === 1) c.ws.send(JSON.stringify(o)); }
function bcast(r, o, except) {
  const m = JSON.stringify(o);
  for (const c of r.clients.values()) if (c.id !== except && c.ws.readyState === 1) c.ws.send(m);
}
const secsLeft = r => Math.max(0, Math.ceil((r.startAt - Date.now()) / 1000));
function pushPlayers(r) { bcast(r, { t: 'players', list: list(r), host: r.hostId, secs: secsLeft(r), code: r.code }); }
function startRoom(r) {
  if (r.phase !== 'lobby') return;
  r.phase = 'playing';
  clearTimeout(r.timer);
  bcast(r, { t: 'start', seed: Math.floor(Math.random() * 1e9), players: list(r) });
  console.log('match start [' + r.code + '] with', r.clients.size, 'players');
}

wss.on('connection', ws => {
  let me = null, room = null;
  ws.on('message', raw => {
    let m; try { m = JSON.parse(raw); } catch { return; }
    if (m.t === 'join') {
      if (me) return;
      const code = String(m.code || '').trim().toUpperCase().slice(0, 12);
      if (!code) return ws.send(JSON.stringify({ t: 'err', msg: 'Room code daalo.' }));
      let r = rooms.get(code);
      if (r && r.phase !== 'lobby') return ws.send(JSON.stringify({ t: 'err', msg: 'Is code ka match shuru ho chuka hai (30 sec ki window khatam). Naya code use karo.' }));
      if (r && r.clients.size >= MAXP) return ws.send(JSON.stringify({ t: 'err', msg: 'Room full hai.' }));
      if (!r) {
        r = { code, clients: new Map(), phase: 'lobby', hostId: 0, startAt: Date.now() + JOIN_SECS * 1000, timer: null };
        r.timer = setTimeout(() => startRoom(r), JOIN_SECS * 1000);
        rooms.set(code, r);
        console.log('room', code, 'bana - 30 sec window');
      }
      room = r;
      const used = new Set([...r.clients.values()].map(c => c.slot));
      let slot = 0; while (used.has(slot)) slot++;
      me = { id: nextId++, name: String(m.name || 'Player').slice(0, 14), slot, ws };
      r.clients.set(me.id, me);
      if (!r.hostId || !r.clients.has(r.hostId)) r.hostId = me.id;
      sendTo(me, { t: 'welcome', id: me.id, slot, lan: lanIps(), port: PORT, code, secs: secsLeft(r) });
      pushPlayers(r);
      console.log('join:', me.name, '#' + me.id, 'room', code);
      return;
    }
    if (!me || !room) return;
    if (m.t === 'start') {
      if (me.id !== room.hostId) return;
      return startRoom(room);
    }
    m.from = me.id;
    if (m.to === 'host') sendTo(room.clients.get(room.hostId), m);
    else if (typeof m.to === 'number') sendTo(room.clients.get(m.to), m);
    else bcast(room, m, me.id);
  });
  ws.on('close', () => {
    if (!me || !room) return;
    const r = room;
    r.clients.delete(me.id);
    console.log('leave:', me.name);
    if (r.phase === 'playing') {
      if (me.id === r.hostId) bcast(r, { t: 'hostgone' }); else bcast(r, { t: 'left', id: me.id });
    } else {
      if (r.hostId === me.id) r.hostId = [...r.clients.keys()][0] || 0;
      pushPlayers(r);
    }
    if (r.clients.size === 0) { clearTimeout(r.timer); rooms.delete(r.code); }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log('Mini BGMI server chal raha hai:');
  console.log('  Local : http://localhost:' + PORT);
  for (const ip of lanIps()) console.log('  Dost  : http://' + ip + ':' + PORT + '   (same WiFi)');
});
