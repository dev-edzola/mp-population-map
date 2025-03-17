import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  MapPin, 
  Heart, 
  Baby, 
  Syringe, 
  Bandage, 
  Hospital, 
  Trophy, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  X,
  ChartBar,
  Gamepad2
} from 'lucide-react';
import { mpDistricts } from '@/data/mpDistricts';
import FusionChartsMap from './FusionChartsMap';
import { toast } from '@/hooks/use-toast';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

// Types for our game
interface HealthMetric {
  name: string;
  value: number;
  target: number;
  icon: React.ElementType;
  color: string;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  impact: {
    [key: string]: number; // Effect on metrics
  };
  cost: number;
  requiredResources: number;
}

interface Intervention {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  impact: {
    [key: string]: number; // Effect on metrics
  };
  cost: number;
  requiredResources: number;
}

interface MissionHealthGameProps {
  onGameComplete?: (score: number) => void;
}

// Game challenges
const CHALLENGES: Challenge[] = [
  {
    id: 'malnutrition',
    title: 'Child Malnutrition Crisis',
    description: 'Many children in the village are suffering from malnutrition, affecting their development.',
    icon: Baby,
    color: 'bg-orange-100 border-orange-500 text-orange-500',
    impact: {
      nutrition: -20,
      childHealth: -15,
    },
    cost: 0,
    requiredResources: 20,
  },
  {
    id: 'prenatal',
    title: 'Lack of Prenatal Care',
    description: 'Pregnant women in the community lack access to regular prenatal check-ups.',
    icon: Heart,
    color: 'bg-pink-100 border-pink-500 text-pink-500',
    impact: {
      maternalHealth: -25,
      childHealth: -10,
    },
    cost: 0,
    requiredResources: 25,
  },
  {
    id: 'immunization',
    title: 'Low Immunization Rates',
    description: 'Many children in the village haven\'t received their required vaccinations.',
    icon: Syringe,
    color: 'bg-blue-100 border-blue-500 text-blue-500',
    impact: {
      childHealth: -20,
      diseaseControl: -30,
    },
    cost: 0,
    requiredResources: 30,
  },
];

// Interventions that players can deploy
const INTERVENTIONS: Intervention[] = [
  {
    id: 'health-camp',
    title: 'Conduct Health Camp',
    description: 'Organize a comprehensive health camp in the village.',
    icon: Hospital,
    color: 'bg-purple-100 border-purple-500 text-purple-500',
    impact: {
      childHealth: 15,
      maternalHealth: 10,
      diseaseControl: 20,
    },
    cost: 20,
    requiredResources: 30,
  },
  {
    id: 'nutrition-kits',
    title: 'Provide Nutrition Kits',
    description: 'Distribute nutrition kits to households with malnourished children.',
    icon: Baby,
    color: 'bg-green-100 border-green-500 text-green-500',
    impact: {
      nutrition: 25,
      childHealth: 15,
    },
    cost: 15,
    requiredResources: 20,
  },
  {
    id: 'vaccination-drive',
    title: 'Launch Vaccination Drive',
    description: 'Conduct a door-to-door vaccination campaign for children.',
    icon: Syringe,
    color: 'bg-blue-100 border-blue-500 text-blue-500',
    impact: {
      childHealth: 10,
      diseaseControl: 30,
    },
    cost: 25,
    requiredResources: 25,
  },
  {
    id: 'prenatal-checkups',
    title: 'Prenatal Care Program',
    description: 'Establish regular prenatal checkups for pregnant women.',
    icon: Heart,
    color: 'bg-pink-100 border-pink-500 text-pink-500',
    impact: {
      maternalHealth: 30,
      childHealth: 5,
    },
    cost: 20,
    requiredResources: 15,
  },
  {
    id: 'medical-training',
    title: 'Train Health Workers',
    description: 'Train local health workers on maternal and child health.',
    icon: Bandage,
    color: 'bg-indigo-100 border-indigo-500 text-indigo-500',
    impact: {
      maternalHealth: 15,
      childHealth: 15,
      diseaseControl: 10,
      nutrition: 10,
    },
    cost: 30,
    requiredResources: 10,
  },
];

