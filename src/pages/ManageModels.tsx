import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProjectCard from "@/components/Projects/ProjectCard";
import CreateProjectModal from "@/components/Projects/CreateProjectModal";
import apiService from "@/services/apiService";
import { Loader } from "rsuite";

const ManageModels = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [refreshCounter, setRefreshCounter] = useState(0);
  const location = useLocation();

  const fetchProjects = async () => {
    try {
      setIsFetching(true);
      const response = await apiService.getProjectList();
      if (response && Array.isArray(response)) {
        setProjects(response);
      } else {
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [location.pathname, refreshCounter]);

  const handleDeleteProject = async (projectId: string) => {
    try {
      const projectToDelete = projects.find((p) => p.id === projectId);
      if (!projectToDelete) return;

      await apiService.deleteProject(projectToDelete["project name"]);

      setProjects((prev) => prev.filter((p) => p.id !== projectId));
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-medium text-hpe-green animate-slideIn">
          Projects
        </h2>
      </div>

      {isFetching && (
        <div className="flex justify-center">
          <Loader size="lg" className="mb-2" />
        </div>
      )}

      {!isFetching && projects.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-border rounded-lg">
          <p className="text-muted-foreground mb-4">No Projects Created Yet</p>
          <button
            className="bg-hpe-green hover:bg-hpe-green/90 text-white shadow-lg w-40 h-12 rounded-sm"
            onClick={() => setIsModalOpen(true)}
          >
            Create Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onDelete={handleDeleteProject}
            />
          ))}
        </div>
      )}

      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        refreshProjects={fetchProjects}
        triggerRefresh={() => setRefreshCounter((prev) => prev + 1)}
      />
    </div>
  );
};

export default ManageModels;
