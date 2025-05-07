import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { QueryClient } from "@tanstack/react-query";
import MainLayout from "./components/Layout/MainLayout";
import ManageModels from "./pages/ManageModels";
import Settings from "./pages/Settings";
import Archived from "./pages/Archived";
import ProjectDetails from "./pages/ProjectDetails";
import DataDashboard from "./pages/DataDashboard/DataDashboard";
import NotFound from "./pages/NotFound";
import ChatButton from "./pages/Chat/ChatButton";
import { ChatPage } from "./pages/Chat/ChatPage";

export default function AppRoutes() {
  const location = useLocation();
  const hideChatButton = location.pathname === '/chat';

  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/manage" replace />} />
          <Route path="manage" element={<ManageModels />} />
          <Route path="dashboard" element={<DataDashboard />} />
          <Route path="chat" element={<ChatPage />} />
          <Route path="settings" element={<Settings />} />
          <Route path="archived" element={<Archived />} />
          <Route path="project/:id" element={<ProjectDetails />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

      {!hideChatButton && <ChatButton />}
    </>
  );
}