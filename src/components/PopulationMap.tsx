
import React, { useState } from 'react';
import { mpDistricts, getMaxPopulation, getMinPopulation } from '@/data/mpDistricts';
import MapLegend from './MapLegend';
import MapInfoBox from './MapInfoBox';
import { Card } from '@/components/ui/card';

// More geographic district outlines for MP districts
const districtPaths: Record<string, string> = {
  "1": "M310,250 L330,230 L360,240 L370,270 L340,290 L310,270 Z", // Bhopal
  "2": "M140,350 L170,330 L200,350 L190,380 L150,390 Z", // Indore
  "3": "M440,230 L470,210 L500,230 L490,260 L450,270 Z", // Jabalpur
  "4": "M250,90 L280,70 L310,90 L300,120 L270,130 Z", // Gwalior
  "5": "M170,290 L200,270 L230,290 L220,320 L180,330 Z", // Ujjain
  "6": "M380,200 L410,180 L440,200 L430,230 L390,240 Z", // Sagar
  "7": "M200,320 L230,300 L260,320 L250,350 L210,360 Z", // Dewas
  "8": "M500,170 L530,150 L560,170 L550,200 L510,210 Z", // Satna
  "9": "M120,310 L150,290 L180,310 L170,340 L130,350 Z", // Ratlam
  "10": "M540,140 L570,120 L600,140 L590,170 L550,180 Z", // Rewa
  "11": "M470,280 L490,260 L520,280 L510,310 L470,320 Z", // Katni
  "12": "M160,390 L190,370 L220,390 L210,420 L170,430 Z", // Khargone
  "13": "M90,230 L120,210 L150,230 L140,260 L100,270 Z", // Neemuch
  "14": "M130,260 L160,240 L190,260 L180,290 L140,300 Z", // Mandsaur
  "15": "M150,370 L180,350 L210,370 L200,400 L160,410 Z", // Dhar
  "16": "M410,310 L440,290 L470,310 L460,340 L420,350 Z", // Chhindwara
  "17": "M460,360 L490,340 L520,360 L510,390 L470,400 Z", // Balaghat
  "18": "M340,310 L370,290 L400,310 L390,340 L350,350 Z", // Hoshangabad
  "19": "M370,360 L400,340 L430,360 L420,390 L380,400 Z", // Betul
  "20": "M330,200 L360,180 L390,200 L380,230 L340,240 Z", // Vidisha
  "21": "M220,60 L250,40 L280,60 L270,90 L230,100 Z", // Morena
  "22": "M250,150 L280,130 L310,150 L300,180 L260,190 Z", // Shivpuri
  "23": "M400,170 L430,150 L460,170 L450,200 L410,210 Z", // Damoh
  "24": "M350,150 L380,130 L410,150 L400,180 L360,190 Z", // Tikamgarh
  "25": "M430,120 L460,100 L490,120 L480,150 L440,160 Z", // Panna
  "26": "M290,230 L320,210 L350,230 L340,260 L300,270 Z", // Sehore
  "27": "M350,230 L380,210 L410,230 L400,260 L360,270 Z", // Raisen
  "28": "M240,240 L270,220 L300,240 L290,270 L250,280 Z", // Rajgarh
  "29": "M210,270 L240,250 L270,270 L260,300 L220,310 Z", // Shajapur
  "30": "M290,330 L320,310 L350,330 L340,360 L300,370 Z", // Harda
  "31": "M180,410 L210,390 L240,410 L230,440 L190,450 Z", // Barwani
  "32": "M240,360 L270,340 L300,360 L290,390 L250,400 Z", // Khandwa
  "33": "M230,430 L260,410 L290,430 L280,460 L240,470 Z", // Burhanpur
  "34": "M300,130 L330,110 L360,130 L350,160 L310,170 Z", // Ashoknagar
  "35": "M300,90 L330,70 L360,90 L350,120 L310,130 Z", // Datia
  "36": "M190,80 L220,60 L250,80 L240,110 L200,120 Z", // Bhind
  "37": "M410,240 L440,220 L470,240 L460,270 L420,280 Z", // Narsinghpur
  "38": "M440,290 L470,270 L500,290 L490,320 L450,330 Z", // Seoni
  "39": "M480,310 L510,290 L540,310 L530,340 L490,350 Z", // Mandla
  "40": "M510,340 L540,320 L570,340 L560,370 L520,380 Z", // Dindori
  "41": "M540,290 L570,270 L600,290 L590,320 L550,330 Z", // Shahdol
  "42": "M520,260 L550,240 L580,260 L570,290 L530,300 Z", // Umaria
  "43": "M560,190 L590,170 L620,190 L610,220 L570,230 Z", // Sidhi
  "44": "M590,230 L620,210 L650,230 L640,260 L600,270 Z", // Singrauli
  "45": "M120,370 L150,350 L180,370 L170,400 L130,410 Z", // Jhabua
  "46": "M90,410 L120,390 L150,410 L140,440 L100,450 Z", // Alirajpur
  "47": "M560,260 L590,240 L620,260 L610,290 L570,300 Z", // Anuppur
  "48": "M340,120 L370,100 L400,120 L390,150 L350,160 Z", // Niwari
  "49": "M190,250 L220,230 L250,250 L240,280 L200,290 Z", // Agar Malwa
  "50": "M160,120 L190,100 L220,120 L210,150 L170,160 Z", // Sheopur
  "51": "M390,130 L420,110 L450,130 L440,160 L400,170 Z", // Chhatarpur
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
            <svg width="100%" height="100%" viewBox="0 0 700 500" preserveAspectRatio="xMidYMid meet">
              {/* Background for MP state */}
              <path 
                d="M50,150 C150,50 350,50 500,100 C600,150 650,250 600,350 C550,450 400,480 250,450 C150,420 50,350 50,250 C50,200 50,150 50,150 Z" 
                fill="#F3F4F6" 
                stroke="#D1D5DB"
                strokeWidth="2"
              />
              
              {/* Plot districts as paths with colors based on population */}
              {mpDistricts.map((district) => {
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
                        x={parseFloat(districtPaths[district.id].split(' ')[1]) + 
                           (parseFloat(districtPaths[district.id].split(' ')[5]) - 
                            parseFloat(districtPaths[district.id].split(' ')[1])) / 2}
                        y={parseFloat(districtPaths[district.id].split(' ')[2]) + 
                           (parseFloat(districtPaths[district.id].split(' ')[10]) - 
                            parseFloat(districtPaths[district.id].split(' ')[2])) / 2}
                        textAnchor="middle"
                        fontSize="8"
                        fill="#4B5563"
                        pointerEvents="none"
                      >
                        {district.name}
                      </text>
                      
                      {/* Population number */}
                      <text
                        x={parseFloat(districtPaths[district.id].split(' ')[1]) + 
                           (parseFloat(districtPaths[district.id].split(' ')[5]) - 
                            parseFloat(districtPaths[district.id].split(' ')[1])) / 2}
                        y={parseFloat(districtPaths[district.id].split(' ')[2]) + 
                           (parseFloat(districtPaths[district.id].split(' ')[10]) - 
                            parseFloat(districtPaths[district.id].split(' ')[2])) / 2 + 10}
                        textAnchor="middle"
                        fontSize="6"
                        fill="#1F2937"
                        pointerEvents="none"
                      >
                        {formatNumber(district.population)}
                      </text>
                    </g>
                  );
                }
                
                // Fallback for any districts without paths - show as circles
                const x = ((district.coordinates[0] - 74) / 9) * 600 + 100;
                const y = (((district.coordinates[1] - 21) / 5) * 400) + 100;
                
                // Calculate relative size for circles based on population
                const circleSize = 8 + ((district.population - minPop) / popRange) * 20;
                
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
                          fontSize="8"
                          fill="#4B5563"
                          pointerEvents="none"
                        >
                          {district.name}
                        </text>
                        <text
                          x={x}
                          y={y + 10}
                          textAnchor="middle"
                          fontSize="6"
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
                
                let x, y;
                
                // For districts with defined paths
                if (districtPaths[district.id]) {
                  const coords = districtPaths[district.id].split(' ');
                  x = parseFloat(coords[1]) + (parseFloat(coords[5]) - parseFloat(coords[1])) / 2;
                  y = parseFloat(coords[2]) + (parseFloat(coords[10]) - parseFloat(coords[2])) / 2;
                } else {
                  // For districts without defined paths
                  x = ((district.coordinates[0] - 74) / 9) * 600 + 100;
                  y = (((district.coordinates[1] - 21) / 5) * 400) + 100;
                }
                
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
