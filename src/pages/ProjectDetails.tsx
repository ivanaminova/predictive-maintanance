import React, { useCallback, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Upload,
  Cpu
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
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";


const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { getProject } = useProjects();
  const navigate = useNavigate();
  const project = getProject(id || "");
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isTraining, setIsTraining] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completedTraining, setCompletedTraining] = useState(false);


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

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files);
      setSelectedFiles(files);
    }
  }, []);

  const handleBrowseClick = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.multiple = true;
    fileInput.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        const files = Array.from(target.files);
        setSelectedFiles(files);
      }
    };
    fileInput.click();
  };

  const handleStartTraining = () => {
    setIsTraining(true);
    setCompletedTraining(false);
    setProgress(0); // Reset progress to 0 at start

    let interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < 100) {
          return prevProgress + 1;
        } else {
          clearInterval(interval); // Stop interval

          // Now mark training as completed
          setIsTraining(false);
          setSelectedFiles([]);
          setCompletedTraining(true);

          return 100;
        }
      });
    }, 150); // Every 150ms
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/manage")}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
          {project.name.charAt(0).toUpperCase()}
        </div>
        <h2 className="text-xl font-medium">{project.name}</h2>
      </div>
      <div className="m-40">
        <Card className="border border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Cpu size={18} /> Upload and Train
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              className={cn(
                "border-2 border-dashed border-border rounded-md py-8 px-4 text-center transition-colors",
                dragActive ? "border-primary bg-primary/5" : ""
              )}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />

              {selectedFiles.length > 0 ? (
                <p className="text-sm font-medium text-foreground mb-2">
                  {selectedFiles.length} file
                  {selectedFiles.length > 1 ? "s" : ""} selected
                </p>
              ) : (
                <>
                  <p className="text-muted-foreground text-sm">
                    Drop file here or
                  </p>
                  <Button
                    variant="outline"
                    className="mt-2 text-sm"
                    onClick={handleBrowseClick}
                  >
                    Browse
                  </Button>
                </>
              )}
            </div>
            <div className="flex flex-col gap-4">
              {selectedFiles.length === 0 ? (
                <Button disabled className="w-32 self-end">
                  Start Training
                </Button>
              ) : (
                <Button
                  className="w-32 self-end"
                  onClick={handleStartTraining}
                  disabled={isTraining}
                >
                  Start Training
                </Button>
              )}

              <Progress className="h-2 w-full" value={progress} />
              <div className="text-xs mt-1">{progress}% complete</div>
            </div>
            <div className="flex flex-col gap-4">
              {completedTraining ? (
                <Button className="w-32 self-end">Deploy Model</Button>
              ) : (
                <Button disabled className="w-32 self-end">
                  Deploy Model
                </Button>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex justify-end"></CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ProjectDetails;
