import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";
import apiService from "@/services/apiService";

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  refreshProjects?: () => void;
  triggerRefresh?: () => void;
}

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  isOpen,
  onClose,
  refreshProjects,
  triggerRefresh,
}) => {
  const [projectName, setProjectName] = useState("");
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (projectName.trim()) {
      setIsSubmitting(true);
      try {
        const payload = { "project name": projectName.trim() };
        await apiService.createProject(payload);

        setProjectName("");
        onClose();

        if (refreshProjects) {
          refreshProjects();
        }
        if (triggerRefresh) {
          triggerRefresh();
        }

        if (window.location.pathname !== "/manage") {
          navigate("/manage");
        } else {
          location.reload();
        }
      } catch (error) {
        console.error("Error creating project:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <PlusCircle className="h-5 w-5" />
            Create New Project
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="space-y-2">
            <label htmlFor="project-name" className="text-sm font-medium">
              Project Name
            </label>
            <Input
              id="project-name"
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Enter Project Name"
              className="bg-muted/30 focus:ring-primary focus-visible:ring-primary"
              autoFocus
            />
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!projectName.trim() || isSubmitting}
              className="transition-all duration-300"
            >
              {isSubmitting ? "Creating..." : "Create Project"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectModal;
