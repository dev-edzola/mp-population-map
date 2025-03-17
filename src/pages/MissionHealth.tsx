
import React, { useState, useEffect } from 'react';
import MissionHealthGame from '@/components/MissionHealthGame';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChartBar, Gamepad2, Trophy, Medal, Star, Sparkles, BarChart3 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

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

  const handleGameComplete = (score: number) => {
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
      <Card className="max-w-7xl mx-auto shadow-lg border-none mb-4">
        <CardHeader className="bg-green-600 text-white rounded-t-lg flex flex-row justify-between items-center">
          <div>
            <CardTitle className="text-3xl font-bold mb-2">Mission Health</CardTitle>
            <CardDescription className="text-green-50">
              Play the game and analyze real-world health data to make a difference!
            </CardDescription>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-2 rounded-lg text-center">
              <p className="text-xs text-green-50">Level</p>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-300 fill-yellow-300" />
                <p className="text-xl font-bold">{level}</p>
              </div>
              <div className="w-20">
                <Progress value={progressToNextLevel} className="h-1 mt-1 bg-white/30" />
              </div>
            </div>
            <div className="bg-white/20 p-2 rounded-lg text-center">
              <p className="text-xs text-green-50">XP</p>
              <p className="text-xl font-bold">{xpPoints}</p>
            </div>
          </div>
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
              <div className="p-4">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-4">Your Achievements</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-indigo-200">
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                          <div className="bg-indigo-100 p-3 rounded-full">
                            <Gamepad2 className="h-6 w-6 text-indigo-600" />
                          </div>
                          <div>
                            <p className="text-sm text-indigo-600 font-medium">Games Played</p>
                            <p className="text-2xl font-bold">{achievements.gamesPlayed}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-emerald-200">
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                          <div className="bg-emerald-100 p-3 rounded-full">
                            <Medal className="h-6 w-6 text-emerald-600" />
                          </div>
                          <div>
                            <p className="text-sm text-emerald-600 font-medium">Missions Completed</p>
                            <p className="text-2xl font-bold">{achievements.missionsCompleted}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-yellow-200">
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                          <div className="bg-yellow-100 p-3 rounded-full">
                            <Trophy className="h-6 w-6 text-yellow-600" />
                          </div>
                          <div>
                            <p className="text-sm text-yellow-600 font-medium">High Score</p>
                            <p className="text-2xl font-bold">{achievements.highScore}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <ChartBar className="mr-2 h-5 w-5 text-green-600" />
                    Real-time Maternal Health Dashboard
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Analyze real data from Antara Foundation's health initiatives across Madhya Pradesh.
                    Use insights from this dashboard to inform your game strategy!
                  </p>
                </div>
                
                <div className="rounded-lg overflow-hidden border shadow-lg">
                  <iframe 
                    frameBorder="0" 
                    width="100%" 
                    height="800" 
                    src="https://analytics.zoho.in/open-view/384516000000149412"
                    className="transform transition-transform hover:scale-[1.01]"
                  ></iframe>
                </div>
                
                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <Sparkles className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">Data-Driven Challenge</h4>
                      <p className="text-green-700 text-sm">
                        Study the dashboard data and try to achieve specific health targets in the game. 
                        Can you improve child nutrition by more than 30% in a single game session?
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setActiveTab('game');
                          toast({
                            title: "Challenge Accepted!",
                            description: "Improve child nutrition by 30% to earn bonus XP",
                          });
                        }}
                        className="mt-2 bg-white border-green-300 text-green-700 hover:bg-green-50"
                      >
                        Accept Challenge
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
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
