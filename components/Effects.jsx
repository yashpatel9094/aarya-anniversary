'use client';
import { useEffect } from 'react';
import { CONFIG } from '../lib/config';

export default function Effects() {
  useEffect(() => {
    if (window.__anniv) return; // StrictMode double-run guard
    window.__anniv = true;

const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];

/* gate + sound */
const v=$('#bgv'), snd=$('#snd');
v.muted=true; v.play().catch(()=>{});
$('#open').onclick=()=>{
  $('#gate').classList.add('off'); v.muted=false; v.volume=.6; v.play().catch(()=>{v.muted=true;v.play()});
  snd.textContent=v.muted?'🔇':'🔊'; burst(innerWidth/2,innerHeight/2,25);
};
snd.onclick=()=>{v.muted=!v.muted;snd.textContent=v.muted?'🔇':'🔊';v.play().catch(()=>{})};

/* counter */
const pad=n=>String(n).padStart(2,'0');
function tick(){
  let t=Math.max(0,Date.now()-new Date(CONFIG.start));
  $('#d').textContent=Math.floor(t/864e5); $('#h').textContent=pad(Math.floor(t/36e5)%24);
  $('#m').textContent=pad(Math.floor(t/6e4)%60); $('#s').textContent=pad(Math.floor(t/1e3)%60);
}
tick(); setInterval(tick,1000);

/* scroll reveal */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in')}}),{threshold:.25});
$$('.rv,.verse,.e4,.e9').forEach(el=>io.observe(el));

/* perf: animate only visible photos, async decode */
const vio=new IntersectionObserver(es=>es.forEach(e=>e.target.classList.toggle('vis',e.isIntersecting)),{rootMargin:'80px'});
$$('.ph').forEach(el=>vio.observe(el)); $$('.ph img').forEach(i=>i.decoding='async');

/* 3D tilt on photo 1 */
const t1=$('.e1'),in3=$('.e1 .in3');
function tilt(x,y){const r=t1.getBoundingClientRect();const px=(x-r.left)/r.width-.5,py=(y-r.top)/r.height-.5;in3.style.transform=`rotateY(${px*28}deg) rotateX(${-py*28}deg) scale(1.05)`}
t1.addEventListener('mousemove',e=>tilt(e.clientX,e.clientY));
t1.addEventListener('touchmove',e=>tilt(e.touches[0].clientX,e.touches[0].clientY),{passive:true});
['mouseleave','touchend'].forEach(ev=>t1.addEventListener(ev,()=>in3.style.transform=''));

/* tap states for touch devices + lightbox */
$$('.ph').forEach(p=>p.addEventListener('click',()=>{
  if(p.classList.contains('e6')&&!p.classList.contains('tap')){p.classList.add('tap');setTimeout(()=>p.classList.remove('tap'),3000);return}
  p.classList.add('tap'); setTimeout(()=>p.classList.remove('tap'),2500);
  const im=p.querySelector('img'); $('#lb img').src=im.currentSrc||im.src; $('#lb').classList.add('on');
}));
$('#lb').onclick=()=>$('#lb').classList.remove('on');

/* particles: floating hearts, petals, sparkles + cursor trail */
const c=$('#fx'),x=c.getContext('2d');let W,H,P=[];
function size(){const d=devicePixelRatio||1;W=c.width=innerWidth*d;H=c.height=innerHeight*d;x.setTransform(d,0,0,d,0,0)}
size(); addEventListener('resize',size);
const SYM=['❤','♥','💗','✨','🌸','💖'];
const SP=SYM.map(ch=>{const o=document.createElement('canvas');o.width=o.height=64;const g=o.getContext('2d');g.font='46px serif';g.textAlign='center';g.textBaseline='middle';g.fillText(ch,32,34);return o});
const MAX=innerWidth<760?18:32;
function spawn(px,py,bm){
  if(P.length>MAX+40)return;
  P.push({x:px,y:py,vx:bm?(Math.random()-.5)*8:(Math.random()-.5)*.6,vy:bm?-Math.random()*8-2:-(Math.random()*1+.5),
    s:bm?18+Math.random()*16:14+Math.random()*18,a:1,r:Math.random()*6,vr:(Math.random()-.5)*.05,
    g:bm?.18:0,sp:SP[Math.random()*SP.length|0],life:bm?1:.003+Math.random()*.003});
}
function burst(a,b,n){for(let i=0;i<n;i++)spawn(a,b,true)}
function loop(){
  x.clearRect(0,0,innerWidth,innerHeight);
  if(P.length<MAX&&Math.random()<.06)spawn(Math.random()*innerWidth,innerHeight+20);
  P=P.filter(p=>p.a>0&&p.y>-40);
  for(const p of P){
    p.vy+=p.g;p.x+=p.vx+Math.sin(p.y/40)*.4;p.y+=p.vy;p.r+=p.vr;p.a-=p.g?.014:p.life;
    x.globalAlpha=Math.max(p.a,0);x.save();x.translate(p.x,p.y);x.rotate(p.r);x.drawImage(p.sp,-p.s/2,-p.s/2,p.s,p.s);x.restore();
  }
  x.globalAlpha=1;requestAnimationFrame(loop);
}
loop();
let last=0;
function trail(e){const n=Date.now();if(n-last<120)return;last=n;const p=e.touches?e.touches[0]:e;spawn(p.clientX,p.clientY,false)}
addEventListener('mousemove',trail);addEventListener('touchmove',trail,{passive:true});
addEventListener('click',e=>{if(!e.target.closest('#lb'))burst(e.clientX,e.clientY,6)});

/* surprise */
$('#sur').onclick=e=>{
  $('#surprise').classList.add('on');
  const r=e.target.getBoundingClientRect();
  for(let i=0;i<5;i++)setTimeout(()=>burst(Math.random()*innerWidth,innerHeight*.7,14),i*350);
};

  }, []);
  return null;
}
