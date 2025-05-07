import { ModelDeploymentCard } from "./ModelDeploymentCard";
import { UploadDataCard } from "./UploadDataCard";
import { ViewDashboardCard } from "./ViewDashboardCard";
import { ModelTrainingCard } from "./ModelTrainingCard";

export const OldVersion = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <UploadDataCard />
      <ViewDashboardCard />
      <ModelTrainingCard />
      <ModelDeploymentCard />
    </div>
  );
};
