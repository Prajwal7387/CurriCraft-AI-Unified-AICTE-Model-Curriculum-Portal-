import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, TrendingUp, Globe, Building2, CheckCircle2, Award, Zap } from 'lucide-react';
import { toast } from 'sonner';

export const AnalyticsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'state' | 'university' | 'gap'>('state');

  const stateAdoption = [
    { state: 'Maharashtra (DTE Maharashtra)', count: 485, pct: '96%', color: 'from-violet-500 to-indigo-500' },
    { state: 'Tamil Nadu (Anna University System)', count: 440, pct: '92%', color: 'from-blue-500 to-cyan-500' },
    { state: 'Karnataka (VTU Belagavi)', count: 390, pct: '95%', color: 'from-emerald-500 to-teal-500' },
    { state: 'Uttar Pradesh (AKTU Lucknow)', count: 375, pct: '88%', color: 'from-amber-500 to-orange-500' },
    { state: 'Gujarat (GTU Ahmedabad)', count: 290, pct: '91%', color: 'from-purple-500 to-pink-500' },
    { state: 'Telangana (JNTU Hyderabad)', count: 260, pct: '94%', color: 'from-indigo-500 to-violet-500' },
  ];

  const topUniversities = [
    { rank: '#1', name: 'Indian Institute of Technology Delhi (IITD)', status: '100% NEP Compliant', adoption: 'PCC/ESC/HSMC All Active' },
    { rank: '#2', name: 'Vivesvaraya Technological University (VTU)', status: '100% NEP Compliant', adoption: '218 Affiliated Colleges' },
    { rank: '#3', name: 'Anna University Chennai', status: '100% NEP Compliant', adoption: '440 Affiliated Colleges' },
    { rank: '#4', name: 'Dr. A.P.J. Abdul Kalam Technical University (AKTU)', status: '98% NEP Compliant', adoption: '375 Affiliated Colleges' },
    { rank: '#5', name: 'Gujarat Technological University (GTU)', status: '96% NEP Compliant', adoption: '290 Affiliated Colleges' },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-700 via-indigo-600 to-purple-700 p-8 text-white shadow-2xl">
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold backdrop-blur-md border border-white/15">
            <BarChart3 className="h-3.5 w-3.5 text-indigo-300" /> Real-time National AICTE Telemetry Dashboard
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight">
            National Curriculum Adoption & Gap Analytics
          </h1>
          <p className="text-sm text-indigo-100 max-w-2xl leading-relaxed">
            Live telemetry tracking 10,000+ AICTE approved engineering institutes across 28 Indian States & 8 Union Territories for NEP 2020 Model Curriculum compliance.
          </p>
        </div>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground uppercase font-bold">Total Approved Institutes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-foreground">10,480+</div>
            <p className="text-[11px] text-emerald-500 font-bold mt-1">↑ +8.4% YoY Adoption</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground uppercase font-bold">Model Syllabi Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-primary">1,240</div>
            <p className="text-[11px] text-muted-foreground mt-1">Across 14 Technical Streams</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground uppercase font-bold">National NEP Compliance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-emerald-500">93.8%</div>
            <p className="text-[11px] text-emerald-600 font-bold mt-1">160 Credit Cap Verified</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground uppercase font-bold">AI Assistance Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-indigo-400">48,200+</div>
            <p className="text-[11px] text-muted-foreground mt-1">CO-PO Generations</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Control */}
      <div className="flex items-center gap-2 border-b pb-2">
        <Button variant={activeTab === 'state' ? 'default' : 'ghost'} size="sm" onClick={() => setActiveTab('state')}>
          <Globe className="h-4 w-4 mr-1.5" /> State-Wise Adoption Rates
        </Button>
        <Button variant={activeTab === 'university' ? 'default' : 'ghost'} size="sm" onClick={() => setActiveTab('university')}>
          <Building2 className="h-4 w-4 mr-1.5" /> Top Technical Universities
        </Button>
        <Button variant={activeTab === 'gap' ? 'default' : 'ghost'} size="sm" onClick={() => setActiveTab('gap')}>
          <TrendingUp className="h-4 w-4 mr-1.5" /> NEP 2020 Gap Analysis
        </Button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'state' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">State Technical Education Department Adoption Breakdown</CardTitle>
            <CardDescription>Percentage of affiliated engineering colleges implementing AICTE Model Curriculum 2025-26</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {stateAdoption.map((s, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-foreground">{s.state}</span>
                  <span className="text-primary font-mono">{s.count} Colleges • {s.pct} Adoption</span>
                </div>
                <div className="h-3 w-full bg-muted/60 rounded-full overflow-hidden p-0.5 border">
                  <div
                    className={`h-full bg-gradient-to-r ${s.color} rounded-full transition-all duration-500`}
                    style={{ width: s.pct }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {activeTab === 'university' && (
        <div className="space-y-3">
          {topUniversities.map((u, i) => (
            <Card key={i} className="card-hover">
              <CardContent className="p-4 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-extrabold text-sm font-mono text-primary px-3 py-1 bg-primary/10 rounded-lg">
                    {u.rank}
                  </span>
                  <div>
                    <h4 className="font-bold text-foreground text-sm">{u.name}</h4>
                    <p className="text-muted-foreground text-[11px]">{u.adoption}</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 font-bold text-[10px]">
                  {u.status}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'gap' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">National Education Policy (NEP 2020) Gap Analysis Report</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            <div className="p-4 rounded-xl border bg-emerald-500/10 border-emerald-500/20 text-emerald-400 space-y-1">
              <h4 className="font-bold flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4" /> Credit Cap Limit (160 Credits Total): 98.4% Compliant
              </h4>
              <p className="text-muted-foreground text-xs">Over 98% of technical institutes have successfully reduced credit overload from 180+ to 160 credits for B.Tech programs.</p>
            </div>

            <div className="p-4 rounded-xl border bg-amber-500/10 border-amber-500/20 text-amber-400 space-y-1">
              <h4 className="font-bold flex items-center gap-2 text-sm">
                <Zap className="h-4 w-4" /> Universal Human Values (UHV) Mandatory Cell: 92.1% Compliant
              </h4>
              <p className="text-muted-foreground text-xs">92% of colleges have established certified UHV faculty cells for value-based education modules.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
