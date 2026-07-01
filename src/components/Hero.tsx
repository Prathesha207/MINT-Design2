import { motion } from "motion/react";

const P = {
  purple: "#8B5CF6",
  fg: "#EDE9FF",
  muted: "rgba(237, 233, 255, 0.75)",
  border: "rgba(139,92,246,0.12)",
};

const techStack = [
  { name: 'React', desc: 'Frontend Framework' },
  { name: 'TypeScript', desc: 'Type Safety' },
  { name: 'Python', desc: 'Backend Logic' },
  { name: 'PostgreSQL', desc: 'Database' },
  { name: 'TensorFlow', desc: 'AI/ML/DL' },
  { name: 'OpenCV', desc: 'Computer Vision' },
  { name: 'Neuron-D', desc: 'Hardware AI' },
  { name: 'Docker', desc: 'Containers' },
];

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden pt-20 pb-4 bg-[#08070F]">
      {/* Background Video specifically for Header & Hero - opaque with a solid black bottom gradient to transition cleanly to next section */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 bg-[#08070F]">
        <video 
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_115655_b4d9cd77-feed-43cd-a198-af78ebdf1f7a.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover opacity-100"
        />
        {/* Soft linear gradient to fade the video to pure black/dark at the bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#08070F]/60 to-[#08070F] z-10" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto gap-2">
         
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mint-tagline block"
            >
              The Industrial "Master Brain"
            </motion.span>
            <div className="w-full"> 
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mt-0.5 section-title whitespace-nowrap"
              style={{ 
                fontSize: "clamp(1.4rem, 3.2vw, 2.3rem)"
              }}
            >
              Multimodal Intelligence <span className="title-highlight">& Networked Tracking</span>
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mt-1"
          >
            <p className="text-xs md:text-sm section-desc">
              Modern high-speed automation is fast, yet traditional visual inspection remains reactive and manual.
              <br className="hidden md:inline" /> MINT eliminates this critical gap, shifting manufacturing to proactive, continuous process assurance.
            </p>
          </motion.div>
        </div>

        <motion.div
          id="title-tech-stack"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-6 mt-5 pt-3 border-t border-white/5 w-full"
        >
          <div className="flex flex-col gap-0.5 shrink-0 text-left leading-normal max-w-xs md:max-w-[260px]">
            <p className="text-white text-xs font-semibold tracking-wide uppercase">
              Technology Stack
            </p>
            <p className="text-white/60 text-[10px] sm:text-[11px] leading-snug font-normal">
              Built with cutting-edge technologies for industrial-grade performance
            </p>
          </div>
          <div className="overflow-hidden flex-1 w-full mask-gradient">
            <div className="flex w-max animate-marquee py-0.5">
              {[...techStack, ...techStack, ...techStack, ...techStack].map((item, i) => (
                <div key={i} className="flex items-center gap-2 mx-3.5 shrink-0">
                  <div className="liquid-glass w-5.5 h-5.5 rounded-sm flex items-center justify-center text-[9px] font-bold text-white border border-white/10 shrink-0">
                    {item.name[0]}
                  </div>
                  <div className="flex flex-col justify-center leading-tight">
                    <span className="text-xs font-semibold text-white/95 tracking-wide shrink-0">
                      {item.name}
                    </span>
                    <span className="text-[9px] text-white/50 tracking-wider shrink-0 font-normal">
                      {item.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
     
      </div>
    </section>
  );
}

