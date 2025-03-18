
import React, { useState, useEffect } from 'react';

// A simple motion component to handle animations without external libraries
interface MotionProps {
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
  div: ({ animate, transition, className, children }: MotionProps) => {
    const [style, setStyle] = useState({
      opacity: animate.opacity || 1,
      transform: `translateY(${animate.y || 0}px) scale(${animate.scale || 1})`,
      transition: `all ${transition?.duration || 0.3}s ease ${transition?.delay || 0}s`
    });

    useEffect(() => {
      setStyle({
        opacity: animate.opacity || 1,
        transform: `translateY(${animate.y || 0}px) scale(${animate.scale || 1})`,
        transition: `all ${transition?.duration || 0.3}s ease ${transition?.delay || 0}s`
      });
    }, [animate, transition]);

    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }
};

export default motion;
