import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, TrendingUp } from 'lucide-react';

interface LiveDataChartsProps {
  machine: string;
}

const LiveDataCharts: React.FC<LiveDataChartsProps> = ({ machine }) => {
  // Sample data for charts
  const generateData = (type: string) => {
    const baseValue = {
      'Machine A': { temp: 24, pressure: 92, vibrations: 1.5, oil: 80 },
      'Machine B': { temp: 18, pressure: 88, vibrations: 2.2, oil: 75 },
      'Machine C': { temp: 29, pressure: 95, vibrations: 1.8, oil: 65 },
      'Machine D': { temp: 21, pressure: 90, vibrations: 1.2, oil: 90 }
    }[machine];
    
    return Array.from({ length: 10 }, (_, i) => {
      let value;
      const noise = Math.sin(i * 0.5) * 3 + Math.random() * 1.5;
      
      if (type === 'temperature') value = baseValue.temp + noise;
      else if (type === 'pressure') value = baseValue.pressure + noise;
      else if (type === 'vibrations') value = baseValue.vibrations + noise * 0.2;
      else if (type === 'oil') value = baseValue.oil + noise;
      
      return {
        time: `${i+1} min`,
        value: Number(value.toFixed(1))
      };
    });
  };

  const temperatureData = generateData('temperature');
  const pressureData = generateData('pressure');
  const vibrationsData = generateData('vibrations');
  const oilData = generateData('oil');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border border-border overflow-hidden shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center justify-between">
              <span>Temperature (°C)</span>
              <TrendingUp size={16} className="text-amber-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={temperatureData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                  <defs>
                    <linearGradient id="temperature" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ff9800" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#ff9800" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="time" stroke="#888" />
                  <YAxis domain={[15, 35]} stroke="#888" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: 'none' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#ff9800" 
                    strokeWidth={2} 
                    fill="url(#temperature)" 
                    animationDuration={300}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 flex items-center text-amber-500 gap-1 text-sm">
              <AlertTriangle size={14} />
              <span>Warning: Temperature spike detected</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border overflow-hidden shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center justify-between">
              <span>Pressure (PSI)</span>
              <TrendingUp size={16} className="text-green-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={pressureData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="time" stroke="#888" />
                  <YAxis domain={[80, 100]} stroke="#888" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: 'none' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#4caf50" 
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                    animationDuration={300}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 flex items-center text-green-500 gap-1 text-sm">
              <AlertTriangle size={14} className="opacity-0" />
              <span>Pressure within normal range</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border overflow-hidden shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center justify-between">
              <span>Vibrations (mm/s)</span>
              <TrendingUp size={16} className="text-blue-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={vibrationsData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="time" stroke="#888" />
                  <YAxis domain={[0, 4]} stroke="#888" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: 'none' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#2196f3" 
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                    animationDuration={300}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 flex items-center text-blue-500 gap-1 text-sm">
              <AlertTriangle size={14} className="opacity-0" />
              <span>Vibrations within normal range</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border overflow-hidden shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center justify-between">
              <span>Oil Level (%)</span>
              <TrendingUp size={16} className="text-purple-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={oilData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                  <defs>
                    <linearGradient id="oil" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#673ab7" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#673ab7" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="time" stroke="#888" />
                  <YAxis domain={[50, 100]} stroke="#888" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: 'none' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#673ab7" 
                    strokeWidth={2}
                    fill="url(#oil)" 
                    animationDuration={300}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 flex items-center text-purple-500 gap-1 text-sm">
              <AlertTriangle size={14} className="opacity-0" />
              <span>Oil level within normal range</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LiveDataCharts;
