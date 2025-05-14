import { Machine, MachineDefaults } from "@/types";
import request from "./request";
import { fi } from "date-fns/locale";

export default {
  getMachineList() {
    return request<Machine[]>("GET", `/api/machine_list`);
  },
  getMachineDefaults(machineId) {
    return request<MachineDefaults>(
      "GET",
      `/api/machine_defaults?machine_id=${machineId}`
    );
  },
  postChatPrompt(propmtMessage) {
    return request("POST", `/chat`, propmtMessage);
  },
  uploadFiles(files) {
    return fetch(`/files/upload`, {
      method: 'POST',
      body: files
    });
  },
  trainModel() {
    return request("POST", `/files/run-script`);
  },
  getProgress() {
    return request("GET", `/files/progress`);
  },
  deployModel() {
    return request("POST", `/files/deploy-model`);
  },
  getSensorDataForMachine(machineId) {
    return request("GET", `/live-data/sensor-data/${machineId}`);
  },
  getFailuresForMachine(machineId) {
    return request("GET", `/live-data/failures/${machineId}`);
  },
  getMaintenanceForMachine(machineId) {
    return request("GET", `/live-data/maintenance/${machineId}`);
  },
};


//GET http://10.25.83.50:5000/machine_list
//GET http://10.25.83.50:5000/machine_defaults?machine_id=${machineId}
//POST http://10.25.83.50:5005/chat
//POST http://10.25.83.50:5010/upload
//GET http://10.25.83.50:5010/progress
//POST http://10.25.83.50:5010/run-script
// GET /sensor-data/{machine_id} 
// GET /failures/{machine_id}
// GET /maintenance/{machine_id}
