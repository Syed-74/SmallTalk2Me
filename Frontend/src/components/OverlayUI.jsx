import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Settings, Minimize2, Maximize2, Zap } from 'lucide-react';
import { audioService } from '../services/audioService';

const socket = io('http://localhost:5000');

export default function OverlayUI() {
  const [answer, setAnswer] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [responseMode, setResponseMode] = useState('short');
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    socket.on('ai_thinking', () => setIsThinking(true));
    socket.on('ai_answer', (data) => {
      setIsThinking(false);
      setAnswer(data.answerText);
    });

    return () => {
      socket.off('ai_thinking');
      socket.off('ai_answer');
    };
  }, []);

  const toggleMode = (mode) => {
    setResponseMode(mode);
    audioService.setResponseMode(mode);
  };

  // Helper to highlight keywords in the answer
  const formatAnswer = (text) => {
    if (!text) return null;
    const keywords = ['virtuialization', 'memoize', 'useLayoutEffect', 'synchronously', 'asynchronously', 'asynchronous', 'synchronous', 'performance', 'optimize'];
    let formattedText = text;
    keywords.forEach(word => {
      const reg = new RegExp(`\\b${word}\\b`, 'gi');
      formattedText = formattedText.replace(reg, `<span class="text-blue-400 font-bold">${word}</span>`);
    });
    return <div dangerouslySetInnerHTML={{ __html: formattedText }} />;
  };

  return (
    <div className="h-screen w-screen flex flex-col p-4 bg-transparent font-sans overflow-hidden select-none">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          height: isMinimized ? '80px' : 'auto'
        }}
        className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-5 text-white/90 shadow-[0_30px_60px_rgba(0,0,0,0.6)] flex flex-col relative group transition-all duration-500"
      >
        {/* Subtle Ambient Glow */}
        <div className={`absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-[2rem] transition-opacity duration-1000 ${isThinking ? 'opacity-100' : 'opacity-0'}`} />

        <div className="flex items-center justify-between mb-4 z-10 relative">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className={`w-2 h-2 rounded-full ${isThinking ? 'bg-amber-400' : 'bg-green-500'}`} />
              {isThinking && <div className="absolute inset-0 w-2 h-2 rounded-full bg-amber-400 animate-ping" />}
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/30">
              {isThinking ? 'Thinking' : 'Invisible Assistant'}
            </span>
          </div>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={() => setIsMinimized(!isMinimized)} className="p-1.5 hover:bg-white/10 rounded-lg text-white/40 hover:text-white transition-all">
              {isMinimized ? <Maximize2 size={12} /> : <Minimize2 size={12} />}
            </button>
            <button className="p-1.5 hover:bg-white/10 rounded-lg text-white/40 hover:text-white transition-all">
              <Settings size={12} />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 z-10 relative mt-2">
            <AnimatePresence mode="wait">
              {isThinking ? (
                <motion.div 
                  key="thinking"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3 py-2"
                >
                  <div className="h-2.5 bg-white/5 rounded-full w-full animate-pulse" />
                  <div className="h-2.5 bg-white/5 rounded-full w-[85%] animate-pulse" />
                  <div className="h-2.5 bg-white/5 rounded-full w-[60%] animate-pulse" />
                </motion.div>
              ) : answer ? (
                <motion.div
                  key="answer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[13px] leading-[1.7] text-white/80 font-medium pb-2"
                >
                  {formatAnswer(answer)}
                </motion.div>
              ) : (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-6 flex flex-col items-center justify-center text-white/10 text-center"
                >
                  <Zap size={24} className="mb-2 opacity-50" />
                  <p className="text-[10px] uppercase font-black tracking-widest">Listening for questions...</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {!isMinimized && (
          <div className="mt-4 pt-4 border-t border-white/5 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            {['short', 'detailed'].map(mode => (
              <button 
                key={mode}
                onClick={() => toggleMode(mode)}
                className={`flex-1 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${
                  responseMode === mode 
                  ? 'bg-white/10 text-white border-white/20' 
                  : 'text-white/20 border-transparent hover:text-white/40 shadow-none'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        )}
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
      `}} />
    </div>
  );
}
