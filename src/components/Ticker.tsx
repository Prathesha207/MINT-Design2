export default function Ticker() {
  const items = [
    "MULTIMODAL INTELLIGENCE",
    "CONTINUOUS PROCESS ASSURANCE",
    "NEURAL VISION INFERENCE",
    "ZERO COGNITIVE BLINDSPOTS",
    "HIGH-SPEED AUTOMATED TRACKING",
    "EMAGE GROUP SYSTEMS",
    "MICRO-DEVIATION SCANNING ACTIVE"
  ];

  return (
    <div
      className="overflow-hidden whitespace-nowrap py-2 relative z-10 border-b border-white/[0.02]"
      style={{
        background: "rgba(8,7,15,0.4)",
        backdropFilter: "blur(4px)"
      }}
    >
      {/* Premium horizontal fade mask gradients */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#08070F] to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#08070F] to-transparent z-20 pointer-events-none" />

      <div className="inline-flex" style={{ animation: "ticker-anim 40s linear infinite" }}>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="inline-flex items-center select-none font-medium">
            {items.map((item, idx) => (
              <span key={idx} className="inline-flex items-center text-[9px] md:text-[10px] font-mono uppercase tracking-[0.25em]">
                <span className="text-white/30 mx-5 hover:text-white/70 transition-colors duration-150 flex items-center py-0.5">
                  {item}
                </span>
                <span className="text-violet-400 font-bold select-none text-[9px] drop-shadow-[0_0_6px_rgba(167,139,250,0.75)] mx-1 opacity-90">
                  ✦
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes ticker-anim { 
          from { transform: translateX(0); } 
          to { transform: translateX(-16.6666%); } 
        }
      `}</style>
    </div>
  );
}


