
import React, { useEffect, useState } from 'react';
import { Heart, Baby, ShieldCheck, Sparkles, User, HandHeart, Stethoscope, Hospital } from 'lucide-react';

const MissionHealthAnimatedHeader = () => {
  const [animate, setAnimate] = useState(false);
  const [savedCount, setSavedCount] = useState({ women: 12547, children: 8932 });
  
  useEffect(() => {
    setAnimate(true);
    
    // Create a continuous animation cycle
    const interval = setInterval(() => {
      setAnimate(false);
      setTimeout(() => setAnimate(true), 100);
    }, 10000);
    
    // Simulate real-time saving of lives
    const countInterval = setInterval(() => {
      setSavedCount(prev => ({
        women: prev.women + 1,
        children: Math.random() > 0.6 ? prev.children + 1 : prev.children
      }));
    }, 5000);
    
    return () => {
      clearInterval(interval);
      clearInterval(countInterval);
    };
  }, []);

  return (
    <div className="relative w-full h-52 md:h-60 overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-500 rounded-lg mb-6 shadow-xl">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(25)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white/20"
            style={{
              width: `${10 + Math.random() * 30}px`,
              height: `${10 + Math.random() * 30}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${15 + Math.random() * 10}s`,
              animationDelay: `${Math.random() * 5}s`,
              transform: 'scale(0)',
              animation: 'pulse-scale 4s infinite ease-in-out'
            }}
          />
        ))}
      </div>

      {/* Hospital and clinic centers */}
      <div className="absolute top-1/4 left-1/4 hospital-animation">
        <div className="bg-white/30 p-2 rounded-lg backdrop-blur-sm">
          <Hospital className="h-8 w-8 text-white" />
        </div>
      </div>
      
      <div className="absolute bottom-1/4 right-1/4 hospital-animation" style={{ animationDelay: '2s' }}>
        <div className="bg-white/30 p-2 rounded-lg backdrop-blur-sm">
          <Hospital className="h-8 w-8 text-white" />
        </div>
      </div>

      {/* Dynamic Healthcare Workers with Patients */}
      <div className="absolute left-[20%] top-[30%] health-worker-animation">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-400/80 p-2 rounded-full backdrop-blur-sm">
            <Stethoscope className="h-6 w-6 text-white" />
          </div>
          <div className="flex -ml-1">
            <div className="bg-pink-400/80 p-2 rounded-full backdrop-blur-sm">
              <User className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="ml-1">
            <Heart className="h-4 w-4 text-pink-200 animate-pulse" />
          </div>
        </div>
      </div>

      <div className="absolute right-[20%] top-[60%] health-worker-animation">
        <div className="flex items-center gap-2">
          <div className="bg-purple-400/80 p-2 rounded-full backdrop-blur-sm">
            <HandHeart className="h-6 w-6 text-white" />
          </div>
          <div className="flex -ml-1">
            <div className="bg-blue-300/80 p-2 rounded-full backdrop-blur-sm">
              <Baby className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="ml-1">
            <ShieldCheck className="h-4 w-4 text-blue-200 animate-pulse" />
          </div>
        </div>
      </div>

      <div className="absolute left-[40%] bottom-[20%] health-worker-animation">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-500/80 p-2 rounded-full backdrop-blur-sm">
            <Stethoscope className="h-6 w-6 text-white" />
          </div>
          <div className="flex -ml-1 space-x-[-5px]">
            <div className="bg-pink-400/80 p-2 rounded-full backdrop-blur-sm">
              <User className="h-5 w-5 text-white" />
            </div>
            <div className="bg-blue-300/80 p-2 rounded-full backdrop-blur-sm">
              <Baby className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="ml-1 flex">
            <Heart className="h-4 w-4 text-pink-200 animate-pulse" />
            <ShieldCheck className="h-4 w-4 text-blue-200 animate-pulse ml-1" />
          </div>
        </div>
      </div>

      {/* Floating particles representing saved lives */}
      {[...Array(35)].map((_, i) => (
        <div 
          key={i}
          className="absolute animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${5 + Math.random() * 8}s`,
            animationDelay: `${Math.random() * 5}s`
          }}
        >
          <Sparkles 
            className="text-white/70" 
            size={Math.floor(10 + Math.random() * 15)} 
          />
        </div>
      ))}
      
      {/* Main content */}
      <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-1000 ${animate ? 'opacity-100' : 'opacity-0'}`}>
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-2 drop-shadow-lg">
          Saving Lives Together
        </h2>
        <p className="text-lg text-white/90 text-center max-w-md px-4 font-light">
          Your participation helps protect mothers and children in Madhya Pradesh
        </p>
      </div>
      
      {/* Impact counter */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center">
        <div className="flex gap-6 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-pink-200 fill-pink-200/50" />
            <span className="text-white font-medium text-sm">{savedCount.women.toLocaleString()} Women</span>
          </div>
          <div className="flex items-center gap-2">
            <Baby className="h-5 w-5 text-blue-200 fill-blue-200/50" />
            <span className="text-white font-medium text-sm">{savedCount.children.toLocaleString()} Children</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionHealthAnimatedHeader;
