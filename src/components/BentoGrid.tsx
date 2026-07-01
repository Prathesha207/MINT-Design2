import { useState, useEffect, useRef, ReactNode, CSSProperties } from "react";
import { ChevronLeft, ChevronRight, ArrowUpRight, Zap, Eye, Shield, Activity, ListOrdered } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Hls from "hls.js";

// ─── Theme Colors ─────────────────────────────────────────────────────────────
const P = {
  purple: "#8B5CF6",
  blue: "#4A8FFF",
  card: "#100E1F",
  cardMid: "#1A1530",
  bg: "#08070F",
  fg: "#EDE9FF",
  muted: "#7A6F9A",
  border: "rgba(139, 92, 246, 0.12)",
};

// ─── Custom Responsive Slider Hook ───────────────────────────────────────────
function useSlider(length: number, autoplay = true) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  useEffect(() => {
    if (!autoplay || length < 2 || isPaused) return;
    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % length);
    }, 3500); // Unified slightly faster timing
    return () => clearInterval(interval);
  }, [length, autoplay, isPaused]);

  const next = () => setCurrent((c) => (c + 1) % length);
  const prev = () => setCurrent((c) => (c - 1 + length) % length);

  return { current, next, prev, setCurrent, setIsPaused };
}

// ─── Stable Render Wrappers for Framer Motion AnimatePresence ─────────────────
// These ensure that during transition exit animations, the old slide contents 
// remain stable instead of swapping to the entering slide data.
function SlideWrapper({ slide }: { slide: any }) {
  const [stableSlide] = useState(slide);
  if (stableSlide.type === "why_us") {
    return <WhyUsSlide />;
  }
  if (stableSlide.type === "steps") {
    return <StepsSlide />;
  }
  if (stableSlide.type === "table") {
    return <TableCard label={stableSlide.label} title={stableSlide.title} body={stableSlide.body} />;
  }
  return <ImgCard {...stableSlide} />;
}

function StableImgCard({ slide }: { slide: any }) {
  const [stableSlide] = useState(slide);
  return <ImgCard {...stableSlide} />;
}

