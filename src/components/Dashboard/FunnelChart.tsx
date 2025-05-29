import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface FunnelStage {
  id: string;
  name: string;
  count: number;
  value: number;
  duration: string;
  color: string;
  textColor?: string;
  highlight?: boolean;
}

const funnelData: FunnelStage[] = [
  { id: 'discovery', name: 'Discovery', count: 200, value: 200, duration: '2 days', color: 'bg-red-500' },
  { id: 'qualified', name: 'Qualified', count: 100, value: 100, duration: '2 days', color: 'bg-yellow-400', highlight: true },
  { id: 'conversation', name: 'In conversation', count: 50, value: 100, duration: 'avg. time', color: 'bg-indigo-600' },
  { id: 'negotiations', name: 'Negotiations', count: 20, value: 50, duration: '8 days', color: 'bg-green-500' },
  { id: 'closed_won', name: 'Closed won', count: 20, value: 50, duration: '10 days', color: 'bg-purple-600' },
];

const FunnelChart: React.FC = () => {
  const totalActiveLeads = 600;
  const totalBarValue = funnelData.reduce((sum, stage) => sum + stage.count, 0);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Funnel count</CardTitle>
        <div className="text-3xl font-bold text-foreground">
          {totalActiveLeads} <span className="text-sm font-normal text-muted-foreground">active leads</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex h-8 w-full rounded-md overflow-hidden">
          {funnelData.map((stage) => (
            <div
              key={stage.id}
              className={cn('h-full', stage.color)}
              style={{ width: `${(stage.count / totalBarValue) * 100}%` }}
              title={`${stage.name}: ${stage.count}`}
            />
          ))}
        </div>
        <ul className="space-y-3">
          {funnelData.map((stage) => (
            <li key={stage.id} className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <span className={cn('mr-2 h-3 w-3 rounded-sm', stage.color)} />
                <span className="text-foreground">{stage.name}</span>
              </div>
              <div className="flex items-center space-x-6">
                <span className="w-10 text-right text-muted-foreground">{stage.count}</span>
                <span className="w-16 text-right text-muted-foreground">$ {stage.value}</span>
                <div className="w-24 text-right relative">
                  <span className="text-muted-foreground">{stage.duration}</span>
                  {stage.id === 'qualified' && (
                     <div className="absolute -top-7 right-0 whitespace-nowrap rounded bg-slate-800 px-2 py-1 text-xs text-white shadow-lg">
                       average time on this stage
                       <div className="absolute bottom-0 right-1/2 h-2 w-2 translate-x-1/2 translate-y-1/2 rotate-45 transform bg-slate-800"></div>
                     </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default FunnelChart;
