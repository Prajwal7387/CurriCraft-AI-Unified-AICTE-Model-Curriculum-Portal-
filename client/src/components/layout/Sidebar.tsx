import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { toggleSidebarCollapse } from '@/store/slices/uiSlice';
import { Logo } from '@/components/shared/Logo';
import {
  LayoutDashboard,
  BookOpen,
  GitBranch,
  Sparkles,
  ShieldCheck,
  Library,
  BarChart3,
  CheckSquare,
  Globe,
  ChevronLeft,
  ChevronRight,
  Users,
  Building2,
  FileCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  allowedRoles?: string[];
}

export const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const { sidebarOpen, sidebarCollapsed } = useSelector((state: RootState) => state.ui);
  const { user } = useAuth();
  const roleName = user?.role?.name || 'PUBLIC_VIEWER';

  // Navigation Items per Role
  const allNavItems: NavItem[] = [
    { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    
    // Admin Specific
    { title: 'User & Role Control', href: '/admin/users', icon: Users, allowedRoles: ['AICTE_ADMIN'], badge: 'Admin' },
    
    // Bureau Head Specific
    { title: 'Expert Committee', href: '/bureau/experts', icon: Building2, allowedRoles: ['BUREAU_HEAD'], badge: 'Panel' },
    { title: 'Approval Workflow', href: '/workflows', icon: CheckSquare, allowedRoles: ['AICTE_ADMIN', 'BUREAU_HEAD', 'REVIEWER'], badge: 'Board' },
    
    // Curriculum Expert & Editor Specific
    { title: 'Curriculum Workspace', href: '/workspace', icon: BookOpen, allowedRoles: ['AICTE_ADMIN', 'BUREAU_HEAD', 'CURRICULUM_EXPERT', 'REVIEWER'], badge: 'Docs' },
    { title: 'AI Assistant', href: '/ai-assistant', icon: Sparkles, allowedRoles: ['AICTE_ADMIN', 'BUREAU_HEAD', 'CURRICULUM_EXPERT'], badge: 'AI' },
    { title: 'Version Control', href: '/versions', icon: GitBranch, allowedRoles: ['AICTE_ADMIN', 'BUREAU_HEAD', 'CURRICULUM_EXPERT', 'REVIEWER'], badge: 'Git' },
    
    // Audit & Analytics
    { title: 'NEP Compliance', href: '/nep-compliance', icon: ShieldCheck, allowedRoles: ['AICTE_ADMIN', 'BUREAU_HEAD', 'CURRICULUM_EXPERT', 'REVIEWER'] },
    { title: 'National Analytics', href: '/analytics', icon: BarChart3, allowedRoles: ['AICTE_ADMIN', 'BUREAU_HEAD', 'CURRICULUM_EXPERT'] },
    
    // Public & Shared
    { title: 'Resource Hub', href: '/resources', icon: Library },
    { title: 'Public Portal', href: '/portal', icon: Globe, badge: 'PDF' },
  ];

  // Filter items visible for the active role
  const visibleNavItems = allNavItems.filter((item) => {
    if (!item.allowedRoles) return true; // Visible to all
    return item.allowedRoles.includes(roleName);
  });

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-40 flex flex-col border-r bg-card/95 backdrop-blur-md transition-all duration-300 ease-in-out md:static',
        sidebarCollapsed ? 'w-20' : 'w-64',
        !sidebarOpen && '-translate-x-full md:translate-x-0'
      )}
    >
      {/* Sidebar Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b">
        <Logo showText={!sidebarCollapsed} size="sm" />
        <button
          onClick={() => dispatch(toggleSidebarCollapse())}
          className="hidden md:flex h-6 w-6 items-center justify-center rounded-full border bg-background text-muted-foreground hover:text-foreground transition-colors"
        >
          {sidebarCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
        </button>
      </div>

      {/* Role Badge Banner */}
      {!sidebarCollapsed && (
        <div className="px-4 py-2 border-b bg-muted/30 flex items-center justify-between text-[11px]">
          <span className="text-muted-foreground font-medium">Role Menu:</span>
          <span className="font-mono font-bold text-primary px-2 py-0.5 rounded bg-primary/10 border border-primary/20">
            {roleName}
          </span>
        </div>
      )}

      {/* Navigation items */}
      <div className="flex-1 overflow-y-auto py-3 px-3 space-y-1">
        {visibleNavItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold transition-all group',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                  sidebarCollapsed && 'justify-center px-0'
                )
              }
              title={sidebarCollapsed ? item.title : undefined}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!sidebarCollapsed && <span>{item.title}</span>}
              {!sidebarCollapsed && item.badge && (
                <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-extrabold text-primary border border-primary/20">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Footer System Status */}
      {!sidebarCollapsed && (
        <div className="p-4 border-t border-border">
          <div className="rounded-xl bg-muted/50 p-3 text-xs flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-muted-foreground font-mono text-[11px]">AICTE Governance: Active</span>
          </div>
        </div>
      )}
    </aside>
  );
};
