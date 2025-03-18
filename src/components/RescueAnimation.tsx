
import React from 'react';
import { User, Baby, Heart, ShieldCheck, ArrowRight } from 'lucide-react';

const RescueAnimation = () => {
  return (
    <div className="relative h-24 w-full bg-blue-50 rounded-lg mb-6 overflow-hidden border border-blue-100">
      {/* Path line */}
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-blue-200 transform -translate-y-1/2"></div>
      
      {/* The rescuer animation */}
      <div className="absolute top-1/2 left-5 transform -translate-y-1/2 animate-rescue-run">
        <div className="flex items-center gap-2">
          <div className="bg-green-500 p-2 rounded-full">
            <User className="h-5 w-5 text-white" />
          </div>
          <ArrowRight className="h-4 w-4 text-green-500 animate-pulse" />
        </div>
      </div>
      
      {/* The rescued people (women and children) */}
      <div className="absolute top-1/2 right-10 transform -translate-y-1/2">
        <div className="flex items-center gap-2 animate-rescued-pulse">
          <div className="bg-pink-400/70 p-2 rounded-full">
            <User className="h-5 w-5 text-white" />
          </div>
          <div className="bg-blue-300/70 p-2 rounded-full">
            <Baby className="h-5 w-5 text-white" />
          </div>
          <Heart className="h-4 w-4 text-red-500 animate-pulse" />
          <ShieldCheck className="h-4 w-4 text-blue-500 animate-pulse" />
        </div>
      </div>
      
      {/* Messages that appear and disappear */}
      <div className="absolute top-1 left-1/4 text-xs font-medium text-green-600 bg-white/80 px-2 py-1 rounded animate-message-fade-1">
        Reaching vulnerable populations
      </div>
      <div className="absolute bottom-1 left-1/2 text-xs font-medium text-blue-600 bg-white/80 px-2 py-1 rounded animate-message-fade-2">
        Providing essential healthcare
      </div>
      <div className="absolute top-2 right-1/4 text-xs font-medium text-pink-600 bg-white/80 px-2 py-1 rounded animate-message-fade-3">
        Saving lives
      </div>
    </div>
  );
};

export default RescueAnimation;
