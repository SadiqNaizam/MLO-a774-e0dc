import React from 'react';
import MainAppLayout from '@/components/layout/MainAppLayout';
import FunnelChart from '@/components/Dashboard/FunnelChart';
import SourcesPieChart from '@/components/Dashboard/SourcesPieChart';
import LeadsTrackingChart from '@/components/Dashboard/LeadsTrackingChart';
import StatsSnapshotGrid from '@/components/Dashboard/StatsSnapshotGrid';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const IndexPage: React.FC = () => {
  return (
    <MainAppLayout>
      <Tabs defaultValue="leads" className="w-full">
        <TabsList className="mb-6 border-b-0 bg-transparent p-0">
          <TabsTrigger
            value="sales"
            className="mr-4 rounded-none border-b-2 border-transparent px-1 pb-2 text-base font-medium text-muted-foreground data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none hover:text-primary"
          >
            Sales
          </TabsTrigger>
          <TabsTrigger
            value="leads"
            className="rounded-none border-b-2 border-transparent px-1 pb-2 text-base font-medium text-muted-foreground data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none hover:text-primary"
          >
            Leads
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sales">
          <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
            <h2 className="text-xl font-semibold">Sales Data</h2>
            <p className="text-muted-foreground">
              Sales-specific charts and information would go here. This tab serves as a placeholder and is not fully implemented as per current dashboard focus.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="leads">
          {/* This grid structure implements the Layout Requirements: mainContent.container = "grid grid-cols-2 gap-6" */}
          {/* On large screens, it's a 2-column grid. On smaller screens, it stacks to 1 column. */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* FunnelChart will occupy the first column on large screens */}
            <FunnelChart />
            
            {/* SourcesPieChart will occupy the second column on large screens */}
            <SourcesPieChart />
            
            {/* LeadsTrackingChart's root Card component has 'col-span-2', 
                so it will span both columns of this grid automatically on large screens. */}
            <LeadsTrackingChart />
            
            {/* This div wrapper ensures that StatsSnapshotGrid as a whole spans both columns on large screens.
                StatsSnapshotGrid itself then uses its own internal grid layout for its content. */}
            <div className="lg:col-span-2">
              <StatsSnapshotGrid />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </MainAppLayout>
  );
};

export default IndexPage;
