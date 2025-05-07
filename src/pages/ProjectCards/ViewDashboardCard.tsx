import { useParams, useNavigate } from "react-router-dom";
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
import { Button } from "@/components/ui/button";

export const ViewDashboardCard = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <Card className="border border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <BarChart3 size={18} /> Data Dashboard
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        <p>
          View real-time data, monitor performance metrics, and analyze
          historical trends from connected machines.
        </p>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={() => navigate(`/dashboard/${id}`)}>
          View Dashboard
        </Button>
      </CardFooter>
    </Card>
  );
};