// Helper to render high-fidelity animations without duplicating SVG nodes
function renderCardAnimation(i: number) {
  if (i === 0) {
    return (
      <div className="absolute inset-0 flex flex-col justify-between p-2 overflow-hidden select-none pointer-events-none w-full h-full">
        <div className="relative w-full h-full flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 160 110">
            {/* Conveyor / Guide Rails */}
            <line x1="10" y1="80" x2="150" y2="80" stroke="rgba(255,255,255,0.05)" strokeWidth="0.8" strokeDasharray="3 3" />
            <line x1="10" y1="30" x2="150" y2="30" stroke="rgba(255,255,255,0.05)" strokeWidth="0.8" strokeDasharray="3 3" />

            {/* ITEM 1: NORMAL CHIP (LEFT) */}
            <rect x="17" y="38" width="22" height="30" rx="2" fill="none" stroke="rgba(34,197,94,0.2)" strokeWidth="0.6" />
            <path d="M17,42 L17,38 L21,38" fill="none" stroke="rgba(34,197,94,0.5)" strokeWidth="0.8" />
            <path d="M39,42 L39,38 L35,38" fill="none" stroke="rgba(34,197,94,0.5)" strokeWidth="0.8" />
            <path d="M17,64 L17,68 L21,68" fill="none" stroke="rgba(34,197,94,0.5)" strokeWidth="0.8" />
            <path d="M39,64 L39,68 L35,68" fill="none" stroke="rgba(34,197,94,0.5)" strokeWidth="0.8" />
            <rect x="21" y="44" width="14" height="18" rx="1" fill="rgba(137,170,204,0.02)" stroke="rgba(137,170,204,0.15)" strokeWidth="0.6" />
            <rect x="25" y="48" width="6" height="10" rx="0.5" fill="rgba(137,170,204,0.08)" stroke="rgba(137,170,204,0.2)" strokeWidth="0.4" />
            {/* Pins */}
            <line x1="18.5" y1="47" x2="21" y2="47" stroke="rgba(255,255,255,0.15)" strokeWidth="0.4" />
            <line x1="18.5" y1="51" x2="21" y2="51" stroke="rgba(255,255,255,0.15)" strokeWidth="0.4" />
            <line x1="18.5" y1="55" x2="21" y2="55" stroke="rgba(255,255,255,0.15)" strokeWidth="0.4" />
            <line x1="18.5" y1="59" x2="21" y2="59" stroke="rgba(255,255,255,0.15)" strokeWidth="0.4" />
            <line x1="35" y1="47" x2="37.5" y2="47" stroke="rgba(255,255,255,0.15)" strokeWidth="0.4" />
            <line x1="35" y1="51" x2="37.5" y2="51" stroke="rgba(255,255,255,0.15)" strokeWidth="0.4" />
            <line x1="35" y1="55" x2="37.5" y2="55" stroke="rgba(255,255,255,0.15)" strokeWidth="0.4" />
            <line x1="35" y1="59" x2="37.5" y2="59" stroke="rgba(255,255,255,0.15)" strokeWidth="0.4" />
            {/* Status label */}
            <text x="28" y="27" textAnchor="middle" fill="#22c55e" fontSize="4" fontFamily="monospace" fontWeight="bold">NORMAL</text>
            <text x="28" y="73" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="3.5" fontFamily="monospace">OK</text>

            {/* ITEM 2: ANOMALOUS CHIP (CENTER) */}
            <rect x="69" y="38" width="22" height="30" rx="2" fill="none" stroke="#ef4444" strokeWidth="0.8" className="animate-pulse" />
            <path d="M69,42 L69,38 L73,38" fill="none" stroke="#ef4444" strokeWidth="1" />
            <path d="M91,42 L91,38 L87,38" fill="none" stroke="#ef4444" strokeWidth="1" />
            <path d="M69,64 L69,68 L73,68" fill="none" stroke="#ef4444" strokeWidth="1" />
            <path d="M91,64 L91,68 L87,68" fill="none" stroke="#ef4444" strokeWidth="1" />
            <rect x="73" y="44" width="14" height="18" rx="1" fill="rgba(239,68,68,0.02)" stroke="rgba(239,68,68,0.2)" strokeWidth="0.6" />
            <rect x="77" y="48" width="6" height="10" rx="0.5" fill="rgba(239,68,68,0.05)" stroke="rgba(239,68,68,0.3)" strokeWidth="0.4" />
            {/* Defect Crack line */}
            <path d="M79,49 L83,54 L80,59" fill="none" stroke="#ef4444" strokeWidth="0.8" strokeLinecap="round" />
            {/* Pins - one of them missing / broken */}
            <line x1="70.5" y1="47" x2="73" y2="47" stroke="rgba(255,255,255,0.15)" strokeWidth="0.4" />
            <line x1="70.5" y1="51" x2="72" y2="50" stroke="#ef4444" strokeWidth="0.5" /> {/* Bent Pin */}
            <line x1="70.5" y1="55" x2="73" y2="55" stroke="rgba(255,255,255,0.15)" strokeWidth="0.4" />
            <line x1="70.5" y1="59" x2="73" y2="59" stroke="rgba(255,255,255,0.15)" strokeWidth="0.4" />
            <line x1="87" y1="47" x2="89.5" y2="47" stroke="rgba(255,255,255,0.15)" strokeWidth="0.4" />
            <line x1="87" y1="51" x2="89.5" y2="51" stroke="rgba(255,255,255,0.15)" strokeWidth="0.4" />
            <line x1="87" y1="59" x2="89.5" y2="59" stroke="rgba(255,255,255,0.15)" strokeWidth="0.4" />
            {/* Blinking alarm circle */}
            <circle cx="81" cy="54" r="2.5" fill="none" stroke="#ef4444" strokeWidth="0.4" className="animate-ping" />
            <circle cx="81" cy="54" r="1" fill="#ef4444" />
            {/* Status label */}
            <text x="80" y="27" textAnchor="middle" fill="#ef4444" fontSize="4" fontFamily="monospace" fontWeight="bold">ANOMALY</text>
            <text x="80" y="73" textAnchor="middle" fill="#ef4444" fontSize="3.5" fontFamily="monospace" fontWeight="bold">FAULT</text>

            {/* ITEM 3: NORMAL CHIP (RIGHT) */}
            <rect x="121" y="38" width="22" height="30" rx="2" fill="none" stroke="rgba(34,197,94,0.2)" strokeWidth="0.6" />
            <path d="M121,42 L121,38 L125,38" fill="none" stroke="rgba(34,197,94,0.5)" strokeWidth="0.8" />
            <path d="M143,42 L143,38 L139,38" fill="none" stroke="rgba(34,197,94,0.5)" strokeWidth="0.8" />
            <path d="M121,64 L121,68 L125,68" fill="none" stroke="rgba(34,197,94,0.5)" strokeWidth="0.8" />
            <path d="M143,64 L143,68 L139,68" fill="none" stroke="rgba(34,197,94,0.5)" strokeWidth="0.8" />
            <rect x="125" y="44" width="14" height="18" rx="1" fill="rgba(137,170,204,0.02)" stroke="rgba(137,170,204,0.15)" strokeWidth="0.6" />
            <rect x="129" y="48" width="6" height="10" rx="0.5" fill="rgba(137,170,204,0.08)" stroke="rgba(137,170,204,0.2)" strokeWidth="0.4" />
            {/* Pins */}
            <line x1="122.5" y1="47" x2="125" y2="47" stroke="rgba(255,255,255,0.15)" strokeWidth="0.4" />
            <line x1="122.5" y1="51" x2="125" y2="51" stroke="rgba(255,255,255,0.15)" strokeWidth="0.4" />
            <line x1="122.5" y1="55" x2="125" y2="55" stroke="rgba(255,255,255,0.15)" strokeWidth="0.4" />
            <line x1="122.5" y1="59" x2="125" y2="59" stroke="rgba(255,255,255,0.15)" strokeWidth="0.4" />
            <line x1="139" y1="47" x2="141.5" y2="47" stroke="rgba(255,255,255,0.15)" strokeWidth="0.4" />
            <line x1="139" y1="51" x2="141.5" y2="51" stroke="rgba(255,255,255,0.15)" strokeWidth="0.4" />
            <line x1="139" y1="55" x2="141.5" y2="55" stroke="rgba(255,255,255,0.15)" strokeWidth="0.4" />
            <line x1="139" y1="59" x2="141.5" y2="59" stroke="rgba(255,255,255,0.15)" strokeWidth="0.4" />
            {/* Status label */}
            <text x="132" y="27" textAnchor="middle" fill="#22c55e" fontSize="4" fontFamily="monospace" fontWeight="bold">NORMAL</text>
            <text x="132" y="73" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="3.5" fontFamily="monospace">OK</text>

            {/* Sweeping scan bar */}
            <line x1="12" y1="20" x2="12" y2="90" stroke="rgba(139, 92, 246, 0.6)" strokeWidth="1">
              <animate attributeName="x1" values="12;148;12" dur="3s" repeatCount="indefinite" />
              <animate attributeName="x2" values="12;148;12" dur="3s" repeatCount="indefinite" />
            </line>
            <circle cx="12" cy="20" r="1" fill="#8B5CF6">
              <animate attributeName="cx" values="12;148;12" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="12" cy="90" r="1" fill="#8B5CF6">
              <animate attributeName="cx" values="12;148;12" dur="3s" repeatCount="indefinite" />
            </circle>
          </svg>

          <div className="absolute top-7 left-2.5 border border-emerald-500/20 bg-neutral-950/95 py-0.5 px-1 rounded flex flex-col leading-none z-10">
            <span className="text-[5px] font-bold text-emerald-400 font-mono tracking-wider uppercase mb-0.5">MODEL OK</span>
            <span className="text-[3.5px] text-white/40 font-mono uppercase">ACC: 99.8%</span>
          </div>
        </div>
      </div>
    );
  }
  
  if (i === 1) {
    return (
      <div className="absolute inset-0 flex flex-col justify-between p-2 overflow-hidden select-none pointer-events-none w-full h-full">
        <div className="absolute top-0 bottom-0 left-6 w-[1px] bg-white/5" />
        <div className="absolute left-0 right-0 bottom-6 h-[1px] bg-white/5" />

        <div className="relative w-full h-full flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full stroke-white/10 fill-none" viewBox="0 0 160 110">
            <line x1="15" y1="55" x2="145" y2="55" strokeDasharray="1 3" strokeWidth="0.4" className="stroke-white/10" />
            <line x1="80" y1="10" x2="80" y2="100" strokeDasharray="1 3" strokeWidth="0.4" className="stroke-white/10" />

            <path d="M 15 55 Q 50 20, 80 55 T 145 55" strokeWidth="0.6" strokeDasharray="2 3" className="stroke-white/5" />
            <path d="M 15 55 Q 50 90, 80 55 T 145 55" strokeWidth="0.6" strokeDasharray="2 3" className="stroke-white/5" />

            <path d="M 15 55 Q 80 20, 145 55" strokeWidth="0.8" strokeDasharray="3 3" className="stroke-white/15" />

            <path id="trajectory-curve" d="M 15 55 Q 80 95, 145 55" strokeWidth="1.2" className="stroke-white/50" />

            <circle r="2.5" className="fill-white drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]">
              <animateMotion dur="2.5s" repeatCount="indefinite" path="M 15 55 Q 80 95, 145 55" />
            </circle>
          </svg>

          <div className="absolute bottom-[14%] left-[20%] border border-red-500/30 bg-neutral-950/95 py-0.5 px-1 rounded flex flex-col leading-none z-10 animate-[pulse-signal_1.8s_infinite]">
            <span className="text-[5px] font-bold text-red-400 font-mono tracking-widest uppercase mb-0.5">⚠ PATH_OUT</span>
            <span className="text-[3.5px] text-white/40 font-mono uppercase">DEV_Y: +28.4mm</span>
          </div>
        </div>
      </div>
    );
  }

  if (i === 2) {
    return (
      <div className="absolute inset-0 flex flex-col justify-center items-center p-2 gap-2 overflow-hidden select-none pointer-events-none">
        <div className="mx-auto w-[85%] border border-red-500/30 bg-neutral-950/95 py-0.5 px-2 rounded text-center z-10 flex flex-col justify-center items-center animate-[pulse-signal_1.5s_infinite]">
          <span className="text-[7px] font-mono font-bold text-red-400 tracking-widest block leading-none">ORDER VIOLATION</span>
          <span className="text-[4px] font-mono text-white/40 block tracking-wider uppercase mt-0.5">SEQ_ERR // FAILED</span>
        </div>

        <div className="flex items-center justify-center gap-1.5 relative z-10 w-full shrink-0 px-2 py-0.5">
          <div className="flex flex-col items-center">
            <div className="w-5.5 h-5.5 rounded-full bg-white/10 border border-white/30 flex items-center justify-center text-[7px] font-mono font-bold text-white">✓</div>
            <span className="text-[4.5px] font-mono text-white/30 mt-0.5 uppercase tracking-wide">STEP 01</span>
          </div>

          <div className="w-4 h-[0.5px] bg-white/15 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 bg-white w-1" style={{ animation: 'sequence-flow 1.5s infinite linear' }} />
          </div>

          <div className="flex flex-col items-center select-none">
            <div className="w-5.5 h-5.5 rounded-full bg-neutral-950 border border-red-500 flex items-center justify-center text-[7px] font-mono font-bold text-red-400 animate-pulse">✗</div>
            <span className="text-[4.5px] font-mono text-red-400 font-bold mt-0.5 uppercase tracking-wide">MISSED</span>
          </div>

          <div className="w-4 h-[0.5px] bg-white/10" />

          <div className="flex flex-col items-center">
            <div className="w-5.5 h-5.5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[6.5px] font-mono font-light text-white/20">03</div>
            <span className="text-[4.5px] font-mono text-white/20 mt-0.5 uppercase tracking-wide">STEP 03</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

const modelsDataStatic = [
  {
    title: "Anomaly Model",
    desc: "Find visual problems such as foreign objects, missing parts or defects. The model learns normal appearance and flags anything unusual.",
    examples: [
      "Foreign Objects",
      "Missing Items",
      "Visual Defects"
    ],
    icon: Eye
  },
  {
    title: "Motion Model",
    desc: "Track object movement and detect motion changes such as speed issues, wrong paths, timing errors, or unexpected behavior.",
    examples: [
      "Path Deviations",
      "Speed Anomalies",
      "Timing Errors"
    ],
    icon: Activity
  },
  {
    title: "Sequential Model",
    desc: "Analyze process steps over time and detect skipped steps, wrong order, or workflow violations in industrial operations.",
    examples: [
      "Skipped Steps",
      "Order Violations",
      "Wrong Sequences"
    ],
    icon: ListOrdered
  }
];

const comparisonRows = [
  {
    feature: "Monitoring",
    traditional: "Invasive/Manual sampling",
    mint: "Continuous Non-Invasive Streaming",
  },
  {
    feature: "Line Clearance",
    traditional: "Subjective Human Check",
    mint: "Automated, Trace based Verification",
  },
  {
    feature: "Risk Management",
    traditional: "Detected Post-Event",
    mint: "Real-time Early Anomaly Detection",
  },
  {
    feature: "Compliance",
    traditional: "Manual Paper Logs",
    mint: "100% Video Digital Thread",
  },
];

const stepsStatic = [
  {
    step: "01",
    title: "Upload & Configure",
    desc: "Upload your industrial video and define the exact regions MINT should inspect. Draw focused ROI zones around machines, products, or process areas for accurate analysis.",
    functions: ["Video Upload", "Multi-ROI Selection", "Targeted Inspection"],
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&h=337&fit=crop&auto=format",
    overlayType: "upload"
  },
  {
    step: "02",
    title: "Train the Model",
    desc: "Train MINT using your selected video data and ROI regions. The system learns normal process behavior, motion patterns, and visual flow from your own environment.",
    functions: ["Dataset Preparation", "AI Model Training", "Training Progress"],
    image: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?w=600&h=337&fit=crop&auto=format",
    overlayType: "train"
  },
  {
    step: "03",
    title: "Run Inference",
    desc: "Analyze uploaded or live video using your trained model. MINT highlights anomalies directly on the video with detection boxes, labels, and real-time status feedback.",
    functions: ["Live Inference", "Anomaly Detection", "Real-Time Alerts"],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=337&fit=crop&auto=format",
    overlayType: "infer"
  }
];

// ─── Beautiful Symmetrical Adaptive Why Us Slide ─────────────────────────────
function WhyUsSlide() {
  const [activeTab, setActiveTab] = useState(0);
  const modelsData = modelsDataStatic;

  return (
    <div 
      className="w-full h-full pt-3 pb-8 px-4 md:px-5 flex flex-col justify-start select-none relative overflow-hidden bg-neutral-950/45 backdrop-blur-[4px]"
    >
      <style>{`
        @keyframes custom-scan {
          0%, 100% { top: 18%; }
          50% { top: 82%; }
        }
        @keyframes pulse-signal {
          0%, 100% { opacity: 0.5; transform: scale(0.97); }
          50% { opacity: 1; transform: scale(1.03); }
        }
        @keyframes sequence-flow {
          0% { transform: translateX(-10px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateX(65px); opacity: 0; }
        }
      `}</style>

      {/* Background radial accent glow */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-violet-600/[0.04] rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-blue-600/[0.04] rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 flex-1 flex flex-col gap-4 h-full pb-6 md:pb-2">
        {/* Header Block */}
        <div className="mb-2 text-left">
          <span className="mint-tagline block mb-0.5">
            Vision Models
          </span>
          <h3 
            className="mint-heading mt-0"
          >
            Choose the Right Vision Model
          </h3>
          <p className="section-desc mt-1 text-xs sm:text-sm lg:text-sm leading-relaxed max-w-3xl">
            MINT supports three focused model types, so users can train the system based on what they want to detect — visual anomalies, motion changes, or process sequence errors.
          </p>
        </div>

        {/* 1. DESKTOP & LARGE TABLET LAYOUT (lg:grid) */}
        <div className="hidden lg:grid grid-cols-3 gap-4 w-full flex-1 min-h-0">
          {modelsData.map((card, i) => {
            return (
              <div
                key={i}
                className="bg-[#0A0815]/40 rounded-2xl flex flex-col h-full overflow-hidden group transition-all duration-300 border border-white/5 hover:border-violet-500/35 hover:bg-white/[0.02] shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
              >
                {/* Visual animations - FLUSH */}
                <div className="relative w-full flex-1 min-h-0 overflow-hidden bg-neutral-950/95 border-b border-white/5 flex items-center justify-center">
                  {/* High-tech grid overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#374151_1px,transparent_1px),linear-gradient(to_bottom,#374151_1px,transparent_1px)] bg-[size:8px_8px] opacity-[0.15]" />
                  {/* HUD labels */}
                  <div className="absolute top-2.5 left-3 right-3 flex justify-between items-center text-[7px] font-mono text-white/40 tracking-wider uppercase z-20">
                    <span>{i === 0 ? "SCAN_01" : i === 1 ? "VEC_FLOW" : "SEQ_03"}</span>
                    <span>{i === 0 ? "30 FPS" : i === 1 ? "20Hz" : "ACTIVE"}</span>
                  </div>
                  {/* HUD footer */}
                  <div className="absolute bottom-2.5 left-3 right-3 flex justify-between items-center text-[7px] font-mono tracking-wider uppercase z-20">
                    <span className="text-white/30">{i === 0 ? "ANOMALY" : i === 1 ? "TRAJECTORY" : "SEQUENTIAL"}</span>
                    <span className="text-white/60 font-semibold animate-pulse">{i === 0 ? "● FAULT_DET" : i === 1 ? "● OUT_BOUNDS" : "● ERROR_HALT"}</span>
                  </div>
                  {renderCardAnimation(i)}
                </div>

                {/* Details block */}
                <div className="p-4 flex flex-col justify-start text-left select-none shrink-0">
                  <div className="flex flex-col">
                    <h4 className="text-xs md:text-sm font-bold text-white uppercase font-mono tracking-wider">
                      {card.title}
                    </h4>
                    <span className="text-[10px] font-mono font-medium tracking-wider text-violet-400 mt-1.5">
                      {card.examples.join(' • ')}
                    </span>
                  </div>

                  <p className="text-[11px] sm:text-xs leading-snug text-white/60 font-sans font-normal mt-2">
                    {card.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 2. MOBILE & TABLET LAYOUT (lg:hidden) - Dynamic Segmented Control & Clean Visual Card */}
        <div className="flex lg:hidden flex-col gap-2.5 w-full mt-1.5 flex-1 min-h-0">
          {/* Custom high-fidelity Segmented Tab switcher */}
          <div className="grid grid-cols-3 gap-1 bg-neutral-950/40 p-1 rounded-xl border border-white/5 shrink-0">
            {modelsData.map((tab, idx) => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`flex items-center justify-center gap-1.5 py-1.5 px-1 rounded-lg text-[9px] sm:text-xs font-mono font-medium transition-all duration-300 border ${
                    activeTab === idx
                      ? "bg-violet-500/10 text-violet-300 border-violet-500/25 shadow-[0_0_12px_rgba(139,92,246,0.1)]"
                      : "text-white/45 border-transparent hover:text-white"
                  }`}
                >
                  <TabIcon size={11} className={activeTab === idx ? "text-violet-400 animate-pulse" : "text-white/40"} />
                  <span className="truncate">{tab.title.replace(" Model", "")}</span>
                </button>
              );
            })}
          </div>

          {/* Active Card Content */}
          {(() => {
            const card = modelsData[activeTab];
            return (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="bg-[#0A0815]/40 rounded-2xl flex flex-col overflow-hidden text-left border border-white/5 shadow-[0_8px_20px_rgba(0,0,0,0.3)] flex-1 min-h-0"
              >
                {/* Visual HUD Preview Animation - FLUSH */}
                <div className="relative w-full h-[150px] overflow-hidden bg-neutral-950/95 border-b border-white/5 flex items-center justify-center shrink-0">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#374151_1px,transparent_1px),linear-gradient(to_bottom,#374151_1px,transparent_1px)] bg-[size:8px_8px] opacity-[0.1]" />
                  <div className="absolute top-2.5 left-3 right-3 flex justify-between items-center text-[7px] font-mono text-white/35 tracking-wider uppercase z-20">
                    <span>{activeTab === 0 ? "LIVE_ANOMALY" : activeTab === 1 ? "VECTOR_TRACK" : "SEQ_LOGIC"}</span>
                    <span>ACTIVE</span>
                  </div>
                  {renderCardAnimation(activeTab)}
                </div>

                {/* Info block */}
                <div className="p-4 flex flex-col justify-start select-none text-left flex-1">
                  <div className="flex flex-col">
                    <span className="text-xs md:text-sm font-bold text-white uppercase font-mono tracking-wider">
                      {card.title}
                    </span>
                    <span className="text-[10px] font-mono font-medium tracking-wider text-violet-400 mt-1.5">
                      {card.examples.join(' • ')}
                    </span>
                  </div>
                  
                  {/* Model description */}
                  <p className="text-[11px] sm:text-xs text-white/60 leading-snug font-sans font-normal mt-2">
                    {card.desc}
                  </p>
                </div>
              </motion.div>
            );
          })()}
        </div>

      </div>
    </div>
  );
}

// ─── Step Visual Picture Component with Computer Vision HUD Overlays ──────────
interface StepVisualProps {
  image: string;
  overlayType: string;
  title: string;
  className?: string;
}

function StepVisual({ image, overlayType, title, className }: StepVisualProps) {
  return (
    <div className={`relative w-full overflow-hidden bg-neutral-950 border-b border-white/5 flex items-center justify-center transition-all duration-300 ${className || "h-[150px] shrink-0"}`}>
      {/* Base Image */}
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-[1.03] group-hover:opacity-50 transition-all duration-700"
        referrerPolicy="no-referrer"
      />
      {/* Scan Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none" />

      {/* SVG Computer Vision Overlay HUD */}
      {overlayType === "upload" && (
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 110">
            {/* Draw ROI dashed bounding box */}
            <rect
              x="45"
              y="25"
              width="110"
              height="60"
              rx="2"
              fill="none"
              stroke="rgba(139, 92, 246, 0.7)"
              strokeWidth="1.2"
              strokeDasharray="4 3"
              className="animate-pulse"
            />
            {/* Corner Bracket Reticles */}
            <path d="M 40 32 L 40 20 L 52 20" fill="none" stroke="#4A8FFF" strokeWidth="1" />
            <path d="M 160 32 L 160 20 L 148 20" fill="none" stroke="#4A8FFF" strokeWidth="1" />
            <path d="M 40 78 L 40 90 L 52 90" fill="none" stroke="#4A8FFF" strokeWidth="1" />
            <path d="M 160 78 L 160 90 L 148 90" fill="none" stroke="#4A8FFF" strokeWidth="1" />
            
            {/* Draggable handle dots on ROI box */}
            <circle cx="45" cy="25" r="2" fill="#8B5CF6" stroke="#EDE9FF" strokeWidth="0.5" />
            <circle cx="155" cy="25" r="2" fill="#8B5CF6" stroke="#EDE9FF" strokeWidth="0.5" />
            <circle cx="45" cy="85" r="2" fill="#8B5CF6" stroke="#EDE9FF" strokeWidth="0.5" />
            <circle cx="155" cy="85" r="2" fill="#8B5CF6" stroke="#EDE9FF" strokeWidth="0.5" />

            {/* Crosshair cursor simulation */}
            <path d="M 110 50 L 110 60 M 105 55 L 115 55" fill="none" stroke="#4A8FFF" strokeWidth="0.8" />
            <circle cx="110" cy="55" r="3" fill="none" stroke="#4A8FFF" strokeWidth="0.6" strokeDasharray="1 1" />

            {/* Label box */}
            <rect x="50" y="30" width="82" height="10" rx="1.5" fill="rgba(8,7,15,0.85)" stroke="rgba(139, 92, 246, 0.3)" strokeWidth="0.6" />
            <text x="54" y="37" fill="#EDE9FF" fontSize="4.5" fontFamily="monospace" fontWeight="bold">ROI_01: INSPECT_ZONE</text>
            <circle cx="126" cy="35" r="1" fill="#4A8FFF" className="animate-ping" />
          </svg>
          <div className="absolute top-2 left-2 text-[6.5px] font-mono text-cyan-400 bg-neutral-950/80 px-1 py-0.5 rounded border border-white/5 tracking-wider">
            [MINT_CONFIG] // RES: 1080P
          </div>
        </div>
      )}

      {overlayType === "train" && (
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 110">
            {/* Animated network lines */}
            <line x1="20" y1="55" x2="60" y2="25" stroke="rgba(139, 92, 246, 0.15)" strokeWidth="0.8" />
            <line x1="20" y1="55" x2="60" y2="55" stroke="rgba(139, 92, 246, 0.15)" strokeWidth="0.8" />
            <line x1="20" y1="55" x2="60" y2="85" stroke="rgba(139, 92, 246, 0.15)" strokeWidth="0.8" />
            <line x1="60" y1="25" x2="120" y2="40" stroke="rgba(139, 92, 246, 0.15)" strokeWidth="0.8" />
            <line x1="60" y1="55" x2="120" y2="55" stroke="rgba(139, 92, 246, 0.15)" strokeWidth="0.8" />
            <line x1="60" y1="85" x2="120" y2="70" stroke="rgba(139, 92, 246, 0.15)" strokeWidth="0.8" />
            <line x1="120" y1="40" x2="170" y2="55" stroke="rgba(139, 92, 246, 0.15)" strokeWidth="0.8" />
            <line x1="120" y1="70" x2="170" y2="55" stroke="rgba(139, 92, 246, 0.15)" strokeWidth="0.8" />

            {/* Neural nodes */}
            <circle cx="20" cy="55" r="2.5" fill="#8B5CF6" />
            <circle cx="60" cy="25" r="2.5" fill="#4A8FFF" />
            <circle cx="60" cy="55" r="2.5" fill="#8B5CF6" />
            <circle cx="60" cy="85" r="2.5" fill="#4A8FFF" />
            <circle cx="120" cy="40" r="2.5" fill="#8B5CF6" />
            <circle cx="120" cy="70" r="2.5" fill="#4A8FFF" />
            <circle cx="170" cy="55" r="3" fill="#8B5CF6" className="animate-pulse" />

            {/* Floating digital pulses along lines */}
            <circle r="1" fill="#EDE9FF">
              <animateMotion dur="2s" repeatCount="indefinite" path="M 20 55 L 60 25 L 120 40 L 170 55" />
            </circle>
            <circle r="1" fill="#EDE9FF">
              <animateMotion dur="1.5s" repeatCount="indefinite" path="M 20 55 L 60 85 L 120 70 L 170 55" />
            </circle>
          </svg>

          {/* Glowing telemetry panel */}
          <div className="absolute right-3 top-3 border border-violet-500/25 bg-[#08070F]/90 p-1.5 rounded flex flex-col gap-0.5 leading-none shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-ping" />
              <span className="text-[6px] font-mono font-bold text-violet-300 uppercase">MODEL_TRAINING</span>
            </div>
            <span className="text-[5px] text-white/40 font-mono uppercase mt-0.5">Epoch 84/100</span>
            <span className="text-[5.5px] font-bold text-emerald-400 font-mono tracking-wider">LOSS: 0.0014</span>
            <span className="text-[5.5px] font-bold text-cyan-400 font-mono tracking-wider">ACC: 99.82%</span>
          </div>

          <div className="absolute bottom-2 left-2 flex items-center gap-1.5 text-[6.5px] font-mono text-white/50 bg-neutral-950/80 px-1.5 py-0.5 rounded border border-white/5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>LEARNING NORMAL STATE...</span>
          </div>
        </div>
      )}

      {overlayType === "infer" && (
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 110">
            {/* Normal bounding box */}
            <rect
              x="25"
              y="30"
              width="45"
              height="45"
              rx="1.5"
              fill="none"
              stroke="#22c55e"
              strokeWidth="1.2"
              className="opacity-80"
            />
            {/* Normal Label */}
            <rect x="25" y="22" width="28" height="8" rx="1" fill="#22c55e" />
            <text x="27" y="28" fill="#FFFFFF" fontSize="4.5" fontFamily="monospace" fontWeight="bold">PASS_OK</text>

            {/* Anomaly bounding box */}
            <rect
              x="115"
              y="30"
              width="50"
              height="45"
              rx="1.5"
              fill="none"
              stroke="#ef4444"
              strokeWidth="1.5"
              className="animate-pulse"
            />
            <path d="M 115 35 L 115 30 L 120 30" fill="none" stroke="#ef4444" strokeWidth="1.5" />
            <path d="M 165 35 L 165 30 L 160 30" fill="none" stroke="#ef4444" strokeWidth="1.5" />
            <path d="M 115 70 L 115 75 L 120 75" fill="none" stroke="#ef4444" strokeWidth="1.5" />
            <path d="M 165 70 L 165 75 L 160 75" fill="none" stroke="#ef4444" strokeWidth="1.5" />

            {/* Defect label */}
            <rect x="115" y="21" width="54" height="9" rx="1" fill="#ef4444" />
            <text x="117" y="27" fill="#FFFFFF" fontSize="4.5" fontFamily="monospace" fontWeight="bold">DRIFT: 12.8mm</text>

            {/* Warning indicator pulsing */}
            <circle cx="140" cy="52" r="3" fill="none" stroke="#ef4444" strokeWidth="0.5" className="animate-ping" />
            <circle cx="140" cy="52" r="1" fill="#ef4444" />

            {/* Sweeping scan bar laser */}
            <line x1="5" y1="15" x2="195" y2="15" stroke="rgba(139, 92, 246, 0.55)" strokeWidth="1">
              <animate attributeName="y1" values="15;95;15" dur="3s" repeatCount="indefinite" />
              <animate attributeName="y2" values="15;95;15" dur="3s" repeatCount="indefinite" />
            </line>
          </svg>

          <div className="absolute top-2 left-2 text-[6.5px] font-mono text-red-400 bg-neutral-950/80 px-1 py-0.5 rounded border border-red-500/20 tracking-wider">
            [INFERENCE_LIVE] // DRIFT CRITICAL
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Beautiful Symmetrical Adaptive Steps Slide ──────────────────────────────
function StepsSlide() {
  const steps = stepsStatic;

  return (
    <div 
      className="w-full h-full pt-3 pb-8 px-4 md:px-5 flex flex-col justify-start select-none relative overflow-hidden bg-neutral-950/45 backdrop-blur-[4px]"
    >
      {/* Background radial accent glow */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-violet-600/[0.04] rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-blue-600/[0.04] rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 flex-1 flex flex-col gap-4 h-full pb-6 md:pb-2">
        {/* Header Block */}
        <div className="mb-2 text-left">
          <span className="mint-tagline block mb-0.5">
            Workflow
          </span>
          <h3 
            className="mint-heading mt-0"
          >
            From Video to Intelligence in Three Steps
          </h3>
          <p className="section-desc mt-1 text-xs sm:text-sm lg:text-sm leading-relaxed max-w-3xl">
            Confirm correct workflow execution and verify all assembly steps are completed in sequence with MINT's simple three-step processing pipeline.
          </p>
        </div>

        {/* 1. DESKTOP & LARGE TABLET LAYOUT (lg:grid) */}
        <div className="hidden lg:grid grid-cols-3 gap-4 w-full flex-1 min-h-0">
          {steps.map((item, index) => (
            <motion.div
              key={index}
              className="bg-[#0A0815]/40 rounded-2xl flex flex-col h-full overflow-hidden border border-white/5 shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
            >
              {/* Visual Picture Box - FLUSH */}
              <StepVisual image={item.image} overlayType={item.overlayType} title={item.title} className="flex-1 min-h-0" />

              {/* Details block - WITH padding */}
              <div className="p-4 flex flex-col justify-start text-left select-none">
                <div className="flex flex-col">
                  {/* Step number + Title */}
                  <div className="flex items-center gap-2">
                    <span className="text-[8px] font-mono font-extrabold text-violet-400 bg-violet-500/10 border border-violet-500/15 px-1.5 py-0.5 rounded shrink-0">
                      STEP {item.step}
                    </span>
                    <h4 className="text-xs md:text-sm font-bold text-white uppercase font-mono tracking-wider truncate">
                      {item.title}
                    </h4>
                  </div>

                  {/* Sub-functions in inline dot-separated style */}
                  <span className="text-[10px] font-mono font-medium tracking-wider text-cyan-400 mt-1.5">
                    {item.functions.join(' • ')}
                  </span>
                </div>

                {/* Step Description - Standard Legible Size without Clamping */}
                <p className="text-[11px] sm:text-xs leading-snug text-white/60 font-sans font-normal mt-2">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Shared image overlay card ────────────────────────────────────────────────
interface ImgCardProps {
  image: string;
  label: string;
  title: string;
  body: string;
}

function ImgCard({ image, label, title, body }: ImgCardProps) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-[1000ms] ease-out hover:scale-[1.04]" referrerPolicy="no-referrer" />
      <div 
        className="absolute inset-0" 
        style={{ 
          background: "linear-gradient(to top, rgba(8,7,15,0.95) 0%, rgba(8,7,15,0.4) 60%, transparent 100%)" 
        }} 
      />
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 z-10 text-left">
        <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-violet-400 font-semibold block">
          {label}
        </span>
        <h4 className="mt-1.5 font-sans font-bold text-xs md:text-sm text-white leading-snug">
          {title}
        </h4>
        <p className="mt-2 text-[11px] sm:text-xs leading-snug text-white/60 font-sans">
          {body}
        </p>
      </div>
    </div>
  );
}

function TableCard({ label, title, body }: { label: string; title: string; body: string }) {
  const rows = comparisonRows;

  return (
    <div className="w-full h-full p-4 md:p-5 flex flex-col justify-between select-none relative overflow-hidden bg-transparent">
      {/* Background radial accent glow */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-violet-600/[0.04] rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-blue-600/[0.04] rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 flex-1 flex flex-col justify-between min-h-full lg:h-full">
        {/* Header Block */}
        <div className="mb-2.5">
          <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-violet-400 font-semibold block">
            {label}
          </span>
          <h4 className="mt-1 font-sans font-bold text-xs md:text-sm text-white leading-snug">
            {title}
          </h4>
          <p className="mt-1.5 text-[11px] sm:text-xs text-white/60 leading-snug max-w-2xl line-clamp-2 md:line-clamp-none font-sans">
            {body}
          </p>
        </div>

        {/* Beautiful 3-Column Comparative Grid Layout */}
        <div className="flex flex-col gap-2 mt-3 mb-3 w-full max-w-4xl mx-auto">
          {/* Desktop Table Header */}
          <div className="hidden md:grid grid-cols-12 gap-3 px-1 mb-1 text-left font-mono text-[9px] uppercase tracking-wider text-neutral-400">
            <div className="col-span-3">Feature</div>
            <div className="col-span-4">Traditional Methods</div>
            <div className="col-span-5">MINT-Enabled Operations</div>
          </div>

          <div className="flex flex-col gap-1.5 w-full">
            {rows.map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-3 items-center w-full"
              >
                {/* 1. Feature Name (Left Column) */}
                <div className="col-span-1 md:col-span-3 text-left pl-1">
                  <span className="text-[10px] md:text-[11px] font-mono md:font-sans font-bold text-cyan-400 md:text-white/90 tracking-wide uppercase">
                    {row.feature}
                  </span>
                </div>

                {/* 2. Traditional Methods (Middle Column) */}
                <div className="col-span-1 md:col-span-4 flex items-center gap-2.5 bg-[rgba(10,5,20,0.88)] backdrop-blur-[36px] border border-[rgba(255,255,255,0.06)] py-1.5 px-3 rounded-md text-left transition-all duration-300 hover:scale-[1.015]">
                  <img
                    src="https://cdn.prod.website-files.com/6720dd1ab6df0da205830ab1/686cc0f520a992816d8b15dc_bullet-list-cross.svg"
                    alt="Failed cross"
                    className="shrink-0 w-3.5 h-3.5"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex flex-col min-w-0">
                    <span className="md:hidden text-[7px] font-mono text-neutral-400 uppercase tracking-wider font-semibold leading-none mb-0.5">Traditional</span>
                    <span className="text-[11px] sm:text-xs text-white/60 leading-snug truncate">
                      {row.traditional}
                    </span>
                  </div>
                </div>

                {/* 3. MINT-Enabled (Right Column) */}
                <div className="col-span-1 md:col-span-5 flex items-center gap-2.5 bg-[rgb(41,31,57)] border border-[rgba(200,111,255,0.15)] py-1.5 px-3 rounded-md text-left transition-all duration-300 hover:scale-[1.015]">
                  <img
                    src="https://cdn.prod.website-files.com/6720dd1ab6df0da205830ab1/686cc068490683bbb3377d04_bullet-list.svg"
                    alt="Succesful check"
                    className="shrink-0 w-3.5 h-3.5"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex flex-col min-w-0">
                    <span className="md:hidden text-[7px] font-mono text-violet-400 font-bold uppercase tracking-wider leading-none mb-0.5">MINT Enabled</span>
                    <span className="text-[11px] sm:text-xs text-violet-100 font-medium leading-snug truncate">
                      {row.mint}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        
      </div>
    </div>
  );
}

// ─── Slider Shell (shared wrapper) ────────────────────────────────────────────
interface SliderShellProps {
  label: string;
  slides: unknown[];
  current: number;
  next: () => void;
  prev: () => void;
  children: ReactNode;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  borderColor?: string;
  hoverBorderColor?: string;
  backgroundStyle?: CSSProperties;
  disableGlow?: boolean;
}

function SliderShell({ 
  label, 
  slides, 
  current, 
  next, 
  prev, 
  children, 
  onMouseEnter, 
  onMouseLeave,
  borderColor,
  hoverBorderColor,
  backgroundStyle,
  disableGlow
}: SliderShellProps) {
  return (
    <motion.div 
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="relative overflow-hidden rounded-[24px] group w-full h-full border" 
      style={{ 
        background: P.card, 
        borderColor: borderColor || P.border,
        ...backgroundStyle 
      }}
    >
     
      
      <div className="relative w-full h-full">{children}</div>

      {slides.length > 1 && (
        <>
          {/* Progress Indicators */}
          <div className="absolute bottom-4 right-5 z-20 flex items-center gap-2">
            {slides.map((_, i) => (
              <span 
                key={i} 
                className="rounded-full block transition-all duration-300" 
                style={{ 
                  width: i === current ? 16 : 5, 
                  height: 5, 
                  background: i === current ? P.purple : "rgba(237,233,255,0.25)" 
                }} 
              />
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
            <motion.button 
              onClick={prev} 
              aria-label="Previous" 
              whileHover={{ scale: 1.1, backgroundColor: "rgba(139, 92, 246, 0.9)" }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center w-8 h-8 rounded-full pointer-events-auto transition-colors duration-200" 
              style={{ background: "rgba(8,7,15,0.75)", color: "#fff", backdropFilter: "blur(4px)", border: "1px solid rgba(139, 92, 246, 0.2)" }}
            >
              <ChevronLeft size={16} />
            </motion.button>
            <motion.button 
              onClick={next} 
              aria-label="Next" 
              whileHover={{ scale: 1.1, backgroundColor: "rgba(139, 92, 246, 0.9)" }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center w-8 h-8 rounded-full pointer-events-auto transition-colors duration-200" 
              style={{ background: "rgba(8,7,15,0.75)", color: "#fff", backdropFilter: "blur(4px)", border: "1px solid rgba(139, 92, 246, 0.2)" }}
            >
              <ChevronRight size={16} />
            </motion.button>
          </div>
        </>
      )}
    </motion.div>
  );
}

// ─── Box 1: Process Intelligence – SLIDER ─────────────────────────────────────
function Box1() {
  const slides = [
    {
      type: "why_us",
      image: "",
      label: "Vision Models",
      title: "Choose the Right Vision Model",
      body: "MINT supports three focused model types, so users can train the system based on what they want to detect — visual anomalies, motion changes, or process sequence errors."
    },
    {
      type: "steps",
      image: "",
      label: "Workflow", 
      title: "From Video to Intelligence in Three Steps", 
      body: "Confirm correct workflow execution and verify all assembly steps are completed in sequence." 
    }
  ];
  const { current, next, prev, setIsPaused } = useSlider(slides.length, true);
  return (
    <>
      {/* 1. DESKTOP LAYOUT (lg:block) - Interactive Slider Shell */}
      <div className="hidden lg:block w-full h-full">
        <SliderShell 
          label="Process Intelligence" 
          slides={slides} 
          current={current} 
          next={next} 
          prev={prev}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          borderColor="rgba(255, 255, 255, 0.05)"
          hoverBorderColor="rgba(255, 255, 255, 0.05)"
          disableGlow={true}
          backgroundStyle={{
            backgroundImage: "linear-gradient(to bottom, rgba(8, 7, 15, 0.72), rgba(8, 7, 15, 0.88)), url('https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260418_120332_3b24257a-afe6-48ca-875f-78147370f403.png&w=1280&q=85')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current}
              initial={{ opacity: 0, filter: "blur(4px)", scale: 1.01 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              exit={{ opacity: 0, filter: "blur(4px)", scale: 0.99 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <SlideWrapper slide={slides[current]} />
            </motion.div>
          </AnimatePresence>
        </SliderShell>
      </div>

      {/* 2. MOBILE & TABLET LAYOUT (lg:hidden) - Expanded, non-button interactive, gorgeous presentation */}
      <div 
        className="block lg:hidden w-full border border-white/5 rounded-[24px] pt-4 pb-8 px-5 sm:px-7 relative overflow-hidden backdrop-blur-md"
        style={{
          backgroundImage: "linear-gradient(to bottom, rgba(8, 7, 15, 0.75), rgba(8, 7, 15, 0.92)), url('https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260418_120332_3b24257a-afe6-48ca-875f-78147370f403.png&w=1280&q=85')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute top-0 right-0 w-[50%] h-[30%] bg-violet-600/[0.04] rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[50%] h-[30%] bg-blue-600/[0.04] rounded-full blur-[80px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col gap-4">
          {/* Part A: Vision Models Section */}
          <div className="text-left">
            <span className="mint-tagline block mb-1">
              Vision Models
            </span>
            <h3 className="mint-heading mt-0.5 leading-tight">
              Choose the Right Vision Model
            </h3>
            <p className="section-desc mt-1.5 text-xs sm:text-sm leading-relaxed">
              MINT supports three focused model types, so users can train the system based on what they want to detect — visual anomalies, motion changes, or process sequence errors.
            </p>
          </div>

          {/* Three Stacked/Grid Model Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {modelsDataStatic.map((card, idx) => {
              return (
                <div 
                  key={idx}
                  className="bg-transparent rounded-2xl p-2.5 border border-white/10 flex flex-col gap-2.5 transition-all duration-300 hover:border-violet-500/35 hover:bg-white/[0.02]"
                >
                  {/* Animation Container */}
                  <div className="relative w-full h-[185px] rounded-xl overflow-hidden bg-neutral-950/95 border border-white/5 flex items-center justify-center shrink-0">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#374151_1px,transparent_1px),linear-gradient(to_bottom,#374151_1px,transparent_1px)] bg-[size:8px_8px] opacity-[0.1]" />
                    <div className="absolute top-2 left-3 right-3 flex justify-between items-center text-[7px] font-mono text-white/35 tracking-wider uppercase z-20">
                      <span>{idx === 0 ? "LIVE_ANOMALY" : idx === 1 ? "VECTOR_TRACK" : "SEQ_LOGIC"}</span>
                      <span className="text-violet-400 animate-pulse">● LIVE STREAM</span>
                    </div>
                    {renderCardAnimation(idx)}
                  </div>

                  {/* Card Details */}
                  <div className="flex flex-col justify-start flex-1 text-left px-0.5 pb-0.5">
                    <div className="flex flex-col">
                      <span className="text-xs md:text-sm font-bold text-white uppercase font-mono tracking-wider">
                        {card.title}
                      </span>
                      <span className="text-[10px] font-mono font-medium tracking-wider text-violet-400 mt-1.5">
                        {card.examples.join(' • ')}
                      </span>
                    </div>
                    
                    <p className="text-[11px] sm:text-xs leading-snug text-white/60 font-sans font-normal mt-2">
                      {card.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Symmetrical Neon Divider */}
          <div className="relative h-[1px] w-full bg-gradient-to-r from-transparent via-violet-500/25 to-transparent my-1">
            <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#090815] border border-violet-500/30 rounded-full px-3 py-0.5 text-[8px] font-mono text-violet-400 uppercase tracking-widest whitespace-nowrap">
              SYSTEM PIPELINE
            </div>
          </div>

          {/* Part B: Workflow */}
          <div className="text-left mt-2">
            <span className="mint-tagline block mb-1">
              Workflow
            </span>
            <h3 className="mint-heading mt-0.5 leading-tight">
              From Video to Intelligence in Three Steps
            </h3>
            <p className="section-desc mt-1.5 text-xs sm:text-sm leading-relaxed">
              Confirm correct workflow execution and verify all assembly steps are completed in sequence with MINT's simple three-step processing pipeline.
            </p>

            {/* Symmetrical mobile-friendly 3 steps list */}
            <div className="mt-4 flex flex-col gap-3">
              {stepsStatic.map((item, idx) => (
                <div key={idx} className="bg-black/20 rounded-2xl border border-white/5 p-4 flex flex-col gap-3 text-left group">
                  {/* Visual Picture Box */}
                  <StepVisual image={item.image} overlayType={item.overlayType} title={item.title} />

                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-[7.5px] font-mono font-extrabold text-violet-400 bg-violet-500/10 border border-violet-500/15 px-1.5 py-0.5 rounded shrink-0">
                          STEP {item.step}
                        </span>
                        <span className="font-mono text-xs md:text-sm font-bold text-white uppercase tracking-wider">
                          {item.title}
                        </span>
                      </div>
                      
                      {/* Sub-functions in inline dot-separated style */}
                      <span className="text-[10px] font-mono font-medium tracking-wider text-cyan-400 mt-1.5">
                        {item.functions.join(' • ')}
                      </span>
                    </div>

                    {/* Standard paragraph size with full visibility */}
                    <p className="text-[11px] sm:text-xs leading-snug text-white/60 font-sans font-normal mt-2">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Box 2: Performance Stats – STATIC ────────────────────────────────────────
function Box2() {
  const stats = [
    { value: "48h", label: "Sealing drift detected ahead of line failure" },
    { value: "100%", label: "Continuous video audit log coverage" },
    { value: "<1ms", label: "Anomaly inference and action latency" },
  ];
  return (
    <motion.div 
      className="w-full h-full rounded-[24px] overflow-hidden flex flex-col p-5 justify-between border" 
      style={{ background: P.cardMid, borderColor: P.border }}
    >
      <span className="mint-tagline block">
        Performance
      </span>
      <div className="flex flex-col gap-4 flex-1 justify-center my-3">
        {stats.map((s) => (
          <motion.div 
            key={s.value} 
            whileHover={{ x: 4 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="flex items-center gap-3 group cursor-default"
          >
            <span 
              className="font-serif font-black leading-none shrink-0 transition-colors duration-300 group-hover:text-violet-400 text-violet-500 text-xl md:text-2xl" 
            >
              {s.value}
            </span>
            <span className="text-[11px] sm:text-xs leading-snug" style={{ color: P.muted }}>
              {s.label}
            </span>
          </motion.div>
        ))}
      </div>
      <div className="h-px w-full my-1" style={{ background: P.border }} />
      <p className="text-[10px] leading-relaxed" style={{ color: P.muted }}>
        Validated across live deployments in extreme-speed aseptic filling lines.
      </p>
    </motion.div>
  );
}

// ─── Box 3: Pre-Defect Detection – STATIC ─────────────────────────────────────
function Box3() {
  const pillars = [
    {
      label: 'MINT Engine',
      items: ['Surface Anomalies', 'Process Drift', 'Sequence Errors', 'Line Integrity'],
    }
  ];

  const gradientLineStyle = {
    background: 'linear-gradient(to bottom, rgba(139, 92, 246, 0.6) 0%, rgba(139, 92, 246, 0) 100%)',
  };

  return (
    <motion.div 
      className="w-full h-full rounded-[24px] overflow-hidden relative group border flex flex-col justify-start p-5 select-none" 
      style={{ background: "radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.08), transparent 60%), #07060d", borderColor: P.border }}
    >
      {/* Background Image requested by user */}
      <img 
        src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260418_125638_553b96dc-a1fd-4b2b-81a9-ed7daa80006e.png&w=1280&q=85" 
        alt="Pre-defect detection system simulation background" 
        className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:opacity-40 transition-all duration-[800ms] ease-out group-hover:scale-105 pointer-events-none z-0" 
        referrerPolicy="no-referrer"
      />

      {/* Grid background for technical feel */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#374151_1px,transparent_1px),linear-gradient(to_bottom,#374151_1px,transparent_1px)] bg-[size:16px_16px] opacity-[0.05] pointer-events-none z-0" />

      {/* Title & Description Header */}
      <div className="relative z-10 flex flex-col text-left mb-1">
        <span className="mint-tagline block">
          Pre-Defect Detection
        </span>
        <p className="text-[10px] leading-normal text-white/50 mt-1">
          MINT analyzes high-speed visual data to detect micro-deviations and process drift, preventing failures before they physically manifest.
        </p>
      </div>

      {/* Beautiful Symmetrical Pillar Connection Section - Display at bottom always using mt-auto */}
      <div className="relative z-10 w-full flex justify-center mt-auto pb-1">
        <div className="relative w-full h-[135px] flex justify-center">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center group/pillar transition-all duration-300 hover:-translate-y-0.5"
              style={{
                top: '0px',
              }}
            >
              {/* Chip on top */}
              <div
                className="flex items-center gap-1.5 rounded-[20px] font-medium border border-white/10 shadow-md text-gray-800 backdrop-blur-md transition-all duration-300 group-hover/pillar:border-white/20 group-hover/pillar:shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0.75) 100%)',
                  fontSize: '11px',
                  padding: '4px 10px',
                }}
              >
                <img
                  src="https://cdn.prod.website-files.com/6720dd1ab6df0da205830ab1/6870f623cf3df417ce45df05_icon%20logo%20eternacloud.png"
                  alt="NexaCore logo spark icon"
                  className="shrink-0 w-3.5 h-3.5"
                  referrerPolicy="no-referrer"
                />
                <span className="font-semibold tracking-wide text-[10px] uppercase font-mono">{pillar.label}</span>
              </div>

              {/* Vertical line connecting down */}
              <div
                className="relative w-[1px] transition-all duration-500 opacity-80 group-hover/pillar:opacity-100"
                style={{
                  height: '95px',
                  marginTop: '4px',
                  ...gradientLineStyle,
                }}
              >
                {/* Items Panel absolute slightly shift right of line */}
                <div
                  className="absolute flex flex-col gap-1 z-10 text-left items-start"
                  style={{
                    top: '12px',
                    left: '12px',
                  }}
                >
                  {pillar.items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className="bg-white/80 backdrop-blur-sm shadow-md border border-white/10 rounded-lg text-[9px] font-medium hover:bg-white hover:shadow-lg hover:scale-105 transition-all cursor-default whitespace-nowrap"
                      style={{
                        color: 'rgb(26, 11, 84)',
                        padding: '3px 7px',
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Box 4: Pharma & Food – SLIDER ────────────────────────────────────────────
function Box4() {
  const slides = [
    { 
      image: "https://images.unsplash.com/photo-1563213126-a4273aed2016?w=600&h=500&fit=crop&auto=format", 
      label: "Pharma & Food", 
      title: "Smart Line Clearance", 
      body: "Verify production lines are clean, clear, and ready for the next run with automated sweeps." 
    },
    { 
      image: "https://images.unsplash.com/photo-1579165466949-3180a3d056d5?w=600&h=500&fit=crop&auto=format", 
      label: "Sequence Verification", 
      title: "Total execution proof on critical line steps", 
      body: "Validates setup, assembly, and sanitization steps for compliant, high-regulatory workflows." 
    },
    { 
      image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&h=500&fit=crop&auto=format", 
      label: "Regulatory Safety", 
      title: "Zero-tolerance monitoring", 
      body: "Validates cap hermetic integrity, fill volumes, and printing alignment in real-time." 
    },
  ];
  const { current, next, prev, setIsPaused } = useSlider(slides.length);
  return (
    <SliderShell 
      label="Pharma & Food" 
      slides={slides} 
      current={current} 
      next={next} 
      prev={prev}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0, filter: "blur(4px)", scale: 1.01 }}
          animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          exit={{ opacity: 0, filter: "blur(4px)", scale: 0.99 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <StableImgCard slide={slides[current]} />
        </motion.div>
      </AnimatePresence>
    </SliderShell>
  );
}

// ─── Box 5: Where Mint Helps Showcase ──────────────────────────────────────────
function Box5Left() {
  const columns = [
    {
      industry: "High-Speed Manufacturing",
      title: "Process Drift Monitoring",
      icon: <Zap size={16} />,
      desc: "Detect process deviations, sealing changes, and mechanical drift before they cause major failures."
    },
    {
      industry: "Pharma & Food",
      title: "Smart Line Clearance",
      icon: <Shield size={16} />,
      desc: "Verify production lines are clean, clear, and ready for the next run with automated sweeps."
    },
    {
      industry: "Life Sciences",
      title: "Live Bioprocess Monitoring",
      icon: <Activity size={16} />,
      desc: "Track cell growth and early batch deviations in real time without contacting sensitive environments."
    },
    {
      industry: "Aerospace & Electronics",
      title: "Precision Assembly Verification",
      icon: <Eye size={16} />,
      desc: "Confirm correct workflow execution and verify all assembly steps are completed in sequence."
    }
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % columns.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const col = columns[index];

  return (
    <motion.div 
      className="w-full h-full rounded-[24px] overflow-hidden relative border p-5 md:p-6 flex flex-col justify-between select-none text-left" 
      style={{ background: "#100E1F", borderColor: P.border }}
    >
      {/* Subtle ambient blur */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-violet-600/5 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col">
        <span className="mint-tagline block mb-1">
          Where Mint Helps
        </span>
        <h3 className="mint-heading mt-0.5 leading-tight">
          Industrial Vision Intelligence
        </h3>
      </div>

      {/* Slide / Content with AnimatePresence */}
      <div className="my-2 flex-1 flex flex-col justify-center min-h-[90px] relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-2"
          >
            {/* Industry tag */}
            <div className="flex items-center gap-1.5">
              {/* <span className="p-1 rounded bg-violet-500/10 border border-violet-500/20 text-violet-400 shrink-0">
                {col.icon}
              </span> */}
              <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-violet-400 font-semibold truncate">
                {col.industry}
              </span>
            </div>

            {/* Title */}
            <h4 className="font-sans font-bold text-xs md:text-sm text-white leading-snug mt-1">
              {col.title}
            </h4>

            {/* Description */}
            <p className="text-[11px] sm:text-xs leading-snug text-white/60 font-sans mt-2">
              {col.desc}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Custom indicators */}
      <div className="relative z-10 flex gap-1 justify-start">
        {columns.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === index ? "w-4 bg-violet-500" : "w-1.5 bg-white/10 hover:bg-white/30"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}

function Box5Right() {
  const rows = comparisonRows;

  return (
    <motion.div
      className="w-full h-full rounded-[24px] overflow-hidden relative border p-4 md:p-5 flex flex-col justify-between select-none text-left"
      style={{
        background: "linear-gradient(to bottom, rgba(16, 14, 31, 0.52) 0%, rgba(16, 14, 31, 0.78) 42%, rgba(16, 14, 31, 0.92) 100%)",
        borderColor: "rgba(255, 255, 255, 0.05)"
      }}
    >
      {/* Background Video requested by user */}
      <video
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260306_074215_04640ca7-042c-45d6-bb56-58b1e8a42489.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none z-0"
      />

      {/* Grid background for technical feel */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#374151_1px,transparent_1px),linear-gradient(to_bottom,#374151_1px,transparent_1px)] bg-[size:16px_16px] opacity-[0.03] pointer-events-none z-0" />

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main card Header */}
      <div className="relative z-10 flex justify-between items-center w-full pb-1.5 mb-1.5 shrink-0">
        <div>
          <span className="mint-tagline block">
            Impact & ROI
          </span>
          <h4 className="mint-heading mt-0.5 leading-tight">
            The Intelligence Advantage
          </h4>
        </div>
      
      </div>

      {/* Beautiful 3-Column Comparative Grid Layout */}
      <div className="relative z-10 flex flex-col gap-1.5 mt-0 mb-0 w-full flex-1 min-h-0 justify-center">
        {/* Desktop Table Header */}
        <div className="hidden sm:grid grid-cols-12 gap-2.5 mb-1.5 text-left font-mono text-[8px] uppercase tracking-wider leading-none text-neutral-400">
          <div className="col-span-4 lg:col-span-3">Feature</div>
          <div className="hidden xl:block xl:col-span-4">Traditional Methods</div>
          <div className="col-span-8 lg:col-span-9 xl:col-span-5">MINT-Enabled Operations</div>
        </div>

        <div className="flex flex-col gap-1.5 w-full">
          {rows.map((row, idx) => (
            <div
              key={idx}
              className="grid grid-cols-12 gap-1.5 md:gap-2.5 items-stretch w-full"
            >
              {/* 1. Feature Name (Left Column) */}
              <div className="col-span-4 lg:col-span-3 flex items-center min-h-[30px] text-left">
                <span className="text-[10px] md:text-[11px] font-sans font-bold text-white/90 tracking-wide uppercase truncate block">
                  {row.feature}
                </span>
              </div>

              {/* 2. Traditional Methods (Middle Column - Hidden below xl) */}
              <div className="hidden xl:flex xl:col-span-4 min-h-[30px] items-center gap-2 bg-[rgba(10,5,20,0.88)] backdrop-blur-[36px] border border-[rgba(255,255,255,0.06)] py-1.5 px-3 rounded-md text-left transition-all duration-300 hover:scale-[1.015] min-w-0">
                <img
                  src="https://cdn.prod.website-files.com/6720dd1ab6df0da205830ab1/686cc0f520a992816d8b15dc_bullet-list-cross.svg"
                  alt="Failed cross"
                  className="shrink-0 w-3 h-3"
                  referrerPolicy="no-referrer"
                />
                <div className="flex flex-col min-w-0">
                  <span className="text-[11px] sm:text-xs text-white/60 leading-snug truncate">
                    {row.traditional}
                  </span>
                </div>
              </div>

              {/* 3. MINT-Enabled (Right Column) */}
              <div className="col-span-8 lg:col-span-9 xl:col-span-5 min-h-[30px] flex items-center gap-2 bg-[rgb(41,31,57)] border border-[rgba(200,111,255,0.15)] py-1.5 px-3 rounded-md text-left transition-all duration-300 hover:scale-[1.015] min-w-0">
                <img
                  src="https://cdn.prod.website-files.com/6720dd1ab6df0da205830ab1/686cc068490683bbb3377d04_bullet-list.svg"
                  alt="Succesful check"
                  className="shrink-0 w-3 h-3"
                  referrerPolicy="no-referrer"
                />
                <div className="flex flex-col min-w-0">
                  <span className="text-[11px] sm:text-xs text-violet-100 font-medium leading-snug truncate">
                    {row.mint}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Box 6: Aerospace – SLIDER ────────────────────────────────────────────────
function Box6() {
  const slides = [
    { 
      image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=600&h=500&fit=crop&auto=format", 
      label: "Aerospace & Electronics", 
      title: "Precision Assembly Verification", 
      body: "Confirm correct workflow execution and verify all assembly steps are completed in sequence." 
    },
    { 
      image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=600&h=500&fit=crop&auto=format", 
      label: "Digital Thread", 
      title: "Immutable spatial record thread", 
      body: "Maps component lifecycle coordinates across multiple production and testing cells." 
    },
  ];
  const { current, next, prev, setIsPaused } = useSlider(slides.length);
  return (
    <SliderShell 
      label="Aerospace & Electronics" 
      slides={slides} 
      current={current} 
      next={next} 
      prev={prev}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0, filter: "blur(4px)", scale: 1.01 }}
          animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          exit={{ opacity: 0, filter: "blur(4px)", scale: 0.99 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <StableImgCard slide={slides[current]} />
        </motion.div>
      </AnimatePresence>
    </SliderShell>
  );
}

// ─── Master Responsive Bento Grid ───────────────────────────────────────────────
export default function BentoGrid() {
  return (
    <section id="platform" className="px-5 lg:px-8 max-w-7xl mx-auto pt-6 md:pt-8 pb-8 scroll-mt-20">
 {/*<div className="mb-6 flex flex-col items-start gap-2 max-w-3xl text-left border-b border-white/5 pb-4">
        <span className="mint-tagline block">
          The Industrial "Master Brain"
        </span>
        <h2 
          className="section-title mt-0.5 leading-tight" 
          style={{ fontSize: "clamp(1.5rem, 3vw, 2.1rem)" }}
        >
          Multimodal Intelligence &{" "}
          <span className="title-highlight">Networked Tracking</span>
        </h2>
        <p className="section-desc mt-1.5 text-xs sm:text-sm md:text-[13px] leading-relaxed">
          Modern high-speed automation is fast, yet traditional visual inspection remains reactive and manual. MINT eliminates this critical gap, shifting manufacturing to proactive, continuous process assurance.
        </p>
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 max-w-7xl mx-auto w-full">
        {/* Box 1: Process Intelligence (Slider) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="col-span-1 md:col-span-2 lg:col-span-3 lg:row-span-2 h-auto lg:h-[512px]"
        >
          <Box1 />
        </motion.div>
        
        {/* Box 3: Pre-Defect Detection (Static) - Col 4, Row 1 */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="col-span-1 md:col-span-1 lg:col-span-1 lg:row-span-1 h-[240px] lg:h-[240px]"
        >
          <Box3 />
        </motion.div>
        
        {/* Box 6: Performance Stats (Static) - Col 4, Row 2 */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="col-span-1 md:col-span-1 lg:col-span-1 lg:row-span-1 h-[240px] lg:h-[240px]"
        >
          <Box2 />
        </motion.div>
        
        {/* Box 5 Left & Right Symmetrical Row with custom desktop width weights */}
        <div className="col-span-1 md:col-span-2 lg:col-span-4 grid grid-cols-1 lg:flex lg:flex-row gap-3">
          {/* Box 5 Left: Where Mint Helps Showcase (Square) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="w-full lg:w-[29%] shrink-0 h-[240px]"
          >
            <Box5Left />
          </motion.div>

          {/* Box 5 Right: Comparative Analysis (Rectangle) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full lg:flex-1 h-auto lg:h-[240px]"
          >
            <Box5Right />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
