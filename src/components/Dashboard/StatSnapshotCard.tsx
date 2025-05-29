import React from 'react';
import { Info, LucideProps } from 'lucide-react';
import { cn } from '@/lib/utils';

// Define a mapping for icon names to components
const iconMap: { [key: string]: React.ComponentType<LucideProps> } = {
  Info: Info,
};

export interface StatSnapshotCardProps {
  type: 'percentage' | 'value';
  value: string | number;
  text: string;
  unit?: string;
  iconName?: keyof typeof iconMap;
  className?: string;
}

const StatSnapshotCard: React.FC<StatSnapshotCardProps> = ({
  type,
  value,
  text,
  unit,
  iconName,
  className,
}) => {
  const IconComponent = iconName ? iconMap[iconName] : null;

  return (
    <div className={cn('flex flex-col', className)}>
      {type === 'percentage' && (
        <p className="text-4xl font-semibold text-foreground">{value}</p>
      )}
      {type === 'value' && (
        <div className="flex items-baseline">
          <p className="text-4xl font-semibold text-foreground">{value}</p>
          {unit && <p className="ml-1 text-base text-muted-foreground">{unit}</p>}
        </div>
      )}
      <p className="mt-1 text-sm text-muted-foreground flex items-center">
        {text}
        {IconComponent && <IconComponent className="ml-1.5 h-4 w-4 text-muted-foreground" />}
      </p>
    </div>
  );
};

export default StatSnapshotCard;
