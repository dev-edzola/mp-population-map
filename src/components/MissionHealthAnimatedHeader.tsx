
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
  
  // Animation elements representing healthcare workers saving women and children
  const animationElements = [
    { id: 1, type: 'rescue', startPosition: { x: 10, y: 70 } },
    { id: 2, type: 'rescue', startPosition: { x: 80, y: 30 } },
    { id: 3, type: 'rescue', startPosition: { x: 40, y: 90 } },
    { id: 4, type: 'hospital', startPosition: { x: 50, y: 20 } }
  ];

  return (
    <div className="relative w-full h-52 md:h-60 overflow-hidden bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 rounded-lg mb-6">
      {/* Background elements */}
      <div className="absolute inset-0">
        {/* Static background elements */}
        <div className="absolute top-1/4 left-1/4 animate-pulse">
          <ShieldCheck className="h-16 w-16 text-white/20" />
        </div>
        <div className="absolute top-2/3 right-1/4 animate-pulse" style={{ animationDelay: '0.5s' }}>
          <Baby className="h-14 w-14 text-white/20" />
        </div>
        <div className="absolute bottom-1/4 left-2/3 animate-pulse" style={{ animationDelay: '1s' }}>
          <Heart className="h-12 w-12 text-white/20" />
        </div>
        
        {/* Healthcare worker and patient animations */}
        {animationElements.map((element) => (
          <div 
            key={element.id}
            className="absolute"
            style={{
              left: `${element.startPosition.x}%`,
              top: `${element.startPosition.y}%`,
            }}
          >
            {element.type === 'rescue' ? (
              <div className="flex items-center gap-1 health-worker-animation">
                <div className="rounded-full bg-blue-300/50 p-1">
                  <Stethoscope className="h-6 w-6 text-white" />
                </div>
                <div className="flex space-x-1 items-center">
                  <div className="rounded-full bg-pink-300/50 p-1">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div className="rounded-full bg-blue-200/50 p-1">
                    <Baby className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div className="ml-1">
                  <HandHeart className="h-5 w-5 text-pink-200" />
                </div>
              </div>
            ) : (
              <div className="hospital-animation">
                <div className="bg-white/30 p-2 rounded-lg flex items-center gap-2">
                  <Hospital className="h-8 w-8 text-white" />
                  <Heart className="h-5 w-5 text-pink-200 animate-pulse" />
                </div>
              </div>
            )}
          </div>
        ))}
        
        {/* Floating particles representing saved lives */}
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
            <span className="text-white font-medium text-sm">{savedCount.women.toLocaleString()} Women</span>
          </div>
          <div className="flex items-center gap-2">
            <Baby className="h-5 w-5 text-blue-200" />
            <span className="text-white font-medium text-sm">{savedCount.children.toLocaleString()} Children</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionHealthAnimatedHeader;
