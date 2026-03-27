import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Search, Sparkles, Target, Zap, ChevronRight, Globe, Shield } from 'lucide-react';
import { audioService } from '../services/audioService';

const CompanyCard = ({ name, domain, industry, active, onClick }) => (
  <div 
    onClick={onClick}
    className={`p-6 rounded-[2rem] border cursor-pointer transition-all duration-300 relative overflow-hidden group ${
      active 
      ? 'bg-blue-600/10 border-blue-500 shadow-[0_20px_40px_rgba(37,99,235,0.1)]' 
      : 'bg-neutral-900/30 border-neutral-800 hover:border-neutral-700'
    }`}
  >
    <div className="flex items-center justify-between mb-4">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl ${active ? 'bg-blue-600 text-white' : 'bg-neutral-800 text-neutral-500 group-hover:bg-neutral-700 transition-all'}`}>
        {name[0]}
      </div>
      {active && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="p-2 bg-blue-600 rounded-full text-white">
          <Target size={12} />
        </motion.div>
      )}
    </div>
    <h3 className="font-bold text-white text-lg group-hover:text-blue-400 transition-colors">{name}</h3>
    <div className="flex items-center gap-2 mt-1">
       <Globe size={10} className="text-neutral-600" />
       <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">{domain}</p>
    </div>
    <div className="mt-6 flex items-center justify-between">
       <span className="text-[10px] font-black text-neutral-600 bg-black/20 px-3 py-1.5 rounded-full uppercase tracking-widest">{industry}</span>
       <ChevronRight size={16} className={`transition-transform duration-500 ${active ? 'translate-x-0 opacity-100 text-blue-500' : '-translate-x-4 opacity-0'}`} />
    </div>
  </div>
);

export default function CompanyPatterns() {
  const [selectedCompany, setSelectedCompany] = useState('Google');
  const [searchQuery, setSearchQuery] = useState('');

  const companies = [
    { name: 'Google', domain: 'google.com', industry: 'Big Tech' },
    { name: 'Amazon', domain: 'amazon.com', industry: 'Cloud & Retail' },
    { name: 'Meta', domain: 'meta.com', industry: 'Social Media' },
    { name: 'Microsoft', domain: 'microsoft.com', industry: 'Enterprise' },
    { name: 'Apple', domain: 'apple.com', industry: 'Consumer Tech' },
    { name: 'Netflix', domain: 'netflix.com', industry: 'Entertainment' },
    { name: 'Stripe', domain: 'stripe.com', industry: 'Fintech' },
    { name: 'Airbnb', domain: 'airbnb.com', industry: 'Travel' },
  ];

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-10 max-w-7xl mx-auto w-full"
    >
      <header className="mb-12 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight mb-2">Company Intelligence</h1>
          <p className="text-neutral-500 text-sm">Align AI answers with target company interview patterns.</p>
        </div>
        <div className="flex items-center gap-4 bg-neutral-900 border border-neutral-800 rounded-2xl px-6 py-3 w-96 focus-within:border-blue-500 transition-all">
          <Search size={18} className="text-neutral-500" />
          <input 
            type="text" 
            placeholder="Search company database..."
            className="flex-1 bg-transparent border-none outline-none text-sm text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredCompanies.map((c) => (
              <CompanyCard 
                key={c.name}
                {...c}
                active={selectedCompany === c.name}
                onClick={() => {
                  setSelectedCompany(c.name);
                  audioService.setCompanyContext(c);
                }}
              />
            ))}
          </div>
        </div>

        <div className="space-y-6">
           <div className="p-8 rounded-[2.5rem] bg-neutral-900/50 border border-neutral-800 relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl" />
              <h3 className="text-xs font-black uppercase tracking-[0.25em] text-neutral-600 mb-6">Target Strategy</h3>
              <div className="space-y-6">
                 <div>
                    <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                       <Zap size={16} className="text-amber-500" />
                       Interviewer Tone
                    </h4>
                    <p className="text-xs text-neutral-500 leading-relaxed">Systematic, performance-driven, and focused on core principles.</p>
                 </div>
                 <div>
                    <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                       <Shield size={16} className="text-blue-500" />
                       Core Values
                    </h4>
                    <p className="text-xs text-neutral-500 leading-relaxed">Scale, data-driven decisions, and user-centric design.</p>
                 </div>
              </div>
           </div>

           <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-green-600/20 to-blue-600/20 border border-white/5 shadow-2xl">
              <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                 <Sparkles size={18} />
                 AI Alignment Active
              </h4>
              <p className="text-[10px] text-white/50 leading-relaxed uppercase font-black tracking-widest">
                 The AI will now prioritize answering patterns favored by {selectedCompany}.
              </p>
           </div>
        </div>
      </div>
    </motion.div>
  );
}
