export interface Machine {
  machine_id: string;
  name: string;
}

export interface MachineDefaults {
  afr: string;
  current: string;
  machine_id: string;
  machine_name: string;
  machine_type: string;
  pressure: string;
  rpm: string;
  temperature: string;
  vibration_max: string;
  duration: string;
}
