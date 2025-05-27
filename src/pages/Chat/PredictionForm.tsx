import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
import apiService from "@/services/apiService";

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
  duration: number;
}

const SimulationForm: React.FC<SimulationFormProps> = ({
  selectedMachine,
  setSelectedMachine,
  onSubmit,
  onCancel,
}) => {
  const form = useForm<SimulationData>({});

  const [machines, setMachines] = useState<Machine[]>([]);
  const [selectedMachineId, setSelectedMachineId] = useState<string>();

  useEffect(() => {
    apiService.getMachineList().then(setMachines);
  }, []);

  useEffect(() => {
    if (!selectedMachineId) return;

    apiService.getMachineDefaults(selectedMachineId).then(setSelectedMachine);
  }, [selectedMachineId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = document.getElementById("simulation-form") as HTMLFormElement;
    const data = Object.fromEntries(new FormData(form));

    onSubmit(data);
  };

  const handleChangeMachine = (id: string) => {
    setSelectedMachineId(id);
  };

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
              <Select
                onValueChange={handleChangeMachine}
                name="machine"
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select machine" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {machines.map((m) => (
                    <SelectItem key={m.machine_id} value={m.machine_id}>
                      {m.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
