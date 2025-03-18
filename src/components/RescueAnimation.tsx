
import React from 'react';
import { User, Baby, Heart, ShieldCheck, ArrowRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface RescueAnimationProps {
  monthlyTarget?: number;
  completedValue?: number;
}

const RescueAnimation = ({ monthlyTarget = 30, completedValue = 12 }: RescueAnimationProps) => {
  // Calculate completion percentage
  const completionPercentage = Math.min(100, (completedValue / monthlyTarget) * 100);
  
  return (
    <div className="relative h-24 w-full bg-blue-50 rounded-lg mb-6 overflow-hidden border border-blue-100">
      {/* Path line */}
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-blue-200 transform -translate-y-1/2"></div>
      
      {/* Progress bar showing completion */}
      <div className="absolute bottom-2 left-4 right-4">
        <div className="flex justify-between text-xs text-blue-500 mb-1">
          <span>{completedValue} completed</span>
          <span>Target: {monthlyTarget}</span>
        </div>
        <Progress value={completionPercentage} className="h-1 bg-blue-100" />
      </div>
      
      {/* The rescuer positioned based on completion percentage */}
      <div 
        className="absolute top-1/2 transform -translate-y-1/2"
        style={{ 
          left: `${Math.min(Math.max(completionPercentage, 5), 90)}%`, 
          transition: 'left 1s ease-in-out'
        }}
      >
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
