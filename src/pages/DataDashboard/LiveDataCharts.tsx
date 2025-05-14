import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, TrendingUp } from "lucide-react";
import apiService from "@/services/apiService";

interface LiveDataChartsProps {
  machineId: string;
}

interface LiveData {
  Machine_ID: string;
  Timestamp: string;
  AFR: number;
  Current: number;
  Pressure: number;
  RPM: number;
  Temperature: number;
  Vibration: number;
}

const LiveDataCharts: React.FC<LiveDataChartsProps> = ({ machineId }) => {
  const [metrics, setMetrics] = useState<LiveData[]>([]);

  useEffect(() => {
    apiService
      .getSensorDataForMachine(machineId)
      .then((data) => setMetrics(data as LiveData[]));
  }, [machineId]);

  const sortedData = [...metrics].sort(
    (a, b) => new Date(a.Timestamp).getTime() - new Date(b.Timestamp).getTime()
  );

  const AFRData = sortedData.map((entry) => ({
    time: new Date(entry.Timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    value: entry.AFR,
  }));

  const currentData = sortedData.map((entry) => ({
    time: new Date(entry.Timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    value: entry.Current,
  }));

  const pressureData = sortedData.map((entry) => ({
    time: new Date(entry.Timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    value: entry.Pressure,
  }));

  const RPMtData = sortedData.map((entry) => ({
    time: new Date(entry.Timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    value: entry.RPM,
  }));

  const temperatureData = sortedData.map((entry) => ({
    time: new Date(entry.Timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    value: entry.Temperature,
  }));

  const vibrarionData = sortedData.map((entry) => ({
    time: new Date(entry.Timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    value: entry.Vibration,
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border border-border overflow-hidden shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center justify-between">
              <span>AFR</span>
              <TrendingUp size={16} className="text-amber-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={AFRData}
                  margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                >
                  <defs>
                    <linearGradient
                      id="temperature"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#ff9800" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#ff9800" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.1)"
                  />
                  <XAxis dataKey="time" stroke="#888" />
                  <YAxis domain={[15, 35]} stroke="#888" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0, 0, 0, 0.8)",
                      border: "none",
                    }}
                    labelStyle={{ color: "#fff" }}
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
          </CardContent>
        </Card>

        <Card className="border border-border overflow-hidden shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center justify-between">
              <span>Current</span>
              <TrendingUp size={16} className="text-green-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={currentData}
                  margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.1)"
                  />
                  <XAxis dataKey="time" stroke="#888" />
                  <YAxis domain={[80, 100]} stroke="#888" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0, 0, 0, 0.8)",
                      border: "none",
                    }}
                    labelStyle={{ color: "#fff" }}
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
          </CardContent>
        </Card>

        <Card className="border border-border overflow-hidden shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center justify-between">
              <span>Pressure (PSI)</span>
              <TrendingUp size={16} className="text-blue-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={pressureData}
                  margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.1)"
                  />
                  <XAxis dataKey="time" stroke="#888" />
                  <YAxis domain={[0, 4]} stroke="#888" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0, 0, 0, 0.8)",
                      border: "none",
                    }}
                    labelStyle={{ color: "#fff" }}
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
          </CardContent>
        </Card>

        <Card className="border border-border overflow-hidden shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center justify-between">
              <span>RPM</span>
              <TrendingUp size={16} className="text-purple-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={RPMtData}
                  margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                >
                  <defs>
                    <linearGradient id="oil" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#673ab7" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#673ab7" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.1)"
                  />
                  <XAxis dataKey="time" stroke="#888" />
                  <YAxis domain={[50, 100]} stroke="#888" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0, 0, 0, 0.8)",
                      border: "none",
                    }}
                    labelStyle={{ color: "#fff" }}
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
          </CardContent>
        </Card>

        <Card className="border border-border overflow-hidden shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center justify-between">
              <span>Temperature</span>
              <TrendingUp size={16} className="text-purple-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={temperatureData}
                  margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                >
                  <defs>
                    <linearGradient id="oil" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#673ab7" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#673ab7" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.1)"
                  />
                  <XAxis dataKey="time" stroke="#888" />
                  <YAxis domain={[50, 100]} stroke="#888" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0, 0, 0, 0.8)",
                      border: "none",
                    }}
                    labelStyle={{ color: "#fff" }}
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
          </CardContent>
        </Card>

        <Card className="border border-border overflow-hidden shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center justify-between">
              <span>Vibrations (mm/s)</span>
              <TrendingUp size={16} className="text-purple-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={vibrarionData}
                  margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                >
                  <defs>
                    <linearGradient id="oil" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#673ab7" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#673ab7" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.1)"
                  />
                  <XAxis dataKey="time" stroke="#888" />
                  <YAxis domain={[50, 100]} stroke="#888" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0, 0, 0, 0.8)",
                      border: "none",
                    }}
                    labelStyle={{ color: "#fff" }}
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LiveDataCharts;
