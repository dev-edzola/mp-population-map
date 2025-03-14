
import React, { useState } from 'react';
import { mpDistricts, getMaxPopulation, getMinPopulation } from '@/data/mpDistricts';
import MapLegend from './MapLegend';
import MapInfoBox from './MapInfoBox';
import { Card } from '@/components/ui/card';

const PopulationMap: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  
  const minPop = getMinPopulation();
  const maxPop = getMaxPopulation();
  const popRange = maxPop - minPop;
  
  // Calculate the relative size for circles based on population
  const getCircleSize = (population: number) => {
    const normalized = (population - minPop) / popRange;
    return 10 + normalized * 30; // Between 10 and 40px
  };
  
  // Calculate color intensity based on population
  const getCircleColor = (population: number) => {
    const normalizedPop = (population - minPop) / popRange;
    
    // Interpolate between colors based on population density
    if (normalizedPop < 0.33) {
      return '#E5DEFF'; // Light purple for low density
    } else if (normalizedPop < 0.66) {
      return '#A78BFA'; // Medium purple for medium density
    } else {
      return '#7C3AED'; // Dark purple for high density
    }
  };

  const handleDistrictHover = (districtId: string | null) => {
    setSelectedDistrict(districtId);
  };

  // Format numbers with commas
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  return (
    <div className="relative w-full h-[calc(100vh-2rem)]">
      <div className="absolute inset-0 rounded-lg shadow-lg bg-white overflow-hidden">
        <Card className="h-full w-full relative p-4">
          <div className="h-full w-full relative">
            {/* SVG Map */}
            <svg width="100%" height="100%" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet">
              {/* Background for MP state - simplified outline */}
              <path 
                d="M150,150 L650,150 L650,450 L150,450 Z" 
                fill="#F3F4F6" 
                stroke="#D1D5DB"
                strokeWidth="1"
              />
              
              {/* Plot districts as circles */}
              {mpDistricts.map((district) => {
                // Map lat/long to x/y coordinates in our 800x600 viewBox
                // This is a very simplified approach - in a real app you'd use proper geospatial projections
                const x = ((district.coordinates[0] - 74) / 9) * 600 + 100;
                const y = (((district.coordinates[1] - 21) / 5) * 400) + 100;
                
                return (
                  <g key={district.id}>
                    <circle
                      cx={x}
                      cy={y}
                      r={getCircleSize(district.population)}
                      fill={getCircleColor(district.population)}
                      stroke="white"
                      strokeWidth="1"
                      opacity="0.8"
                      onMouseEnter={() => handleDistrictHover(district.id)}
                      onMouseLeave={() => handleDistrictHover(null)}
                      style={{ cursor: 'pointer' }}
                    />
                    {district.population > 2000000 && (
                      <text
                        x={x}
                        y={y}
                        textAnchor="middle"
                        dy="0.3em"
                        fontSize="10"
                        fill="#4B5563"
                        pointerEvents="none"
                      >
                        {district.name}
                      </text>
                    )}
                  </g>
                );
              })}
              
              {/* Show tooltip for selected district */}
              {selectedDistrict && (() => {
                const district = mpDistricts.find(d => d.id === selectedDistrict);
                if (!district) return null;
                
                const x = ((district.coordinates[0] - 74) / 9) * 600 + 100;
                const y = (((district.coordinates[1] - 21) / 5) * 400) + 100;
                
                return (
                  <g>
                    <rect
                      x={x + 15}
                      y={y - 40}
                      width="120"
                      height="50"
                      rx="5"
                      fill="white"
                      stroke="#E5E7EB"
                      strokeWidth="1"
                    />
                    <text x={x + 25} y={y - 20} fontSize="12" fontWeight="bold" fill="#111827">
                      {district.name}
                    </text>
                    <text x={x + 25} y={y} fontSize="11" fill="#4B5563">
                      Population: {formatNumber(district.population)}
                    </text>
                  </g>
                );
              })()}
            </svg>
          </div>
        </Card>
      </div>
      
      {/* Info and Legend */}
      <MapInfoBox />
      <MapLegend />
    </div>
  );
};

export default PopulationMap;
