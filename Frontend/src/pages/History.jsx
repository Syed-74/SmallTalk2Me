import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, MessageSquare, Search, Filter, Briefcase, Calendar } from 'lucide-react';
import Accordion from '../components/Accordion';

export default function History() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/sessions', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        const data = await response.json();
        // For each session, fetch its questions
        const detailedSessions = await Promise.all(data.map(async (s) => {
          const qRes = await fetch(`http://localhost:5000/api/questions/${s._id}`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
          });
          const qs = await qRes.json();
          return { ...s, questions: qs };
        }));
        setSessions(detailedSessions);
      } catch (err) {
        console.error("Error fetching history:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-10 max-w-5xl mx-auto w-full"
    >
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-white tracking-tight mb-4 text-center">Interview History</h1>
        <div className="flex items-center gap-4 max-w-2xl mx-auto">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
            <input 
              type="text" 
              placeholder="Search companies, roles or questions..."
              className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl py-4 pl-12 pr-6 text-sm text-white focus:border-blue-500 outline-none transition-all shadow-inner"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="p-4 bg-neutral-900 border border-neutral-800 rounded-2xl text-neutral-400 hover:text-white transition-all">
            <Filter size={18} />
          </button>
        </div>
      </header>

      <div className="space-y-12">
        {sessions.map((session) => (
          <div key={session._id}>
            <div className="flex items-center gap-4 mb-6 px-1">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                <Calendar size={16} />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-bold">{session.company} — {session.role}</h3>
                <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">{session.date}</p>
              </div>
              <span className="text-[10px] font-bold text-neutral-600 bg-neutral-900 border border-neutral-800 px-2 py-1 rounded-md">
                {session.questions.length} QUESTIONS
              </span>
            </div>
            
            <Accordion items={session.questions} />
          </div>
        ))}
      </div>

      {sessions.length === 0 && (
        <div className="text-center py-32">
          <div className="w-20 h-20 bg-neutral-900 rounded-full flex items-center justify-center mx-auto mb-6 text-neutral-700">
            <MessageSquare size={32} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No history found</h3>
          <p className="text-neutral-500 text-sm">Session records will appear here after your first interview.</p>
        </div>
      )}
    </motion.div>
  );
}
