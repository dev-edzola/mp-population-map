
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Trophy, Gamepad2, BarChart3, Baby, Heart, Shield, Users, HandHeart, 
  RefreshCw, ChevronDown, ChevronUp, Calendar, CheckSquare, ShieldCheck,
  Sparkles, User, Stethoscope, Hospital 
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ScrollArea } from '@/components/ui/scroll-area';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { toast } from '@/hooks/use-toast';
import { mpDistricts, getMaxPopulation, getMinPopulation } from '@/data/mpDistricts';

// Rescue Animation Component
const RescueAnimation = ({ monthlyTarget = 30, completedValue = 12 }) => {
  // Animation states
  const [animatedValue, setAnimatedValue] = useState(0);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  
  // Calculate completion percentage
  const completionPercentage = Math.min(100, (animatedValue / monthlyTarget) * 100);
  
  useEffect(() => {
    // Animation for the first time the component loads
    if (isFirstLoad) {
      let startValue = 0;
      const animationDuration = 1500; // 1.5 seconds
      const interval = 30; // Update every 30ms
      const steps = animationDuration / interval;
      const increment = completedValue / steps;
      
      const timer = setInterval(() => {
        startValue += increment;
        
        if (startValue >= completedValue) {
          setAnimatedValue(completedValue);
          clearInterval(timer);
          setIsFirstLoad(false);
        } else {
          setAnimatedValue(startValue);
        }
      }, interval);
      
      return () => clearInterval(timer);
    } else {
      setAnimatedValue(completedValue);
    }
  }, [completedValue, isFirstLoad, monthlyTarget]);
  
  return (
    <div className="relative h-24 w-full bg-blue-50 rounded-lg mb-6 overflow-hidden border border-blue-100">
      {/* Path line */}
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-blue-200 transform -translate-y-1/2"></div>
      
      {/* Progress bar showing completion */}
      <div className="absolute bottom-2 left-4 right-4">
        <div className="flex justify-between text-xs text-blue-500 mb-1">
          <span>{Math.round(animatedValue)} completed</span>
          <span>Target: {monthlyTarget}</span>
        </div>
        <Progress value={completionPercentage} className="h-1 bg-blue-100" />
      </div>
      
      {/* The rescuer positioned based on completion percentage */}
      <div 
        className="absolute top-1/2 transform -translate-y-1/2"
        style={{ 
          left: `${Math.min(Math.max(completionPercentage, 5), 90)}%`, 
          transition: 'left 1.5s ease-in-out'
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

// Map Legend Component
const MapLegend = () => {
  return (
    <div className="absolute right-4 bottom-4 bg-white/90 p-3 rounded-lg shadow-md border border-gray-200">
      <h4 className="text-sm font-semibold mb-2 text-gray-700">Population Density</h4>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: '#7C3AED' }}></div>
          <span className="text-xs text-gray-600">High</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: '#A78BFA' }}></div>
          <span className="text-xs text-gray-600">Medium</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: '#E5DEFF' }}></div>
          <span className="text-xs text-gray-600">Low</span>
        </div>
      </div>
    </div>
  );
};

// Map Info Box Component
const MapInfoBox = () => {
  return (
    <div className="absolute left-4 top-4 bg-white/90 p-3 rounded-lg shadow-md border border-gray-200 max-w-xs">
      <h4 className="text-sm font-semibold mb-1 text-gray-700">Madhya Pradesh Population</h4>
      <p className="text-xs text-gray-600 mb-2">
        Visualizing population distribution across districts helps identify high-need areas for maternal and child health interventions.
      </p>
      <div className="text-xs text-gray-500">
        <div className="flex justify-between mb-1">
          <span>Total Population:</span>
          <span className="font-medium">7.33 Crore</span>
        </div>
        <div className="flex justify-between">
          <span>Districts:</span>
          <span className="font-medium">52</span>
        </div>
      </div>
    </div>
  );
};

