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
  postChatPrompt(propmtMessage) {
    return request("POST", `/chat`, propmtMessage);
  },
};


//GET http://10.25.83.50:5000/machine_list
//GET http://10.25.83.50:5000/machine_defaults?machine_id=${machineId}
//POST http://10.25.83.50:5005/chat

// TODO: za /chat
// {
//     "message": "__simulation_run",
//     "machine_id": "М015",
//     "simulation_data": {}
// }


// {
// "message":"__simulation_run",'
// "machine_id":"М015",
// "simulation_data": {"afr":"12.65","current":"35.0","machine_id":"M002","machine_name":"Machine M002","machine_type":"Industrial Pump","pressure":"5.5","rpm":"3200.0","temperature":"87.5","vibration_max":"9.0"}}

// {
//     "message": "Hello",
//     "machine_id": "",
//     "simulation_data": {}
// }
