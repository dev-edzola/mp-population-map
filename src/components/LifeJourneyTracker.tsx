
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Trophy, Baby, Heart, GraduationCap, MapPin, Lock, LockOpen, ChevronRight, ChevronLeft } from 'lucide-react';
import { mpDistricts } from '@/data/mpDistricts';
import FusionChartsMap from './FusionChartsMap';

// Define the journey stages
const JOURNEY_STAGES = [
  {
    id: 'pregnancy',
    title: 'Pregnancy',
    description: 'Supporting mothers through regular check-ups and nutrition',
    icon: Heart,
    color: 'bg-pink-100 border-pink-400',
    iconColor: 'text-pink-500',
    impactData: {
      title: 'Maternal Care Impact',
      metrics: [
        { label: 'Mothers Supported', value: 12500 },
        { label: 'Antenatal Check-ups', value: 45000 },
        { label: 'Nutrition Supplements', value: 32000 },
      ]
    }
  },
  {
    id: 'birth',
    title: 'Birth',
    description: 'Ensuring safe deliveries and immediate postnatal care',
    icon: Baby,
    color: 'bg-purple-100 border-purple-400',
    iconColor: 'text-purple-500',
    impactData: {
      title: 'Birth Outcomes Impact',
      metrics: [
        { label: 'Safe Deliveries', value: 9800 },
        { label: 'Postnatal Check-ups', value: 18500 },
        { label: 'Newborn Care Kits', value: 10200 },
      ]
    }
  },
  {
    id: 'early-childhood',
    title: 'Early Childhood',
    description: 'Monitoring growth and providing essential vaccinations',
    icon: Baby,
    color: 'bg-blue-100 border-blue-400',
    iconColor: 'text-blue-500',
    impactData: {
      title: 'Early Childhood Impact',
      metrics: [
        { label: 'Children Vaccinated', value: 22300 },
        { label: 'Growth Monitoring', value: 35600 },
        { label: 'Malnutrition Cases Prevented', value: 4800 },
      ]
    }
  },
  {
    id: 'school-age',
    title: 'School Age',
    description: 'Supporting educational development and continued health',
    icon: GraduationCap,
    color: 'bg-green-100 border-green-400',
    iconColor: 'text-green-500',
    impactData: {
      title: 'School Age Impact',
      metrics: [
        { label: 'School Enrollments', value: 15200 },
        { label: 'Health Check-ups', value: 28900 },
        { label: 'Educational Support Programs', value: 7500 },
      ]
    }
  },
];

const LifeJourneyTracker: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [currentStage, setCurrentStage] = useState(0);
  const [unlockedStages, setUnlockedStages] = useState<string[]>(['pregnancy']);
  
  // Simulate region selection
  const handleRegionSelect = (regionId: string) => {
    setSelectedRegion(regionId);
  };
  
  // Progress to the next stage
  const advanceStage = () => {
    if (currentStage < JOURNEY_STAGES.length - 1) {
      const nextStage = currentStage + 1;
      setCurrentStage(nextStage);
      
      // Unlock the next stage
      const stageId = JOURNEY_STAGES[nextStage].id;
      if (!unlockedStages.includes(stageId)) {
        setUnlockedStages([...unlockedStages, stageId]);
      }
    }
  };
  
  // Return to the previous stage
  const previousStage = () => {
    if (currentStage > 0) {
      setCurrentStage(currentStage - 1);
    }
  };
  
  // Format numbers with commas for better readability
  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('en-IN').format(num);
  };
  
  // Calculate overall progress
  const overallProgress = ((currentStage + 1) / JOURNEY_STAGES.length) * 100;
  
  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <Card className="mb-6 max-w-7xl mx-auto bg-white shadow-lg border-none">
        <CardHeader className="bg-indigo-600 text-white rounded-t-lg">
          <div className="flex justify-between items-center">
            <CardTitle className="text-3xl font-bold">Life Journey Tracker</CardTitle>
            <Trophy className="w-10 h-10 text-yellow-300" />
          </div>
          <CardDescription className="text-indigo-100 mt-2">
            Follow the journey of a mother and child, and discover Antara's real impact
          </CardDescription>
        </CardHeader>
        
        {!selectedRegion ? (
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
              <MapPin className="text-indigo-600" />
              Select a Region
            </h3>
            <p className="mb-4 text-gray-600">
              Choose a district to see how Antara's programs have made an impact in that area.
            </p>
            <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-md">
              <FusionChartsMap />
            </div>
          </CardContent>
        ) : (
          <>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <MapPin className="text-indigo-600" />
                  {selectedRegion && mpDistricts.find(d => d.id === selectedRegion)?.name || 'Selected Region'}
                </h3>
                <Button variant="outline" onClick={() => setSelectedRegion(null)}>
                  Change Region
                </Button>
              </div>
              
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Journey Progress</span>
                  <span className="text-sm font-medium">{Math.round(overallProgress)}%</span>
                </div>
                <Progress value={overallProgress} className="h-3" />
              </div>
              
              {/* Journey Stages */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
                {JOURNEY_STAGES.map((stage, index) => {
                  const isUnlocked = unlockedStages.includes(stage.id);
                  const isActive = index === currentStage;
                  
                  return (
                    <div 
                      key={stage.id}
                      onClick={() => isUnlocked && setCurrentStage(index)}
                      className={`
                        border-2 rounded-lg p-4 flex flex-col items-center text-center transition-all
                        ${stage.color}
                        ${isActive ? 'ring-2 ring-indigo-500 shadow-md transform scale-105' : ''}
                        ${isUnlocked ? 'cursor-pointer hover:shadow-md' : 'opacity-70 cursor-not-allowed'}
                      `}
                    >
                      <div className={`p-3 rounded-full mb-3 ${stage.color}`}>
                        <stage.icon className={`w-8 h-8 ${stage.iconColor}`} />
                      </div>
                      <h4 className="font-bold mb-1">{stage.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{stage.description}</p>
                      <div className="mt-auto">
                        {isUnlocked ? (
                          <LockOpen className="w-5 h-5 text-green-500" />
                        ) : (
                          <Lock className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Current Stage Details */}
              <Card className="border border-indigo-200 bg-indigo-50 mb-6">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl text-indigo-700">
                    {JOURNEY_STAGES[currentStage].title} Stage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <h4 className="font-bold text-lg mb-4">
                    {JOURNEY_STAGES[currentStage].impactData.title}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {JOURNEY_STAGES[currentStage].impactData.metrics.map((metric, idx) => (
                      <Card key={idx} className="bg-white">
                        <CardContent className="p-4 text-center">
                          <p className="text-gray-600 text-sm">{metric.label}</p>
                          <p className="text-2xl font-bold text-indigo-600 mt-1">
                            {formatNumber(metric.value)}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </CardContent>
            
            <CardFooter className="p-6 pt-0 flex justify-between">
              <Button 
                variant="outline"
                onClick={previousStage}
                disabled={currentStage === 0}
                className="flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" /> Previous Stage
              </Button>
              
              <Button 
                onClick={advanceStage}
                disabled={currentStage === JOURNEY_STAGES.length - 1}
                className="bg-indigo-600 hover:bg-indigo-700 flex items-center gap-1"
              >
                Next Stage <ChevronRight className="w-4 h-4" />
              </Button>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
};

export default LifeJourneyTracker;