// Population Map Component
const PopulationMap = () => {
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  
  const minPop = getMinPopulation();
  const maxPop = getMaxPopulation();
  const popRange = maxPop - minPop;
  
  // Calculate color intensity based on population
  const getDistrictColor = (population) => {
    const normalizedPop = (population - minPop) / popRange;
    
    // Interpolate between colors based on population density
    if (normalizedPop < 0.33) {
      return '#E5DEFF'; // Light purple for low density
    } else if (normalizedPop < 0.66) {
      return '#A78BFA'; // Medium purple for medium density
    } else {
      return '#7C3AED'; // Dark purple for high density
    }
  };

  const handleDistrictHover = (districtId) => {
    setSelectedDistrict(districtId);
  };

  // Format numbers with commas
  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  // More geographic district outlines for MP districts
  const districtPaths = {
    "1": "M310,250 L330,230 L360,240 L370,270 L340,290 L310,270 Z", // Bhopal
    "2": "M140,350 L170,330 L200,350 L190,380 L150,390 Z", // Indore
    "3": "M440,230 L470,210 L500,230 L490,260 L450,270 Z", // Jabalpur
    "4": "M250,90 L280,70 L310,90 L300,120 L270,130 Z", // Gwalior
    "5": "M170,290 L200,270 L230,290 L220,320 L180,330 Z", // Ujjain
    "6": "M380,200 L410,180 L440,200 L430,230 L390,240 Z", // Sagar
    "7": "M200,320 L230,300 L260,320 L250,350 L210,360 Z", // Dewas
    "8": "M500,170 L530,150 L560,170 L550,200 L510,210 Z", // Satna
    "9": "M120,310 L150,290 L180,310 L170,340 L130,350 Z", // Ratlam
    "10": "M540,140 L570,120 L600,140 L590,170 L550,180 Z", // Rewa
    "11": "M470,280 L490,260 L520,280 L510,310 L470,320 Z", // Katni
    "12": "M160,390 L190,370 L220,390 L210,420 L170,430 Z", // Khargone
    "13": "M90,230 L120,210 L150,230 L140,260 L100,270 Z", // Neemuch
    "14": "M130,260 L160,240 L190,260 L180,290 L140,300 Z", // Mandsaur
    "15": "M150,370 L180,350 L210,370 L200,400 L160,410 Z", // Dhar
    "16": "M410,310 L440,290 L470,310 L460,340 L420,350 Z", // Chhindwara
    "17": "M460,360 L490,340 L520,360 L510,390 L470,400 Z", // Balaghat
    "18": "M340,310 L370,290 L400,310 L390,340 L350,350 Z", // Hoshangabad
    "19": "M370,360 L400,340 L430,360 L420,390 L380,400 Z", // Betul
    "20": "M330,200 L360,180 L390,200 L380,230 L340,240 Z", // Vidisha
    "21": "M220,60 L250,40 L280,60 L270,90 L230,100 Z", // Morena
    "22": "M250,150 L280,130 L310,150 L300,180 L260,190 Z", // Shivpuri
    "23": "M400,170 L430,150 L460,170 L450,200 L410,210 Z", // Damoh
    "24": "M350,150 L380,130 L410,150 L400,180 L360,190 Z", // Tikamgarh
    "25": "M430,120 L460,100 L490,120 L480,150 L440,160 Z", // Panna
    "26": "M290,230 L320,210 L350,230 L340,260 L300,270 Z", // Sehore
    "27": "M350,230 L380,210 L410,230 L400,260 L360,270 Z", // Raisen
    "28": "M240,240 L270,220 L300,240 L290,270 L250,280 Z", // Rajgarh
    "29": "M210,270 L240,250 L270,270 L260,300 L220,310 Z", // Shajapur
    "30": "M290,330 L320,310 L350,330 L340,360 L300,370 Z", // Harda
    "31": "M180,410 L210,390 L240,410 L230,440 L190,450 Z", // Barwani
    "32": "M240,360 L270,340 L300,360 L290,390 L250,400 Z", // Khandwa
    "33": "M230,430 L260,410 L290,430 L280,460 L240,470 Z", // Burhanpur
    "34": "M300,130 L330,110 L360,130 L350,160 L310,170 Z", // Ashoknagar
    "35": "M300,90 L330,70 L360,90 L350,120 L310,130 Z", // Datia
    "36": "M190,80 L220,60 L250,80 L240,110 L200,120 Z", // Bhind
    "37": "M410,240 L440,220 L470,240 L460,270 L420,280 Z", // Narsinghpur
    "38": "M440,290 L470,270 L500,290 L490,320 L450,330 Z", // Seoni
    "39": "M480,310 L510,290 L540,310 L530,340 L490,350 Z", // Mandla
    "40": "M510,340 L540,320 L570,340 L560,370 L520,380 Z", // Dindori
    "41": "M540,290 L570,270 L600,290 L590,320 L550,330 Z", // Shahdol
    "42": "M520,260 L550,240 L580,260 L570,290 L530,300 Z", // Umaria
    "43": "M560,190 L590,170 L620,190 L610,220 L570,230 Z", // Sidhi
    "44": "M590,230 L620,210 L650,230 L640,260 L600,270 Z", // Singrauli
    "45": "M120,370 L150,350 L180,370 L170,400 L130,410 Z", // Jhabua
    "46": "M90,410 L120,390 L150,410 L140,440 L100,450 Z", // Alirajpur
    "47": "M560,260 L590,240 L620,260 L610,290 L570,300 Z", // Anuppur
    "48": "M340,120 L370,100 L400,120 L390,150 L350,160 Z", // Niwari
    "49": "M190,250 L220,230 L250,250 L240,280 L200,290 Z", // Agar Malwa
    "50": "M160,120 L190,100 L220,120 L210,150 L170,160 Z", // Sheopur
    "51": "M390,130 L420,110 L450,130 L440,160 L400,170 Z", // Chhatarpur
  };

  return (
    <div className="relative w-full h-[calc(100vh-2rem)]">
      <div className="absolute inset-0 rounded-lg shadow-lg bg-white overflow-hidden">
        <Card className="h-full w-full relative p-4">
          <div className="h-full w-full relative">
            {/* SVG Map */}
            <svg width="100%" height="100%" viewBox="0 0 700 500" preserveAspectRatio="xMidYMid meet">
              {/* Background for MP state */}
              <path 
                d="M50,150 C150,50 350,50 500,100 C600,150 650,250 600,350 C550,450 400,480 250,450 C150,420 50,350 50,250 C50,200 50,150 50,150 Z" 
                fill="#F3F4F6" 
                stroke="#D1D5DB"
                strokeWidth="2"
              />
              
              {/* Plot districts as paths with colors based on population */}
              {mpDistricts.map((district) => {
                if (districtPaths[district.id]) {
                  return (
                    <g key={district.id}>
                      <path
                        d={districtPaths[district.id]}
                        fill={getDistrictColor(district.population)}
                        stroke="white"
                        strokeWidth="1.5"
                        onMouseEnter={() => handleDistrictHover(district.id)}
                        onMouseLeave={() => handleDistrictHover(null)}
                        style={{ cursor: 'pointer' }}
                      />
                      {/* District name label */}
                      <text
                        x={parseFloat(districtPaths[district.id].split(' ')[1]) + 
                           (parseFloat(districtPaths[district.id].split(' ')[5]) - 
                            parseFloat(districtPaths[district.id].split(' ')[1])) / 2}
                        y={parseFloat(districtPaths[district.id].split(' ')[2]) + 
                           (parseFloat(districtPaths[district.id].split(' ')[10]) - 
                            parseFloat(districtPaths[district.id].split(' ')[2])) / 2}
                        textAnchor="middle"
                        fontSize="8"
                        fill="#4B5563"
                        pointerEvents="none"
                      >
                        {district.name}
                      </text>
                      
                      {/* Population number */}
                      <text
                        x={parseFloat(districtPaths[district.id].split(' ')[1]) + 
                           (parseFloat(districtPaths[district.id].split(' ')[5]) - 
                            parseFloat(districtPaths[district.id].split(' ')[1])) / 2}
                        y={parseFloat(districtPaths[district.id].split(' ')[2]) + 
                           (parseFloat(districtPaths[district.id].split(' ')[10]) - 
                            parseFloat(districtPaths[district.id].split(' ')[2])) / 2 + 10}
                        textAnchor="middle"
                        fontSize="6"
                        fill="#1F2937"
                        pointerEvents="none"
                      >
                        {formatNumber(district.population)}
                      </text>
                    </g>
                  );
                }
                
                // Fallback for any districts without paths - show as circles
                const x = ((district.coordinates[0] - 74) / 9) * 600 + 100;
                const y = (((district.coordinates[1] - 21) / 5) * 400) + 100;
                
                // Calculate relative size for circles based on population
                const circleSize = 8 + ((district.population - minPop) / popRange) * 20;
                
                return (
                  <g key={district.id}>
                    <circle
                      cx={x}
                      cy={y}
                      r={circleSize}
                      fill={getDistrictColor(district.population)}
                      stroke="white"
                      strokeWidth="1"
                      opacity="0.8"
                      onMouseEnter={() => handleDistrictHover(district.id)}
                      onMouseLeave={() => handleDistrictHover(null)}
                      style={{ cursor: 'pointer' }}
                    />
                    {district.population > 1500000 && (
                      <>
                        <text
                          x={x}
                          y={y}
                          textAnchor="middle"
                          fontSize="8"
                          fill="#4B5563"
                          pointerEvents="none"
                        >
                          {district.name}
                        </text>
                        <text
                          x={x}
                          y={y + 10}
                          textAnchor="middle"
                          fontSize="6"
                          fill="#1F2937"
                          pointerEvents="none"
                        >
                          {formatNumber(district.population)}
                        </text>
                      </>
                    )}
                  </g>
                );
              })}
              
              {/* Show tooltip for selected district */}
              {selectedDistrict && (() => {
                const district = mpDistricts.find(d => d.id === selectedDistrict);
                if (!district) return null;
                
                let x, y;
                
                // For districts with defined paths
                if (districtPaths[district.id]) {
                  const coords = districtPaths[district.id].split(' ');
                  x = parseFloat(coords[1]) + (parseFloat(coords[5]) - parseFloat(coords[1])) / 2;
                  y = parseFloat(coords[2]) + (parseFloat(coords[10]) - parseFloat(coords[2])) / 2;
                } else {
                  // For districts without defined paths
                  x = ((district.coordinates[0] - 74) / 9) * 600 + 100;
                  y = (((district.coordinates[1] - 21) / 5) * 400) + 100;
                }
                
                return (
                  <g>
                    <rect
                      x={x + 15}
                      y={y - 40}
                      width="120"
                      height="50"
                      rx="5"
                      fill="white"
                      stroke="#E5E7EB"
                      strokeWidth="1"
                    />
                    <text x={x + 25} y={y - 20} fontSize="12" fontWeight="bold" fill="#111827">
                      {district.name}
                    </text>
                    <text x={x + 25} y={y} fontSize="11" fill="#4B5563">
                      Population: {formatNumber(district.population)}
                    </text>
                  </g>
                );
              })()}
            </svg>
          </div>
        </Card>
      </div>
      
      {/* Info and Legend */}
      <MapInfoBox />
      <MapLegend />
    </div>
  );
};

