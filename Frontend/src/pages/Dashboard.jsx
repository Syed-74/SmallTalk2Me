import { Play, MicOff, Zap, Monitor, Clock, ChevronRight, BarChart3, Users, Briefcase, MessageSquare,motion  } from 'lucide-react';
import { audioService } from '../services/audioService';
import { io } from 'socket.io-client';
import Accordion from '../components/Accordion';
import { useState, useEffect  } from 'react';

const socket = io('http://localhost:5000');

const StatCard = ({ icon: Icon, title, value, color }) => (
  <div className="bg-neutral-900/50 border border-neutral-800 rounded-3xl p-6 transition-all hover:border-neutral-700 group">
    <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
      <Icon size={24} />
    </div>
    <h3 className="text-neutral-500 text-xs font-bold uppercase tracking-widest mb-1">{title}</h3>
    <p className="text-2xl font-bold text-white tracking-tight">{value}</p>
  </div>
);

export default function Dashboard() {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [activeSessionTime, setActiveSessionTime] = useState(0);
  const [questions, setQuestions] = useState([]);
  const sessionId = "session_123";

  useEffect(() => {
    socket.on('ai_answer', (data) => {
      setQuestions(prev => prev.map(q => 
        q._id === data.questionId ? { ...q, answer: data.answerText } : q
      ));
    });

    return () => socket.off('ai_answer');
  }, []);

  useEffect(() => {
    let interval;
    if (isSessionActive) {
      interval = setInterval(() => {
        setActiveSessionTime(prev => prev + 1);
      }, 1000);
    } else {
      setActiveSessionTime(0);
      setQuestions([]); // Clear questions for new session
    }
    return () => clearInterval(interval);
  }, [isSessionActive]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startSession = () => {
    audioService.startSpeechRecognition(sessionId, (text) => {
      const newQuestion = {
        _id: Date.now().toString(),
        text,
        timestamp: new Date(),
        answer: null
      };
      setQuestions(prev => [newQuestion, ...prev]);
    });
    setIsSessionActive(true);
  };

  const stopSession = () => {
    audioService.stopSpeechRecognition();
    setIsSessionActive(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-10 max-w-7xl mx-auto w-full"
    >
      <header className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight mb-2">Welcome Back, Alex</h1>
          <p className="text-neutral-500 text-sm">Ready to ace your next technical interview?</p>
        </div>
        <button 
          onClick={isSessionActive ? stopSession : startSession}
          className={`flex items-center gap-3 px-10 py-5 rounded-2xl font-bold transition-all shadow-2xl relative overflow-hidden group ${
            isSessionActive 
            ? 'bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20' 
            : 'bg-white text-black hover:bg-blue-500 hover:text-white'
          }`}
        >
          {isSessionActive && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 0.2 }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="absolute inset-0 bg-red-500 rounded-full"
            />
          )}
          {isSessionActive ? <MicOff size={22} className="relative z-10" /> : <Play size={22} className="relative z-10" />}
          <span className="relative z-10">{isSessionActive ? 'End Session' : 'Start Live Interview'}</span>
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard icon={Zap} title="Confidence Score" value="94%" color="bg-green-500/10 text-green-500" />
        <StatCard icon={Clock} title="Practice Hours" value="12.4h" color="bg-blue-500/10 text-blue-500" />
        <StatCard icon={Briefcase} title="Interviews Done" value="8" color="bg-purple-500/10 text-purple-500" />
        <StatCard icon={BarChart3} title="Success Rate" value="75%" color="bg-amber-500/10 text-amber-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          {isSessionActive ? (
            <>
              <div className="flex items-center justify-between mb-6 px-1">
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">Live Captures</h2>
                <span className="text-[10px] font-black text-blue-500 bg-blue-500/10 px-3 py-1 rounded-full uppercase tracking-widest animate-pulse border border-blue-500/20">Active</span>
              </div>
              <Accordion items={questions} />
            </>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 px-1">Recent Sessions</h2>
                <button className="text-xs font-bold text-blue-500 hover:text-blue-400 flex items-center gap-1 transition-colors">
                  View All <ChevronRight size={14} />
                </button>
              </div>
              <div className="space-y-4">
                {[
                  { company: 'Google', role: 'Senior Frontend Engineer', date: 'Yesterday', questions: 12 },
                  { company: 'Meta', role: 'Full Stack Developer', date: '2 days ago', questions: 8 },
                  { company: 'Amazon', role: 'Software Engineer II', date: 'March 24', questions: 15 },
                ].map((session, i) => (
                  <div key={i} className="flex items-center justify-between p-6 bg-neutral-900/30 border border-neutral-800 rounded-3xl hover:bg-neutral-900/50 transition-all cursor-pointer group">
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-neutral-800 flex items-center justify-center font-bold text-xl text-neutral-500 group-hover:bg-blue-600/10 group-hover:text-blue-500 transition-all">
                        {session.company[0]}
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors">{session.company}</h4>
                        <p className="text-xs text-neutral-500 font-medium">{session.role}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-white mb-1">{session.questions} Questions</p>
                      <p className="text-[10px] text-neutral-600 font-bold uppercase tracking-widest">{session.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="space-y-6">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 px-1">Active Status</h2>
          {isSessionActive ? (
            <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-blue-600 to-blue-800 shadow-[0_20px_50px_rgba(37,99,235,0.3)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
              <div className="flex items-center gap-4 mb-8">
                <div className="w-3 h-3 rounded-full bg-white animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest text-white/80">Live Recording</span>
              </div>
              <p className="text-5xl font-black text-white mb-2 tabular-nums">{formatTime(activeSessionTime)}</p>
              <p className="text-xs text-white/60 font-medium mb-8 uppercase tracking-widest">Session Duration</p>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl border border-white/5 backdrop-blur-sm">
                <Monitor size={14} className="text-white/60" />
                <span className="text-[10px] font-bold text-white/80 uppercase">Overlay Active</span>
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-[2.5rem] bg-neutral-900/50 border border-neutral-800 text-center flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center mb-6 text-neutral-600">
                <Zap size={32} />
              </div>
              <h4 className="font-bold text-lg mb-2 text-white">No active session</h4>
              <p className="text-xs text-neutral-500 leading-relaxed max-w-[200px]">
                Click the start button to begin your AI-assisted interview experience.
              </p>
            </div>
          )}

          <div className="p-8 rounded-[2.5rem] bg-neutral-900/50 border border-neutral-800">
            <h4 className="font-bold text-white mb-4 flex items-center gap-2">
              <Users size={18} className="text-blue-500" />
              Recent Practice
            </h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <p className="text-xs text-neutral-400 font-medium">System Design - 45m</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-purple-500" />
                <p className="text-xs text-neutral-400 font-medium">React Behavioral - 20m</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
