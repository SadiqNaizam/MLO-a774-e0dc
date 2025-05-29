import React from 'react';
import StatSnapshotCard, { StatSnapshotCardProps } from './StatSnapshotCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const reasonsForLeadsLost: StatSnapshotCardProps[] = [
  { type: 'percentage', value: '40%', text: 'The proposal is unclear' },
  { type: 'percentage', value: '20%', text: 'However venture pursuit' },
  { type: 'percentage', value: '10%', text: 'Other' },
  { type: 'percentage', value: '30%', text: 'Lack of internal alignment' }, // Varied text
];

const otherDataStats: StatSnapshotCardProps[] = [
  { type: 'value', value: '900', text: 'total leads count' },
  { type: 'value', value: '12', unit: 'days', text: 'in average to convert lead' },
  { type: 'value', value: '30', text: 'inactive leads', iconName: 'Info' },
];

const StatsSnapshotGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Reasons of leads lost</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
          {reasonsForLeadsLost.map((stat, index) => (
            <StatSnapshotCard key={`reason-${index}`} {...stat} />
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Other data</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3">
          {otherDataStats.map((stat, index) => (
            <StatSnapshotCard key={`other-${index}`} {...stat} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsSnapshotGrid;
