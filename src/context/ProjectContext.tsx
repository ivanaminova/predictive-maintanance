
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface Project {
  id: string;
  name: string;
  createdAt: string;
}

interface ProjectContextType {
  projects: Project[];
  addProject: (name: string) => void;
  getProject: (id: string) => Project | undefined;
  deleteProject: (id: string) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(() => {
    const savedProjects = localStorage.getItem('projects');
    return savedProjects ? JSON.parse(savedProjects) : [];
  });

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  const addProject = (name: string) => {
    const newProject: Project = {
      id: crypto.randomUUID(),
      name,
      createdAt: new Date().toLocaleString(),
    };
    
    setProjects([...projects, newProject]);
    toast.success(`Project "${name}" created successfully!`);
  };

  const getProject = (id: string) => {
    return projects.find(project => project.id === id);
  };

  const deleteProject = (id: string) => {
    const project = getProject(id);
    if (project) {
      setProjects(projects.filter(p => p.id !== id));
      toast.success(`Project "${project.name}" deleted successfully!`);
    }
  };

  return (
    <ProjectContext.Provider value={{ projects, addProject, getProject, deleteProject }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};
