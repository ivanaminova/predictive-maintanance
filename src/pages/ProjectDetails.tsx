import React, { useCallback, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, BarChart3, Cpu, GitBranch, Server } from 'lucide-react';
import { useProjects } from '@/context/ProjectContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { getProject } = useProjects();
  const navigate = useNavigate();
  const project = getProject(id || '');
  
  const [dragActive, setDragActive] = useState(false);
  
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
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
      toast.success(`Uploaded ${files.length} file(s): ${files.map(f => f.name).join(', ')}`);
    }
  }, []);
  
  const handleBrowseClick = () => {
    // Create and trigger a file input
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.multiple = true;
    fileInput.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        const files = Array.from(target.files);
        toast.success(`Selected ${files.length} file(s): ${files.map(f => f.name).join(', ')}`);
      }
    };
    fileInput.click();
  };
  
  if (!project) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl text-destructive">Project not found</h2>
        <Button 
          onClick={() => navigate('/manage')} 
          variant="link" 
          className="mt-4"
        >
          Return to Dashboard
        </Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
          {project.name.charAt(0).toUpperCase()}
        </div>
        <h2 className="text-xl font-medium">{project.name}</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Row 1: Upload Data and Data Dashboard */}
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
              <Button variant="outline" className="mt-2 text-sm" onClick={handleBrowseClick}>Browse</Button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button>Start Training</Button>
          </CardFooter>
        </Card>
        
        <Card className="border border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <BarChart3 size={18} /> Data Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p>View real-time data, monitor performance metrics, and analyze historical trends from connected machines.</p>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={() => navigate(`/dashboard/${id}`)}>
              View Dashboard
            </Button>
          </CardFooter>
        </Card>
        
        {/* Row 2: Model Training and Model Deployment */}
        <Card className="border border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Cpu size={18} /> Model Training
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p>Train machine learning models on your data to detect anomalies, predict failures, and optimize performance.</p>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-accent/30 p-3 rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <GitBranch size={14} />
                  <h4 className="text-sm font-medium">LSTM</h4>
                </div>
                <Progress className="h-2 w-full" value={78} />
                <div className="text-xs mt-1">78% complete</div>
              </div>
              <div className="bg-accent/30 p-3 rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <Cpu size={14} />
                  <h4 className="text-sm font-medium">GRU</h4>
                </div>
                <Progress className="h-2 w-full" value={45} />
                <div className="text-xs mt-1">45% complete</div>
              </div>
              <div className="bg-accent/30 p-3 rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <Cpu size={14} />
                  <h4 className="text-sm font-medium">Transformer</h4>
                </div>
                <Progress className="h-2 w-full" value={65} />
                <div className="text-xs mt-1">65% complete</div>
              </div>
              <div className="bg-accent/30 p-3 rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <Cpu size={14} />
                  <h4 className="text-sm font-medium">Isolation Forest</h4>
                </div>
                <Progress className="h-2 w-full" value={90} />
                <div className="text-xs mt-1">90% complete</div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button>View Models</Button>
          </CardFooter>
        </Card>
        
        <Card className="border border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Server size={18} /> Model Deployment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="model-select" className="text-sm font-medium">
                Select a model:
              </label>
              <Select>
                <SelectTrigger id="model-select" className="w-full">
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lstm">LSTM</SelectItem>
                  <SelectItem value="gru">GRU</SelectItem>
                  <SelectItem value="transformer">Transformer</SelectItem>
                  <SelectItem value="isolation-forest">Isolation Forest</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full mt-4">Deploy Model</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectDetails;
