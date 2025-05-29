import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CalendarDays } from 'lucide-react';

interface LeadsDataPoint {
  month: string;
  closedWon: number;
  closedLost: number;
}

const leadsTrackingData: LeadsDataPoint[] = [
  { month: 'March', closedWon: 55, closedLost: 68 },
  { month: 'April', closedWon: 62, closedLost: 50 },
  { month: 'May', closedWon: 88, closedLost: 35 },
  { month: 'June', closedWon: 70, closedLost: 10 },
  { month: 'July', closedWon: 92, closedLost: 42 },
  { month: 'August', closedWon: 60, closedLost: 25 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md">
        <p className="font-medium text-foreground">{label}</p>
        {payload.map((pld, index) => (
          <p key={index} style={{ color: pld.color }}>
            {`${pld.name}: ${pld.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const LeadsTrackingChart: React.FC = () => {
  const totalClosed = 680;
  const totalLost = 70;

  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg font-medium">Leads tracking</CardTitle>
          <div className="mt-1 space-x-4">
            <span className="text-3xl font-bold text-foreground">{totalClosed}</span>
            <span className="text-sm text-muted-foreground">total closed</span>
            <span className="text-3xl font-bold text-foreground ml-4">{totalLost}</span>
            <span className="text-sm text-muted-foreground">total lost</span>
          </div>
        </div>
        <Select defaultValue="last-6-months">
          <SelectTrigger className="h-8 w-auto bg-transparent px-2 text-xs">
            <CalendarDays className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent align="end">
            <SelectItem value="last-6-months">Last 6 months</SelectItem>
            <SelectItem value="last-12-months">Last 12 months</SelectItem>
            <SelectItem value="all-time">All time</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={leadsTrackingData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <defs>
                <linearGradient id="colorClosedWon" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0D9488" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#0D9488" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorClosedLost" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#DC2626" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#DC2626" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
                className="text-xs text-muted-foreground"
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => `${value}`}
                className="text-xs text-muted-foreground"
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'hsl(var(--foreground))', strokeWidth: 1, opacity: 0.5 }} />
              <Legend 
                verticalAlign="bottom" 
                height={36} 
                iconType="square"
                iconSize={10}
                formatter={(value, entry) => <span className="text-sm text-muted-foreground ml-1">{value}</span>}
              />
              <Area
                type="monotone"
                dataKey="closedWon"
                stroke="#0D9488" // teal-600
                fillOpacity={1}
                fill="url(#colorClosedWon)"
                strokeWidth={2}
                name="Closed won"
                dot={{ r: 4, strokeWidth: 2, fill: '#0D9488', stroke: 'hsl(var(--card))' }}
                activeDot={{ r: 6, strokeWidth: 2, fill: '#0D9488', stroke: 'hsl(var(--card))' }}
              />
              <Area
                type="monotone"
                dataKey="closedLost"
                stroke="#DC2626" // red-600
                fillOpacity={1}
                fill="url(#colorClosedLost)"
                strokeWidth={2}
                name="Closed lost"
                dot={{ r: 4, strokeWidth: 2, fill: '#DC2626', stroke: 'hsl(var(--card))' }}
                activeDot={{ r: 6, strokeWidth: 2, fill: '#DC2626', stroke: 'hsl(var(--card))' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadsTrackingChart;
