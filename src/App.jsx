import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronDown, Sparkles, Lock, Music, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

// --- COMPONENT: TOUCH HEARTS ---
const TouchHearts = ({ clicks }) => (
  <div className="fixed inset-0 pointer-events-none z-[100]">
    {clicks.map((click) => (
      <motion.div
        key={click.id}
        initial={{ scale: 0, opacity: 1, y: 0 }}
        animate={{ scale: 1.5, opacity: 0, y: -100 }}
        exit={{ opacity: 0 }}
        style={{ left: click.x - 10, top: click.y - 10 }}
        className="absolute text-red-500"
      >
        <Heart fill="currentColor" size={24} />
      </motion.div>
    ))}
  </div>
);

// --- COMPONENT: BACKGROUND PARTICLES ---
const FloatingParticles = () => {
  const particles = Array.from({ length: 15 });
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: '110vh', x: `${Math.random() * 100}vw`, opacity: 0 }}
          animate={{ y: '-10vh', opacity: [0, 0.3, 0], x: `${Math.random() * 100}vw` }}
          transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, ease: "linear" }}
          className="absolute"
        >
          <Heart fill="#ff4d6d" className="text-[#ff4d6d]" size={Math.random() * 20 + 10} />
        </motion.div>
      ))}
    </div>
  );
};

