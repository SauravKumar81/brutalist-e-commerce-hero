import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "motion/react";
import { Play, User } from "lucide-react";

function Clock({ timeZone, label }: { timeZone: string; label: string }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }).format(now)
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [timeZone]);

  return (
    <div className="flex items-center gap-2 md:gap-4 lg:gap-6">
      <span className="w-4 md:w-8 text-left">{label}</span>
      <span>{time}</span>
    </div>
  );
}

function CustomLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`fill-current ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 14v10m-5-5h10M50 10v12m-6-6h12M81 14v10m-5-5h10"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="square"
      />
      <circle cx="19" cy="42" r="7" />
      <circle cx="50" cy="38" r="8" />
      <circle cx="81" cy="42" r="7" />
      <path d="M13 54h12v40H13zM42 50h16v44H42zM75 54h12v40H75z" />
      <path d="M5 65h90v10H5z" />
    </svg>
  );
}

export default function App() {
  const { scrollY } = useScroll();
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Opacity transitions
  const state1Opacity = useTransform(scrollY, [0, 200], [1, 0]);
  const state1Pointer = useTransform(scrollY, (y) => y > 100 ? "none" : "auto");

  const state2Opacity = useTransform(scrollY, [200, 400], [0, 1]);
  const state2Pointer = useTransform(scrollY, (y) => y < 300 ? "none" : "auto");

  const navOpacity = useTransform(scrollY, [150, 300], [0, 1]);

  // Dimension transitions for Desktop sticky behavior
  const heroWidth = useMotionTemplate`${useTransform(scrollY, [0, 400], [100, 50])}%`;
  const heroTopPx = useTransform(scrollY, [0, 400], [0, 48]);
  const heroTop = useMotionTemplate`${heroTopPx}px`;
  const heroHeight = useMotionTemplate`calc(100vh - ${heroTopPx}px)`;

  return (
    <div className="relative w-full text-black bg-white min-h-screen font-sans selection:bg-black selection:text-white">
      {/* Navbar */}
      <motion.nav 
        style={{ opacity: isDesktop ? navOpacity : 1 }}
        className="fixed top-0 left-0 w-full h-[48px] bg-white text-black z-50 flex items-center justify-between px-6 md:px-8 text-[10px] md:text-xs font-semibold tracking-widest uppercase border-b border-gray-200"
      >
        <div className="flex-1">TERMINAL™</div>
        <div className="hidden md:flex gap-6 lg:gap-8 justify-center flex-1">
          <a href="#shop" className="hover:text-gray-500 transition-colors">Shop</a>
          <a href="#events" className="hover:text-gray-500 transition-colors">Events</a>
          <a href="#gallery" className="hover:text-gray-500 transition-colors">Gallery</a>
          <a href="#editorial" className="hover:text-gray-500 transition-colors">Editorial</a>
        </div>
        <div className="hidden md:flex gap-4 lg:gap-6 justify-end flex-1">
          <a href="#search" className="hover:text-gray-500 transition-colors">Search</a>
          <a href="#discord" className="hover:text-gray-500 transition-colors">Discord</a>
          <a href="#login" className="hover:text-gray-500 transition-colors">Login</a>
          <a href="#cart" className="hover:text-gray-500 transition-colors">Cart (0)</a>
        </div>
        <div className="md:hidden flex-1 justify-end flex">
          <button className="underline underline-offset-4">Menu</button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.div 
        className={`bg-black text-white hover:text-white overflow-hidden uppercase font-sans selection:bg-white selection:text-black flex flex-col z-40 ${isDesktop ? 'fixed left-0' : 'relative w-full h-screen pt-[48px]'}`}
        style={isDesktop ? { width: heroWidth, top: heroTop, height: heroHeight } : {}}
      >
        <div className="absolute inset-0 w-full h-full bg-neutral-900 z-0">
          <video
            src="/herosection.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
          />
        </div>

        {/* Corner Overlays */}
        <div className="absolute z-10 top-2 md:top-4 left-6 md:left-8 text-[18vw] md:text-[9vw] leading-none font-medium pointer-events-none select-none tracking-tighter">
          T
        </div>
        <div className="absolute z-10 top-2 md:top-4 right-6 md:right-8 text-[18vw] md:text-[9vw] leading-none font-medium pointer-events-none select-none tracking-tighter">
          2
        </div>
        <div className="absolute z-10 bottom-6 md:bottom-10 left-6 md:left-8 pointer-events-none">
          <CustomLogo className="w-16 md:w-20 text-white" />
        </div>
        <div className="absolute z-10 -bottom-2 md:-bottom-2 right-6 md:right-8 text-[20vw] md:text-[10vw] leading-none font-medium pointer-events-none select-none tracking-tighter">
          7
        </div>

        {/* State 1 Center Content (Desktop Only) */}
        {isDesktop && (
          <motion.div 
            style={{ opacity: state1Opacity, pointerEvents: state1Pointer }}
            className="absolute z-10 top-1/2 left-0 w-full -translate-y-1/2 grid grid-cols-3 gap-4 px-8 md:px-16 lg:px-24 items-center text-xs lg:text-sm tracking-[0.1em] lg:tracking-[0.2em]"
          >
            <div className="flex flex-col gap-1 w-full items-start font-medium opacity-90">
              <Clock label="LA" timeZone="America/Los_Angeles" />
              <Clock label="TYO" timeZone="Asia/Tokyo" />
            </div>
            <div className="text-center font-medium opacity-90 tracking-[0.1em] lg:tracking-[0.3em] whitespace-nowrap">
              THINKING ABOUT THE FUTURE<span className="animate-pulse">_</span>
            </div>
            <div className="flex flex-col group cursor-pointer items-start ml-auto max-w-max hover:opacity-75 transition-opacity font-medium">
              <span className="mb-0.5 md:mb-1 block">ENTER</span>
              <span className="flex items-center gap-2">
                <span className="group-hover:translate-x-1 transition-transform relative -top-[1px]">→</span>
                <span>TERMINAL™</span>
              </span>
            </div>
          </motion.div>
        )}

        {/* State 2 Center Content (Fades in on Desktop, Static on Mobile) */}
        {isDesktop ? (
          <motion.div 
            style={{ opacity: state2Opacity, pointerEvents: state2Pointer }}
            className="absolute z-10 top-1/2 left-0 w-full -translate-y-1/2 flex flex-col items-center justify-center text-center px-4"
          >
            <div className="w-2 h-2 rounded-full bg-red-600 mb-4 animate-pulse"></div>
            <div className="text-[10px] md:text-sm tracking-widest mb-1 text-gray-400 font-medium">LIVE</div>
            <div className="text-3xl lg:text-5xl font-medium tracking-[0.15em] mb-4 xl:mb-6 whitespace-nowrap">AT TERMINAL™</div>
            <div className="max-w-[280px] md:max-w-[360px] text-[10px] md:text-xs text-gray-400 mb-8 normal-case tracking-normal leading-relaxed font-normal">
              Tune in for At Night at Terminal™, Live DJ sets and workshops with the community - for the community.
            </div>
            <button className="bg-white text-black px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors">
              Watch Now
            </button>
          </motion.div>
        ) : (
          <div className="absolute z-10 top-1/2 left-0 w-full -translate-y-1/2 flex flex-col items-center justify-center text-center px-6">
            <div className="w-2 h-2 rounded-full bg-red-600 mb-6 animate-pulse"></div>
            <div className="text-[10px] tracking-widest mb-1 text-gray-400 font-medium">LIVE</div>
            <div className="text-3xl font-medium tracking-[0.15em] mb-4 whitespace-nowrap">AT TERMINAL™</div>
            <div className="max-w-[280px] text-[10px] text-gray-400 mb-8 normal-case tracking-normal leading-relaxed font-normal">
              Tune in for At Night at Terminal™, Live DJ sets and workshops with the community - for the community.
            </div>
            <button className="bg-white text-black px-8 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-16">
              Watch Now
            </button>
            <div className="flex gap-8 text-[10px] tracking-widest opacity-70">
              <Clock label="LA" timeZone="America/Los_Angeles" />
              <Clock label="TYO" timeZone="Asia/Tokyo" />
            </div>
          </div>
        )}
      </motion.div>

      {/* Desktop Spacer for scroll sequencing */}
      {isDesktop && <div className="w-full h-[448px]" />}

      {/* Scrolling Content Area */}
      <div className="w-full flex pb-24">
        {/* Placeholder left side to push genuine content to the right on desktop */}
        {isDesktop && <div className="w-[50%]" />}
        
        {/* The actual reading content */}
        <div className="w-full md:w-[50%] bg-white relative z-30 pt-[48px] px-6 md:px-12 lg:px-16 text-black border-l border-gray-100">
          
          <div className="relative group overflow-hidden bg-gray-100 aspect-[4/3] mb-8 md:mb-12 cursor-pointer mt-12">
            <video 
              src="/vlog.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="object-cover w-full h-full grayscale-[0.2] group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute z-10 top-4 left-4 flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase bg-white/95 px-3 py-1.5 shadow-sm hover:bg-white transition-colors">
              <Play className="w-3 h-3" strokeWidth={2.5} /> VLOG
            </div>
          </div>

          {/* New Sound by Jimmy Ayeni Section */}
          <div className="mb-20 md:mb-24 mt-12">
            <h2 className="text-[3.5rem] md:text-5xl lg:text-6xl leading-[0.9] tracking-tighter mb-12 uppercase font-medium">
              SOUND BY<br/>JIMMY AYENI
            </h2>
            
            <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-6">
               <User className="w-3.5 h-3.5" strokeWidth={2} /> © Y/PROJECT
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="group cursor-pointer">
                <div className="aspect-[3/4] bg-gray-100 mb-4 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80&auto=format&fit=crop" 
                    alt="Jeans"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="text-[10px] md:text-xs leading-tight">
                  <div className="font-semibold mb-1">Y/Project</div>
                  <div className="text-gray-600">Pinched Logo Jeans</div>
                  <div className="mt-1">$470.00</div>
                </div>
              </div>

              <div className="group cursor-pointer">
                <div className="aspect-[3/4] bg-gray-100 mb-4 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1551028719-00105bf1cd87?w=800&q=80&auto=format&fit=crop" 
                    alt="Bomber Jacket"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="text-[10px] md:text-xs leading-tight">
                  <div className="font-semibold mb-1">Y/Project</div>
                  <div className="text-gray-600">Draped Shoulder Bomber</div>
                  <div className="mt-1">$1,085.00</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col xl:flex-row gap-8 xl:gap-12 items-start mb-20 md:mb-32">
            <div className="flex-1 uppercase font-medium">
               <h2 className="text-[3rem] md:text-5xl lg:text-7xl leading-[0.9] tracking-tighter mb-4">
                 THE<br/>GRANDQ
               </h2>
               <div className="text-[3rem] md:text-5xl lg:text-7xl leading-[0.9] tracking-tighter flex items-start text-black">
                  <span className="mr-2 md:mr-4 mt-1 md:mt-2 text-2xl md:text-4xl lg:text-6xl">→</span> 
                  <div>
                    STYLISTS<br/>
                    <span className="text-gray-300">OF T</span>
                  </div>
               </div>
            </div>
            <div className="flex-1 text-[13px] md:text-[14px] leading-relaxed text-gray-600 max-w-lg mt-2 font-normal">
               Meet sisters Mackenzie and Alexandra Grandquist in this never before seen video interview that has been highly requested by those who are in-the-know. Hailing from Des Moines, Iowa from humble beginnings, the styling duo has managed to accomplish the unthinkable—taking Los Angeles by storm and garnering intrigue from Hollywood's most respected names in the entertainment and music industries. They have become an essential part of Terminal 27's community, creating their own visual language from their work as stylists...
            </div>
          </div>

          <div className="border-t border-black pt-4 mb-20">
            <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-4">
               <User className="w-3.5 h-3.5" strokeWidth={2} /> @ YOHJI YAMAMOTO
            </div>
            <div className="aspect-[16/9] bg-gray-100 overflow-hidden cursor-pointer relative group">
              <img src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop" className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" alt="Yohji" />
            </div>
          </div>

        </div>
      </div>

      {/* Discord Community Section */}
      <div className="relative w-full h-[600px] md:h-[800px] bg-black text-white flex flex-col justify-center px-6 md:px-12 lg:px-24 overflow-hidden z-[45]">
        <div className="absolute inset-0 w-full h-full opacity-60 z-0">
          <img 
            src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=2000" 
            alt="Discord Community" 
            className="w-full h-full object-cover grayscale"
          />
        </div>
        <div className="relative z-10 max-w-4xl">
          <h2 className="text-[3rem] md:text-[5rem] lg:text-[7rem] leading-[0.9] tracking-tighter mb-8 font-medium uppercase break-words">
            JOIN OUR DISCORD<br/>
            <span className="flex items-start">
              <span className="mr-2 md:mr-6 text-3xl md:text-6xl lg:text-8xl mt-1 lg:mt-3">→</span>
              COMMUNITY
            </span>
          </h2>
          <p className="max-w-[280px] md:max-w-[400px] text-[10px] md:text-xs text-gray-300 leading-relaxed font-normal mb-12">
            A platform to serve as the pulse of the community. Important notifications and updates will go live here first giving you, first insight on the latest offerings at Terminal™.
          </p>
          <button className="bg-white text-black px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors">
            TERMINAL™ DISCORD
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-white text-black pt-20 pb-12 px-6 md:px-12 lg:px-24 border-t border-gray-200 text-[10px] leading-[1.8] relative z-[45] font-medium">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-8 mb-24">
          <div>
            <div className="flex flex-col gap-1 items-start">
              <div className="flex items-center gap-1.5 mb-2 font-bold tracking-widest uppercase">
                <span className="text-[8px] flex items-center justify-center border border-black rounded-full w-3.5 h-3.5">1</span> LINKS
              </div>
              <a href="#" className="hover:text-gray-500 transition-colors">Shop</a>
              <a href="#" className="hover:text-gray-500 transition-colors">Events</a>
              <a href="#" className="hover:text-gray-500 transition-colors">Gallery</a>
              <a href="#" className="hover:text-gray-500 transition-colors">Editorial</a>
              <div className="h-4" />
              <a href="#" className="hover:text-gray-500 transition-colors">About</a>
              <a href="#" className="hover:text-gray-500 transition-colors">Careers</a>
              <a href="#" className="hover:text-gray-500 transition-colors">FAQ</a>
              <a href="#" className="hover:text-gray-500 transition-colors">Privacy</a>
            </div>
          </div>

          <div>
            <div className="flex flex-col gap-1 items-start">
              <div className="flex items-center gap-1.5 mb-2 font-bold tracking-widest uppercase">
                <span className="text-[8px] flex items-center justify-center border border-black rounded-full w-3.5 h-3.5">2</span> FOLLOW
              </div>
              <a href="#" className="hover:text-gray-500 transition-colors">Discord</a>
              <a href="#" className="hover:text-gray-500 transition-colors">Instagram</a>
              <a href="#" className="hover:text-gray-500 transition-colors">Twitch</a>
              <a href="#" className="hover:text-gray-500 transition-colors">Twitter</a>
            </div>
          </div>

          <div className="col-span-2 md:col-span-1">
            <div className="flex flex-col gap-1 items-start">
              <div className="flex items-center gap-1.5 mb-2 font-bold tracking-widest uppercase">
                <span className="text-[8px] flex items-center justify-center border border-black rounded-full w-3.5 h-3.5">3</span> CONTACT
              </div>
              <address className="not-italic mb-2">
                8271 Beverly Blvd,<br/>
                Los Angeles, California 90048
              </address>
              <a href="#" className="underline underline-offset-4 hover:text-gray-500 transition-colors mb-4">Contact for appointment</a>
              
              <div className="mb-2 mt-4">
                Coming Soon<br/>
                Ginza, Tokyo
              </div>
              <a href="#" className="underline underline-offset-4 hover:text-gray-500 transition-colors">Contact for appointment</a>
            </div>
          </div>

          <div className="col-span-2 md:col-span-1 flex flex-col justify-between">
            <div className="mb-16 md:mb-0">
              <div className="flex items-center gap-1.5 mb-4 font-bold tracking-widest uppercase">
                <span className="text-[8px] flex items-center justify-center border border-black rounded-full w-3.5 h-3.5">4</span> NEWSLETTER
              </div>
              <form className="flex w-full items-center border-b border-gray-300 pb-2 group focus-within:border-black transition-colors" onSubmit={(e) => e.preventDefault()}>
                <span className="mr-2 text-gray-400 group-focus-within:text-black">→</span>
                <input 
                  type="email" 
                  placeholder="ENTER YOUR EMAIL ADDRESS" 
                  className="w-full bg-transparent outline-none placeholder:text-gray-400 text-[10px] font-medium uppercase"
                  required
                />
                <button type="submit" className="font-bold tracking-widest uppercase hover:text-gray-500 transition-colors text-[10px] whitespace-nowrap ml-4">
                  SUBSCRIBE
                </button>
              </form>
            </div>
            
            <div className="flex flex-col xl:flex-row xl:items-end justify-between xl:justify-end gap-2 xl:gap-6 mt-auto uppercase tracking-widest text-opacity-70 text-black w-full text-right xl:text-left">
              <div className="flex items-center gap-2 justify-end xl:justify-start">
                 <Clock label="LA" timeZone="America/Los_Angeles" />
                 <span className="opacity-50">CLOSED</span>
              </div>
              <div className="flex items-center gap-2 justify-end xl:justify-start">
                 <Clock label="TYO" timeZone="Asia/Tokyo" />
                 <span className="opacity-50">CLOSED</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
