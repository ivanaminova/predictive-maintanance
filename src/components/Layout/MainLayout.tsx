
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { ProjectProvider } from '@/context/ProjectContext';
import { ThemeProvider } from '@/context/ThemeContext';

const MainLayout = () => {
  return (
    <ThemeProvider>
      <ProjectProvider>
        <div className="flex flex-col min-h-screen bg-background text-foreground">
          <Header />
          <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1 p-6 overflow-auto">
              <Outlet />
            </main>
          </div>
        </div>
      </ProjectProvider>
    </ThemeProvider>
  );
};

export default MainLayout;
