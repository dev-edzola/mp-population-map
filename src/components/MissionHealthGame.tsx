
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import HealthWorkerMotivation from './HealthWorkerMotivation';
import { toast } from '@/hooks/use-toast';

interface MissionHealthGameProps {
  onGameComplete?: (score: number) => void;
}

const MissionHealthGame: React.FC<MissionHealthGameProps> = ({ onGameComplete }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const navigate = useNavigate();

  // Start the game (now redirects to health wordle)
  const startGame = () => {
    navigate('/health-wordle');
  };

  // Handle game completion
  const handleGameComplete = (score: number) => {
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

MissionHealthGame.defaultProps = {
  onGameComplete: () => {},
};

export default MissionHealthGame;
