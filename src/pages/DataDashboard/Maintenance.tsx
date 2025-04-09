
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { WrenchIcon } from 'lucide-react';

interface MaintenanceProps {
  machine: string;
}

const Maintenance: React.FC<MaintenanceProps> = ({ machine }) => {
  const maintenanceSchedules = [
    {
      date: '2023-03-04',
      type: 'Routine Check'
    },
    {
      date: '2023-03-05',
      type: 'Calibration'
    },
    {
      date: '2023-03-06',
      type: 'Software Update'
    }
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Scheduled & Past Maintenance</h3>
      
      <div className="space-y-4">
        {maintenanceSchedules.map((schedule, index) => (
          <Card key={index} className="border border-primary/20 hover:border-primary/40 transition-colors">
            <CardContent className="p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <WrenchIcon size={16} className="text-primary" />
                <div className="text-sm font-medium">Date: <span className="font-normal">{schedule.date}</span></div>
              </div>
              <div className="pl-6 text-sm">
                Type: <span className="text-primary">{schedule.type}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Maintenance;
