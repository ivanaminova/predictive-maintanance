
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FolderClosed, Settings, Archive, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useProjects } from '@/context/ProjectContext';
import CreateProjectModal from '@/components/Projects/CreateProjectModal';

const Sidebar = () => {
  const { projects } = useProjects();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const menuItems = [
    { to: "#", icon: <Plus size={18} />, label: "Create Project", onClick: () => setIsModalOpen(true) },
    { to: "/manage", icon: <FolderClosed size={18} />, label: "Projects" },
    { to: "/settings", icon: <Settings size={18} />, label: "Settings" },
    { to: "/archived", icon: <Archive size={18} />, label: "Archived" },
  ];

  return (
    <aside className="w-[204px] min-h-screen flex flex-col bg-hpe-lightGray border-r border-hpe-mediumGray">
      {menuItems.map((item, index) => (
        item.onClick ? (
          <button
            key={item.to}
            onClick={item.onClick}
            className={cn(
              "flex items-center gap-3 px-4 py-3 text-sm transition-all duration-200 hover:text-hpe-green text-gray-300 text-left"
            )}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ) : (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-4 py-3 text-sm transition-all duration-200 hover:text-hpe-green text-gray-300",
              isActive && "text-hpe-green bg-black/20 border-l-2 border-hpe-green"
            )}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        )
      ))}
      
      <CreateProjectModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </aside>
  );
};

export default Sidebar;
