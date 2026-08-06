import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, UserCheck, Award, Plus, CheckCircle2, ShieldCheck, Mail } from 'lucide-react';
import { toast } from 'sonner';

export const BureauExpertsPage: React.FC = () => {
  const [experts] = useState([
    { id: '1', name: 'Dr. Rajesh Sharma', title: 'Senior Professor', institution: 'IIT Delhi', dept: 'Computer Science', activeReviews: 3, completed: 14 },
    { id: '2', name: 'Dr. Priya Nair', title: 'Associate Professor', institution: 'IISc Bangalore', dept: 'Electrical Engineering', activeReviews: 2, completed: 9 },
    { id: '3', name: 'Prof. S. K. Gupta', title: 'Department Head', institution: 'IIT Bombay', dept: 'Mechanical Engineering', activeReviews: 1, completed: 22 },
  ]);

  return (
    <div className="space-y-6">
      {/* Bureau Hero Header */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-700 text-white shadow-2xl space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold backdrop-blur-md border border-white/15">
          <Building2 className="h-3.5 w-3.5 text-cyan-200" /> AICTE Academic Bureau Panel Management
        </div>
        <h1 className="text-3xl font-black tracking-tight">Subject Expert Committee Roster</h1>
        <p className="text-xs text-blue-100 max-w-2xl leading-relaxed">
          Authorize Subject Matter Experts (SMEs), assign model curricula for peer review, and manage bureau validation workloads.
        </p>
      </div>

      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg">Emplanelled AICTE Subject Experts ({experts.length})</h3>
        <Button variant="gradient" size="sm" onClick={() => toast.info('Empanel New Subject Expert modal triggered')}>
          <Plus className="h-4 w-4 mr-1.5" /> Empanel Expert
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {experts.map((exp) => (
          <Card key={exp.id} className="card-hover border-border/60">
            <CardHeader className="p-5 pb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 font-bold text-[10px]">
                  {exp.dept}
                </span>
                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-500">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Empanelled
                </span>
              </div>
              <CardTitle className="text-base font-bold">{exp.name}</CardTitle>
              <CardDescription className="text-xs">{exp.title} • {exp.institution}</CardDescription>
            </CardHeader>
            <CardContent className="p-5 pt-0 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-2 p-3 bg-muted/40 rounded-xl text-center">
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase font-bold">Active Reviews</span>
                  <p className="font-extrabold text-sm text-primary">{exp.activeReviews}</p>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase font-bold">Completed</span>
                  <p className="font-extrabold text-sm text-emerald-500">{exp.completed}</p>
                </div>
              </div>

              <Button variant="outline" size="sm" className="w-full text-xs font-semibold" onClick={() => toast.success(`Assigned new model curriculum to ${exp.name}`)}>
                Assign Curriculum Review
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
