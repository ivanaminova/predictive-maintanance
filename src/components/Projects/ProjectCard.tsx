import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Box, AlertTriangle } from 'lucide-react';
import { Project } from '@/context/ProjectContext';
import { 
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from '@/components/ui/alert-dialog';

interface ProjectCardProps {
  project: Project;
  index: number;
  onDelete: (id: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onDelete }) => {
  const navigate = useNavigate();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleCardClick = (e: React.MouseEvent) => {
    navigate(`/project/${project.id}`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    onDelete(project.id);
    setShowDeleteDialog(false);
  };

  return (
    <>
      <div 
        className="project-card bg-card hover:bg-card/90 rounded-lg border border-border shadow-md transition-all duration-200 cursor-pointer p-6 h-[180px] flex flex-col"
        onClick={handleCardClick}
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <div className="flex justify-between items-start mb-4">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
            {project.name.charAt(0).toUpperCase()}
          </div>
          <button 
            onClick={handleDelete}
            className="text-muted-foreground hover:text-destructive transition-colors p-1 rounded-full hover:bg-muted"
            aria-label="Delete project"
          >
            <Trash2 size={16} />
          </button>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center">
          <h3 className="text-lg font-medium text-[#f2f3f4]">{project.name}</h3>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <div className="text-xs text-muted-foreground">
            {project.createdAt}
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Box size={12} />
            <span>Project</span>
          </div>
        </div>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle size={18} className="text-destructive" />
              Delete Project
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <span className="font-semibold">{project.name}</span>? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No, Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Yes, Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ProjectCard;
