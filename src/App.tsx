
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/Layout/MainLayout";
import ManageModels from "./pages/ManageModels";
import Settings from "./pages/Settings";
import Archived from "./pages/Archived";
import ProjectDetails from "./pages/ProjectDetails";
import DataDashboard from "./pages/DataDashboard/DataDashboard";
import NotFound from "./pages/NotFound";
import ChatButton from "./components/Chat/ChatButton";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Navigate to="/manage" replace />} />
            <Route path="manage" element={<ManageModels />} />
            <Route path="settings" element={<Settings />} />
            <Route path="archived" element={<Archived />} />
            <Route path="project/:id" element={<ProjectDetails />} />
            <Route path="dashboard/:projectId" element={<DataDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        <ChatButton />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
