import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, BarChart3, AlertTriangle, Calendar } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectDateRange,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LiveDataCharts from "./LiveDataCharts";
import Failures from "./Failures";
import Maintenance from "./Maintenance";
import { Machine } from "@/types";
import apiService from "@/services/apiService";

const DataDashboard = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [activeTab, setActiveTab] = useState("charts");
  const [machines, setMachines] = useState<Machine[]>([]);
  const [selectedMachineId, setSelectedMachineId] = useState<string>();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    apiService.getMachineList().then(setMachines);
  }, []);

  useEffect(() => {
    apiService.getProjectList().then(setProjects);
  }, []);

  const handleChangeMachine = (id: string) => {
    setSelectedMachineId(id);
  };

  return (
    <div className="allow-scroll h-screen overflow-auto">
      <div className="flex items-center gap-4 mb-6">
        <h2 className="text-xl font-medium">Data Dashboard</h2>
      </div>

      <Card className="border border-border pb-24">
        <CardHeader className="pb-0">
          <CardTitle className="text-lg flex items-center gap-2">
            <BarChart3 size={18} /> Machine Metrics
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="space-y-2 w-full sm:w-auto">
              <div className="flex flex-row gap-4 ">
                <div className="w-56">
                  <label
                    htmlFor="machine-select"
                    className="text-sm font-medium"
                  >
                    Select Project:
                  </label>
                  <Select onValueChange={handleChangeMachine} name="machine">
                    <SelectTrigger>
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent>
                      {projects.map((p) => (
                        <SelectItem key={p.id} value={p["project name"]}>
                          {p["project name"]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-56">
                  <label
                    htmlFor="machine-select"
                    className="text-sm font-medium"
                  >
                    Select Machine:
                  </label>
                  <Select onValueChange={handleChangeMachine} name="machine">
                    <SelectTrigger>
                      <SelectValue placeholder="Select machine" />
                    </SelectTrigger>
                    <SelectContent>
                      {machines.map((m) => (
                        <SelectItem key={m.machine_id} value={m.machine_id}>
                          {m.name}
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
              <LiveDataCharts machineId={selectedMachineId} />
            </TabsContent>

            <TabsContent value="failures" className="mt-2">
              <Failures machineId={selectedMachineId} />
            </TabsContent>

            <TabsContent value="maintenance" className="mt-2">
              <Maintenance machineId={selectedMachineId} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataDashboard;
