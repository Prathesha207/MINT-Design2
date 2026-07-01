import { motion } from "motion/react";

// Image constants with high-resolution, professional industrial and automation assets from Unsplash
const SECTION3_IMG1 = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=450&fit=crop&auto=format"; // Robot automation line
const SECTION3_IMG2 = "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&h=450&fit=crop&auto=format"; // Quality assurance laboratory
const SECTION3_BG = "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=1000&h=1200&fit=crop&auto=format"; // Tech supervisor monitoring automation controls

export default function ColorBento() {
  return (
    <section
      id="about"
      className="min-h-screen w-full flex flex-col pt-4 md:pt-8 px-4 md:px-8 pb-16 md:pb-24 gap-2 md:gap-3 shrink-0 bg-[#08070F] text-white"
    >
      <div className="max-w-7xl mx-auto w-full flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        
        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-3 md:gap-4 h-full justify-between" id="s3-left-column">
          
          {/* 1. Heading Card */}
          <motion.div
            id="s3-heading-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl bg-neutral-900/60 p-6 md:p-8 flex flex-col justify-between flex-[1.2] min-h-[180px] md:min-h-0 border border-white/5"
          >
            <div className="select-none text-left">
              <h2 className="text-[clamp(2.5rem,5.5vw,5rem)] font-bold font-serif leading-[0.95] text-white">
                Bioprocess <br /> Morphometrics
              </h2>
            </div>
            <p className="text-xs md:text-sm font-semibold text-violet-400 select-none uppercase tracking-widest text-left mt-4">
              Assure Production Integrity
            </p>
          </motion.div>

          {/* 2. Two Image Cards (side by side) */}
          <motion.div
            id="s3-images-wrapper"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex gap-3 md:gap-4 flex-1 min-h-[140px] md:min-h-0"
          >
            <div className="flex-1 rounded-2xl overflow-hidden border border-white/5 bg-neutral-900/40 relative group">
              <img
                src={SECTION3_IMG1}
                alt="Automated inspection system"
                className="w-full h-full object-cover select-none transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-1 rounded-2xl overflow-hidden border border-white/5 bg-neutral-900/40 relative group">
              <img
                src={SECTION3_IMG2}
                alt="Live vision inference camera setup"
                className="w-full h-full object-cover select-none transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          {/* 3. Consultation Card */}
          <motion.div
            id="s3-consultation-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl bg-neutral-900/40 p-6 md:p-8 flex items-end justify-between flex-[0.8] min-h-[160px] md:min-h-0 border border-white/5 text-left"
          >
            <div className="select-none">
              <p className="text-xs md:text-sm font-semibold text-violet-300 mb-2 md:mb-3 uppercase tracking-wider">
                Pilot Program
              </p>
              <h3 className="text-xl md:text-3xl font-bold font-serif text-white leading-6 md:leading-8">
                Request <br /> Custom Feasibility <br /> Studies
              </h3>
            </div>
            <a
              id="s3-book-online-btn"
              href="#contact"
              className="px-6 py-3 md:px-8 md:py-4 bg-violet-600 text-white text-xs md:text-sm font-bold uppercase tracking-widest rounded-full hover:scale-105 active:scale-95 transition-all shadow-md shadow-violet-600/20 cursor-pointer border border-violet-500/30 whitespace-nowrap"
            >
              Schedule Demo
            </a>
          </motion.div>

        </div>

        {/* RIGHT COLUMN */}
        <motion.div
          id="s3-right-column"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="rounded-2xl overflow-hidden relative min-h-[350px] md:min-h-0 border border-white/5 group"
        >
          <img
            src={SECTION3_BG}
            alt="Quality engineer at bioprocess monitoring workstation"
            className="w-full h-full object-cover select-none transition-transform duration-1000 group-hover:scale-102"
            referrerPolicy="no-referrer"
          />
          {/* Gradient overlay for right column backdrop */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20 pointer-events-none" />

          {/* Overlay container */}
          <div className="absolute bottom-3 left-3 right-3 md:bottom-6 md:left-6 md:right-6 flex gap-3 md:gap-4 text-left">
            
            {/* Overlay Card 1: Modern clean sans typography */}
            <motion.div
              id="s3-overlay-card-1"
              className="flex-1 bg-[#100E1F]/90 backdrop-blur-xl rounded-2xl p-4 md:p-6 flex flex-col justify-between h-36 md:h-52 border border-white/10"
            >
              <h4 className="text-xs md:text-lg font-bold font-sans text-white leading-5 md:leading-7 select-none">
                Real-Time <br /> Process <br /> Telemetry
              </h4>
              <div className="self-end w-8 h-8 md:w-10 md:h-10 rounded-full border border-violet-400/40 flex items-center justify-center text-violet-400 hover:bg-violet-600 hover:text-white hover:border-violet-600 transition-colors duration-200 cursor-pointer">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="rotate-[-45deg]"
                >
                  <path
                    d="M1 7h12m0 0L8 2m5 5L8 12"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </motion.div>

            {/* Overlay Card 2: Inner card right layout with stunning glass modern design */}
            <motion.div
              id="s3-overlay-card-2"
              className="flex-1 bg-white/5 backdrop-blur-xl rounded-2xl p-4 md:p-6 flex flex-col justify-between h-36 md:h-52 border border-white/10"
            >
              <h4 className="text-xs md:text-lg font-bold font-sans text-white/90 leading-5 md:leading-7 select-none">
                Multi-Zone <br /> Micro-Deviation <br /> Tracking
              </h4>
              <div className="self-end w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black hover:border-white transition-colors duration-200 cursor-pointer">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="rotate-[-45deg]"
                >
                  <path
                    d="M1 7h12m0 0L8 2m5 5L8 12"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
