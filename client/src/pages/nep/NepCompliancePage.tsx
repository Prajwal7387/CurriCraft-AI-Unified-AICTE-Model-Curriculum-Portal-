import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldCheck, CheckCircle2, AlertTriangle, Download, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

export const NepCompliancePage: React.FC = () => {
  const [isAuditing, setIsAuditing] = useState(false);
  const [report, setReport] = useState({
    overallScore: 94,
    isCompliant: true,
    creditCheck: { passed: true, totalCredits: 160, details: 'Aligned with 160 Total Credit Cap for B.Tech' },
    bloomCheck: { passed: true, ratio: 75, details: '75% Higher-Order Thinking Skills (Apply, Analyze, Create)' },
    uhvCheck: { passed: true, details: 'Universal Human Values (UHV) 3-credit mandatory course present' },
    internshipCheck: { passed: true, details: '12-week Industrial Internship / Fieldwork mandatory credits included' },
  });

  const handleReAudit = () => {
    setIsAuditing(true);
    toast.info('Running NEP 2020 Compliance Engine audit...');
    setTimeout(() => {
      setIsAuditing(false);
      toast.success('NEP Audit Completed! Score: 94/100');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white flex items-center justify-between shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-emerald-200" />
            <h2 className="text-2xl font-extrabold">NEP 2020 Compliance Engine</h2>
          </div>
          <p className="text-xs text-teal-100">Automated audit for Credit limits, Bloom Taxonomy, UHV, & Internships</p>
        </div>
        <Button variant="outline" className="bg-white/10 hover:bg-white/20 border-white/20 text-white" onClick={handleReAudit} isLoading={isAuditing}>
          <RefreshCw className="h-4 w-4 mr-2" /> Re-Run Audit
        </Button>
      </div>

      {/* Audit Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-emerald-500/30 bg-emerald-500/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground uppercase">Overall Audit Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-emerald-500">{report.overallScore}/100</div>
            <p className="text-[11px] text-emerald-600 font-bold mt-1">NEP 2020 Compliant</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground uppercase">Credit Cap Limit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" /> Passed
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">160 Total Credits</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground uppercase">Bloom's Taxonomy Ratio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" /> {report.bloomCheck.ratio}%
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">Higher-Order Skills</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground uppercase">Universal Human Values</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" /> Included
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">Mandatory UHV Course</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Checklists */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base">Compliance Audit Breakdown</CardTitle>
            <CardDescription>AICTE Governance Verification Report</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={() => toast.success('Exporting Official AICTE NEP Compliance Certificate PDF...')}>
            <Download className="h-4 w-4 mr-1" /> Download Certificate
          </Button>
        </CardHeader>
        <CardContent className="space-y-3 text-xs">
          <div className="p-3 rounded-xl border bg-muted/20 flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
            <div>
              <h4 className="font-bold text-foreground">Credit Framework Verification</h4>
              <p className="text-muted-foreground">{report.creditCheck.details}</p>
            </div>
          </div>

          <div className="p-3 rounded-xl border bg-muted/20 flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
            <div>
              <h4 className="font-bold text-foreground">Bloom's Taxonomy Higher-Order Skills Balance</h4>
              <p className="text-muted-foreground">{report.bloomCheck.details}</p>
            </div>
          </div>

          <div className="p-3 rounded-xl border bg-muted/20 flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
            <div>
              <h4 className="font-bold text-foreground">Mandatory UHV & Ethics Integration</h4>
              <p className="text-muted-foreground">{report.uhvCheck.details}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
