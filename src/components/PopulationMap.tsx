
import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { mpDistricts, getMadhyaPradeshCenter, getMaxPopulation, getMinPopulation } from '@/data/mpDistricts';
import MapLegend from './MapLegend';
import MapInfoBox from './MapInfoBox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';

interface PopulationMapProps {
  mapboxToken?: string;
}

const PopulationMap: React.FC<PopulationMapProps> = ({ mapboxToken }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [token, setToken] = useState<string>(mapboxToken || '');
  const [loading, setLoading] = useState<boolean>(false);
  const [mapInitialized, setMapInitialized] = useState<boolean>(false);

  const initializeMap = (accessToken: string) => {
    if (!mapContainer.current || !accessToken || accessToken.trim() === '') return;
    
    setLoading(true);
    
    try {
      mapboxgl.accessToken = accessToken;
      
      if (map.current) map.current.remove();
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: getMadhyaPradeshCenter(),
        zoom: 5.5,
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      
      map.current.on('load', () => {
        if (!map.current) return;
        
        // Add district markers
        const minPop = getMinPopulation();
        const maxPop = getMaxPopulation();
        const popRange = maxPop - minPop;
        
        // Add districts as circle markers
        const features = mpDistricts.map(district => {
          // Calculate color intensity based on population
          const normalizedPop = (district.population - minPop) / popRange;
          
          // Create the feature
          return {
            type: 'Feature',
            properties: {
              id: district.id,
              name: district.name,
              population: district.population,
              normalizedPop: normalizedPop
            },
            geometry: {
              type: 'Point',
              coordinates: district.coordinates
            }
          };
        });
        
        // Add source and layer
        map.current.addSource('districts', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: features
          }
        });
        
        map.current.addLayer({
          id: 'district-points',
          type: 'circle',
          source: 'districts',
          paint: {
            'circle-radius': [
              'interpolate', ['linear'], ['get', 'population'],
              minPop, 10,
              maxPop, 30
            ],
            'circle-color': [
              'interpolate', ['linear'], ['get', 'normalizedPop'],
              0, '#E5DEFF',
              0.5, '#A78BFA',
              1, '#7C3AED'
            ],
            'circle-opacity': 0.8,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff'
          }
        });

        // Add popups for districts
        const popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false
        });

        map.current.on('mouseenter', 'district-points', (e) => {
          if (!map.current || !e.features || e.features.length === 0) return;
          
          map.current.getCanvas().style.cursor = 'pointer';
          
          const feature = e.features[0];
          const coordinates = feature.geometry.coordinates.slice() as [number, number];
          const name = feature.properties.name;
          const population = feature.properties.population;
          
          // Format number with commas
          const formattedPopulation = new Intl.NumberFormat('en-IN').format(population);
          
          const html = `
            <div class="text-center">
              <h3 class="font-bold">${name}</h3>
              <p>Population: ${formattedPopulation}</p>
            </div>
          `;
          
          popup.setLngLat(coordinates)
               .setHTML(html)
               .addTo(map.current);
        });

        map.current.on('mouseleave', 'district-points', () => {
          if (!map.current) return;
          map.current.getCanvas().style.cursor = '';
          popup.remove();
        });
        
        setMapInitialized(true);
        setLoading(false);
      });
      
    } catch (error) {
      console.error('Error initializing map:', error);
      setLoading(false);
    }
  };

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (token.trim() !== '') {
      initializeMap(token);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  // Initialize map with token if available
  useEffect(() => {
    if (mapboxToken && mapboxToken.trim() !== '') {
      setToken(mapboxToken);
      initializeMap(mapboxToken);
    }
  }, [mapboxToken]);

  return (
    <div className="relative w-full h-[calc(100vh-2rem)]">
      {!mapInitialized && (
        <div className="absolute inset-0 flex items-center justify-center z-20 bg-white/80">
          <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Madhya Pradesh Population Map</h2>
            <p className="mb-4 text-gray-600">
              To display the map, please enter your Mapbox access token below. 
              You can get a free token at <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">mapbox.com</a>.
            </p>
            <form onSubmit={handleTokenSubmit} className="space-y-4">
              <Input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Enter Mapbox access token"
                required
                className="w-full"
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  'Load Map'
                )}
              </Button>
            </form>
          </div>
        </div>
      )}
      
      <div ref={mapContainer} className="absolute inset-0 rounded-lg shadow-lg" />
      
      {mapInitialized && (
        <>
          <MapInfoBox />
          <MapLegend />
        </>
      )}
    </div>
  );
};

export default PopulationMap;
