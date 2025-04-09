import { Machine, MachineDefaults } from "@/types";
import request from "./request";

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
  //TODO: ne go pipai tva zasega
//   postChatPrompt(propmtMessage) {
//     return request("POST", `${baseUrl}:5005/chat`, propmtMessage);
//   },
};

// TODO: za /chat
// {
//     "message": "run simulation",
//     "machine_id": "15",
//     "simulation data": {}
// }
