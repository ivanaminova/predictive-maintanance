import React, { useCallback, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Upload,
  BarChart3,
  Cpu,
  GitBranch,
  Server,
} from "lucide-react";
import { useProjects } from "@/context/ProjectContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

import DataDashboard from "./DataDashboard/DataDashboard";
import { Progress } from "@/components/ui/progress";

import { OldVersion } from "./ProjectCards/OldVersion";
import { CardsVersionOne } from "./ProjectCards/CardsVersionOne";
import { CardsVersionTwo } from "./ProjectCards/CardsVersionTwo";

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { getProject } = useProjects();
  const navigate = useNavigate();
  const project = getProject(id || "");

  if (!project) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl text-destructive">Project not found</h2>
        <Button
          onClick={() => navigate("/manage")}
          variant="link"
          className="mt-4"
        >
          Return to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex items-center gap-4">
        <button
          onClick={() =>navigate("/manage")}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
          {project.name.charAt(0).toUpperCase()}
        </div>
        <h2 className="text-xl font-medium">{project.name}</h2>
      </div>
      <CardsVersionOne/>
    </div>
  );
};

export default ProjectDetails;
