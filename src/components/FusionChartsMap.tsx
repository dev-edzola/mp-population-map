
import React, { useState } from 'react';
import FusionCharts from 'fusioncharts';
import Maps from 'fusioncharts/fusioncharts.maps';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import { mpDistricts, getMaxPopulation, getMinPopulation } from '@/data/mpDistricts';
import { Card, CardContent } from '@/components/ui/card';

// Initialize FusionCharts with necessary modules
ReactFC.fcRoot(FusionCharts, Maps, FusionTheme);

const FusionChartsMap: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  
  const minPop = getMinPopulation();
  const maxPop = getMaxPopulation();
  
  // Format numbers with commas
  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  // Prepare the data for FusionCharts
  const mapData = mpDistricts.map(district => ({
    id: district.id,
    value: district.population,
    displayValue: district.name,
    toolText: `${district.name}: ${formatNumber(district.population)}`
  }));

  // FusionCharts configuration
  const chartConfigs = {
    type: 'india',
    width: '100%',
    height: '600',
    dataFormat: 'json',
    dataSource: {
      chart: {
        animation: '1',
        showLabels: '1',
        includeValueInLabels: '0',
        useSNameInLabels: '0',
        theme: 'fusion',
        nullEntityColor: '#F8F8F8',
        legendPosition: 'bottom',
        legendCaption: 'Population Density',
        defaultPalette: 'sequential',
        formatNumberScale: '0',
        numberSuffix: '',
        caption: 'Madhya Pradesh - District Population',
        subcaption: 'Population distribution across districts',
        captionFontSize: '20',
        subcaptionFontSize: '14',
        captionFontColor: '#7C3AED',
        captionPadding: '20',
        entityFillHoverColor: '#E5DEFF',
        entityFillHoverAlpha: '90',
        showToolTip: '1',
        showHoverEffect: '1',
        showBorder: '1',
        borderColor: '#FFFFFF',
        borderThickness: '0.5',
        borderAlpha: '80',
        // Center the map on Madhya Pradesh
        centerLongitude: "77.4126",
        centerLatitude: "23.2599",
        // Zoom in to focus on Madhya Pradesh
        initialScale: "3",
        // Show only the state of Madhya Pradesh
        entityToolText: "Madhya Pradesh"
      },
      colorrange: {
        minvalue: minPop,
        startlabel: "Low",
        endlabel: "High",
        code: "#E5DEFF",
        gradient: "1",
        color: [
          {
            maxvalue: Math.floor(minPop + (maxPop - minPop) / 3),
            displayvalue: "Medium",
            code: "#A78BFA"
          },
          {
            maxvalue: maxPop,
            code: "#7C3AED"
          }
        ]
      },
      data: mapData
    }
  };

  return (
    <Card className="w-full min-h-[600px] shadow-lg">
      <CardContent className="p-0 overflow-hidden">
        <div id="fusioncharts-container">
          {/* Using a wrapping div and direct createElement approach for ReactFC */}
          {ReactFC && ReactFC(chartConfigs)}
        </div>
      </CardContent>
    </Card>
  );
};

export default FusionChartsMap;
