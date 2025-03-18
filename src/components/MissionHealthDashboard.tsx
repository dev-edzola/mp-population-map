
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Baby, Heart, Shield, Users, HandHeart } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';

interface StatCardProps {
  icon: React.ElementType;
  title: string;
  value: number;
  target: number;
  color: string;
  unit: string;
}

const StatCard = ({ icon: Icon, title, value, target, color, unit }: StatCardProps) => {
  const [currentValue, setCurrentValue] = useState(0);
  
  useEffect(() => {
    // Animate the value counting up
    const timer = setTimeout(() => {
      if (currentValue < value) {
        setCurrentValue(Math.min(currentValue + Math.ceil(value / 20), value));
      }
    }, 50);
    
    return () => clearTimeout(timer);
  }, [currentValue, value]);
  
  const percentage = Math.min(100, (currentValue / target) * 100);
  
  return (
    <Card className="overflow-hidden hover-scale transition-all duration-300 border-t-4" style={{ borderTopColor: color }}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-3 items-center">
            <div className="p-2 rounded-full" style={{ backgroundColor: `${color}30` }}>
              <Icon className="h-5 w-5" style={{ color: color }} />
            </div>
            <h3 className="font-medium text-gray-700">{title}</h3>
          </div>
          <span className="text-xs font-medium text-gray-500">Target: {target.toLocaleString()}</span>
        </div>
        
        <div className="flex items-baseline justify-between mb-2">
          <span className="text-3xl font-bold">{currentValue.toLocaleString()}</span>
          <span className="text-sm text-gray-500">{unit}</span>
        </div>
        
        <Progress 
          value={percentage} 
          className="h-2 mt-2"
          style={{ backgroundColor: `${color}30` }}
        />
        
        <div className="text-right mt-1">
          <span className="text-xs font-medium" style={{ color }}>
            {percentage.toFixed(0)}% of target
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

const LiveImpactCounter = () => {
  const [womenHelped, setWomenHelped] = useState(0);
  const [childrenSaved, setChildrenSaved] = useState(0);
  
  useEffect(() => {
    // Periodically increment counters to simulate real-time impact
    const interval = setInterval(() => {
      setWomenHelped(prev => prev + 1);
      if (Math.random() > 0.7) {
        setChildrenSaved(prev => prev + 1);
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-4 border border-green-100 animate-fade-in">
      <h3 className="text-center text-gray-700 font-medium mb-4">Live Impact Counter</h3>
      <div className="grid grid-cols-2 gap-6 text-center">
        <div className="flex flex-col items-center">
          <div className="bg-pink-100 p-4 rounded-full mb-2 pulse">
            <HandHeart className="h-6 w-6 text-pink-500" />
          </div>
          <div className="text-2xl font-bold text-pink-600">{womenHelped.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Women Supported</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-blue-100 p-4 rounded-full mb-2 pulse">
            <Baby className="h-6 w-6 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-blue-600">{childrenSaved.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Children Protected</div>
        </div>
      </div>
    </div>
  );
};

const ImpactDataChart = () => {
  const data = [
    { name: 'Jan', maternal: 65, child: 48 },
    { name: 'Feb', maternal: 70, child: 53 },
    { name: 'Mar', maternal: 75, child: 60 },
    { name: 'Apr', maternal: 78, child: 63 },
    { name: 'May', maternal: 82, child: 68 },
    { name: 'Jun', maternal: 87, child: 74 },
  ];
  
  const config = {
    maternal: {
      label: "Maternal Health",
      color: "#ec4899"
    },
    child: {
      label: "Child Health",
      color: "#3b82f6"
    }
  };
  
  return (
    <Card className="shadow-sm animate-fade-in">
      <CardContent className="p-6">
        <h3 className="font-medium text-gray-700 mb-4">Health Impact Trends</h3>
        <div className="h-[300px]">
          <ChartContainer config={config} className="h-full w-full">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip cursor={{ fill: '#f3f4f6' }} />
              <Legend />
              <Bar dataKey="maternal" stackId="a" fill="#ec4899" radius={[4, 4, 0, 0]} />
              <Bar dataKey="child" stackId="a" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

const MissionHealthDashboard = () => {
  return (
    <div className="p-4 space-y-6 animate-fade-in">
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Impact Overview</h3>
        <p className="text-gray-500 mb-4">
          Real-time data showing our impact on maternal and child health across Madhya Pradesh.
        </p>
        
        <LiveImpactCounter />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <StatCard 
          icon={Heart} 
          title="Women Supported" 
          value={12547} 
          target={15000} 
          color="#ec4899" 
          unit="women" 
        />
        <StatCard 
          icon={Baby} 
          title="Healthy Births" 
          value={8932} 
          target={10000} 
          color="#3b82f6" 
          unit="children" 
        />
        <StatCard 
          icon={Shield} 
          title="Children Immunized" 
          value={7652} 
          target={9000} 
          color="#8b5cf6" 
          unit="children" 
        />
        <StatCard 
          icon={Users} 
          title="Communities Reached" 
          value={342} 
          target={400} 
          color="#10b981" 
          unit="villages" 
        />
      </div>
      
      <ImpactDataChart />
      
      <div className="rounded-lg overflow-hidden border shadow-lg mt-6 hover-scale transition-all duration-300">
        <div className="bg-green-50 p-4 border-b border-green-100">
          <h3 className="font-medium text-green-700 flex items-center gap-2">
            <Shield className="h-4 w-4 text-green-600" /> 
            Antara Foundation's Live Data Dashboard
          </h3>
        </div>
        <iframe 
          frameBorder="0" 
          width="100%" 
          height="800" 
          src="https://analytics.zoho.in/open-view/384516000000149412"
          className="w-full"
        ></iframe>
      </div>
    </div>
  );
};

export default MissionHealthDashboard;
