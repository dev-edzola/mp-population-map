
import React from 'react';
import PopulationMap from '@/components/PopulationMap';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <Card className="mb-4 mx-auto max-w-5xl">
        <CardHeader className="text-center border-b pb-3">
          <CardTitle className="text-3xl font-bold text-indigo-800">
            Madhya Pradesh - District Population Map
          </CardTitle>
          <p className="text-gray-500 mt-1">
            Visualization of population distribution across Madhya Pradesh districts
          </p>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="mb-4">
            <PopulationMap />
          </div>
          <div className="text-center text-xs text-gray-500 mt-2">
            Data source: Census of India | Color intensity indicates population density
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
