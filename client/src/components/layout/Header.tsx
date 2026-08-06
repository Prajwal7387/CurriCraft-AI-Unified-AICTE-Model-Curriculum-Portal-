import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { toggleSidebar } from '@/store/slices/uiSlice';
import { useAuth } from '@/hooks/useAuth';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { Button } from '@/components/ui/button';
import { UserProfileModal } from '@/components/shared/UserProfileModal';
import { Menu, Bell, LogOut, Search, UserCheck, ShieldCheck, ChevronDown, Sparkles, User } from 'lucide-react';
import { toast } from 'sonner';

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { user, login, logout } = useAuth();
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isSwitchingRole, setIsSwitchingRole] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const demoAccounts = [
    { name: 'Dr. Abhay Jere', role: 'AICTE Admin', email: 'admin@curricraft.in', pass: 'Admin@123456', icon: '👑', color: 'from-violet-600 to-indigo-600' },
    { name: 'Prof. Anil Sahasrabudhe', role: 'Bureau Head', email: 'bureau@curricraft.in', pass: 'Bureau@123456', icon: '🏢', color: 'from-blue-600 to-cyan-600' },
    { name: 'Dr. Rajesh Sharma', role: 'Curriculum Expert', email: 'expert@curricraft.in', pass: 'Expert@123456', icon: '🎓', color: 'from-purple-600 to-pink-600' },
    { name: 'Dr. Priya Nair', role: 'Peer Reviewer', email: 'reviewer@curricraft.in', pass: 'Reviewer@123456', icon: '🔍', color: 'from-amber-600 to-orange-600' },
    { name: 'Viewer Demo', role: 'Public Viewer', email: 'viewer@curricraft.in', pass: 'Viewer@123456', icon: '👁️', color: 'from-emerald-600 to-teal-600' },
  ];

  const handleQuickSwitchRole = async (email: string, pass: string, roleName: string) => {
    try {
      setIsSwitchingRole(true);
      setIsRoleDropdownOpen(false);

      // Clear previous user tokens to prevent header collision
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      await login(email, pass);
      toast.success(`Switched role to ${roleName}!`);
      
      // Navigate cleanly to dashboard
      window.location.href = '/dashboard';
    } catch (err: any) {
      toast.error('Failed to switch role. Please try again.');
    } finally {
      setIsSwitchingRole(false);
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background/80 px-4 md:px-6 backdrop-blur-md transition-all">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => dispatch(toggleSidebar())}
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Search Bar */}
        <div className="relative hidden sm:flex items-center w-64 md:w-80">
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search AICTE model curriculum, modules..."
            className="h-9 w-full rounded-full border border-input bg-muted/40 pl-9 pr-4 text-xs focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        {/* Quick Role Switcher Dropdown */}
        <div className="relative">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
            isLoading={isSwitchingRole}
            className="text-xs font-semibold gap-1.5 border-primary/30 bg-primary/5 hover:bg-primary/10"
          >
            <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" />
            <span className="hidden sm:inline">Switch Role:</span>
            <span className="font-bold text-primary">{user?.role?.name || 'Role'}</span>
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
          </Button>

          {isRoleDropdownOpen && (
            <div className="absolute right-0 mt-2 w-72 rounded-2xl border bg-card p-2 shadow-2xl z-50 animate-fade-in space-y-1 text-xs">
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground border-b mb-1">
                Instant 1-Click Role Switcher
              </div>
              {demoAccounts.map((acc) => (
                <button
                  key={acc.email}
                  onClick={() => handleQuickSwitchRole(acc.email, acc.pass, acc.role)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all text-left hover:bg-muted ${
                    user?.email === acc.email ? 'bg-primary/10 border border-primary/20 font-bold' : ''
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{acc.icon}</span>
                    <div>
                      <div className="font-bold text-foreground">{acc.name}</div>
                      <div className="text-[10px] text-muted-foreground">{acc.role}</div>
                    </div>
                  </div>
                  {user?.email === acc.email && (
                    <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <ThemeToggle />

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative rounded-full">
          <Bell className="h-4 w-4" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary" />
        </Button>

        {/* User Badge & Avatar Trigger */}
        {user && (
          <div className="flex items-center gap-3 pl-2 border-l border-border">
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="flex items-center gap-2.5 text-right group p-1 rounded-xl hover:bg-muted/50 transition-colors"
              title="Click to view AICTE Digital Identity Card"
            >
              <div className="flex flex-col text-right hidden sm:flex">
                <span className="text-xs font-bold leading-none group-hover:text-primary transition-colors">{user.name}</span>
                <span className="text-[10px] text-primary font-mono font-semibold mt-0.5">
                  {user.role?.name}
                </span>
              </div>

              <div className="relative">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-black text-xs shadow-md shadow-primary/20 group-hover:scale-105 transition-transform border border-white/20">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 border-2 border-background" />
              </div>
            </button>

            <Button
              variant="ghost"
              size="icon"
              onClick={logout}
              title="Logout"
              className="text-muted-foreground hover:text-destructive"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* User Profile Modal */}
      <UserProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} />
    </header>
  );
};
