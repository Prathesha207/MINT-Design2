import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { User } from "../types";

interface LayoutProps {
  children: React.ReactNode;
  user: User;
  onToggleUser: () => void;
}

export default function Layout({ children, user, onToggleUser }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#08070F] text-[#EDE9FF] font-sans relative flex flex-col overflow-hidden">
      {/* Background ambient light effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-radial from-[#8B5CF6]/10 to-transparent blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[60%] bg-radial from-[#4A8FFF]/5 to-transparent blur-[150px] pointer-events-none z-0" />
      <div className="absolute top-[40%] left-[30%] w-[350px] h-[350px] bg-radial from-[#8B5CF6]/5 to-transparent blur-[100px] pointer-events-none z-0" />

      {/* Grid Pattern Background - Starts below the Hero section (top-[240px]) so there are no grid square lines in Header & Hero */}
      <div 
        className="absolute top-[240px] bottom-0 left-0 right-0 bg-[linear-gradient(to_right,rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" 
      />

      <Header user={user} onToggleUser={onToggleUser} />
      
      <main className="flex-1 relative z-10">
        {children}
      </main>
      
      <Footer />
    </div>
  );
}
