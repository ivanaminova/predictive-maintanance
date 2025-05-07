import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

import {
  ArrowLeft,
  Upload,
  BarChart3,
  Cpu,
  GitBranch,
  Server,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export const ModelTrainingCard = () => {
  return (
    <Card className="border border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Cpu size={18} /> Model Training
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        <p>
          Train the model on your data to detect anomalies, predict failures,
          and optimize performance.
        </p>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-accent/30 p-3 rounded-md">
            <div className="flex items-center gap-2 mb-2">
              <GitBranch size={14} />
              <h4 className="text-sm font-medium">LSTM</h4>
            </div>
            <Progress className="h-2 w-full" value={78} />
            <div className="text-xs mt-1">78% complete</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button>View Models</Button>
      </CardFooter>
    </Card>
  );
};
