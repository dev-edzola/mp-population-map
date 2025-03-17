
import React from 'react';
import { Link } from 'react-router-dom';
import LifeJourneyTracker from '@/components/LifeJourneyTracker';
import { Button } from '@/components/ui/button';
import { Gamepad2 } from 'lucide-react';

const LifeJourney = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4">
        <div className="flex justify-end mb-4">
          <Link to="/mission-health">
            <Button className="bg-green-600 hover:bg-green-700 flex items-center gap-2">
              <Gamepad2 className="h-4 w-4" />
              Play Mission Health Game
            </Button>
          </Link>
        </div>
        <LifeJourneyTracker />
      </div>
    </div>
  );
};

export default LifeJourney;