// Health Worker Motivation Component
const HealthWorkerMotivation = ({ onStartGame }) => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  
  const quotes = [
    {
      text: "Your compassion saves lives. Every mother you support, every child you protect is a victory for humanity.",
      author: "Dr. Jane Goodall"
    },
    {
      text: "You are not just a health worker; you are a beacon of hope for communities that need you the most.",
      author: "WHO Director-General"
    },
    {
      text: "The future of our nation rests in the health of our mothers and children. Your work today builds a stronger tomorrow.",
      author: "Community Health Leader"
    },
    {
      text: "In the most challenging environments, your dedication makes the impossible possible. You are the true heroes.",
      author: "UNICEF Representative"
    },
    {
      text: "Each time you reach out to a mother in need, you're not just saving one life, but generations to come.",
      author: "Maternal Health Expert"
    }
  ];

  useEffect(() => {
    // Rotate through quotes automatically
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-[500px] bg-gradient-to-b from-purple-50 to-blue-50">
      <div className="max-w-2xl mx-auto text-center mb-8">
        <div className="relative mb-12">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-4xl text-purple-300">❝</div>
          <div className="min-h-[180px] flex items-center justify-center">
            <p className="text-xl md:text-2xl text-gray-700 italic px-8 transition-opacity duration-500 fade-in">
              {quotes[currentQuoteIndex].text}
            </p>
          </div>
          <div className="mt-4 text-right text-gray-600">
            <span className="inline-block border-t border-gray-300 pt-2 px-4">
              — {quotes[currentQuoteIndex].author}
            </span>
          </div>
        </div>
        
        <div className="flex flex-col items-center mt-8 space-y-6">
          <div className="text-center animate-pulse-slow">
            <HeartPulse className="h-16 w-16 text-pink-500 mx-auto mb-2" />
            <p className="text-gray-600">Your work matters</p>
          </div>
          
          <Button 
            onClick={onStartGame}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-gentle"
          >
            Start Your Mission
          </Button>
          
          <p className="text-sm text-gray-500 max-w-md text-center mt-6">
            By participating in this interactive experience, you're practicing critical decision-making that saves lives in your communities.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-4xl">
        <Card className="bg-white/80 border-t-4 border-pink-400 shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-pink-100 p-2 rounded-full">
                <Heart className="h-5 w-5 text-pink-500" />
              </div>
              <h3 className="font-medium text-gray-700">Maternal Care</h3>
            </div>
            <p className="text-sm text-gray-600">
              Your interventions during pregnancy and childbirth save mothers' lives every day.
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-white/80 border-t-4 border-blue-400 shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Baby className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="font-medium text-gray-700">Child Health</h3>
            </div>
            <p className="text-sm text-gray-600">
              Your vigilance in child healthcare prevents illness and ensures healthy development.
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-white/80 border-t-4 border-green-400 shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-green-100 p-2 rounded-full">
                <Users className="h-5 w-5 text-green-500" />
              </div>
              <h3 className="font-medium text-gray-700">Community Impact</h3>
            </div>
            <p className="text-sm text-gray-600">
              The knowledge you share transforms entire communities for generations to come.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Mission Health Game Component
const MissionHealthGame = ({ onGameComplete }) => {
  const [gameStarted, setGameStarted] = useState(false);

  // Start the game
  const startGame = () => {
    setGameStarted(true);
    toast({
      title: "Mission Started",
      description: "Make strategic decisions to improve maternal and child health outcomes!",
    });
  };

  // Handle game completion
  const handleGameComplete = (score) => {
    if (onGameComplete) {
      onGameComplete(score);
    }
    setGameStarted(false);
    toast({
      title: "Mission Complete!",
      description: `Great job! You achieved a score of ${score}.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {!gameStarted ? (
        <HealthWorkerMotivation onStartGame={startGame} />
      ) : (
        <div className="p-6 text-center">
          {/* Placeholder for the actual game */}
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-green-700 mb-4">Game Coming Soon!</h2>
            <p className="text-gray-600 mb-6">
              We're currently developing an enhanced version of the Mission Health game 
              that will provide a more immersive experience for health workers.
            </p>
            <div className="flex justify-center gap-4">
              <Button 
                onClick={() => handleGameComplete(85)}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Complete Sample Mission
              </Button>
              <Button 
                variant="outline"
                onClick={() => setGameStarted(false)}
              >
                Return to Motivation
              </Button>
            </div>
          </div>
        </div>
      )}
      
      <div className="p-4 text-center">
        <Link to="/journey">
          <Button variant="outline">
            Return to Journey
          </Button>
        </Link>
      </div>
    </div>
  );
};

// Mission Health Animated Header Component
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
    <div className="relative w-full h-52 md:h-60 overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-500 rounded-lg mb-6 shadow-xl max-w-7xl mx-auto">
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

// StatCard Component for MissionHealthDashboard
const StatCard = ({ 
  icon: Icon, 
  title, 
  value, 
  target, 
  color, 
  unit, 
  animationDelay = 0,
  monthlyTarget = 30,
  monthlyValue = 12
}) => {
  const [currentValue, setCurrentValue] = useState(0);
  
  useEffect(() => {
    // Animate the value counting up
    const timer = setTimeout(() => {
      if (currentValue < value) {
        setCurrentValue(Math.min(currentValue + Math.ceil(value / 20), value));
      }
    }, 50);
    
    return () => clearTimeout(timer);
  }, [currentValue, value]);
  
  const percentage = Math.min(100, (currentValue / target) * 100);
  const monthlyPercentage = Math.min(100, (monthlyValue / monthlyTarget) * 100);
  const delayClass = `horizontal-stagger-${animationDelay + 1}`;
  
  return (
    <Card className="overflow-hidden hover-scale transition-all duration-300 border-t-4" style={{ borderTopColor: color }}>
      <CardContent className="p-3">
        <div className="flex justify-between items-start mb-2">
          <div className="flex gap-2 items-center">
            <div className={`p-1.5 rounded-full animate-horizontal-slide-in ${delayClass}`} style={{ backgroundColor: `${color}30` }}>
              <Icon className="h-4 w-4" style={{ color: color }} />
            </div>
            <h3 className="font-medium text-sm text-gray-700">{title}</h3>
          </div>
          <span className="text-xs font-medium text-gray-500">Target: {target.toLocaleString()}</span>
        </div>
        
        <div className="flex items-baseline justify-between mb-1">
          <span className="text-2xl font-bold">{currentValue.toLocaleString()}</span>
          <span className="text-xs text-gray-500">{unit}</span>
        </div>
        
        <div className="relative h-1.5 mt-1 rounded-full overflow-hidden bg-gray-100">
          <div 
            className="absolute top-0 left-0 h-full"
            style={{ 
              backgroundColor: color, 
              width: `${percentage}%`,
            }}
          ></div>
        </div>
        
        <div className="text-right mt-0.5 mb-2">
          <span className="text-xs font-medium" style={{ color }}>
            {percentage.toFixed(0)}% of target
          </span>
        </div>
        
        {/* Monthly progress */}
        <div className="mt-2">
          <div className="flex justify-between items-center mb-0.5">
            <span className="text-xs font-medium text-gray-600">Monthly Progress</span>
            <span className="text-xs font-medium text-gray-600">{monthlyValue} of {monthlyTarget}</span>
          </div>
          <Progress value={monthlyPercentage} className="h-1.5" />
          <div className="text-right mt-0.5">
            <span className="text-xs font-medium" style={{ color }}>
              {monthlyPercentage.toFixed(0)}% completed
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// LiveImpactCounter Component for MissionHealthDashboard
const LiveImpactCounter = () => {
  const [womenHelped, setWomenHelped] = useState(0);
  const [childrenSaved, setChildrenSaved] = useState(0);
  const [activitiesPlanned, setActivitiesPlanned] = useState(120);
  const [activitiesCompleted, setActivitiesCompleted] = useState(78);
  
  useEffect(() => {
    // Periodically increment counters to simulate real-time impact
    const interval = setInterval(() => {
      setWomenHelped(prev => prev + 1);
      if (Math.random() > 0.7) {
        setChildrenSaved(prev => prev + 1);
      }
      if (Math.random() > 0.9) {
        setActivitiesCompleted(prev => Math.min(prev + 1, activitiesPlanned));
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, [activitiesPlanned]);
  
  return (
    <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-2 border border-green-100 animate-fade-in">
      <h3 className="text-center text-gray-700 font-medium text-sm mb-1">Live Impact Counter</h3>
      <div className="grid grid-cols-4 gap-2 text-center">
        <div className="flex flex-col items-center">
          <div className="bg-pink-100 p-1.5 rounded-full mb-1 pulse">
            <HandHeart className="h-3.5 w-3.5 text-pink-500" />
          </div>
          <div className="text-lg font-bold text-pink-600">{womenHelped.toLocaleString()}</div>
          <div className="text-xs text-gray-600">Women Supported</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-blue-100 p-1.5 rounded-full mb-1 pulse">
            <Baby className="h-3.5 w-3.5 text-blue-500" />
          </div>
          <div className="text-lg font-bold text-blue-600">{childrenSaved.toLocaleString()}</div>
          <div className="text-xs text-gray-600">Children Protected</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-purple-100 p-1.5 rounded-full mb-1 pulse">
            <Calendar className="h-3.5 w-3.5 text-purple-500" />
          </div>
          <div className="text-lg font-bold text-purple-600">{activitiesPlanned.toLocaleString()}</div>
          <div className="text-xs text-gray-600">Activities Planned</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-green-100 p-1.5 rounded-full mb-1 pulse">
            <CheckSquare className="h-3.5 w-3.5 text-green-500" />
          </div>
          <div className="text-lg font-bold text-green-600">{activitiesCompleted.toLocaleString()}</div>
          <div className="text-xs text-gray-600">Activities Completed</div>
        </div>
      </div>
    </div>
  );
};

// ImpactDataChart Component for MissionHealthDashboard
const ImpactDataChart = () => {
  const [chartVisible, setChartVisible] = useState(false);
  const data = [
    { name: 'Jan', maternal: 65, child: 48 },
    { name: 'Feb', maternal: 70, child: 53 },
    { name: 'Mar', maternal: 75, child: 60 },
    { name: 'Apr', maternal: 78, child: 63 },
    { name: 'May', maternal: 82, child: 68 },
    { name: 'Jun', maternal: 87, child: 74 },
  ];
  
  useEffect(() => {
    // Show chart with slight delay for animation effect
    const timer = setTimeout(() => {
      setChartVisible(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const config = {
    maternal: {
      label: "Maternal Health",
      color: "#ec4899"
    },
    child: {
      label: "Child Health",
      color: "#3b82f6"
    }
  };
  
  return (
    <Card className="shadow-sm animate-fade-in">
      <CardContent className="p-4">
        <h3 className="font-medium text-gray-700 mb-2 text-sm">Health Impact Trends</h3>
        <div className={`h-[250px] transition-opacity duration-500 ${chartVisible ? 'opacity-100' : 'opacity-0'}`}>
          <ChartContainer config={config} className="h-full w-full">
            <BarChart data={data} className="animate-horizontal-slide-in">
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip cursor={{ fill: '#f3f4f6' }} />
              <Legend />
              <Bar dataKey="maternal" stackId="a" fill="#ec4899" radius={[4, 4, 0, 0]} />
              <Bar dataKey="child" stackId="a" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

// ZohoAnalyticsDashboard Component for MissionHealthDashboard
const ZohoAnalyticsDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [dashboardHeight, setDashboardHeight] = useState(800);
  const [isOpen, setIsOpen] = useState(true);
  const [selectedReport, setSelectedReport] = useState("main");

  // Dashboard report sources
  const reports = {
    main: "https://analytics.zoho.in/open-view/384516000000149412",
    secondary: "https://analytics.zoho.in/open-view/384516000000149022",
    detailed: "https://analytics.zoho.in/open-view/384516000000151355",
    d3visual: "https://dev-edzola.github.io/D3js-/"
  };

  useEffect(() => {
    // Adjust height based on viewport
    const updateHeight = () => {
      const viewportHeight = window.innerHeight;
      setDashboardHeight(Math.max(600, viewportHeight * 0.7));
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    
    // Set a timeout to consider the dashboard as loaded
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    
    return () => {
      window.removeEventListener('resize', updateHeight);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    // Reset loading state when switching reports
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [selectedReport]);

  const handleRefresh = () => {
    setIsLoading(true);
    // Refresh the iframe by changing the src slightly
    const iframe = document.getElementById('zoho-analytics-frame');
    if (iframe) {
      const currentSrc = iframe.src;
      iframe.src = '';
      setTimeout(() => {
        iframe.src = currentSrc + (currentSrc.includes('?') ? '&' : '?') + 'refresh=' + Date.now();
        // Set a timeout to consider the dashboard as loaded again
        setTimeout(() => setIsLoading(false), 3000);
      }, 100);
    }
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="rounded-lg overflow-hidden border shadow-lg mt-6 hover-scale transition-all duration-300"
    >
      <div className="bg-green-50 p-4 border-b border-green-100 flex justify-between items-center">
        <h3 className="font-medium text-green-700 flex items-center gap-2">
          <Shield className="h-4 w-4 text-green-600" /> 
          Antara Foundation's Live Data Dashboard
        </h3>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            className="text-green-600 border-green-200 hover:bg-green-100"
          >
            <RefreshCw className={`h-4 w-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Loading...' : 'Refresh'}
          </Button>
          <CollapsibleTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-green-600 hover:bg-green-100"
            >
              {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
        </div>
      </div>
      
      <CollapsibleContent>
        <div className="bg-white p-2 border-b flex justify-center">
          <ToggleGroup type="single" value={selectedReport} onValueChange={(value) => value && setSelectedReport(value)}>
            <ToggleGroupItem value="main" aria-label="Main Dashboard">
              Main Dashboard
            </ToggleGroupItem>
            <ToggleGroupItem value="secondary" aria-label="Secondary Report">
              Health Metrics
            </ToggleGroupItem>
            <ToggleGroupItem value="detailed" aria-label="Detailed Analysis">
              Detailed Analysis
            </ToggleGroupItem>
            <ToggleGroupItem value="d3visual" aria-label="D3 Visualization">
              D3 Visualization
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        
        <div className="relative" style={{ height: `${dashboardHeight}px` }}>
          {isLoading && (
            <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center z-10">
              <div className="animate-spin h-12 w-12 rounded-full border-4 border-green-500 border-t-transparent mb-4"></div>
              <p className="text-green-700">Loading dashboard data...</p>
            </div>
          )}
          
          {hasError && (
            <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center z-10">
              <div className="text-red-500 mb-4 text-6xl">!</div>
              <p className="text-red-700 mb-2">Unable to load the dashboard</p>
              <Button onClick={handleRefresh} variant="outline" className="mt-2">
                Try Again
              </Button>
            </div>
          )}
          
          <ScrollArea variant="fancy" className="h-full w-full">
            <iframe 
              id="zoho-analytics-frame"
              frameBorder="0" 
              width="100%" 
              height={dashboardHeight} 
              src={reports[selectedReport]}
              className="w-full"
              onLoad={handleIframeLoad}
              onError={handleIframeError}
            ></iframe>
          </ScrollArea>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

// MissionHealthDashboard Component
const MissionHealthDashboard = () => {
  // Calculate total monthly progress across all activities
  const monthlyTargetTotal = 30 * 4; // 30 for each of the 4 cards
  const monthlyValueTotal = 12 + 18 + 24 + 8; // Sum of all monthly values
  
  return (
    <div className="p-3 space-y-4 animate-fade-in">
      <RescueAnimation monthlyTarget={monthlyTargetTotal} completedValue={monthlyValueTotal} />
      
      <div className="mb-3">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Impact Overview</h3>
          <span className="text-xs text-gray-500">Real-time health impact data</span>
        </div>
        
        <LiveImpactCounter />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
        <StatCard 
          icon={Heart} 
          title="Women Supported" 
          value={12547} 
          target={15000} 
          color="#ec4899" 
          unit="women"
          animationDelay={0}
          monthlyTarget={30}
          monthlyValue={12}
        />
        <StatCard 
          icon={Baby} 
          title="Healthy Births" 
          value={8932} 
          target={10000} 
          color="#3b82f6" 
          unit="children"
          animationDelay={1}
          monthlyTarget={30}
          monthlyValue={18}
        />
        <StatCard 
          icon={Shield} 
          title="Children Immunized" 
          value={7652} 
          target={9000} 
          color="#8b5cf6" 
          unit="children"
          animationDelay={2}
          monthlyTarget={30}
          monthlyValue={24}
        />
        <StatCard 
          icon={Users} 
          title="Communities Reached" 
          value={342} 
          target={400} 
          color="#10b981" 
          unit="villages"
          animationDelay={3}
          monthlyTarget={30}
          monthlyValue={8}
        />
      </div>
      
      <ImpactDataChart />
      
      <ZohoAnalyticsDashboard />
    </div>
  );
};

// MissionHealth Component (Main Page)
const MissionHealth = () => {
  const [activeTab, setActiveTab] = useState('game');
  const [achievements, setAchievements] = useState({
    gamesPlayed: 0,
    missionsCompleted: 0,
    highScore: 0
  });
  const [xpPoints, setXpPoints] = useState(0);
  const [level, setLevel] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);

  // Simulated progress towards next level
  const progressToNextLevel = Math.min(100, ((xpPoints % 100) / 100) * 100);

  useEffect(() => {
    // Load saved achievements from localStorage if available
    const savedAchievements = localStorage.getItem('missionHealthAchievements');
    if (savedAchievements) {
      setAchievements(JSON.parse(savedAchievements));
    }

    const savedXp = localStorage.getItem('missionHealthXp');
    if (savedXp) {
      const xp = parseInt(savedXp);
      setXpPoints(xp);
      setLevel(Math.floor(xp / 100) + 1);
    }
  }, []);

  const handleGameComplete = (score) => {
    // Update achievements
    const newAchievements = {
      gamesPlayed: achievements.gamesPlayed + 1,
      missionsCompleted: achievements.missionsCompleted + 1,
      highScore: Math.max(achievements.highScore, score)
    };
    
    setAchievements(newAchievements);
    localStorage.setItem('missionHealthAchievements', JSON.stringify(newAchievements));
    
    // Add XP points
    const newXp = xpPoints + 25; // 25 XP for completing a game
    setXpPoints(newXp);
    localStorage.setItem('missionHealthXp', newXp.toString());
    
    // Calculate new level
    const newLevel = Math.floor(newXp / 100) + 1;
    
    // Level up notification
    if (newLevel > level) {
      setLevel(newLevel);
      setShowConfetti(true);
      toast({
        title: "Level Up!",
        description: `Congratulations! You've reached level ${newLevel}`,
        variant: "default",
      });
      
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };
  
  return (
    <div className="min-h-screen p-4 bg-gray-50">
      {/* Add the animated header at the top of the page */}
      <div className="max-w-7xl mx-auto">
        <MissionHealthAnimatedHeader />
      
        <Card className="shadow-lg border-none mb-4">
          <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-lg">
            {/* Removed the title, description, level and XP indicators */}
          </CardHeader>

          <CardContent className="p-0">
            <Tabs defaultValue="game" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="border-b px-6 py-2">
                <TabsList className="grid grid-cols-2 w-80">
                  <TabsTrigger value="game" className="flex items-center gap-2">
                    <Gamepad2 className="h-4 w-4" />
                    Game
                  </TabsTrigger>
                  <TabsTrigger value="dashboard" className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Dashboard
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="game" className="m-0">
                <MissionHealthGame onGameComplete={handleGameComplete} />
              </TabsContent>
              
              <TabsContent value="dashboard" className="m-0">
                <MissionHealthDashboard />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {/* Confetti animation - simplified version */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-6 bg-white/80 rounded-lg shadow-lg backdrop-blur-sm">
              <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-green-700">Level Up!</h2>
              <p className="text-lg text-gray-700">You reached level {level}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MissionHealth;
