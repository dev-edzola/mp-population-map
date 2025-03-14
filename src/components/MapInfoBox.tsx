
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mpDistricts } from '@/data/mpDistricts';

const MapInfoBox = () => {
  const totalPopulation = mpDistricts.reduce((sum, district) => sum + district.population, 0);
  const districtCount = mpDistricts.length;
  
  // Format population with commas
  const formattedPopulation = new Intl.NumberFormat('en-IN').format(totalPopulation);
  
  return (
    <Card className="absolute top-4 left-4 w-72 bg-white/90 backdrop-blur-sm shadow-lg z-10">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Madhya Pradesh</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <p><span className="font-medium">Total Population:</span> {formattedPopulation}</p>
          <p><span className="font-medium">Districts:</span> {districtCount}</p>
          <p><span className="font-medium">Capital:</span> Bhopal</p>
          <p className="text-xs text-muted-foreground mt-4">
            Interactive map showing population distribution across districts.
            Hover over districts for details.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MapInfoBox;
