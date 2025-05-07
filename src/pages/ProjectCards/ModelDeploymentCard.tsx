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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export const ModelDeploymentCard = () => {
  return (
    <Card className="border border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Server size={18} /> Model Deployment
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="model-select" className="text-sm font-medium">
            Select a model:
          </label>
          <Select>
            <SelectTrigger id="model-select" className="w-full">
              <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lstm">LSTM</SelectItem>
              <SelectItem value="gru">GRU</SelectItem>
              <SelectItem value="transformer">Transformer</SelectItem>
              <SelectItem value="isolation-forest">Isolation Forest</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="w-full mt-4">Deploy Model</Button>
      </CardContent>
    </Card>
  );
};
