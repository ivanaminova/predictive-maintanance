import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useProjects } from "@/context/ProjectContext";
import { PlusCircle } from "lucide-react";
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
import { SquareChartGantt } from "lucide-react";
import { cn } from "@/lib/utils";

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
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

const SimulationFormModal: React.FC<CreateProjectModalProps> = ({
  isOpen,
  onClose,
  selectedMachine,
  setSelectedMachine,
  onSubmit,
  onCancel,
}) => {
  const [projectName, setProjectName] = useState("");
  const { addProject } = useProjects();
  const navigate = useNavigate();
  const form = useForm<SimulationData>({});

  const [machines, setMachines] = useState<Machine[]>([]);
  const [selectedMachineId, setSelectedMachineId] = useState<string>();

  useEffect(() => {
    chatService.getMachineList().then(setMachines);
  }, []);

  useEffect(() => {
    if (!selectedMachineId) return;

    chatService.getMachineDefaults(selectedMachineId).then(setSelectedMachine);
  }, [selectedMachineId]);

  const handleChangeMachine = (id: string) => {
    setSelectedMachineId(id);
  };

  const handleChange =
    (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedMachine((prev) => ({
        ...prev,
        [name]: e.target.value,
      }));
  };


  const onValidSubmit = (data) => {
    onSubmit(data); // same logic you have, but only if valid!
  };

  const onInvalidSubmit = (errors) => {
    console.log("Form has errors:", errors);  // Optional: debug
    // No need to manually block anything — it won’t call onValidSubmit if invalid
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <SquareChartGantt className="h-5 w-5" />
            Machine Simulation
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            id="simulation-form"
            onSubmit={form.handleSubmit(onValidSubmit, onInvalidSubmit)} 
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* MACHINE SELECT */}
            <FormField
              control={form.control}
              name="machine"
              rules={{ required: "Please select a machine to run simulation." }}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Machine</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleChangeMachine(value); // make sure to still call your original handler
                    }}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={cn(
                          fieldState.error &&
                            "border-[#FC6161] focus:ring-[#FC6161]"
                        )}
                      >
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
                  {fieldState.error && (
                    <p className="text-[#FC6161] text-sm mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            {/* AIR TO FUEL RATIO */}
            <FormField
              control={form.control}
              name="airToFuelRatio"
              render={() => (
                <FormItem className="col-span-1">
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

            {/* CURRENT */}
            <FormField
              control={form.control}
              name="current"
              render={() => (
                <FormItem className="col-span-1">
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

            {/* PRESSURE */}
            <FormField
              control={form.control}
              name="pressure"
              render={() => (
                <FormItem className="col-span-1">
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

            {/* RPM */}
            <FormField
              control={form.control}
              name="rpm"
              render={() => (
                <FormItem className="col-span-1">
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

            {/* TEMPERATURE */}
            <FormField
              control={form.control}
              name="temperature"
              render={() => (
                <FormItem className="col-span-1">
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

            {/* VIBRATION AMPLITUDE */}
            <FormField
              control={form.control}
              name="vibrationAmplitude"
              render={() => (
                <FormItem className="col-span-1">
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

            {/* DURATION */}
            <FormField
              control={form.control}
              name="duration"
              render={() => (
                <FormItem className="col-span-1">
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

            {/* BUTTONS - full width row */}
            <div className="col-span-full flex gap-2 justify-end mt-2">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit">Send Simulation</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SimulationFormModal;
