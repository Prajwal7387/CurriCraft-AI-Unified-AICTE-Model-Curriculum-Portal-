import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Sparkles,
  ShieldCheck,
  GitBranch,
  ArrowRight,
  Activity,
  Zap,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const roleName = user?.role?.name || 'PUBLIC_VIEWER';
  const [selectedStat, setSelectedStat] = useState<string | null>(null);

  const roleConfig: Record<string, { title: string; desc: string; color: string; icon: string }> = {
    AICTE_ADMIN: {
      title: 'AICTE Chief Governance & System Admin Portal',
      desc: 'Unrestricted administration, user access management, national telemetry audit, and policy controls.',
      color: 'from-violet-600 via-indigo-600 to-purple-600',
      icon: '👑',
    },
    BUREAU_HEAD: {
      title: 'Bureau Head Approval & Publishing Workspace',
      desc: 'Review submitted model curricula, authorize national publication, and manage subject expert panels.',
      color: 'from-blue-600 via-indigo-600 to-cyan-600',
      icon: '🏢',
    },
    CURRICULUM_EXPERT: {
      title: 'Curriculum Expert Collaborative Workspace',
      desc: 'Create model syllabi, design Bloom Taxonomy Course Outcomes, and utilize AI syllabus generation.',
      color: 'from-purple-600 via-indigo-600 to-pink-600',
      icon: '🎓',
    },
    REVIEWER: {
      title: 'Peer Review & Quality Audit Dashboard',
      desc: 'Annotate curriculum drafts, review pull requests, and verify NEP 2020 credit compliance.',
      color: 'from-amber-600 via-orange-600 to-amber-700',
      icon: '🔍',
    },
    PUBLIC_VIEWER: {
      title: 'Public AICTE Model Curriculum Repository',
      desc: 'Browse, search, and download official AICTE Model Curricula & NEP compliant degree syllabi.',
      color: 'from-emerald-600 via-teal-600 to-emerald-700',
      icon: '👁️',
    },
  };

  const defaultRole = {
    title: 'Public AICTE Model Curriculum Repository',
    desc: 'Browse, search, and download official AICTE Model Curricula & NEP compliant degree syllabi.',
    color: 'from-emerald-600 via-teal-600 to-emerald-700',
    icon: '👁️',
  };

  const currentRole = roleConfig[roleName] || defaultRole;

  const stats = [
    { id: 'stat-1', title: 'Active Model Curriculums', value: '42', icon: BookOpen, change: '+12% this month', detail: '42 AICTE Model Curricula active across B.Tech, M.Tech, MCA & Diploma programs.' },
    { id: 'stat-2', title: 'AI Suggestions Generated', value: '1,280', icon: Sparkles, change: '98.4% accuracy rate', detail: '1,280 AI-generated syllabus modules, Bloom COs, and practical lab assignments.' },
    { id: 'stat-3', title: 'NEP Compliance Audits', value: '100%', icon: ShieldCheck, change: 'All criteria passed', detail: '100% compliance with 160 B.Tech credit caps, UHV mandatory courses, and internships.' },
    { id: 'stat-4', title: 'Pending Review Branches', value: '7', icon: GitBranch, change: '3 merge requests', detail: '7 active working branches with 3 open merge requests awaiting peer review.' },
  ];

  const recentActivities = [
    { id: 'act-1', user: 'Dr. Rajesh Sharma', action: 'Updated Module 3 topics in PCC-CS-401 (Data Structures)', time: '10 mins ago' },
    { id: 'act-2', user: 'Prof. Anil Sahasrabudhe', action: 'Approved Merge Request MR-1 for NEP Credit Alignment', time: '1 hour ago' },
    { id: 'act-3', user: 'AI Assistant', action: 'Generated 5 Bloom Taxonomy COs for Deep Learning (PCC-AI-501)', time: '2 hours ago' },
    { id: 'act-4', user: 'Dr. Priya Nair', action: 'Added review annotation on Universal Human Values (HSMC-101)', time: '4 hours ago' },
  ];

  return (
    <div className="space-y-6">
      {/* Dynamic Banner */}
      <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-r ${currentRole.color} p-6 md:p-8 text-white shadow-2xl transition-all`}>
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold backdrop-blur-md border border-white/15">
            <span className="text-base">{currentRole.icon}</span> Active Role: <span className="underline font-mono">{roleName}</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight">
            Welcome back, {user?.name || 'User'} 👋
          </h1>
          <p className="text-sm text-indigo-100 max-w-2xl leading-relaxed">
            {currentRole.desc}
          </p>
        </div>
      </div>

      {/* Interactive Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.id}
              onClick={() => setSelectedStat(stat.detail)}
              className="card-hover border-border/60 cursor-pointer group"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xs font-bold text-muted-foreground uppercase group-hover:text-primary transition-colors">
                  {stat.title}
                </CardTitle>
                <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black text-foreground">{stat.value}</div>
                <p className="text-[11px] text-emerald-500 font-bold mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Grid: Actions & Live Activity Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Actions Cards */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Quick Actions for {roleName}</CardTitle>
              <CardDescription>Launch interactive features tailored to your governance role</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link to="/workspace">
                <div className="p-5 rounded-2xl border bg-gradient-to-b from-card to-card/50 hover:border-primary/50 transition-all space-y-2 card-hover">
                  <h4 className="font-bold text-sm flex items-center gap-2 text-foreground">
                    <BookOpen className="h-4 w-4 text-primary" /> Workspace
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    TipTap rich editor with L-T-P-C credit calculation & CO mapping.
                  </p>
                  <div className="pt-2 text-xs font-bold text-primary flex items-center gap-1">
                    Open Workspace <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </Link>

              <Link to="/ai-assistant">
                <div className="p-5 rounded-2xl border bg-gradient-to-b from-card to-card/50 hover:border-indigo-500/50 transition-all space-y-2 card-hover">
                  <h4 className="font-bold text-sm flex items-center gap-2 text-foreground">
                    <Sparkles className="h-4 w-4 text-indigo-400" /> AI Assistant
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Generate model syllabi, course outcomes, & Bloom taxonomy.
                  </p>
                  <div className="pt-2 text-xs font-bold text-indigo-400 flex items-center gap-1">
                    Launch AI <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </Link>

              <Link to="/nep-compliance">
                <div className="p-5 rounded-2xl border bg-gradient-to-b from-card to-card/50 hover:border-emerald-500/50 transition-all space-y-2 card-hover">
                  <h4 className="font-bold text-sm flex items-center gap-2 text-foreground">
                    <ShieldCheck className="h-4 w-4 text-emerald-500" /> NEP Audit
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Automated credit cap, UHV, & Bloom higher-order skills audit.
                  </p>
                  <div className="pt-2 text-xs font-bold text-emerald-500 flex items-center gap-1">
                    Run Audit <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Live Activity Stream */}
        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" /> Live Governance Activity
            </CardTitle>
            <CardDescription>Real-time audit log stream</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            {recentActivities.map((act) => (
              <div key={act.id} className="p-3 rounded-xl border bg-muted/20 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-foreground">{act.user}</span>
                  <span className="text-[10px] text-muted-foreground font-mono">{act.time}</span>
                </div>
                <p className="text-muted-foreground text-[11px] leading-snug">{act.action}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Stat Detail Popup Modal */}
      {selectedStat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md rounded-2xl border bg-card p-6 shadow-2xl text-card-foreground space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg text-primary flex items-center gap-2">
                <Zap className="h-5 w-5" /> Telemetry Insight
              </h3>
              <Button variant="ghost" size="icon" onClick={() => setSelectedStat(null)}>✕</Button>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{selectedStat}</p>
            <div className="flex justify-end pt-2">
              <Button variant="default" size="sm" onClick={() => setSelectedStat(null)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
