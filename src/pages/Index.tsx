
import React from 'react';
import FusionChartsMap from '@/components/FusionChartsMap';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MapInfoBox from '@/components/MapInfoBox';
import MapLegend from '@/components/MapLegend';

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
