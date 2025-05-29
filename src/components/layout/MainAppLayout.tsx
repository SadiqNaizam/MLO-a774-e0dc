import React from 'react';
import SidebarNav from './SidebarNav';
import TopHeader from './TopHeader';

interface MainAppLayoutProps {
  children: React.ReactNode;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* SidebarNav is fixed, positions itself, and has a z-index of 20 */}
      <SidebarNav />

      {/* This div represents the area to the right of the sidebar */}
      {/* It needs ml-64 to not be overlapped by the SidebarNav */}
      <div className="ml-64 flex flex-1 flex-col overflow-hidden">
        {/* TopHeader is fixed, positions itself with left-64, and has a z-index of 10 */}
        {/* It will correctly overlay the top part of this div */}
        <TopHeader />

        {/* Main content area */}
        {/* `mt-[72px]` pushes content below the fixed TopHeader (height 72px) */}
        {/* `p-6` provides padding for the content itself */}
        {/* `flex-1` allows it to take remaining vertical space */}
        {/* `overflow-y-auto` enables scrolling for content that exceeds available space */}
        {/* `min-w-0` is important for flex children that might contain wide, unbreakable content */}
        <main className="flex-1 overflow-y-auto p-6 mt-[72px] min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainAppLayout;
