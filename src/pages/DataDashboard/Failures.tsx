
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

interface FailuresProps {
  machine: string;
}

const Failures: React.FC<FailuresProps> = ({ machine }) => {
  const failures = [
    {
      date: '2023-03-01',
      issue: 'Overheating'
    },
    {
      date: '2023-03-02',
      issue: 'Low Pressure'
    },
    {
      date: '2023-03-03',
      issue: 'Sensor Failure'
    }
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Previous Failures</h3>
      
      <div className="space-y-4">
        {failures.map((failure, index) => (
          <Card key={index} className="border border-destructive/20 hover:border-destructive/40 transition-colors">
            <CardContent className="p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <AlertTriangle size={16} className="text-destructive" />
                <div className="text-sm font-medium">Date: <span className="font-normal">{failure.date}</span></div>
              </div>
              <div className="pl-6 text-sm">
                Issue: <span className="text-destructive">{failure.issue}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Failures;
