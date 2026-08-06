import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShieldCheck, Users, UserPlus, Search, CheckCircle2, XCircle, KeyRound, Filter } from 'lucide-react';
import { toast } from 'sonner';

export interface UserItem {
  id: string;
  name: string;
  email: string;
  role: string;
  institution: string;
  department: string;
  status: 'ACTIVE' | 'INACTIVE';
  lastLogin: string;
}

export const initialUsersList: UserItem[] = [
  { id: '1', name: 'Dr. Abhay Jere', email: 'admin@curricraft.in', role: 'AICTE_ADMIN', institution: 'AICTE New Delhi', department: 'Innovation Cell', status: 'ACTIVE', lastLogin: '2 mins ago' },
  { id: '2', name: 'Prof. Anil Sahasrabudhe', email: 'bureau@curricraft.in', role: 'BUREAU_HEAD', institution: 'AICTE Headquarters', department: 'Academic Bureau', status: 'ACTIVE', lastLogin: '1 hour ago' },
  { id: '3', name: 'Dr. Rajesh Sharma', email: 'expert@curricraft.in', role: 'CURRICULUM_EXPERT', institution: 'IIT Delhi', department: 'Computer Science', status: 'ACTIVE', lastLogin: '3 hours ago' },
  { id: '4', name: 'Dr. Priya Nair', email: 'reviewer@curricraft.in', role: 'REVIEWER', institution: 'IISc Bangalore', department: 'Electrical Engineering', status: 'ACTIVE', lastLogin: 'Yesterday' },
  { id: '5', name: 'Viewer Demo', email: 'viewer@curricraft.in', role: 'PUBLIC_VIEWER', institution: 'Anna University', department: 'Education', status: 'ACTIVE', lastLogin: '4 hours ago' },
  { id: '6', name: 'Prof. S. K. Gupta', email: 'sk.gupta@iitb.ac.in', role: 'CURRICULUM_EXPERT', institution: 'IIT Bombay', department: 'Mechanical Engineering', status: 'INACTIVE', lastLogin: '3 days ago' },
];

export const AdminUserManagementPage: React.FC = () => {
  const [users, setUsers] = useState<UserItem[]>(initialUsersList);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');

  const toggleStatus = (id: string) => {
    setUsers(
      users.map((u) => {
        if (u.id === id) {
          const newStatus = u.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
          toast.success(`User ${u.name} is now ${newStatus}`);
          return { ...u, status: newStatus };
        }
        return u;
      })
    );
  };

  const filteredUsers = users.filter((u) => {
    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.institution.toLowerCase().includes(search.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Admin Hero Header */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-violet-700 via-indigo-600 to-purple-700 text-white shadow-2xl space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold backdrop-blur-md border border-white/15">
          <ShieldCheck className="h-3.5 w-3.5 text-amber-300" /> AICTE System Administrator Control Panel
        </div>
        <h1 className="text-3xl font-black tracking-tight">User & Role Permission Management</h1>
        <p className="text-xs text-indigo-100 max-w-2xl leading-relaxed">
          Manage user accounts, assign RBAC governance roles, activate/deactivate institutional subject experts, and monitor login activity.
        </p>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-card/60 p-4 rounded-2xl border backdrop-blur-md">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search user, email, or institution..."
            className="pl-10 h-10 bg-background/80"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="h-10 rounded-xl border bg-background px-3 text-xs font-semibold"
          >
            <option value="ALL">All Governance Roles</option>
            <option value="AICTE_ADMIN">AICTE Admin</option>
            <option value="BUREAU_HEAD">Bureau Head</option>
            <option value="CURRICULUM_EXPERT">Curriculum Expert</option>
            <option value="REVIEWER">Peer Reviewer</option>
            <option value="PUBLIC_VIEWER">Public Viewer</option>
          </select>

          <Button variant="gradient" size="sm" onClick={() => toast.info('Add New Expert User modal triggered')}>
            <UserPlus className="h-4 w-4 mr-1.5" /> Add User
          </Button>
        </div>
      </div>

      {/* User Table Card */}
      <Card className="border-border/60">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" /> Registered AICTE Governance Portal Users ({filteredUsers.length})
          </CardTitle>
          <CardDescription>Role-Based Access Control (RBAC) user roster</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b bg-muted/30 text-muted-foreground uppercase text-[10px] font-bold">
                <tr>
                  <th className="p-3">User Details</th>
                  <th className="p-3">Institution & Dept</th>
                  <th className="p-3">Assigned Role</th>
                  <th className="p-3">Account Status</th>
                  <th className="p-3">Last Active</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y border-b">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-muted/20 transition-colors">
                    <td className="p-3">
                      <div className="font-bold text-foreground">{user.name}</div>
                      <div className="text-[11px] text-muted-foreground">{user.email}</div>
                    </td>
                    <td className="p-3">
                      <div className="font-semibold">{user.institution}</div>
                      <div className="text-[11px] text-muted-foreground">{user.department}</div>
                    </td>
                    <td className="p-3">
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                        {user.role}
                      </span>
                    </td>
                    <td className="p-3">
                      {user.status === 'ACTIVE' ? (
                        <span className="inline-flex items-center gap-1 font-bold text-emerald-500 text-[11px]">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 font-bold text-destructive text-[11px]">
                          <XCircle className="h-3.5 w-3.5" /> Inactive
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-muted-foreground font-mono text-[11px]">
                      {user.lastLogin}
                    </td>
                    <td className="p-3 text-right">
                      <Button
                        variant={user.status === 'ACTIVE' ? 'outline' : 'default'}
                        size="sm"
                        className="text-[11px]"
                        onClick={() => toggleStatus(user.id)}
                      >
                        {user.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
