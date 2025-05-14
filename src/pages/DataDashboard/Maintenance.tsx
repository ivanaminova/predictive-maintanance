import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { WrenchIcon } from "lucide-react";
import apiService from "@/services/apiService";

interface MaintenanceProps {
  machineId: string;
}

interface Maintenance {
  Machine_ID: string;
  Timestamp: string;
  Maintenance_Action: string;
}

const Maintenance: React.FC<MaintenanceProps> = ({ machineId }) => {
  const [maintenances, setMaintenances] = useState<Maintenance[]>([]);

  useEffect(() => {
    if (!machineId) return;

    apiService
      .getMaintenanceForMachine(machineId)
      .then((data) => setMaintenances(data as Maintenance[]));
  }, [machineId]);

  return (
    <>
      {!machineId ? (
        <p className="flex justify-center">
          Please select a machine to view maintenance data.
        </p>
      ) : (
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Scheduled & Past Maintenance</h3>

          <div className="space-y-4">
            {maintenances.map((m) => (
              <Card
                key={m.Machine_ID}
                className="border border-primary/20 hover:border-primary/40 transition-colors"
              >
                <CardContent className="p-4 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <WrenchIcon size={16} className="text-primary" />
                    <div className="text-sm font-medium">
                      Date: <span className="font-normal">{m.Timestamp}</span>
                    </div>
                  </div>
                  <div className="pl-6 text-sm">
                    Type:{" "}
                    <span className="text-primary">{m.Maintenance_Action}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Maintenance;
