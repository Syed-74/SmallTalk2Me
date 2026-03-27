import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, History, Settings as SettingsIcon, Bell, Search, User, Briefcase } from 'lucide-react';

// Pages
import Dashboard from './pages/Dashboard';
import HistoryPage from './pages/History';
import Settings from './pages/Settings';
import ResumeHub from './pages/ResumeHub';
import CompanyPatterns from './pages/CompanyPatterns';
import OverlayUI from './components/OverlayUI';

const SidebarItem = ({ icon: Icon, label, to, active }) => (
  <Link 
    to={to}
    className={`flex items-center gap-4 px-6 py-4 rounded-2xl mb-2 transition-all group relative ${
      active 
      ? 'bg-blue-600/10 text-white border border-blue-600/20' 
      : 'text-neutral-500 hover:text-neutral-300'
    }`}
  >
    {active && (
      <motion.div 
        layoutId="active-nav"
        className="absolute left-0 w-1 h-6 bg-blue-600 rounded-r-full"
      />
    )}
    <Icon size={20} className={`transition-transform group-hover:scale-110 ${active ? 'text-blue-500' : ''}`} />
    <span className="font-bold text-sm tracking-tight">{label}</span>
  </Link>
);

export default function App() {
  const location = useLocation();
  const isOverlay = location.pathname === '/overlay';

  if (isOverlay) {
    return (
      <Routes>
        <Route path="/overlay" element={<OverlayUI />} />
      </Routes>
    );
  }

  return (
    <div className="flex h-screen bg-black text-white font-sans selection:bg-blue-500/30">
      {/* Premium Sidebar */}
      <aside className="w-72 border-r border-neutral-900 flex flex-col p-6 bg-neutral-950/50 backdrop-blur-xl">
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <span className="font-black text-xl italic italic">S</span>
          </div>
          <div>
            <h1 className="font-black text-lg tracking-tighter italic">SmallTalk2Me</h1>
            <p className="text-[10px] text-blue-500 font-bold uppercase tracking-[0.2em] leading-none">AI Assistant</p>
          </div>
        </div>

        <nav className="flex-1">
          <div className="mb-8">
            <h3 className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.3em] mb-4 px-6">Navigation</h3>
            <SidebarItem icon={LayoutGrid} label="Dashboard" to="/" active={location.pathname === '/'} />
            <SidebarItem icon={History} label="History" to="/history" active={location.pathname === '/history'} />
            <SidebarItem icon={SettingsIcon} label="Settings" to="/settings" active={location.pathname === '/settings'} />
          </div>

          <div>
            <h3 className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.3em] mb-4 px-6">Intelligence</h3>
            <SidebarItem icon={User} label="Resume Hub" to="/resume" />
            <SidebarItem icon={Briefcase} label="Company Patterns" to="/companies" />
          </div>
        </nav>

        <div className="mt-auto p-4 bg-neutral-900/50 border border-neutral-800 rounded-3xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-neutral-800 to-neutral-700 border border-white/5" />
          <div className="flex-1 overflow-hidden">
            <p className="text-xs font-bold text-white truncate">Alex Johnson</p>
            <p className="text-[10px] text-neutral-500 font-medium">Pro Plan</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-neutral-950/30 custom-scrollbar">
        {/* Top bar */}
        <div className="h-20 border-b border-neutral-900 flex items-center justify-between px-10 sticky top-0 bg-black/50 backdrop-blur-2xl z-40">
          <div className="flex-1 flex items-center">
            <div className="relative w-96 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within:text-blue-500 transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="Search resources, questions..."
                className="w-full bg-neutral-900/50 border border-neutral-800 rounded-xl py-2 pl-12 pr-6 text-sm text-neutral-300 focus:border-blue-500/50 outline-none transition-all"
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button className="relative p-2 text-neutral-500 hover:text-white transition-colors">
              <Bell size={20} />
              <div className="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full border-2 border-black" />
            </button>
            <div className="h-8 w-[1px] bg-neutral-900" />
            <button className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20">
              Go Premium
            </button>
          </div>
        </div>

        {/* Dynamic Content */}
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/resume" element={<ResumeHub />} />
            <Route path="/companies" element={<CompanyPatterns />} />
          </Routes>
        </AnimatePresence>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.1); }
      `}} />
    </div>
  );
}
