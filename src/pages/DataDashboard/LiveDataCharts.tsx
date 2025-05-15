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
  machine_id: string;
  timestamp: string;
  afr: number;
  current: number;
  pressure: number;
  rpm: number;
  temperature: number;
  vibration: number;
}

const LiveDataCharts: React.FC<LiveDataChartsProps> = ({ machineId }) => {
  const [metrics, setMetrics] = useState<LiveData[]>([]);

  useEffect(() => {
    if (!machineId) return;

    const fetchData = () => {
      apiService
        .getSensorDataForMachine(machineId)
        .then((data) => setMetrics(data as LiveData[]));
    };

    fetchData();
    const intervalId = setInterval(fetchData, 12000);

    return () => clearInterval(intervalId);
  }, [machineId]);

  const sortedData = [...metrics].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  const formatTime = (timestamp: string) =>
    new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  const AFRData = sortedData.map((entry) => ({
    time: formatTime(entry.timestamp),
    value: entry.afr,
  }));

  const currentData = sortedData.map((entry) => ({
    time: formatTime(entry.timestamp),
    value: entry.current,
  }));

  const pressureData = sortedData.map((entry) => ({
    time: formatTime(entry.timestamp),
    value: entry.pressure,
  }));

  const RPMtData = sortedData.map((entry) => ({
    time: formatTime(entry.timestamp),
    value: entry.rpm,
  }));

  const temperatureData = sortedData.map((entry) => ({
    time: formatTime(entry.timestamp),
    value: entry.temperature,
  }));

  const vibrarionData = sortedData.map((entry) => ({
    time: formatTime(entry.timestamp),
    value: entry.vibration,
  }));

  const getYAxisDomain = (data) => {
    if (!data || data.length === 0) return [0, 10];

    const values = data.map((d) => d.value);
    const min = Math.min(...values);
    const max = Math.max(...values);

    // Round to nearest 5 or 10 for nice axis ticks
    const roundedMin = Math.floor(min / 5) * 5;
    const roundedMax = Math.ceil(max / 5) * 5;

    return [roundedMin, roundedMax]; // clean values without decimals
  };

  return (
    <div className="space-y-6">
      {!machineId ? (
        <p className="flex justify-center">
          Please select a machine to view live data.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {AFRData && (
            <Card className="border border-border overflow-hidden shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center justify-between">
                  <span>AFR</span>
                  <TrendingUp size={16} className="text-[#7630EA]" />
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
                        <linearGradient id="afr" x1="0" y1="0" x2="0" y2="1">
                          <stop
                            offset="5%"
                            stopColor="#7630EA"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#7630EA"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgba(255,255,255,0.1)"
                      />
                      <XAxis dataKey="time" stroke="#888" />
                      <YAxis
                        stroke="#888"
                        domain={getYAxisDomain(AFRData)}
                        allowDecimals={false}
                      />
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
                        stroke="#7630EA"
                        strokeWidth={2}
                        fill="url(#afr)"
                        animationDuration={300}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          )}

          {currentData && (
            <Card className="border border-border overflow-hidden shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center justify-between">
                  <span>Current</span>
                  <TrendingUp size={16} className="text-[#00e8cf]" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={currentData}
                      margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                    >
                      <defs>
                        <linearGradient
                          id="current"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#00e8cf"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#00e8cf"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgba(255,255,255,0.1)"
                      />
                      <XAxis dataKey="time" stroke="#888" />
                      <YAxis
                        stroke="#888"
                        domain={getYAxisDomain(currentData)}
                        allowDecimals={false}
                      />
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
                        stroke="#00e8cf"
                        strokeWidth={2}
                        fill="url(#current)"
                        animationDuration={300}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          )}

          {pressureData && (
            <Card className="border border-border overflow-hidden shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center justify-between">
                  <span>Pressure</span>
                  <TrendingUp size={16} className="text-[#00739d]" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={pressureData}
                      margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                    >
                      <defs>
                        <linearGradient
                          id="pressure"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#00739d"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#00739d"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgba(255,255,255,0.1)"
                      />
                      <XAxis dataKey="time" stroke="#888" />
                      <YAxis
                        stroke="#888"
                        domain={getYAxisDomain(pressureData)}
                        allowDecimals={false}
                      />
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
                        stroke="#00739d"
                        strokeWidth={2}
                        fill="url(#pressure)"
                        animationDuration={300}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          )}

          {RPMtData && (
            <Card className="border border-border overflow-hidden shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center justify-between">
                  <span>RPM</span>
                  <TrendingUp size={16} className="text-[#f740ff]" />
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
                        <linearGradient id="rpm" x1="0" y1="0" x2="0" y2="1">
                          <stop
                            offset="5%"
                            stopColor="#f740ff"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#f740ff"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgba(255,255,255,0.1)"
                      />
                      <XAxis dataKey="time" stroke="#888" />
                      <YAxis
                        stroke="#888"
                        domain={getYAxisDomain(RPMtData)}
                        allowDecimals={false}
                      />
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
                        stroke="#f740ff"
                        strokeWidth={2}
                        fill="url(#rpm)"
                        animationDuration={300}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          )}

          {temperatureData && (
            <Card className="border border-border overflow-hidden shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center justify-between">
                  <span>Temperature</span>
                  <TrendingUp size={16} className="text-[#FF8300]" />
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
                        <linearGradient
                          id="temperature"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#FF8300"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#FF8300"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgba(255,255,255,0.1)"
                      />
                      <XAxis dataKey="time" stroke="#888" />
                      <YAxis
                        stroke="#888"
                        domain={getYAxisDomain(temperatureData)}
                        allowDecimals={false}
                      />
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
                        stroke="#FF8300"
                        strokeWidth={2}
                        fill="url(#temperature)"
                        animationDuration={300}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          )}

          {vibrarionData && (
            <Card className="border border-border overflow-hidden shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center justify-between">
                  <span>Vibrations</span>
                  <TrendingUp size={16} className="text-[#fec901]" />
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
                        <linearGradient
                          id="vibrations"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#fec901"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#fec901"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgba(255,255,255,0.1)"
                      />
                      <XAxis dataKey="time" stroke="#888" />
                      <YAxis
                        stroke="#888"
                        domain={getYAxisDomain(vibrarionData)}
                        allowDecimals={false}
                      />
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
                        stroke="#fec901"
                        strokeWidth={2}
                        fill="url(#vibrations)"
                        animationDuration={300}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default LiveDataCharts;
