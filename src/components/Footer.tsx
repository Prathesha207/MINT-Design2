import { Mail, Phone, MapPin } from "lucide-react";
import Ticker from "./Ticker";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full relative border-t border-white/[0.03] overflow-hidden" style={{ background: "#08070F" }}>
      {/* Background radial glow */}
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-600/[0.015] rounded-full blur-3xl pointer-events-none z-0" />

      {/* Footer Header Marquee */}
      <Ticker />

      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Brand & Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2 select-none">
              <img
                src="/icon-192.png"
                alt="MINT logo"
                className="h-7 w-7 object-contain drop-shadow-[0_0_8px_rgba(187,165,244,0.35)]"
              />
              <span className="text-xs font-bold tracking-[0.15em] text-white/90 uppercase font-sans">
                MINT<span className="text-[9px] align-super font-normal text-white/50">®</span>
              </span>
            </div>

            <div className="hidden sm:block h-3.5 w-px bg-white/10" />

            <span className="text-[10px] md:text-[11px] font-sans text-white/30 tracking-wide">
              © {currentYear} Emage Group. All rights reserved.
            </span>
          </div>

          {/* Simple Contact Link Row */}
          <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-2 text-[10px] md:text-xs text-white/35 font-mono">
            <a href="mailto:info@emagegroup.com" className="hover:text-violet-400 transition-all duration-200 flex items-center gap-1.5">
              <Mail size={11} className="text-violet-400 opacity-60" /> info@emagegroup.com
            </a>
            <a href="tel:+6568460226" className="hover:text-violet-400 transition-all duration-200 flex items-center gap-1.5">
              <Phone size={11} className="text-violet-400 opacity-60" /> +65 6846 0226
            </a>
            <span className="flex items-center gap-1.5 text-white/20 font-sans">
              <MapPin size={11} className="text-violet-400 opacity-40" /> SG HQ
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

