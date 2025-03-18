
import React, { useState, useEffect } from 'react';
import { motion } from '@/components/ui/motion';

// Motivational quotes for the loading screen
const MOTIVATIONAL_QUOTES = [
  {
    quote: "Do not seek to follow in the footsteps of the wise; seek what they sought.",
    author: "Matsuo Basho"
  },
  {
    quote: "The journey of a thousand miles begins with one step.",
    author: "Lao Tzu"
  },
  {
    quote: "Health is not valued until sickness comes.",
    author: "Thomas Fuller"
  },
  {
    quote: "Healing is a matter of time, but it is sometimes also a matter of opportunity.",
    author: "Hippocrates"
  },
  {
    quote: "The art of medicine consists of amusing the patient while nature cures the disease.",
    author: "Voltaire"
  },
  {
    quote: "The best preparation for tomorrow is doing your best today.",
    author: "H. Jackson Brown Jr."
  },
  {
    quote: "A good health worker is person who helps people live better.",
    author: "Maria Montessori"
  },
  {
    quote: "The greatest wealth is health.",
    author: "Virgil"
  }
];

const MissionHealthLoadingScreen: React.FC = () => {
  const [randomQuote, setRandomQuote] = useState(MOTIVATIONAL_QUOTES[0]);
  const [currentDot, setCurrentDot] = useState(0);
  
  useEffect(() => {
    // Select a random quote on load
    const randomIndex = Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length);
    setRandomQuote(MOTIVATIONAL_QUOTES[randomIndex]);
    
    // Animate the loading dots
    const dotInterval = setInterval(() => {
      setCurrentDot(prev => (prev + 1) % 3);
    }, 500);
    
    return () => clearInterval(dotInterval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-4">
      <div 
        className="w-80 h-80 md:w-96 md:h-96 bg-slate-800 rounded-full flex flex-col items-center justify-center p-8 relative"
        style={{ 
          backgroundImage: "url('data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%232d3748' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E",
          boxShadow: "0 0 40px rgba(49, 130, 206, 0.3)"
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-xl md:text-2xl font-serif mb-4 leading-relaxed">
            {randomQuote.quote}
          </p>
          <p className="text-gray-400 text-sm md:text-base">
            {randomQuote.author}
          </p>
        </motion.div>
        
        <div className="absolute bottom-10 flex space-x-2">
          {[0, 1, 2].map((dot) => (
            <div 
              key={dot}
              className={`w-3 h-3 rounded-full ${dot === currentDot ? 'bg-white' : 'bg-gray-500'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MissionHealthLoadingScreen;
