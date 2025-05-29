import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  UserCircle,
  FileText,
  Receipt,
  Package,
  Mail,
  Archive,
  CalendarDays,
  HelpCircle,
  Settings,
  Briefcase, // Placeholder for logo icon
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  Users,
  UserCircle,
  FileText,
  Receipt,
  Package,
  Mail,
  Archive,
  CalendarDays,
  HelpCircle,
  Settings,
};

interface NavItem {
  label: string;
  href: string;
  iconName: keyof typeof iconMap;
}

const mainNavItems: NavItem[] = [
  { label: 'Dashboard', href: '/', iconName: 'LayoutDashboard' },
  { label: 'Leads', href: '/leads', iconName: 'Users' },
  { label: 'Customers', href: '/customers', iconName: 'UserCircle' },
  { label: 'Proposals', href: '/proposals', iconName: 'FileText' },
  { label: 'Invoices', href: '/invoices', iconName: 'Receipt' },
  { label: 'Items', href: '/items', iconName: 'Package' },
  { label: 'Mail', href: '/mail', iconName: 'Mail' },
  { label: 'Shoebox', href: '/shoebox', iconName: 'Archive' },
  { label: 'Calendar', href: '/calendar', iconName: 'CalendarDays' },
];

const bottomNavItems: NavItem[] = [
  { label: 'Help', href: '/help', iconName: 'HelpCircle' },
  { label: 'Settings', href: '/settings', iconName: 'Settings' },
];

const SidebarNav: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const renderNavItem = (item: NavItem, index: number) => {
    const IconComponent = iconMap[item.iconName];
    const isActive = item.href === '/' ? currentPath === item.href : currentPath.startsWith(item.href);

    return (
      <li key={`${item.label}-${index}`}>
        <Link
          to={item.href}
          className={cn(
            'flex items-center space-x-3 rounded-md p-2 text-sm font-medium transition-colors',
            'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
            isActive
              ? 'bg-sidebar-primary text-sidebar-primary-foreground'
              : 'text-sidebar-foreground hover:text-sidebar-accent-foreground'
          )}
        >
          <IconComponent className="h-5 w-5 flex-shrink-0" />
          <span>{item.label}</span>
        </Link>
      </li>
    );
  };

  return (
    <aside className="fixed left-0 top-0 z-20 flex h-screen w-64 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
      <div className="flex h-[72px] items-center space-x-2 border-b border-sidebar-border px-4">
        <Link to="/" className="flex items-center space-x-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring rounded-sm">
          <Briefcase className="h-7 w-7 text-sidebar-primary" />
          <span className="text-lg font-semibold text-sidebar-foreground">SalesLeads Co.</span>
        </Link>
      </div>
      <nav className="flex-grow overflow-y-auto p-4">
        <ul className="space-y-1.5">
          {mainNavItems.map(renderNavItem)}
        </ul>
      </nav>
      <div className="border-t border-sidebar-border p-4">
        <ul className="space-y-1.5">
          {bottomNavItems.map(renderNavItem)}
        </ul>
      </div>
    </aside>
  );
};

export default SidebarNav;
