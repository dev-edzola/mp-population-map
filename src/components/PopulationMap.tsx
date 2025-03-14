
import React, { useState } from 'react';
import { mpDistricts, getMaxPopulation, getMinPopulation } from '@/data/mpDistricts';
import MapLegend from './MapLegend';
import MapInfoBox from './MapInfoBox';
import { Card } from '@/components/ui/card';

// Simplified district outlines for MP districts - in a real app, you'd use GeoJSON
const districtPaths: Record<string, string> = {
  "1": "M200,180 L230,160 L260,180 L250,210 L220,220 Z", // Bhopal
  "2": "M150,220 L180,210 L200,240 L180,260 L145,250 Z", // Indore
  "3": "M320,210 L350,200 L370,230 L350,260 L320,250 Z", // Jabalpur
  "4": "M180,100 L210,90 L230,120 L210,140 L170,130 Z", // Gwalior
  "5": "M140,190 L160,180 L180,200 L165,220 L130,210 Z", // Ujjain
  "6": "M250,220 L280,210 L300,240 L280,260 L245,250 Z", // Sagar
  "7": "M170,230 L190,220 L210,250 L190,270 L160,260 Z", // Dewas
  "8": "M350,230 L380,220 L400,250 L380,270 L360,260 Z", // Satna
  "9": "M110,210 L130,200 L150,230 L130,250 L100,240 Z", // Ratlam
  "10": "M380,210 L410,200 L430,230 L410,250 L390,240 Z", // Rewa
  // Creating simplified paths for the top 10 districts by population
  // For a real application, you would use actual GeoJSON data for each district
};

const PopulationMap: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  
  const minPop = getMinPopulation();
  const maxPop = getMaxPopulation();
  const popRange = maxPop - minPop;
  
  // Calculate color intensity based on population
  const getDistrictColor = (population: number) => {
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
                d="M100,100 C150,50 250,50 350,70 C450,90 550,100 650,150 C700,200 720,300 700,400 C650,500 550,520 450,530 C350,540 250,530 150,480 C100,450 80,350 100,250 C120,150 100,100 100,100 Z" 
                fill="#F3F4F6" 
                stroke="#D1D5DB"
                strokeWidth="2"
              />
              
              {/* Plot districts as outlines with colors based on population */}
              {mpDistricts.map((district) => {
                // For districts with defined paths
                if (districtPaths[district.id]) {
                  return (
                    <g key={district.id}>
                      <path
                        d={districtPaths[district.id]}
                        fill={getDistrictColor(district.population)}
                        stroke="white"
                        strokeWidth="1.5"
                        onMouseEnter={() => handleDistrictHover(district.id)}
                        onMouseLeave={() => handleDistrictHover(null)}
                        style={{ cursor: 'pointer' }}
                      />
                      {/* District name label */}
                      <text
                        // Calculate approximate center of the path
                        x={district.id === "1" ? 230 : 
                           district.id === "2" ? 180 :
                           district.id === "3" ? 350 :
                           district.id === "4" ? 200 :
                           district.id === "5" ? 155 :
                           district.id === "6" ? 275 :
                           district.id === "7" ? 190 :
                           district.id === "8" ? 380 :
                           district.id === "9" ? 130 :
                           district.id === "10" ? 410 : 0}
                        y={district.id === "1" ? 195 : 
                           district.id === "2" ? 235 :
                           district.id === "3" ? 230 :
                           district.id === "4" ? 120 :
                           district.id === "5" ? 200 :
                           district.id === "6" ? 240 :
                           district.id === "7" ? 245 :
                           district.id === "8" ? 245 :
                           district.id === "9" ? 225 :
                           district.id === "10" ? 225 : 0}
                        textAnchor="middle"
                        fontSize="10"
                        fill="#4B5563"
                        pointerEvents="none"
                      >
                        {district.name}
                      </text>
                      
                      {/* Population number */}
                      <text
                        x={district.id === "1" ? 230 : 
                           district.id === "2" ? 180 :
                           district.id === "3" ? 350 :
                           district.id === "4" ? 200 :
                           district.id === "5" ? 155 :
                           district.id === "6" ? 275 :
                           district.id === "7" ? 190 :
                           district.id === "8" ? 380 :
                           district.id === "9" ? 130 :
                           district.id === "10" ? 410 : 0}
                        y={district.id === "1" ? 210 : 
                           district.id === "2" ? 250 :
                           district.id === "3" ? 245 :
                           district.id === "4" ? 135 :
                           district.id === "5" ? 215 :
                           district.id === "6" ? 255 :
                           district.id === "7" ? 260 :
                           district.id === "8" ? 260 :
                           district.id === "9" ? 240 :
                           district.id === "10" ? 240 : 0}
                        textAnchor="middle"
                        fontSize="8"
                        fill="#1F2937"
                        pointerEvents="none"
                      >
                        {formatNumber(district.population)}
                      </text>
                    </g>
                  );
                }
                
                // For districts without defined paths, show as circles like before
                const x = ((district.coordinates[0] - 74) / 9) * 600 + 100;
                const y = (((district.coordinates[1] - 21) / 5) * 400) + 100;
                
                // Calculate relative size for circles based on population
                const circleSize = 10 + ((district.population - minPop) / popRange) * 30;
                
                return (
                  <g key={district.id}>
                    <circle
                      cx={x}
                      cy={y}
                      r={circleSize}
                      fill={getDistrictColor(district.population)}
                      stroke="white"
                      strokeWidth="1"
                      opacity="0.8"
                      onMouseEnter={() => handleDistrictHover(district.id)}
                      onMouseLeave={() => handleDistrictHover(null)}
                      style={{ cursor: 'pointer' }}
                    />
                    {district.population > 1500000 && (
                      <>
                        <text
                          x={x}
                          y={y}
                          textAnchor="middle"
                          fontSize="10"
                          fill="#4B5563"
                          pointerEvents="none"
                        >
                          {district.name}
                        </text>
                        <text
                          x={x}
                          y={y + 14}
                          textAnchor="middle"
                          fontSize="8"
                          fill="#1F2937"
                          pointerEvents="none"
                        >
                          {formatNumber(district.population)}
                        </text>
                      </>
                    )}
                  </g>
                );
              })}
              
              {/* Show tooltip for selected district */}
              {selectedDistrict && (() => {
                const district = mpDistricts.find(d => d.id === selectedDistrict);
                if (!district) return null;
                
                // For districts with defined paths
                if (districtPaths[district.id]) {
                  const x = district.id === "1" ? 230 : 
                           district.id === "2" ? 180 :
                           district.id === "3" ? 350 :
                           district.id === "4" ? 200 :
                           district.id === "5" ? 155 :
                           district.id === "6" ? 275 :
                           district.id === "7" ? 190 :
                           district.id === "8" ? 380 :
                           district.id === "9" ? 130 :
                           district.id === "10" ? 410 : 0;
                  
                  const y = district.id === "1" ? 195 : 
                           district.id === "2" ? 235 :
                           district.id === "3" ? 230 :
                           district.id === "4" ? 120 :
                           district.id === "5" ? 200 :
                           district.id === "6" ? 240 :
                           district.id === "7" ? 245 :
                           district.id === "8" ? 245 :
                           district.id === "9" ? 225 :
                           district.id === "10" ? 225 : 0;
                  
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
                }
                
                // For districts without defined paths
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
