import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, ChevronDown, LogIn, LogOut, User as UserIcon } from "lucide-react";
import { User } from "../types";
import { motion, AnimatePresence } from "motion/react";

const P = {
  purple: "#8B5CF6",
  purpleDim: "rgba(139, 92, 246, 0.18)",
  card: "#100E1F",
  border: "rgba(139, 92, 246, 0.12)",
  fg: "#EDE9FF",
  muted: "#7A6F9A",
};

const navLinks = ["Platform", "Applications", "Science", "ROI", "Contact"];

interface HeaderProps {
  user: User;
  onToggleUser: () => void;
}

export default function Header({ user, onToggleUser }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(8,7,15,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? `1px solid ${P.border}` : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center group">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2"
          >
            <img
              src="/icon-192.png"
              alt="MINT logo"
              className="h-6 w-6 object-contain drop-shadow-[0_0_8px_rgba(187,165,244,0.4)]"
            />
            <span className="text-sm font-bold tracking-[0.15em] text-white/95 uppercase font-sans">
              MINT<span className="text-[10px] align-super font-normal text-white/60">&reg;</span>
            </span>
          </motion.div>

          {/* Divider */}
          <div className="h-5 w-px bg-white/15 mx-3 hidden sm:block"></div>

          {/* EMAGE GROUP and Slogan */}
          <div className="hidden sm:flex flex-col text-left leading-none">
            <span className="text-[9px] font-black tracking-[0.12em] text-white/90 uppercase font-sans">
              EMAGE GROUP
            </span>
            <span className="text-[6.5px] font-mono tracking-[0.16em] text-white/40 mt-1 uppercase">
              IGNITE. INNOVATE. INSPIRE.
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        {/* Removed all nav links per request */}

        {/* User State & Action Buttons */}
        <div className="flex items-center gap-3 relative">
          {/* Sign In / Sign Out Button */}
          <motion.button
            onClick={onToggleUser}
            whileHover={{ 
              scale: 1.03,
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              borderColor: "rgba(255, 255, 255, 0.25)",
              boxShadow: "0 0 15px rgba(255, 255, 255, 0.05)"
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest bg-white/5 text-white/90 border border-white/10 backdrop-blur-md transition-colors"
          >
            {user.isLoggedIn ? "Sign Out" : "Sign In"}
          </motion.button>

          <motion.a
            href="#contact"
            whileHover={{ 
              scale: 1.03, 
              boxShadow: "0 0 20px rgba(95, 51, 214, 0.4)" 
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="hidden md:inline-flex items-center gap-1.5 px-4.5 py-1.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest text-white shadow-lg shadow-[#5F33D6]/20 transition-all"
            style={{
              background: "linear-gradient(135deg, #BBA5F4 0%, #5F33D6 100%)"
            }}
          >
            Get Started <ArrowUpRight size={11} className="text-white" />
          </motion.a>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-1 rounded-lg transition-colors"
            style={{ color: P.fg }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: mobileOpen ? "120px" : "0",
          background: "rgba(8,7,15,0.97)",
          borderBottom: mobileOpen ? `1px solid ${P.border}` : "none",
        }}
      >
        <div className="px-5 py-4 flex flex-col gap-4">
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                onToggleUser();
                setMobileOpen(false);
              }}
              className="text-xs font-mono uppercase tracking-widest flex items-center gap-1.5 text-white/80 hover:text-white"
            >
              {user.isLoggedIn ? <LogOut size={13} /> : <LogIn size={13} />}
              {user.isLoggedIn ? "Switch to Guest" : "Sign In"}
            </button>
            <a
              href="#contact"
              className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest text-white shadow-md"
              style={{
                background: "linear-gradient(135deg, #BBA5F4 0%, #5F33D6 100%)"
              }}
              onClick={() => setMobileOpen(false)}
            >
              Get Started <ArrowUpRight size={11} className="text-white" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
