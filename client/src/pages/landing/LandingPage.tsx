import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Logo } from '@/components/shared/Logo';
import MagicRings from '@/components/ui/MagicRings';
import MagicBento from '@/components/ui/MagicBento';
import {
  Sparkles,
  BookOpen,
  GitBranch,
  ShieldCheck,
  CheckSquare,
  Globe,
  ArrowRight,
  Zap,
  Award,
  CheckCircle2,
  Users,
  Play,
  FileText,
  Lock,
  ChevronRight,
  Building2,
  ExternalLink,
  Layers,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();
  const [activeFeatureTab, setActiveFeatureTab] = useState<'editor' | 'git' | 'ai' | 'nep'>('editor');
  const [isLaunching, setIsLaunching] = useState(false);

  const handleLaunchDefault = async (targetPath = '/dashboard') => {
    try {
      setIsLaunching(true);
      if (!isAuthenticated) {
        toast.info('Auto-authenticating default AICTE Admin credentials...');
        await login('admin@curricraft.in', 'Admin@123456');
      }
      toast.success('Launching CurriCraft AI Workspace!');
      navigate(targetPath);
    } catch {
      navigate('/login');
    } finally {
      setIsLaunching(false);
    }
  };

  const handleQuickLaunchRole = async (email: string, roleName: string, pass: string) => {
    toast.info(`Authenticating as ${roleName}...`);
    try {
      setIsLaunching(true);
      // Clear old tokens for clean authentication
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      await login(email, pass);
      toast.success(`Welcome ${roleName}! Launching workspace...`);
      window.location.href = '/dashboard';
    } catch (err: any) {
      toast.error('Failed to log in as demo account.');
    } finally {
      setIsLaunching(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-primary selection:text-white relative overflow-x-hidden">
      {/* Background Animated Rings */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
        <MagicRings
          color="#A855F7"
          colorTwo="#6366F1"
          ringCount={6}
          speed={1}
          attenuation={10}
          lineThickness={2}
          baseRadius={0.35}
          radiusStep={0.15}
          scaleRate={0.1}
          opacity={1}
          blur={0}
          noiseAmount={0.05}
          rotation={0}
          ringGap={1.5}
          followMouse={true}
          mouseInfluence={0.05}
          hoverScale={1}
        />
      </div>

      {/* Floating Header Navbar */}
      <header className="sticky top-4 z-50 max-w-6xl mx-auto px-4">
        <nav className="flex items-center justify-between h-16 px-6 rounded-full border border-white/10 bg-slate-900/80 backdrop-blur-xl shadow-2xl">
          <Logo showText size="sm" />

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-300">
            <a href="#features" className="hover:text-primary transition-colors">Core Features</a>
            <Link to="/ai-assistant" className="hover:text-primary transition-colors">AI Engine</Link>
            <Link to="/nep-compliance" className="hover:text-primary transition-colors">NEP 2020 Compliance</Link>
            <Link to="/portal" className="hover:text-primary transition-colors">Public Syllabi</Link>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <Button
              variant="gradient"
              size="sm"
              isLoading={isLaunching}
              onClick={() => handleLaunchDefault('/dashboard')}
              className="rounded-full gap-2 text-xs font-bold px-5 shadow-lg shadow-primary/25"
            >
              Go to Workspace <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 max-w-5xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary backdrop-blur-md">
          <Sparkles className="h-4 w-4 text-amber-300 animate-pulse" /> AICTE Problem Statement SIH1465 • Official AI-Powered Platform
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.1] text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400">
          Unified AI-Powered <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-violet-500">
            Model Curriculum Platform
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Engineered for AICTE officials and subject experts to collaboratively create, review, audit, version-control, and publish NEP 2020 Model Curricula nationwide.
        </p>

        {/* Hero CTA Group */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Button
            variant="gradient"
            size="lg"
            isLoading={isLaunching}
            onClick={() => handleLaunchDefault('/workspace')}
            className="rounded-full font-bold px-8 h-12 text-sm shadow-xl shadow-primary/20 gap-2"
          >
            Start Collaborative Authoring <ArrowRight className="h-4 w-4" />
          </Button>

          <a href="#features">
            <Button variant="outline" size="lg" className="rounded-full font-bold px-8 h-12 text-sm border-white/15 bg-white/5 hover:bg-white/10 text-white">
              Explore All Modules
            </Button>
          </a>
        </div>

        {/* Live Metrics Strip */}
        <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-white/10">
          <Link to="/analytics">
            <div className="p-4 rounded-2xl border border-white/5 bg-slate-900/50 backdrop-blur-md hover:border-primary/50 transition-all card-hover">
              <div className="text-2xl font-black text-white">10,480+</div>
              <div className="text-xs text-slate-400 font-medium">AICTE Colleges Tracked</div>
            </div>
          </Link>
          <Link to="/nep-compliance">
            <div className="p-4 rounded-2xl border border-white/5 bg-slate-900/50 backdrop-blur-md hover:border-emerald-500/50 transition-all card-hover">
              <div className="text-2xl font-black text-primary">100%</div>
              <div className="text-xs text-slate-400 font-medium">NEP 2020 Credit Audited</div>
            </div>
          </Link>
          <Link to="/ai-assistant">
            <div className="p-4 rounded-2xl border border-white/5 bg-slate-900/50 backdrop-blur-md hover:border-purple-500/50 transition-all card-hover">
              <div className="text-2xl font-black text-purple-400">1,280+</div>
              <div className="text-xs text-slate-400 font-medium">AI Bloom CO Mappings</div>
            </div>
          </Link>
          <Link to="/analytics">
            <div className="p-4 rounded-2xl border border-white/5 bg-slate-900/50 backdrop-blur-md hover:border-indigo-500/50 transition-all card-hover">
              <div className="text-2xl font-black text-emerald-400">28 States</div>
              <div className="text-xs text-slate-400 font-medium">National Telemetry</div>
            </div>
          </Link>
        </div>
      </section>

      {/* Interactive Module Showcase Section */}
      <section id="features" className="py-16 px-4 max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-black tracking-tight">Combining the Power of Best-in-Class Tools</h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Combining Google Docs, GitHub, Notion, Jira, Grammarly, and ChatGPT specifically engineered for AICTE curriculum governance.
          </p>
        </div>

        {/* Feature Tabs Control */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
          <Button
            variant={activeFeatureTab === 'editor' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveFeatureTab('editor')}
            className="rounded-full text-xs font-bold gap-2 px-5"
          >
            <BookOpen className="h-4 w-4" /> Google Docs Workspace
          </Button>
          <Button
            variant={activeFeatureTab === 'git' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveFeatureTab('git')}
            className="rounded-full text-xs font-bold gap-2 px-5"
          >
            <GitBranch className="h-4 w-4" /> GitHub Version Control
          </Button>
          <Button
            variant={activeFeatureTab === 'ai' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveFeatureTab('ai')}
            className="rounded-full text-xs font-bold gap-2 px-5"
          >
            <Sparkles className="h-4 w-4" /> ChatGPT & Bloom AI
          </Button>
          <Button
            variant={activeFeatureTab === 'nep' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveFeatureTab('nep')}
            className="rounded-full text-xs font-bold gap-2 px-5"
          >
            <ShieldCheck className="h-4 w-4" /> NEP 2020 Compliance
          </Button>
        </div>

        {/* Interactive Feature Card Display */}
        <div className="p-8 rounded-3xl border border-white/10 bg-slate-900/90 backdrop-blur-xl shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {activeFeatureTab === 'editor' && (
            <>
              <div className="space-y-4">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs border border-primary/20">
                  Curriculum Workspace Module
                </span>
                <h3 className="text-2xl font-bold">Google Docs Style Collaborative Syllabus Editor</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Real-time TipTap rich editor with active collaborator presence badges, L-T-P-C credit calculation formula, module breakdowns, and inline peer annotations.
                </p>
                <div className="pt-2">
                  <Button variant="gradient" size="sm" onClick={() => handleLaunchDefault('/workspace')}>
                    Launch Workspace Editor <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Button>
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-slate-950 border border-white/10 font-mono text-xs text-slate-300 space-y-3">
                <div className="text-xs font-bold text-primary border-b border-white/10 pb-2">PCC-CS-401: Data Structures & Algorithms</div>
                <div className="p-3 rounded-xl bg-slate-900 border border-white/5 space-y-1">
                  <span className="text-[10px] text-amber-400 font-bold uppercase">Module 3: Trees & Graph Theory (12 Hours)</span>
                  <p className="text-slate-400 text-[11px]">Binary Search Trees, AVL Trees, Dijkstra Shortest Path, Prim & Kruskal Spanning Trees.</p>
                </div>
                <div className="text-right text-[10px] text-slate-500">AICTE Formula: L:3 + T:1 + P:2/2 = 5 Credits</div>
              </div>
            </>
          )}

          {activeFeatureTab === 'git' && (
            <>
              <div className="space-y-4">
                <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 font-bold text-xs border border-purple-500/20">
                  Git Version Control System
                </span>
                <h3 className="text-2xl font-bold">Branching, Commits, Pull Requests & Rollbacks</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Git-style snapshot versioning for engineering syllabi. Create working draft branches, inspect side-by-side diffs, submit merge requests, and execute 1-click historical rollbacks.
                </p>
                <div className="pt-2">
                  <Button variant="gradient" size="sm" onClick={() => handleLaunchDefault('/versions')}>
                    Open Version Control <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Button>
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-slate-950 border border-white/10 font-mono text-xs space-y-2">
                <div className="text-emerald-400">+ Added: Universal Human Values 2 mandatory section</div>
                <div className="text-emerald-400">+ Added: Course Outcome CO4 (Bloom: Create)</div>
                <div className="text-rose-400">- Removed: Deprecated 2018 credit matrix</div>
                <div className="text-slate-500 text-[10px] pt-2">Commit Hash: a1b2c3d • Tag: v2.1.0</div>
              </div>
            </>
          )}

          {activeFeatureTab === 'ai' && (
            <>
              <div className="space-y-4">
                <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 font-bold text-xs border border-indigo-500/20">
                  Grammarly & ChatGPT Suite
                </span>
                <h3 className="text-2xl font-bold">AI Syllabus & Bloom CO-PO Generator</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Prompt-driven AI engine that formats course topics into structured 5-module syllabi and maps Course Outcomes to Bloom's Taxonomy cognitive levels (*Apply*, *Analyze*, *Evaluate*, *Create*).
                </p>
                <div className="pt-2">
                  <Button variant="gradient" size="sm" onClick={() => handleLaunchDefault('/ai-assistant')}>
                    Open AI Assistant <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Button>
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-slate-950 border border-white/10 font-mono text-xs space-y-2 text-indigo-300">
                <div>✨ AI Prompt: "Generate AICTE Deep Learning Syllabus"</div>
                <div className="p-3 rounded-xl bg-slate-900 text-slate-200 space-y-1">
                  <span className="font-bold text-primary">CO3 (Bloom: Create):</span>
                  <p className="text-[11px] text-slate-400">Synthesize deep convolutional neural networks for automated computer vision systems.</p>
                </div>
              </div>
            </>
          )}

          {activeFeatureTab === 'nep' && (
            <>
              <div className="space-y-4">
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-bold text-xs border border-emerald-500/20">
                  NEP 2020 Compliance Engine
                </span>
                <h3 className="text-2xl font-bold">Automated 160-Credit Degree Audit & Scorecard</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Instant automated compliance audit verifying degree credit limits (160 total B.Tech credits), mandatory Universal Human Values (UHV) inclusion, and higher-order skills ratio.
                </p>
                <div className="pt-2">
                  <Button variant="gradient" size="sm" onClick={() => handleLaunchDefault('/nep-compliance')}>
                    Run NEP Compliance Check <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Button>
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-slate-950 border border-white/10 text-xs space-y-3">
                <div className="flex justify-between items-center text-emerald-400 font-bold">
                  <span>NEP 2020 Compliance Audit Score:</span>
                  <span className="text-lg font-black font-mono">94 / 100</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 w-[94%]" />
                </div>
                <p className="text-[10px] text-slate-400 font-mono">Status: Officially Verified for AICTE 2025-26 Academic Year</p>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Quick Role Access Explorer */}
      <section className="py-16 px-4 max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black">1-Click Role Access Launcher</h2>
          <p className="text-xs text-slate-400">Click any role card below to instantly log in and enter that role's workspace</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { role: 'AICTE Admin', name: 'Dr. Abhay Jere', email: 'admin@curricraft.in', pass: 'Admin@123456', icon: '👑', color: '139, 92, 246' }, // violet
            { role: 'Bureau Head', name: 'Prof. Anil Sahasrabudhe', email: 'bureau@curricraft.in', pass: 'Bureau@123456', icon: '🏢', color: '59, 130, 246' }, // blue
            { role: 'Curriculum Expert', name: 'Dr. Rajesh Sharma', email: 'expert@curricraft.in', pass: 'Expert@123456', icon: '🎓', color: '168, 85, 247' }, // purple
            { role: 'Peer Reviewer', name: 'Dr. Priya Nair', email: 'reviewer@curricraft.in', pass: 'Reviewer@123456', icon: '🔍', color: '245, 158, 11' }, // amber
            { role: 'Public Viewer', name: 'Viewer Demo', email: 'viewer@curricraft.in', pass: 'Viewer@123456', icon: '👁️', color: '16, 185, 129' }, // emerald
          ].map((acc) => (
            <MagicBento
              key={acc.email}
              onClick={() => handleQuickLaunchRole(acc.email, acc.role, acc.pass)}
              className="h-full"
              enableSpotlight={true}
              spotlightRadius={300}
              glowColor={acc.color}
            >
              <div className="p-5 space-y-3 text-center flex-1 flex flex-col justify-center">
                <span className="text-3xl block">{acc.icon}</span>
                <h4 className="font-bold text-sm text-white">{acc.name}</h4>
                <p className="text-[11px] text-slate-400 font-mono">{acc.role}</p>
                <div className="pt-3 text-[10px] font-bold text-primary flex items-center justify-center gap-1 group-hover:text-white transition-colors">
                  Enter Workspace <ChevronRight className="h-3 w-3" />
                </div>
              </div>
            </MagicBento>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10 bg-slate-950 text-slate-400 text-xs">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <Logo showText size="sm" />
            <p className="text-[11px] text-slate-500">
              CurriCraft AI – Unified AICTE Model Curriculum Portal • Problem Statement SIH1465
            </p>
          </div>

          <div className="flex items-center gap-6 text-[11px]">
            <Link to="/portal" className="hover:text-white transition-colors">Public Repository</Link>
            <Link to="/resources" className="hover:text-white transition-colors">Academic Hub</Link>
            <Link to="/login" className="hover:text-white transition-colors">Official Portal Login</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
