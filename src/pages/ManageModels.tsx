
import React, { useState } from 'react';
import { useProjects } from '@/context/ProjectContext';
import ProjectCard from '@/components/Projects/ProjectCard';
import CreateProjectModal from '@/components/Projects/CreateProjectModal';

const ManageModels = () => {
  const { projects, deleteProject } = useProjects();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-medium text-hpe-green animate-slideIn">Projects</h2>
      </div>
      
      {projects.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-border rounded-lg">
          <p className="text-muted-foreground mb-4">No Projects Created Yet</p>
          <button className='bg-hpe-green hover:bg-hpe-green/90 text-white shadow-lg w-40 h-12 rounded-sm' onClick={() => setIsModalOpen(true)}>Create Project</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index}
              onDelete={deleteProject}
            />
          ))}
        </div>
      )}
      
      <CreateProjectModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default ManageModels;