const MissionHealthGame: React.FC<MissionHealthGameProps> = ({ onGameComplete }) => {
  // Game state
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [round, setRound] = useState(1);
  const [resources, setResources] = useState(100);
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);
  const [availableInterventions, setAvailableInterventions] = useState<Intervention[]>([]);
  const [selectedInterventions, setSelectedInterventions] = useState<string[]>([]);
  const [healthMetrics, setHealthMetrics] = useState<HealthMetric[]>([
    { name: 'Child Health', value: 50, target: 80, icon: Baby, color: '#3b82f6' },
    { name: 'Maternal Health', value: 45, target: 85, icon: Heart, color: '#ec4899' },
    { name: 'Nutrition', value: 40, target: 75, icon: Baby, color: '#10b981' },
    { name: 'Disease Control', value: 35, target: 70, icon: Syringe, color: '#8b5cf6' },
  ]);
  
  // Handle region selection
  const handleRegionSelect = (regionId: string) => {
    setSelectedRegion(regionId);
  };
  
  // Start the game
  const startGame = () => {
    if (!selectedRegion) {
      toast({
        title: "Error",
        description: "Please select a region first",
        variant: "destructive",
      });
      return;
    }
    
    // Assign a random challenge to start with
    const randomChallenge = CHALLENGES[Math.floor(Math.random() * CHALLENGES.length)];
    setActiveChallenge(randomChallenge);
    
    // Assign random interventions based on the challenge
    const shuffledInterventions = [...INTERVENTIONS].sort(() => 0.5 - Math.random());
    setAvailableInterventions(shuffledInterventions.slice(0, 3));
    
    setGameStarted(true);
  };
  
  // Select or deselect an intervention
  const toggleIntervention = (interventionId: string) => {
    if (selectedInterventions.includes(interventionId)) {
      setSelectedInterventions(selectedInterventions.filter(id => id !== interventionId));
    } else {
      // Calculate if there are enough resources
      const intervention = availableInterventions.find(i => i.id === interventionId);
      if (intervention && intervention.cost <= resources) {
        setSelectedInterventions([...selectedInterventions, interventionId]);
      } else {
        toast({
          title: "Not enough resources",
          description: "You don't have enough resources for this intervention",
          variant: "destructive",
        });
      }
    }
  };
  
  // Apply selected interventions and move to next round
  const applyInterventions = () => {
    if (selectedInterventions.length === 0) {
      toast({
        title: "Warning",
        description: "Please select at least one intervention",
        variant: "default",
      });
      return;
    }
    
    // Calculate new metrics based on selected interventions
    const newMetrics = [...healthMetrics];
    let remainingResources = resources;
    
    // Apply effects of active challenge
    if (activeChallenge) {
      Object.entries(activeChallenge.impact).forEach(([metricName, impact]) => {
        const metricIndex = newMetrics.findIndex(m => m.name.toLowerCase().includes(metricName.toLowerCase()));
        if (metricIndex !== -1) {
          newMetrics[metricIndex] = {
            ...newMetrics[metricIndex],
            value: Math.max(0, Math.min(100, newMetrics[metricIndex].value + impact)),
          };
        }
      });
    }
    
    // Apply effects of selected interventions
    selectedInterventions.forEach(interventionId => {
      const intervention = availableInterventions.find(i => i.id === interventionId);
      if (intervention) {
        // Deduct cost
        remainingResources -= intervention.cost;
        
        // Apply impact to metrics
        Object.entries(intervention.impact).forEach(([metricName, impact]) => {
          const metricIndex = newMetrics.findIndex(m => m.name.toLowerCase().includes(metricName.toLowerCase()));
          if (metricIndex !== -1) {
            newMetrics[metricIndex] = {
              ...newMetrics[metricIndex],
              value: Math.max(0, Math.min(100, newMetrics[metricIndex].value + impact)),
            };
          }
        });
      }
    });
    
    // Update state
    setHealthMetrics(newMetrics);
    setResources(remainingResources);
    
    // Clear selected interventions
    setSelectedInterventions([]);
    
    // Check if all targets are met
    const allTargetsMet = newMetrics.every(metric => metric.value >= metric.target);
    
    if (allTargetsMet) {
      setGameCompleted(true);
      
      // Calculate score based on metrics and remaining resources
      const metricsScore = newMetrics.reduce((acc, metric) => acc + metric.value, 0);
      const resourceScore = remainingResources * 2;
      const totalScore = Math.floor((metricsScore + resourceScore) / 10);
      
      // Call the onGameComplete prop with the score
      if (onGameComplete) {
        onGameComplete(totalScore);
      }
      
      toast({
        title: "Congratulations!",
        description: "You've successfully improved all health metrics!",
      });
      return;
    }
    
    // Move to next round
    const nextRound = round + 1;
    setRound(nextRound);
    
    // Assign a new random challenge
    const newChallenge = CHALLENGES[Math.floor(Math.random() * CHALLENGES.length)];
    setActiveChallenge(newChallenge);
    
    // Assign new random interventions
    const shuffledInterventions = [...INTERVENTIONS].sort(() => 0.5 - Math.random());
    setAvailableInterventions(shuffledInterventions.slice(0, 3));
    
    // Add some resources for the next round
    setResources(prev => prev + 30);
    
    toast({
      title: "Round " + nextRound,
      description: "New challenge awaits!",
    });
  };
  
  // Reset the game
  const resetGame = () => {
    setGameStarted(false);
    setGameCompleted(false);
    setRound(1);
    setResources(100);
    setActiveChallenge(null);
    setAvailableInterventions([]);
    setSelectedInterventions([]);
    setHealthMetrics([
      { name: 'Child Health', value: 50, target: 80, icon: Baby, color: '#3b82f6' },
      { name: 'Maternal Health', value: 45, target: 85, icon: Heart, color: '#ec4899' },
      { name: 'Nutrition', value: 40, target: 75, icon: Baby, color: '#10b981' },
      { name: 'Disease Control', value: 35, target: 70, icon: Syringe, color: '#8b5cf6' },
    ]);
  };
  
  // Calculate overall progress
  const overallProgress = healthMetrics.reduce((acc, metric) => {
    const progress = (metric.value / metric.target) * 100;
    return acc + Math.min(progress, 100);
  }, 0) / healthMetrics.length;
  
  // Format for chart data
  const chartData = healthMetrics.map(metric => ({
    name: metric.name,
    value: metric.value,
    target: metric.target,
  }));
  
  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <Card className="max-w-7xl mx-auto shadow-lg border-none">
        <CardHeader className="bg-green-600 text-white rounded-t-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1584515933487-779824d29309?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80')] bg-cover opacity-20"></div>
          <div className="flex justify-between items-center relative z-10">
            <div>
              <CardTitle className="text-3xl font-bold mb-2">Mission Health: Save the Village</CardTitle>
              <CardDescription className="text-green-50 max-w-2xl">
                Take on the role of a health worker and make decisions that impact maternal and child health metrics. 
                Deploy Antara's interventions to overcome challenges and improve health outcomes.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {gameStarted && (
                <div className="bg-white/20 p-2 rounded-lg text-center">
                  <p className="text-xs text-green-50">Round</p>
                  <p className="text-xl font-bold">{round}</p>
                </div>
              )}
              <div className="bg-white/20 p-2 rounded-lg text-center">
                <p className="text-xs text-green-50">Resources</p>
                <p className="text-xl font-bold">{resources}</p>
              </div>
            </div>
          </div>
          
          {gameStarted && !gameCompleted && (
            <div className="mt-4 relative z-10">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm font-medium">{Math.round(overallProgress)}%</span>
              </div>
              <Progress value={overallProgress} className="h-3 bg-white/30" />
            </div>
          )}
        </CardHeader>
        
        <CardContent className="p-6">
          {!gameStarted ? (
            // Game Start Screen
            <>
              <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
                <MapPin className="text-green-600" />
                Select a Region
              </h3>
              <p className="mb-4 text-gray-600">
                Choose a district to begin your health mission. 
                Each region has unique challenges that you'll need to address.
              </p>
              <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-md mb-6 border border-gray-200">
                <FusionChartsMap />
              </div>
              
              <div className="flex justify-center">
                <Button 
                  onClick={startGame}
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 text-lg"
                >
                  Start Mission
                </Button>
              </div>
            </>
          ) : gameCompleted ? (
            // Game Completed Screen
            <div className="text-center py-8">
              <div className="inline-block p-4 bg-green-100 rounded-full mb-6">
                <Trophy className="w-16 h-16 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-green-700 mb-4">Mission Accomplished!</h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Congratulations! You've successfully improved the health metrics in the village, 
                making a significant impact on maternal and child health outcomes.
              </p>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Your Impact</h3>
                <div className="h-[300px] mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar name="Current Value" dataKey="value" fill="#10b981" />
                      <Bar name="Target Value" dataKey="target" fill="#6366f1" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="flex justify-center gap-4">
                <Button 
                  onClick={resetGame}
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-6"
                >
                  Play Again
                </Button>
                <Link to="/journey">
                  <Button variant="outline">
                    Return to Journey
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            // Game Play Screen
            <div>
              {/* Active Challenge */}
              {activeChallenge && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">Current Challenge</h3>
                  <Card className={`border-2 ${activeChallenge.color.split(' ')[1]}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-full ${activeChallenge.color.split(' ')[0]}`}>
                          <activeChallenge.icon className={`w-8 h-8 ${activeChallenge.color.split(' ')[2]}`} />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg">{activeChallenge.title}</h4>
                          <p className="text-gray-600">{activeChallenge.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
              
              {/* Health Metrics */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <ChartBar className="text-green-600" /> 
                  Health Metrics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {healthMetrics.map((metric, index) => (
                    <Card key={index} className="border">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <metric.icon className="w-5 h-5" style={{ color: metric.color }} />
                            <span className="font-medium">{metric.name}</span>
                          </div>
                          <span className="text-sm">
                            {metric.value} / {metric.target}
                          </span>
                        </div>
                        <Progress 
                          value={(metric.value / metric.target) * 100} 
                          className="h-2"
                          style={{ 
                            '--tw-bg-opacity': '0.3', 
                            backgroundColor: `${metric.color}40`,
                          } as React.CSSProperties}
                        />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              {/* Available Interventions */}
              <div>
                <h3 className="text-xl font-semibold mb-3">Available Interventions</h3>
                <p className="text-gray-600 mb-4">
                  Select interventions to deploy in response to the current challenge:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {availableInterventions.map((intervention) => {
                    const isSelected = selectedInterventions.includes(intervention.id);
                    const canAfford = intervention.cost <= resources;
                    
                    return (
                      <Card 
                        key={intervention.id}
                        className={`border-2 transition-all cursor-pointer ${
                          isSelected 
                            ? 'ring-2 ring-green-500 shadow-md transform scale-[1.02]' 
                            : canAfford 
                              ? 'hover:shadow-md hover:border-green-200' 
                              : 'opacity-50'
                        } ${intervention.color.split(' ')[1]}`}
                        onClick={() => canAfford && toggleIntervention(intervention.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div className={`p-2 rounded-full ${intervention.color.split(' ')[0]}`}>
                              <intervention.icon className={`w-6 h-6 ${intervention.color.split(' ')[2]}`} />
                            </div>
                            <div className="flex items-center gap-1 font-medium">
                              <span>Cost: {intervention.cost}</span>
                            </div>
                          </div>
                          
                          <h4 className="font-bold mt-3">{intervention.title}</h4>
                          <p className="text-gray-600 text-sm mt-1 mb-3">{intervention.description}</p>
                          
                          <div className="mt-auto">
                            {isSelected ? (
                              <div className="flex items-center text-green-600">
                                <Check className="w-4 h-4 mr-1" />
                                <span className="text-sm font-medium">Selected</span>
                              </div>
                            ) : !canAfford ? (
                              <div className="flex items-center text-red-500">
                                <X className="w-4 h-4 mr-1" />
                                <span className="text-sm font-medium">Not enough resources</span>
                              </div>
                            ) : null}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="p-6 pt-0 flex justify-between">
          {gameStarted && !gameCompleted ? (
            <>
              <Button 
                variant="outline"
                onClick={resetGame}
              >
                Reset Mission
              </Button>
              
              <Button 
                onClick={applyInterventions}
                disabled={selectedInterventions.length === 0}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Deploy Interventions
              </Button>
            </>
          ) : (
            <div></div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

MissionHealthGame.defaultProps = {
  onGameComplete: () => {},
};

export default MissionHealthGame;
