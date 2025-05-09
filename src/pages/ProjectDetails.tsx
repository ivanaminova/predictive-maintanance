import React, { useCallback, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, Cpu } from "lucide-react";
import { useProjects } from "@/context/ProjectContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import apiService from "../services/apiService";
import { Loader } from "rsuite";
import { fi, is } from "date-fns/locale";

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { getProject } = useProjects();
  const navigate = useNavigate();
  const project = getProject(id || "");

  const [phaseUpload, setPhaseUpload] = useState(false);
  const [phaseTrain, setPhaseTrain] = useState(false);
  const [phaseDeploy, setPhaseDeploy] = useState(false);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  const [filesDropped, setFilesDropped] = useState(false);
  const [uploadInitiated, setUploadInitiated] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadCompleted, setUploadCompleted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [trainingStarted, setTrainingStarted] = useState(false);
  const [isTraining, setIsTraining] = useState(false);

  const [isDeploying, setIsDeploying] = useState(false);
  const [deployingFinished, setDeployingFinished] = useState("");

  const [progress, setProgress] = useState(0);
  const [progressCheckPoint, setProgressCheckPoint] = useState("");
  const [completedTraining, setCompletedTraining] = useState(false);
  const progressIntervalRef = useRef(null);

  const requiredFilesMap: Record<string, string> = {
    "1": "equipment_usage.csv",
    "2": "failure_logs.csv",
    "3": "maintenance_history.csv",
    "4": "sensor_data.csv",
  };
  const requiredFilenames = Object.values(requiredFilesMap);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  function resetState() {
    setDragActive(false);
    setFilesDropped(false);
    setUploadInitiated(false);
    setIsUploading(false);
    setUploadCompleted(false);
    setErrorMessage("");
  }

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    resetState();

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFilesDropped(true);
      setSelectedFiles(Array.from(e.dataTransfer.files));
      e.dataTransfer.clearData();
    }
  };

  const handleBrowseClick = () => {
    resetState();

    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.onchange = (e) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        setSelectedFiles(Array.from(files));
        setFilesDropped(true);
      }
    };
    input.click();
  };

  const validateSelectedFiles = (files: File[]) => {
    const uploadedFilenames = files.map((file) => file.name.toLowerCase());
    const missingFiles = requiredFilenames.filter(
      (requiredFile) => !uploadedFilenames.includes(requiredFile.toLowerCase())
    );
    return {
      isValid: missingFiles.length === 0,
      missingFiles,
    };
  };

  const uploadFilesToBackend = async () => {
    setPhaseUpload(true);
    setUploadInitiated(true);
    const { isValid, missingFiles } = validateSelectedFiles(selectedFiles);

    if (!isValid) {
      setErrorMessage(
        `Upload failed. Missing required files:\n${missingFiles.join("\n")}`
      );
      setUploadInitiated(false);
      return;
    }

    const formDataFiles = new FormData();

    // attach uploaded files to a formData with keys 1,2,3,4
    Object.entries(requiredFilesMap).forEach(([key, requiredFilename]) => {
      const matchingFile = selectedFiles.find(
        (file) => file.name.toLowerCase() === requiredFilename.toLowerCase()
      );
      if (matchingFile) {
        console.log(matchingFile);
        formDataFiles.append(key, matchingFile);
      }
    });

    setIsUploading(true);
    setUploadCompleted(false);
    setErrorMessage("");

    try {
      const res = await apiService.uploadFiles(formDataFiles);
      console.log(res);
      setUploadCompleted(true);
      setFilesDropped(false);
      setUploadInitiated(false);
      setIsUploading(false);
      setPhaseUpload(false);
    } catch (error) {
      console.error("File upload failed:", error);
      setUploadCompleted(true);
      setErrorMessage("File upload failed. Please try again.");
      setFilesDropped(false);
      setUploadInitiated(false);
      setIsUploading(false);
    }
  };

  function showAppropriateUploadBoxMessage() {
    if (uploadCompleted) {
      if (errorMessage !== "") {
        console.log("showing for: upload failed");
        return (
          <p className="text-sm font-medium text-[#fc6161] mb-2">
            {errorMessage}
          </p>
        );
      } else {
        console.log("showing for: upload successful");
        return (
          <p className="text-sm font-medium text-[#17eba0] mb-2">
            {selectedFiles.length} file
            {selectedFiles.length > 1 ? "s" : ""} uploaded
          </p>
        );
      }
    }
    if (!filesDropped) {
      console.log("showing for: no files dropped (start position)");
      return <p className="text-muted-foreground text-sm">Drop file here or</p>;
    } else if (filesDropped && !uploadInitiated && errorMessage) {
      console.log(
        "showing for: files dropped upload clicked but didnt pass validation"
      );
      return (
        <p className="text-sm font-medium text-[#fc6161] mb-2">
          {errorMessage}
        </p>
      );
    } else if (filesDropped && !uploadInitiated) {
      console.log("showing for: files dropped upload btn not clicked");
      return (
        <p className="text-sm font-medium text-foreground mb-2">
          {selectedFiles.length} file
          {selectedFiles.length > 1 ? "s" : ""} selected
        </p>
      );
    } else if (uploadInitiated && isUploading && !uploadCompleted) {
      console.log("showing for: files dropped clicked upload still uploading");
      return (
        <div>
          <Loader size="sm" className="mb-2" />
        </div>
      );
    }
  }

  function showAppropriateUploadBoxBtn() {
    if (!filesDropped) {
      return (
        <Button
          variant="outline"
          className="mt-2 text-sm"
          onClick={handleBrowseClick}
        >
          Browse
        </Button>
      );
    } else if (filesDropped && !uploadInitiated && errorMessage) {
      return (
        <Button
          variant="outline"
          className="mt-2 text-sm"
          onClick={handleBrowseClick}
        >
          Browse
        </Button>
      );
    } else {
      let disabledDuringUploading = true;
      if (!uploadInitiated) {
        disabledDuringUploading = false;
      }
      if (uploadCompleted) {
        disabledDuringUploading = false;
      }
      return (
        <Button
          variant="outline"
          className="mt-2 text-sm"
          onClick={uploadFilesToBackend}
          disabled={disabledDuringUploading}
        >
          Upload
        </Button>
      );
    }
  }

  const handleStartTraining = async () => {
    setPhaseUpload(false);
    setPhaseTrain(true);

    setIsTraining(true);
    setTrainingStarted(true);
    setProgress(0);

    try {
      const trainPromise = apiService.trainModel(); // Starts the long-running process
      try {
        const response = (await apiService.getProgress()) as {
          progress: number;
          step: string;
        };

        const percentage = response.progress;
        setProgressCheckPoint(response.step);
        setProgress(percentage);
      } catch (pollError) {
        console.error("Progress polling failed:", pollError);
      }
      // Start polling progress every 90 seconds (ONLY after user clicks Start Training)
      progressIntervalRef.current = setInterval(async () => {
        try {
          const response = (await apiService.getProgress()) as {
            progress: number;
            step: string;
          };

          const percentage = response.progress;
          setProgressCheckPoint(response.step);
          setProgress(percentage);

          if (percentage >= 100) {
            clearInterval(progressIntervalRef.current);
            progressIntervalRef.current = null;
            setCompletedTraining(true);
            setIsTraining(false);
          }
        } catch (pollError) {
          console.error("Progress polling failed:", pollError);
        }
      }, 10_000); // 10s (or 90s if you prefer)

      const trainRes = await trainPromise;

      // training process in parallel while polling runs
      const entries = Object.entries(trainRes);
      if (entries.length > 0) {
        const [key, value] = entries[0];

        console.log(trainRes);

        if (value === "--- Stage 2 Finished ---") {
          clearInterval(progressIntervalRef.current);
          progressIntervalRef.current = null;
          setProgressCheckPoint("Model training completed.");
          setProgress(100);
          setCompletedTraining(true);
          setIsTraining(false);
          setPhaseTrain(false);
          setPhaseDeploy(true);
        } else {
          throw new Error("Unsuccessful training!");
        }
      } else {
        throw new Error("Training response is empty!");
      }
    } catch (error) {
      console.error("Training failed:", error);
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
      setProgressCheckPoint("Training error");
      setIsTraining(false);
      setTrainingStarted(false);
    }
  };

  const handleDeployModel = async () => {
    try {
      setIsDeploying(true);
      const res = await apiService.deployModel();
      console.log(res);
      setDeployingFinished("Deployment successful.");
    } catch (err) {
      console.log(err.message);
      setDeployingFinished(err.message);
    } finally {
      setIsDeploying(false);
      setPhaseDeploy(false);
    }
    // Your deploy logic goes here
    console.log("Deploying model...");
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/manage")}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
          {project.name.charAt(0).toUpperCase()}
        </div>
        <h2 className="text-xl font-medium">{project.name}</h2>
      </div>
      <div className="m-40">
        <Card className="border border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Cpu size={18} /> Upload and Train
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              className={cn(
                "border-2 border-dashed border-border rounded-md py-8 px-4 text-center transition-colors",
                dragActive ? "border-primary bg-primary/5" : "",
                !phaseTrain ? "opacity-50 pointer-events-none" : "", // disable upload when training
                phaseDeploy ? "opacity-50 pointer-events-none" : "" // disable upload when deploying
              )}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
              {showAppropriateUploadBoxMessage()}
              {showAppropriateUploadBoxBtn()}
            </div>

            <div className="flex flex-col gap-4">
              <Button
                className="w-32 self-end"
                onClick={handleStartTraining}
                disabled={phaseUpload || phaseTrain || phaseDeploy}
              >
                Start Training
              </Button>

              <Progress className="h-3 w-full" value={progress} />
              <div className="flex justify-between">
                <div className="text-xs">{progressCheckPoint}</div>
                <div className="text-xs">{progress}% complete</div>
              </div>
            </div>

            <div className="flex flex-row justify-between gap-4">
              {isDeploying ? <Loader size="md" className="mb-2" /> : <p></p>}

              <Button
                className="w-32 self-end"
                onClick={handleDeployModel}
                disabled={!completedTraining || phaseTrain || phaseDeploy}
              >
                Deploy Model
              </Button>
            </div>

            {deployingFinished && (
              <span>
                {!deployingFinished.includes("successfully") ? (
                  <p className="text-sm font-medium text-[#fc6161] mb-2 flex justify-end">
                    Yes!
                  </p>
                ) : (
                  <p className="text-sm font-medium text-[#17eba0] mb-2 flex justify-end">
                    Nope
                  </p>
                )}
              </span>
            )}
          </CardContent>

          <CardFooter className="flex justify-end"></CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ProjectDetails;
