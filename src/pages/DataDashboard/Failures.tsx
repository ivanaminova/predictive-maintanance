import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import apiService from "@/services/apiService";

interface FailuresProps {
  machineId: string;
}

interface Failure {
  Machine_ID: string;
  Timestamp: string;
  Failure_Type: string;
}

const Failures: React.FC<FailuresProps> = ({ machineId }) => {
  const [failures, setFailures] = useState<Failure[]>([]);

  useEffect(() => {
    apiService
      .getFailuresForMachine(machineId)
      .then((data) => setFailures(data as Failure[]));
  }, [machineId]);

  console.log(machineId);
  console.log(failures);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Previous Failures</h3>

      <div className="space-y-4">
        {failures.map((f) => (
          <Card
            key={f.Machine_ID}
            className="border border-destructive/20 hover:border-destructive/40 transition-colors"
          >
            <CardContent className="p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <AlertTriangle size={16} className="text-destructive" />
                <div className="text-sm font-medium">
                  Date: <span className="font-normal">{f.Timestamp}</span>
                </div>
              </div>
              <div className="pl-6 text-sm">
                Issue: <span className="text-destructive">{f.Failure_Type}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Failures;
