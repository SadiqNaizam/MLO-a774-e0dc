import React from 'react';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CalendarDays } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SourceData {
  name: string;
  value: number;
  percentageText: string; // Percentage text as shown in image
  color: string;
}

const sourcesData: SourceData[] = [
  { name: 'Clutch', value: 3000, percentageText: '50%', color: '#F97316' }, // orange-500
  { name: 'Behance', value: 1000, percentageText: '40%', color: '#FACC15' }, // yellow-400. Note: image percentages sum to 110%. Using image % for display.
  { name: 'Instagram', value: 1000, percentageText: '10%', color: '#0EA5E9' }, // sky-500
  { name: 'Dribbble', value: 1000, percentageText: '10%', color: '#84CC16' }, // lime-500
];

// Calculate actual percentages for chart proportions if needed, but image text is primary
const totalValue = sourcesData.reduce((sum, item) => sum + item.value, 0);
const chartDisplayData = sourcesData.map(item => ({ ...item, actualPercentage: (item.value / totalValue) * 100 }));


interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md">
        <p className="font-medium">{`${data.name}: $${data.value.toLocaleString()}`}</p>
        <p className="text-muted-foreground">{`(${data.actualPercentage.toFixed(1)}% of total value)`}</p>
      </div>
    );
  }
  return null;
};

interface CustomLegendProps {
  payload?: Array<{ value: string; color: string; payload: SourceData & { actualPercentage: number } }>;
}

const CustomLegend: React.FC<CustomLegendProps> = (props) => {
  const { payload } = props;
  return (
    <ul className="mt-4 space-y-2 text-sm">
      {payload?.map((entry, index) => (
        <li key={`item-${index}`} className="flex items-center justify-between">
          <div className="flex items-center">
            <span style={{ backgroundColor: entry.color }} className="mr-2 inline-block h-3 w-3 rounded-sm" />
            <span className="text-foreground">{entry.value}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-muted-foreground w-16 text-right">{`$ ${entry.payload.value.toLocaleString()}`}</span>
            <span className="text-muted-foreground w-10 text-right relative">
              {entry.payload.percentageText}
              {entry.value === 'Dribbble' && (
                 <div className="absolute -top-6 right-0 whitespace-nowrap rounded bg-slate-800 px-2 py-1 text-xs text-white shadow-lg">
                   from leads total
                   <div className="absolute bottom-0 right-1/2 h-2 w-2 translate-x-1/2 translate-y-1/2 rotate-45 transform bg-slate-800"></div>
                 </div>
              )}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
};

const SourcesPieChart: React.FC = () => {
  const [activeButton, setActiveButton] = React.useState<'came' | 'converted' | 'size'>('converted');

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Sources</CardTitle>
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
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <Pie
                data={chartDisplayData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                stroke="hsl(var(--card))"
                strokeWidth={3}
              >
                {chartDisplayData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--accent))', opacity: 0.3 }} />
              <Legend content={<CustomLegend />} verticalAlign="bottom" />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex justify-center space-x-1 rounded-md bg-muted p-1">
          <Button
            variant="ghost"
            size="sm"
            className={cn('w-full', activeButton === 'came' && 'bg-card shadow-sm')}
            onClick={() => setActiveButton('came')}
          >
            Leads came
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={cn('w-full', activeButton === 'converted' && 'bg-card shadow-sm')}
            onClick={() => setActiveButton('converted')}
          >
            Leads Converted
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={cn('w-full', activeButton === 'size' && 'bg-card shadow-sm')}
            onClick={() => setActiveButton('size')}
          >
            Total deals size
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SourcesPieChart;
