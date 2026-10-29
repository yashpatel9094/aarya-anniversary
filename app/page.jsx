import Image from 'next/image';
import Effects from '../components/Effects';
import { CONFIG } from '../lib/config';

const Pic = ({ n }) => (
  <Image src={`/images/${n}.jpg`} alt={`Memory ${n}`} width={800} height={1067} sizes="(max-width:760px) 50vw, 360px" quality={75} />
);

const notes = [
  ['You are the reason my ordinary days feel like a movie. Thank you for being my person.', 'Always yours'],
  ['Tere saath chalte chalte pata hi nahi chala, kab tu meri aadat se meri zaroorat ban gayi.', 'Meri jaan'],
  ['Whatever life throws at us, I will choose you again, every single day.', 'Forever'],
  ['Tu hasti hai toh lagta hai poori duniya muskura rahi hai. Bas aise hi hasti reh.', 'Tera apna'],
  ['Not a day goes by without me thanking the universe for letting me find you.', 'With all my heart'],
  ['Tu hai toh sab kuch hai, tu nahi toh kuch bhi nahi. I love you, today and always.', 'I love you'],
];

export default function Home() {
  return (
    <>
      <video id="bgv" autoPlay muted loop playsInline preload="auto" disablePictureInPicture>
        <source src="/video.mp4" type="video/mp4" />
      </video>
      <div className="veil" />
      <canvas id="fx" />
      <button id="snd" aria-label="Sound on/off">🔇</button>

      <div id="gate">
        <div>
          <h1>For You, My Love</h1>
          <p>Tap the heart to open our story</p>
          <button className="heartbtn" id="open" aria-label="Open">❤️</button>
        </div>
      </div>

      <main>
        <section id="hero">
          <div className="small">HAPPY ANNIVERSARY</div>
          <h1>Happy Anniversary</h1>
          <div className="names"><b>{CONFIG.name1}</b> &nbsp;❤&nbsp; <b>{CONFIG.name2}</b></div>
          <div className="scroll">⌄</div>
        </section>

        <section>
          <h2 className="rv">Our Time Together</h2>
          <div className="count rv" id="cnt">
            <div><span id="d">0</span><small>DAYS</small></div>
            <div><span id="h">0</span><small>HOURS</small></div>
            <div><span id="m">0</span><small>MINUTES</small></div>
            <div><span id="s">0</span><small>SECONDS</small></div>
          </div>
          <p className="since rv">…and every second is still my favourite.</p>
        </section>

        <section>
          <h2 className="rv">Two Lines, One Heart</h2>
          <div className="poem">
            <div className="verse"><span className="l">કોઈ સાથે દિલ લાગે એ પ્રેમ નથી,</span><span className="l">પણ જેના વગર ક્યાંય દિલ ના લાગે એ પ્રેમ છે !! ❤️</span></div>
            <div className="verse moon"><span className="l">હું નથી ગગન કે મને ચાંદ મળે,</span><span className="l">બસ એક તારી ચાહત મળે તો મારા દિલને રાહત મળે !! 🌙</span></div>
          </div>
        </section>

        <section>
          <h2 className="rv">Our Memories</h2>
          <div className="gal">
            <figure className="ph e1"><div className="in3"><Pic n={1} /></div><figcaption>Where it all began</figcaption></figure>
            <figure className="ph e2"><Pic n={2} /><figcaption>Us, always</figcaption></figure>
            <figure className="ph e3"><Pic n={3} /><figcaption>My favourite view</figcaption></figure>
            <figure className="ph e4"><Pic n={4} /><figcaption>Every moment in colour</figcaption></figure>
            <figure className="ph e5"><Pic n={5} /></figure>
            <figure className="ph e6"><div className="fl"><div className="f"><Pic n={6} /></div><div className="b">You are my home 🏡</div></div></figure>
            <figure className="ph e7"><Pic n={7} /><figcaption>Pure magic</figcaption></figure>
            <figure className="ph e8"><Pic n={8} /><figcaption>You shine brighter</figcaption></figure>
            <figure className="ph e9"><Pic n={9} /><figcaption>Forever &amp; ever</figcaption></figure>
          </div>
        </section>

        <section>
          <h2 className="rv">Little Notes For You</h2>
          <div className="notes">
            {notes.map(([t, by]) => (
              <div className="note rv" key={by}>{t}<em>— {by}</em></div>
            ))}
          </div>
        </section>

        <section>
          <div className="big rv">I love you more than yesterday</div>
          <button className="cta rv" id="sur">Tap for a surprise 💌</button>
          <p id="surprise">Happy Anniversary, my love. Thank you for every smile, every hug, and every memory. This is just the beginning of our forever. ❤️</p>
        </section>
        <footer>Made with ❤️ only for you<br />Created by: Yash Patel - Magento 2 Developer</footer>
      </main>

      <div id="lb"><img alt="" /></div>
      <Effects />
    </>
  );
}
