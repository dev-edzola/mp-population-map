
import React from 'react';
import PopulationMap from '@/components/PopulationMap';

const Index = () => {
  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Madhya Pradesh Population Map
      </h1>
      <div className="mb-4">
        <PopulationMap />
      </div>
    </div>
  );
};

export default Index;
