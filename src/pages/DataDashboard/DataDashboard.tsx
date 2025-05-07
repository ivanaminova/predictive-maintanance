import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, BarChart3, AlertTriangle, Calendar } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectDateRange
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LiveDataCharts from "./LiveDataCharts";
import Failures from "./Failures";
import Maintenance from "./Maintenance";

const machines = ["Machine A", "Machine B", "Machine C", "Machine D"];

const DataDashboard = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [selectedMachine, setSelectedMachine] = useState("Machine A");
  const [activeTab, setActiveTab] = useState("charts");

  return (
    <div className="allow-scroll h-screen overflow-auto">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(`/project/${projectId}`)}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-xl font-medium">Data Dashboard</h2>
      </div>

      <Card className="border border-border">
        <CardHeader className="pb-0">
          <CardTitle className="text-lg flex items-center gap-2">
            <BarChart3 size={18} /> Machine Metrics
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="space-y-2 w-full sm:w-auto">
              <div className="flex flex-row gap-4">
                <div>
                  <label
                    htmlFor="machine-select"
                    className="text-sm font-medium"
                  >
                    Select Machine:
                  </label>
                  <Select
                    value={selectedMachine}
                    onValueChange={setSelectedMachine}
                  >
                    <SelectTrigger
                      id="machine-select"
                      className="w-full sm:w-[240px]"
                    >
                      <SelectValue placeholder="Select Machine" />
                    </SelectTrigger>
                    <SelectContent>
                      {machines.map((machine) => (
                        <SelectItem key={machine} value={machine}>
                          {machine}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label htmlFor="date-select" className="text-sm font-medium">
                    Select Date:
                  </label>
                  <SelectDateRange />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-amber-500 text-sm w-full sm:w-auto justify-end">
              <AlertTriangle size={16} />
              <span>3 alerts in the last 24 hours</span>
            </div>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-6">
              <TabsTrigger value="charts" className="flex items-center gap-2">
                <BarChart3 size={14} />
                Machine Data
              </TabsTrigger>
              <TabsTrigger value="failures" className="flex items-center gap-2">
                <AlertTriangle size={14} />
                Failures
              </TabsTrigger>
              <TabsTrigger
                value="maintenance"
                className="flex items-center gap-2"
              >
                <Calendar size={14} />
                Maintenance
              </TabsTrigger>
            </TabsList>

            <TabsContent value="charts" className="mt-2">
              <LiveDataCharts machine={selectedMachine} />
            </TabsContent>

            <TabsContent value="failures" className="mt-2">
              <Failures machine={selectedMachine} />
            </TabsContent>

            <TabsContent value="maintenance" className="mt-2">
              <Maintenance machine={selectedMachine} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataDashboard;
