import Image from 'next/image';
import Effects from '../components/Effects';
import { CONFIG } from '../lib/config';

const Pic = ({ n }) => (
  <Image src={`/images/${n}.jpg`} alt={`A favourite memory ${n}`} width={800} height={1000} sizes="(max-width:760px) 50vw, 320px" quality={82} />
);

const memories = ['Where it all began', 'Us, always', 'A beautiful day', 'Every moment', 'Just us', 'A little adventure', 'Pure joy', 'Together', 'Forever'];
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
      <button id="snd" aria-label="Sound on or off">♪</button>

      <div id="gate">
        <div>
          <h1>For You, My Love</h1>
          <p>Tap to open our story</p>
          <button className="heartbtn" id="open" aria-label="Open">♥</button>
        </div>
      </div>

      <main>
        <section id="hero">
          <div className="small">HAPPY ANNIVERSARY</div>
          <h1>Happy Anniversary</h1>
          <div className="names"><b>{CONFIG.name1}</b><span className="heart">♥</span><b>{CONFIG.name2}</b></div>
          <div className="scroll">↓</div>
        </section>

        <section>
          <div className="eyebrow rv">OUR STORY</div>
          <h2 className="rv">Time together</h2>
          <div className="count rv" id="cnt">
            <div><span id="d">0</span><small>DAYS</small></div>
            <div><span id="h">0</span><small>HOURS</small></div>
            <div><span id="m">0</span><small>MINUTES</small></div>
            <div><span id="s">0</span><small>SECONDS</small></div>
          </div>
          <p className="since rv">And every second is still my favourite.</p>
        </section>

        <section>
          <div className="eyebrow rv">FROM THE HEART</div>
          <h2 className="rv">A few words for you</h2>
          <div className="poem rv">
            <div className="verse"><span className="l">Koi saath dil lage, woh pyaar nahi.</span><span className="l">Jiske bina dil na lage, wahi pyaar hai.</span></div>
            <div className="verse"><span className="l">Mujhe chaand nahi chahiye.</span><span className="l">Bas tumhara saath mile, toh dil ko sukoon mile.</span></div>
          </div>
        </section>

        <section className="gallery-section">
          <div className="gallery-head">
            <div className="eyebrow rv">CHAPTERS WE LOVE</div>
            <h2 className="rv">Our memories</h2>
            <p className="section-intro rv">A small collection of the moments that still make us smile.</p>
          </div>
          <div className="gal">
            {memories.map((caption, index) => <figure className="ph" key={caption}><Pic n={index + 1} /><figcaption>{caption}</figcaption></figure>)}
          </div>
        </section>

        <section>
          <div className="eyebrow rv">SIX SMALL REMINDERS</div>
          <h2 className="rv">Little notes for you</h2>
          <div className="notes">
            {notes.map(([text, by]) => <div className="note rv" key={by}>{text}<em>— {by}</em></div>)}
          </div>
        </section>

        <section>
          <div className="big rv">I love you more than yesterday</div>
          <button className="cta rv" id="sur">A note for you</button>
          <p id="surprise">Happy Anniversary, my love. Thank you for every smile, every hug, and every memory. This is just the beginning of our forever.</p>
        </section>
        <footer>MADE WITH LOVE, FOR {CONFIG.name2.toUpperCase()}</footer>
      </main>

      <div id="lb"><img alt="Expanded memory" /></div>
      <Effects />
    </>
  );
}
