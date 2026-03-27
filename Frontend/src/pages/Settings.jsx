import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Shield, Eye, Volume2, Save, ArrowLeft, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';

const SettingCard = ({ title, children }) => (
  <div className="bg-neutral-900/30 border border-neutral-800 rounded-[2rem] p-8 mb-6 relative overflow-hidden group hover:border-neutral-700 transition-all">
    <h3 className="text-xs font-black uppercase tracking-[0.25em] text-neutral-600 mb-6">{title}</h3>
    {children}
  </div>
);

const Toggle = ({ active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-14 h-7 rounded-full transition-all relative p-1 ${active ? 'bg-blue-600' : 'bg-neutral-800'}`}
  >
    <motion.div
        animate={{ x: active ? 28 : 0 }}
        className="w-5 h-5 bg-white rounded-full shadow-lg"
    />
  </button>
);

export default function Settings() {
  const [aiProvider, setAiProvider] = useState('chatgpt');
  const [voiceMode, setVoiceMode] = useState(false);
  const [overlayActive, setOverlayActive] = useState(true);
  const [responseDepth, setResponseDepth] = useState('balanced');

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="p-10 max-w-4xl mx-auto w-full"
    >
      <header className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-6">
          <Link to="/" className="w-12 h-12 bg-neutral-900 rounded-2xl flex items-center justify-center text-neutral-500 hover:text-white transition-all">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-4xl font-bold text-white tracking-tight">App Settings</h1>
        </div>
        <button className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20">
          <Save size={18} />
          Save Changes
        </button>
      </header>

      <SettingCard title="AI Intelligence Engine">
        <div className="grid grid-cols-2 gap-4">
          <div 
            onClick={() => setAiProvider('chatgpt')}
            className={`p-6 rounded-2xl border cursor-pointer transition-all ${aiProvider === 'chatgpt' ? 'bg-blue-600/10 border-blue-500/50' : 'bg-neutral-900 border-neutral-800'}`}
          >
            <div className="flex items-center justify-between mb-4">
              <Sparkles className={aiProvider === 'chatgpt' ? 'text-blue-400' : 'text-neutral-600'} size={24} />
              <div className={`w-2 h-2 rounded-full ${aiProvider === 'chatgpt' ? 'bg-blue-500' : 'bg-neutral-800'}`} />
            </div>
            <h4 className="font-bold text-white">OpenAI GPT-4o</h4>
            <p className="text-[10px] text-neutral-500 mt-1 uppercase font-black tracking-widest">Industry Standard</p>
          </div>
          <div 
            onClick={() => setAiProvider('gemini')}
            className={`p-6 rounded-2xl border cursor-pointer transition-all ${aiProvider === 'gemini' ? 'bg-purple-600/10 border-purple-500/50' : 'bg-neutral-900 border-neutral-800'}`}
          >
            <div className="flex items-center justify-between mb-4">
              <Zap className={aiProvider === 'gemini' ? 'text-purple-400' : 'text-neutral-600'} size={24} />
              <div className={`w-2 h-2 rounded-full ${aiProvider === 'gemini' ? 'bg-purple-500' : 'bg-neutral-800'}`} />
            </div>
            <h4 className="font-bold text-white">Google Gemini 1.5</h4>
            <p className="text-[10px] text-neutral-500 mt-1 uppercase font-black tracking-widest">High Speed</p>
          </div>
        </div>
      </SettingCard>

      <SettingCard title="Interactive Modes">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-neutral-900 rounded-xl flex items-center justify-center text-neutral-500"><Eye size={18} /></div>
              <div>
                <h4 className="font-bold text-white text-sm">Floating Overlay</h4>
                <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Visible during interviews</p>
              </div>
            </div>
            <Toggle active={overlayActive} onClick={() => setOverlayActive(!overlayActive)} />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-neutral-900 rounded-xl flex items-center justify-center text-neutral-500"><Volume2 size={18} /></div>
              <div>
                <h4 className="font-bold text-white text-sm">Voice Feedback</h4>
                <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Read answers aloud</p>
              </div>
            </div>
            <Toggle active={voiceMode} onClick={() => setVoiceMode(!voiceMode)} />
          </div>
        </div>
      </SettingCard>

      <SettingCard title="Response Depth">
        <div className="flex p-1.5 bg-neutral-900 rounded-[1.5rem] border border-neutral-800">
          {['concise', 'balanced', 'detailed'].map(mode => (
            <button
              key={mode}
              onClick={() => setResponseDepth(mode)}
              className={`flex-1 py-3 rounded-xl capitalize font-bold text-xs tracking-tight transition-all ${responseDepth === mode ? 'bg-white text-black shadow-lg' : 'text-neutral-500 hover:text-white'}`}
            >
              {mode}
            </button>
          ))}
        </div>
      </SettingCard>

      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[2rem] p-8 text-white flex items-center justify-between shadow-2xl shadow-blue-600/20">
        <div>
          <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
            <Crown size={20} />
            Unlock Pro Intelligence
          </h3>
          <p className="text-sm text-white/70">Get better answers with Resume & Company Context.</p>
        </div>
        <button className="px-8 py-3 bg-white text-blue-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform">
          Upgrade
        </button>
      </div>
    </motion.div>
  );
}
