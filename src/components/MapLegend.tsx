
import React from 'react';
import { getMaxPopulation, getMinPopulation } from '@/data/mpDistricts';

const MapLegend = () => {
  const min = getMinPopulation();
  const max = getMaxPopulation();
  
  // Format numbers with commas
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  return (
    <div className="absolute bottom-8 right-8 bg-white p-4 rounded-md shadow-md z-10 max-w-xs">
      <h3 className="text-sm font-semibold mb-2">Population Density</h3>
      <div className="flex items-center space-x-2">
        <div className="w-full h-4 bg-gradient-to-r from-map-lowDensity via-map-mediumDensity to-map-highDensity rounded"></div>
      </div>
      <div className="flex justify-between mt-1 text-xs text-gray-600">
        <span>{formatNumber(min)}</span>
        <span>{formatNumber(Math.floor((max + min) / 2))}</span>
        <span>{formatNumber(max)}</span>
      </div>
    </div>
  );
};

export default MapLegend;
