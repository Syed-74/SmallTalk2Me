import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageSquare, Clock } from 'lucide-react';

const AccordionItem = ({ question, isOpen, onClick }) => {
  return (
    <div className="border border-neutral-800 rounded-2xl overflow-hidden mb-3 bg-neutral-900/50 backdrop-blur-sm">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-neutral-800/50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
            <MessageSquare size={18} />
          </div>
          <div>
            <h4 className="font-semibold text-white truncate max-w-md">{question.text}</h4>
            <div className="flex items-center gap-2 mt-1 opacity-40 text-[10px] uppercase font-bold tracking-widest">
              <Clock size={10} />
              {new Date(question.timestamp).toLocaleTimeString()}
            </div>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-neutral-500"
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-5 pt-0 border-t border-neutral-800 text-neutral-300">
              <div className="bg-neutral-950/50 rounded-xl p-4 border border-white/5">
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {question.answer || "AI is generating an answer..."}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="w-full max-w-4xl mx-auto py-6">
      {items.length === 0 ? (
        <div className="text-center py-20 text-neutral-600 border-2 border-dashed border-neutral-800 rounded-3xl">
          <p className="text-sm">No questions captured yet. Start the interview to begin.</p>
        </div>
      ) : (
        items.map((item, index) => (
          <AccordionItem
            key={item._id || index}
            question={item}
            isOpen={openIndex === index}
            onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
          />
        ))
      )}
    </div>
  );
}
