import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Search, ChevronDown, PlusCircle, FilePlus, UserPlus } from 'lucide-react';

// From Project Requirements -> Project Info:
const projectInfo = {
  name: "Sales Leads Dashboard",
  description: "Dashboard layout visualizing funnel count, sources, leads tracking, and reasons for leads lost.",
  targetPage: "Dashboard Overview"
};

const TopHeader: React.FC = () => {
  return (
    <header className="fixed left-64 right-0 top-0 z-10 flex h-[72px] items-center justify-between border-b border-border bg-card px-6 text-foreground">
      <h1 className="text-xl font-semibold text-foreground">{projectInfo.targetPage}</h1>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="h-9 w-full rounded-md bg-background pl-9 md:w-[200px] lg:w-[300px] focus-visible:ring-ring"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default" className="h-9 bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring">
              Create
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Quick Create</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <UserPlus className="mr-2 h-4 w-4" />
              <span>New Lead</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FilePlus className="mr-2 h-4 w-4" />
              <span>New Proposal</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <PlusCircle className="mr-2 h-4 w-4" />
              <span>New Task</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopHeader;
