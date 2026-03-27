import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Upload, Sparkles, CheckCircle2, AlertCircle, Trash2 } from 'lucide-react';

export default function ResumeHub() {
  const [resumeText, setResumeText] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsUploading(true);
    audioService.setResumeContent(resumeText);
    // Simulate API call
    setTimeout(() => {
      setIsUploading(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-10 max-w-5xl mx-auto w-full"
    >
      <header className="mb-12 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight mb-2">Resume Intelligence</h1>
          <p className="text-neutral-500 text-sm">Personalize AI answers using your professional background.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setResumeText('')}
            className="p-4 bg-neutral-900 border border-neutral-800 rounded-2xl text-neutral-500 hover:text-red-500 transition-all"
          >
            <Trash2 size={20} />
          </button>
          <button 
            onClick={handleSave}
            disabled={!resumeText || isUploading}
            className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold transition-all shadow-xl ${
              isSaved ? 'bg-green-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-500 shadow-blue-600/20'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isUploading ? <Sparkles size={20} className="animate-spin" /> : isSaved ? <CheckCircle2 size={20} /> : <Upload size={20} />}
            {isUploading ? 'Analyzing...' : isSaved ? 'Resume Synced' : 'Sync Resume'}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-neutral-900/30 border border-neutral-800 rounded-[2.5rem] p-8 min-h-[500px] flex flex-col relative group">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-600 mb-6">Paste Resume Text</h3>
            <textarea 
              className="flex-1 bg-transparent border-none outline-none text-neutral-300 text-sm leading-relaxed resize-none custom-scrollbar"
              placeholder="Paste your full resume here (Experience, Skills, Projects)..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
            />
            {!resumeText && (
               <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-20">
                  <FileText size={64} className="mb-4" />
                  <p className="text-sm font-bold tracking-widest uppercase">No Content Found</p>
               </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-8 rounded-[2rem] bg-gradient-to-br from-indigo-600 to-purple-800 shadow-2xl shadow-indigo-500/20 text-white">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
               <Sparkles size={20} />
               How it works
            </h3>
            <p className="text-xs text-white/80 leading-relaxed mb-6">
               When you sync your resume, our AI parses your key accomplishments and skills. During live interviews, the assistant will weave these details into your answers to make you sound like the perfect candidate.
            </p>
            <div className="space-y-4">
               {[
                 'Injects relevant projects',
                 'Highlights matching skills',
                 'Personalizes storytelling',
                 'Aligns with your actual experience'
               ].map((tip, i) => (
                 <div key={i} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-wider text-white/60 bg-white/5 p-3 rounded-xl border border-white/5">
                    <CheckCircle2 size={14} className="text-white/40" />
                    {tip}
                 </div>
               ))}
            </div>
          </div>

          <div className="p-8 rounded-[2rem] bg-neutral-900/50 border border-neutral-800">
             <div className="flex items-center gap-3 mb-6">
                <AlertCircle size={20} className="text-amber-500" />
                <h4 className="font-bold text-white text-sm">Best Practices</h4>
             </div>
             <p className="text-xs text-neutral-500 leading-relaxed italic">
                "Keep your resume text clean and structured. The better the input, the more naturally the AI can represent your professional brand."
             </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
