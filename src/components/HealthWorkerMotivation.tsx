
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Sparkles, Award, Lightbulb, BatteryCharging } from 'lucide-react';
import { motion } from '@/components/ui/motion';

// Motivational quotes for healthcare workers
const MOTIVATIONAL_QUOTES = [
  {
    quote: "Your compassion is someone's healing, your dedication is someone's second chance at life.",
    author: "Healthcare Heroes",
    icon: Heart,
    color: "text-pink-500",
    bgColor: "bg-pink-50"
  },
  {
    quote: "Every time you help a mother, you shape the future of both her and her child. Your work creates generations of impact.",
    author: "Mission Health",
    icon: Sparkles,
    color: "text-purple-500",
    bgColor: "bg-purple-50"
  },
  {
    quote: "The care you provide today creates healthier communities for tomorrow. One mother, one child at a time.",
    author: "Antara Foundation",
    icon: Award,
    color: "text-blue-500",
    bgColor: "bg-blue-50"
  },
  {
    quote: "In rural healthcare, you're not just a health worker - you're hope, education, and transformation.",
    author: "Rural Health Initiative",
    icon: Lightbulb,
    color: "text-amber-500",
    bgColor: "bg-amber-50"
  },
  {
    quote: "Your dedication to maternal and child health changes lives and builds stronger communities. This is your impact.",
    author: "Public Health Leaders",
    icon: BatteryCharging,
    color: "text-green-500",
    bgColor: "bg-green-50"
  }
];

interface HealthWorkerMotivationProps {
  onStartGame: () => void;
}

const HealthWorkerMotivation: React.FC<HealthWorkerMotivationProps> = ({ onStartGame }) => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    // Rotate through quotes every 8 seconds
    const interval = setInterval(() => {
      setAnimate(false);
      setTimeout(() => {
        setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % MOTIVATIONAL_QUOTES.length);
        setAnimate(true);
      }, 500); // Wait for exit animation before changing quote
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const currentQuote = MOTIVATIONAL_QUOTES[currentQuoteIndex];
  const Icon = currentQuote.icon;

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1584515933487-779824d29309?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80')] bg-cover opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-green-50/70 to-blue-50/70"></div>
      
      <div className="max-w-4xl w-full z-10">
        <motion.div
          animate={animate ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Card className={`shadow-lg border-none overflow-hidden ${currentQuote.bgColor} hover-scale`}>
            <CardContent className="pt-12 pb-12 px-8">
              <div className="flex justify-center mb-6">
                <div className={`p-4 rounded-full ${currentQuote.bgColor} ${currentQuote.color}`}>
                  <Icon className="w-12 h-12" />
                </div>
              </div>
              
              <p className="text-2xl md:text-3xl font-serif italic text-gray-800 mb-6 leading-relaxed">
                "{currentQuote.quote}"
              </p>
              
              <p className="text-lg text-gray-600 font-medium">— {currentQuote.author}</p>
            </CardContent>
          </Card>
        </motion.div>

        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-4 animate-fade-in">
            Mission Health Game
          </h1>
          
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in">
            Take on the role of a health worker and make decisions that impact maternal and child health metrics.
            Your mission: strategically deploy interventions to improve health outcomes in rural communities.
          </p>
          
          <Button 
            onClick={onStartGame}
            className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-6 rounded-lg shadow-md hover:shadow-lg transition-all animate-fade-in"
          >
            Start Your Mission
          </Button>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-green-200 rounded-full opacity-20"></div>
      <div className="absolute -top-10 -right-10 w-72 h-72 bg-blue-200 rounded-full opacity-20"></div>
    </div>
  );
};

export default HealthWorkerMotivation;
