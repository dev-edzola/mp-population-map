
import React, { useEffect, useState } from 'react';
import { Heart, Baby, ShieldCheck, Sparkles } from 'lucide-react';

const MissionHealthAnimatedHeader = () => {
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    setAnimate(true);
    
    // Create a continuous animation cycle
    const interval = setInterval(() => {
      setAnimate(false);
      setTimeout(() => setAnimate(true), 100);
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-36 md:h-48 overflow-hidden bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 rounded-lg mb-6">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 animate-pulse">
          <ShieldCheck className="h-16 w-16 text-white/20" />
        </div>
        <div className="absolute top-2/3 right-1/4 animate-pulse" style={{ animationDelay: '0.5s' }}>
          <Baby className="h-14 w-14 text-white/20" />
        </div>
        <div className="absolute bottom-1/4 left-2/3 animate-pulse" style={{ animationDelay: '1s' }}>
          <Heart className="h-12 w-12 text-white/20" />
        </div>
        
        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${3 + Math.random() * 4}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          >
            <Sparkles className="h-3 w-3 text-white/30" />
          </div>
        ))}
      </div>
      
      {/* Main content */}
      <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-1000 ${animate ? 'opacity-100' : 'opacity-0'}`}>
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-2 drop-shadow-lg">
          Saving Lives Together
        </h2>
        <p className="text-lg text-white/90 text-center max-w-md px-4">
          Your participation helps protect mothers and children in Madhya Pradesh
        </p>
      </div>
      
      {/* Impact counter */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center">
        <div className="flex gap-6 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-pink-200" />
            <span className="text-white font-medium text-sm">12,547 Women</span>
          </div>
          <div className="flex items-center gap-2">
            <Baby className="h-5 w-5 text-blue-200" />
            <span className="text-white font-medium text-sm">8,932 Children</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionHealthAnimatedHeader;