const App = () => {
  const [unlocked, setUnlocked] = useState(false);
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [typedMessage, setTypedMessage] = useState('');
  const [clicks, setClicks] = useState([]);
  const [time, setTime] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  const fullMessage = "My dearest Alida, every single day since November 14th has been a blessing. Calling you my 'Jaanam' and 'Hayati' is the highlight of my day. This website is just a small piece of my heart to show you how much I love you. Happy Anniversary!";

  // Timer Logic
  useEffect(() => {
    const start = new Date("2025-11-14T00:00:00").getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const diff = now - start;
      setTime({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        mins: Math.floor((diff / 1000 / 60) % 60),
        secs: Math.floor((diff / 1000) % 60)
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Typewriter Logic
  useEffect(() => {
    if (envelopeOpened && typedMessage.length < fullMessage.length) {
      const timeout = setTimeout(() => {
        setTypedMessage(fullMessage.slice(0, typedMessage.length + 1));
      }, 40);
      return () => clearTimeout(timeout);
    }
  }, [envelopeOpened, typedMessage]);

  // Handlers
  const handleScreenTouch = (e) => {
    const newClick = { id: Date.now(), x: e.clientX, y: e.clientY };
    setClicks((prev) => [...prev, newClick]);
    setTimeout(() => setClicks((prev) => prev.filter(c => c.id !== newClick.id)), 1000);
  };

  const handleOpenLetter = () => {
    setEnvelopeOpened(true);
    const end = Date.now() + 3000;
    const frame = () => {
      confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0, y: 0.8 }, colors: ['#ff4d6d', '#ffb3c1'] });
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1, y: 0.8 }, colors: ['#ff4d6d', '#ffb3c1'] });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  };

  return (
    <div onMouseDown={handleScreenTouch} className="bg-[#fff0f3] min-h-screen text-[#590d22] font-sans relative overflow-x-hidden select-none">
      <FloatingParticles />
      <TouchHearts clicks={clicks} />

      {/* 1. ENTRY OVERLAY */}
      <AnimatePresence>
        {!unlocked && (
          <motion.div 
            exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9] }}}
            className="fixed inset-0 z-[100] bg-[#ff4d6d] flex flex-col items-center justify-center p-6 text-center"
          >
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
              <Heart size={80} className="text-white fill-white mb-8 shadow-2xl" />
            </motion.div>
            <h1 className="text-4xl font-bold text-white mb-8 tracking-tighter">For My Hayati, Alida</h1>
            <button 
              onClick={() => { setUnlocked(true); confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } }); }}
              className="bg-white text-[#ff4d6d] px-12 py-5 rounded-full font-black text-lg shadow-2xl active:scale-90 transition-transform"
            >
              OPEN MY HEART
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <main className={`${unlocked ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}>
        
        {/* MUSIC PLAYER (Visual) */}
        <div className="fixed bottom-6 left-6 z-50 bg-white/70 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-white flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden shadow-inner border border-white/50">
  <img src="logo.jpg" alt="Us" className="w-full h-full object-cover" />
</div>
          <div>
            <p className="text-[10px] font-bold text-pink-500 uppercase tracking-widest">Now Playing</p>
            <p className="text-xs font-bold">Our Beautiful Journey</p>
          </div>
        </div>

        {/* HERO SECTION */}
        {/* HERO SECTION - FIXED FOR MOBILE */}
<section className="h-screen flex flex-col items-center justify-center px-4 relative">
  <motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    className="bg-white/50 backdrop-blur-sm px-6 py-2 rounded-full text-[10px] font-bold mb-6 border border-white tracking-widest"
  >
     NOVEMBER 14, 2025 — FOREVER
  </motion.div>
  
  <h1 className="text-[14vw] md:text-9xl font-black text-center leading-[0.85] tracking-tighter break-words max-w-full">
    HAPPY <br/> 
    <span className="text-[#ff4d6d] block sm:inline">
      ANNIVERSARY
    </span>
  </h1>
  
  <p className="mt-8 text-lg md:text-2xl opacity-60 font-medium italic text-center">
    You are my Jaanam, Alida.
  </p>
  
  <div className="absolute bottom-10 animate-bounce opacity-20">
    <ChevronDown size={40} />
  </div>
</section>

        {/* TIMER SECTION */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(time).map(([label, value]) => (
              <div key={label} className="bg-white/80 backdrop-blur-md p-8 rounded-[35px] text-center shadow-sm border border-white">
                <div className="text-4xl font-black text-[#ff4d6d]">{value}</div>
                <div className="text-[10px] uppercase font-black opacity-30 tracking-widest">{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* PHOTO BENTO GRID */}
        <section className="py-24 px-6 max-w-6xl mx-auto">
          <h2 className="text-center text-3xl font-black mb-16 tracking-tight">Our Memories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
            <div className="col-span-2 row-span-2 rounded-[40px] overflow-hidden bg-white shadow-xl p-2">
              <img src="photo1.jpg" alt="Alida" className="w-full h-full object-cover rounded-[32px]" />
            </div>
            <div className="col-span-1 row-span-2 rounded-[40px] overflow-hidden bg-white shadow-xl p-2">
              <img src="photo2.jpg" alt="Alida" className="w-full h-full object-cover rounded-[32px]" />
            </div>
            <div className="col-span-1 row-span-1 rounded-[40px] overflow-hidden bg-white shadow-xl p-2">
              <img src="photo3.jpg" alt="Alida" className="w-full h-full object-cover rounded-[32px]" />
            </div>
            <div className="col-span-1 row-span-1 rounded-[40px] overflow-hidden bg-[#ff4d6d] flex items-center justify-center shadow-xl">
              <Sparkles className="text-white" size={40} />
            </div>
            <div className="col-span-2 md:col-span-4 row-span-1 rounded-[40px] overflow-hidden bg-white shadow-xl p-2">
              <img src="photo4.jpg" alt="Alida" className="w-full h-full object-cover rounded-[32px]" />
            </div>
          </div>
        </section>

        {/* NOTES SECTION */}
        <section className="py-24 px-6 bg-white/40">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-[35px] shadow-xl border-t-8 border-pink-400">
              <Lock className="text-pink-200 mb-4" size={30} />
              <p className="text-lg font-bold italic">"I love how you look when you're sleepy."</p>
            </div>
            <div className="bg-white p-8 rounded-[35px] shadow-xl border-t-8 border-red-400">
              <Heart className="text-red-200 mb-4" size={30} />
              <p className="text-lg font-bold italic">"Thank you for being my peace every day."</p>
            </div>
            <div className="bg-white p-8 rounded-[35px] shadow-xl border-t-8 border-pink-500">
              <Send className="text-pink-200 mb-4" size={30} />
              <p className="text-lg font-bold italic">"To many more years of us, Hayati."</p>
            </div>
            <div className="bg-white p-8 rounded-[35px] shadow-xl border-t-8 border-pink-500">
              <Send className="text-pink-200 mb-4" size={30} />
              <p className="text-lg font-bold italic">"Also im sorry my cutie for being so much busy today."</p>
            </div>
            <div className="bg-white p-8 rounded-[35px] shadow-xl border-t-8 border-pink-500">
              <Send className="text-pink-200 mb-4" size={30} />
              <p className="text-lg font-bold italic">"I love you so much jaanam & i miss you alot ya rouhi!."</p>
            </div>
            <div className="bg-white p-8 rounded-[35px] shadow-xl border-t-8 border-pink-500">
              <Heart className="text-pink-200 mb-4" size={30} />
              <p className="text-lg font-bold italic">"You are my angel sent from heaven, my birghtness in the darkest place, my breath, my soul, my heart, youre my everything!"</p>
            </div>
          </div>
        </section>

        {/* ENVELOPE SECTION */}
        <section className="py-32 px-6 flex flex-col items-center">
          <div className="w-full max-w-md">
            <AnimatePresence mode="wait">
              {!envelopeOpened ? (
                <motion.div
                  key="env"
                  whileHover={{ scale: 1.05 }}
                  onClick={handleOpenLetter}
                  className="w-full aspect-video bg-[#ff4d6d] rounded-[30px] shadow-2xl flex flex-col items-center justify-center cursor-pointer relative overflow-hidden"
                >
                  <div className="absolute top-0 w-full h-full border-t-[100px] border-t-white/10 border-x-[200px] border-x-transparent" />
                  <Heart className="text-white fill-white mb-4" size={48} />
                  <span className="text-white font-black uppercase text-xs tracking-widest">Click to Read</span>
                </motion.div>
              ) : (
                <motion.div
                  key="let"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="w-full bg-white p-12 rounded-[40px] shadow-2xl border-t-[12px] border-[#ff4d6d]"
                >
                  <p className="text-2xl font-medium leading-relaxed text-[#590d22] min-h-[200px]">
                    {typedMessage}
                    <span className="inline-block w-1 h-7 bg-[#ff4d6d] ml-1 animate-pulse" />
                  </p>
                  <div className="mt-12 pt-8 border-t-2 border-[#fff0f3] text-right">
                    <p className="text-sm font-black text-[#ff4d6d] uppercase tracking-tighter">Forever Yours,</p>
                    <p className="text-2xl font-black">SILLY HUBBY</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-20 text-center opacity-30 text-xs font-bold uppercase tracking-[0.5em]">
          Made with Love for Alida • 2026
        </footer>
      </main>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap');
        * { font-family: 'Outfit', sans-serif; transition: all 0.3s ease-out; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default App;