
import React, { useState, useEffect } from 'react';

// A simple motion component to handle animations without external libraries
interface MotionProps {
  initial?: {
    opacity?: number;
    y?: number;
    scale?: number;
  };
  animate: {
    opacity?: number;
    y?: number;
    scale?: number;
  };
  transition?: {
    duration: number;
    delay?: number;
  };
  className?: string;
  children: React.ReactNode;
}

export const motion = {
  div: ({ initial, animate, transition, className, children }: MotionProps) => {
    const [style, setStyle] = useState({
      opacity: initial?.opacity ?? animate.opacity ?? 1,
      transform: `translateY(${initial?.y ?? animate.y ?? 0}px) scale(${initial?.scale ?? animate.scale ?? 1})`,
      transition: `all ${transition?.duration || 0.3}s ease ${transition?.delay || 0}s`
    });

    useEffect(() => {
      const timer = setTimeout(() => {
        setStyle({
          opacity: animate.opacity || 1,
          transform: `translateY(${animate.y || 0}px) scale(${animate.scale || 1})`,
          transition: `all ${transition?.duration || 0.3}s ease ${transition?.delay || 0}s`
        });
      }, 10); // Small delay to ensure initial state is applied first
      
      return () => clearTimeout(timer);
    }, [animate, transition]);

    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }
};

export default motion;
