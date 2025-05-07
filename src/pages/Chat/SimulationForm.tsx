import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Machine, MachineDefaults } from "@/types";
import chatService from "@/services/chatService";

interface SimulationFormProps {
  selectedMachine: MachineDefaults;
  setSelectedMachine: React.Dispatch<React.SetStateAction<MachineDefaults>>;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

interface SimulationData {
  machine: string;
  airToFuelRatio: number;
  current: number;
  pressure: number;
  rpm: number;
  temperature: number;
  vibrationAmplitude: number;
  vibrationFrequency: number;
  duration: number
}

const SimulationForm: React.FC<SimulationFormProps> = ({
  selectedMachine,
  setSelectedMachine,
  onSubmit,
  onCancel,
}) => {
  const form = useForm<SimulationData>({
  });

  const [machines, setMachines] = useState<Machine[]>([]);
  const [selectedMachineId, setSelectedMachineId] = useState<string>();

  useEffect(() => {
    chatService.getMachineList().then(setMachines);
  }, []);

  useEffect(() => {
    if (!selectedMachineId) return;

    chatService.getMachineDefaults(selectedMachineId).then(setSelectedMachine);
  }, [selectedMachineId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = document.getElementById("simulation-form") as HTMLFormElement;
    const data = Object.fromEntries(new FormData(form));

    onSubmit(data);
  };

  const handleChangeMachine = (id: string) => {
    setSelectedMachineId(id);
  }

  const handleChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMachine((prev) => ({
      ...prev,
      [name]: e.target.value
    }))
  }

  return (
    <Form {...form}>
      <form id="simulation-form" onSubmit={handleSubmit} className="space-y-4">
        <h3 className="text-lg font-medium mb-2">Machine Simulation</h3>

        <FormField
          control={form.control}
          name="machine"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Machine</FormLabel>
              <Select onValueChange={handleChangeMachine} name="machine" defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select machine" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {machines.map((m) => 
                  <SelectItem key={m.machine_id} value={m.machine_id}>{m.name}</SelectItem>
                )}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="airToFuelRatio"
          render={() => (
            <FormItem>
              <FormLabel>Air to Fuel Ratio</FormLabel>
              <FormControl>
                <Input
                  name="airToFuelRatio"
                  type="number"
                  step="0.1"
                  value={selectedMachine?.afr}
                  onChange={handleChange("afr")}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="current"
          render={() => (
            <FormItem>
              <FormLabel>Current (Amperes)</FormLabel>
              <FormControl>
                <Input
                  name="current"
                  type="number"
                  step="0.1"
                  value={selectedMachine?.current}
                  onChange={handleChange("current")}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pressure"
          render={() => (
            <FormItem>
              <FormLabel>Pressure (Pa)</FormLabel>
              <FormControl>
                <Input
                  name="pressure"
                  type="number"
                  value={selectedMachine?.pressure}
                  onChange={handleChange("pressure")}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rpm"
          render={() => (
            <FormItem>
              <FormLabel>RPM</FormLabel>
              <FormControl>
                <Input
                  name="rpm"
                  type="number"
                  value={selectedMachine?.rpm}
                  onChange={handleChange("rpm")}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="temperature"
          render={() => (
            <FormItem>
              <FormLabel>Temperature (°C)</FormLabel>
              <FormControl>
                <Input
                  name="temperature"
                  type="number"
                  step="0.1"
                  value={selectedMachine?.temperature}
                  onChange={handleChange("temperature")}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="vibrationAmplitude"
          render={() => (
            <FormItem>
              <FormLabel>Vibrations Max</FormLabel>
              <FormControl>
                <Input
                  name="vibrationAmplitude"
                  type="number"
                  step="0.01"
                  value={selectedMachine?.vibration_max}
                  onChange={handleChange("vibration_max")}
                />
              </FormControl>
            </FormItem>
          )}
        />

      <FormField
          control={form.control}
          name="duration"
          render={() => (
            <FormItem>
              <FormLabel>Duration</FormLabel>
              <FormControl>
                <Input
                  name="duration"
                  type="number"
                  step="0.5"
                  value={selectedMachine?.duration ?? 24}
                  onChange={handleChange("duration")}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex gap-2 justify-end mt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Send Simulation</Button>
        </div>
      </form>
    </Form>
  );
};

export default SimulationForm;
