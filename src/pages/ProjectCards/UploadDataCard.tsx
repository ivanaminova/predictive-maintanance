import React, { useCallback, useState } from "react";
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
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const UploadDataCard = () => {
  const [dragActive, setDragActive] = useState(false);

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

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Handle the file(s)
      const files = Array.from(e.dataTransfer.files);
      toast.success(
        `Uploaded ${files.length} file(s): ${files
          .map((f) => f.name)
          .join(", ")}`
      );
    }
  }, []);

  const handleBrowseClick = () => {
    // Create and trigger a file input
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.multiple = true;
    fileInput.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        const files = Array.from(target.files);
        toast.success(
          `Selected ${files.length} file(s): ${files
            .map((f) => f.name)
            .join(", ")}`
        );
      }
    };
    fileInput.click();
  };

  return (
    <Card className="border border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Upload size={18} /> Upload Data
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
          <p className="text-muted-foreground text-sm">Drop file here or</p>
          <Button
            variant="outline"
            className="mt-2 text-sm"
            onClick={handleBrowseClick}
          >
            Browse
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button>Start Training</Button>
      </CardFooter>
    </Card>
  );
};
