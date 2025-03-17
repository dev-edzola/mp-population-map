
import React from 'react';
import { Link } from 'react-router-dom';
import FusionChartsMap from '@/components/FusionChartsMap';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import MapInfoBox from '@/components/MapInfoBox';
import MapLegend from '@/components/MapLegend';
import { Baby, ChevronRight, GameController } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <Card className="mb-4 mx-auto max-w-7xl">
        <CardHeader className="text-center border-b pb-3">
          <CardTitle className="text-3xl font-bold text-indigo-800">
            Madhya Pradesh - District Population Map
          </CardTitle>
          <p className="text-gray-500 mt-1">
            Visualization of population distribution across Madhya Pradesh districts
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            <Link to="/journey">
              <Button className="bg-indigo-600 hover:bg-indigo-700 group">
                <Baby className="mr-2 h-4 w-4" />
                Explore Life Journey Tracker
                <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/mission-health">
              <Button className="bg-green-600 hover:bg-green-700 group">
                <GameController className="mr-2 h-4 w-4" />
                Play Mission Health Game
                <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="pt-4 relative">
          <div className="mb-4 relative">
            <FusionChartsMap />
            <MapLegend />
          </div>
          <div className="text-center text-xs text-gray-500 mt-2">
            Data source: Census of India | Color intensity indicates population density
          </div>
          <MapInfoBox />
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
