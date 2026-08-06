import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckSquare, ArrowRight, Plus, CheckCircle2, FileText, Send, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

export const ApprovalWorkflowPage: React.FC = () => {
  const [items, setItems] = useState([
    { id: '1', code: 'PCC-CS-401', title: 'Data Structures & Algorithms', status: 'DRAFT', author: 'Dr. Rajesh Sharma', dept: 'CSE' },
    { id: '2', code: 'PCC-AI-502', title: 'Deep Learning & Computer Vision', status: 'REVIEW', author: 'Dr. Priya Nair', dept: 'AI&DS' },
    { id: '3', code: 'PCC-EC-303', title: 'VLSI Design & Embedded Systems', status: 'APPROVED', author: 'Prof. Anil Sahasrabudhe', dept: 'ECE' },
  ]);

  const [showProposalModal, setShowProposalModal] = useState(false);
  const [newCode, setNewCode] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newDept, setNewDept] = useState('CSE');

  const advanceStatus = (id: string, currentStatus: string) => {
    const map: Record<string, string> = {
      DRAFT: 'REVIEW',
      REVIEW: 'APPROVED',
      APPROVED: 'PUBLISHED',
    };
    const next = map[currentStatus] || currentStatus;
    setItems(items.map(item => item.id === id ? { ...item, status: next } : item));
    toast.success(`Curriculum moved to ${next} state!`);
  };

  const handleProposeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim() || !newTitle.trim()) return;

    const newItem = {
      id: Date.now().toString(),
      code: newCode.trim().toUpperCase(),
      title: newTitle.trim(),
      status: 'DRAFT',
      author: 'Dr. Abhay Jere (AICTE Admin)',
      dept: newDept,
    };

    setItems([...items, newItem]);
    setNewCode('');
    setNewTitle('');
    setShowProposalModal(false);
    toast.success(`New Curriculum Proposal ${newItem.code} added to Draft Phase!`);
  };

  const columns = [
    { title: 'Draft Phase', status: 'DRAFT', color: 'border-slate-500' },
    { title: 'Peer Review', status: 'REVIEW', color: 'border-amber-500' },
    { title: 'Bureau Approved', status: 'APPROVED', color: 'border-blue-500' },
    { title: 'Published Portal', status: 'PUBLISHED', color: 'border-emerald-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold backdrop-blur-md border border-white/15">
            <CheckSquare className="h-3.5 w-3.5 text-teal-200" /> AICTE National Governance Pipeline
          </div>
          <h2 className="text-3xl font-black">Jira-Style Governance Approval Board</h2>
          <p className="text-xs text-teal-100 max-w-xl leading-relaxed">
            Track multi-stage curriculum approval: Draft Phase → Peer Review → Bureau Approval → Official AICTE Publication.
          </p>
        </div>

        <Button variant="outline" className="bg-white/10 hover:bg-white/20 border-white/20 text-white font-bold" onClick={() => setShowProposalModal(true)}>
          <Plus className="h-4 w-4 mr-2" /> Propose Curriculum
        </Button>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {columns.map(col => (
          <div key={col.status} className="space-y-3">
            <div className={`p-3.5 rounded-2xl border-t-4 ${col.color} bg-card border font-bold text-xs flex justify-between items-center shadow-sm`}>
              <span className="text-foreground">{col.title}</span>
              <span className="px-2 py-0.5 rounded-full bg-muted text-[10px] font-mono font-bold">
                {items.filter(i => i.status === col.status).length}
              </span>
            </div>

            <div className="space-y-3">
              {items.filter(i => i.status === col.status).map(item => (
                <Card key={item.id} className="card-hover border-border/60 text-xs">
                  <CardContent className="p-4 space-y-2.5">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-primary font-mono px-2 py-0.5 bg-primary/10 rounded border border-primary/20 text-[11px]">
                        {item.code}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-muted font-bold text-[10px]">{item.dept}</span>
                    </div>
                    <h4 className="font-bold text-foreground text-sm leading-snug">{item.title}</h4>
                    <p className="text-muted-foreground text-[11px]">Author: <span className="font-semibold text-foreground">{item.author}</span></p>

                    {item.status !== 'PUBLISHED' && (
                      <Button
                        size="sm"
                        variant="gradient"
                        className="w-full mt-2 text-xs font-semibold"
                        onClick={() => advanceStatus(item.id, item.status)}
                      >
                        Advance State <ArrowRight className="h-3.5 w-3.5 ml-1" />
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Propose Modal */}
      {showProposalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md rounded-2xl border bg-card p-6 shadow-2xl text-card-foreground space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Plus className="h-5 w-5 text-primary" /> Propose New Model Curriculum
              </h3>
              <Button variant="ghost" size="icon" onClick={() => setShowProposalModal(false)}>✕</Button>
            </div>

            <form onSubmit={handleProposeSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-foreground block mb-1">Course Code (e.g. PCC-CS-501)</label>
                <Input
                  placeholder="PCC-CS-501"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                />
              </div>

              <div>
                <label className="font-bold text-foreground block mb-1">Course Title</label>
                <Input
                  placeholder="e.g. Quantum Computing & Information"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="font-bold text-foreground block mb-1">Department</label>
                <select
                  value={newDept}
                  onChange={(e) => setNewDept(e.target.value)}
                  className="w-full h-10 rounded-xl border bg-background px-3 font-semibold"
                >
                  <option value="CSE">Computer Science (CSE)</option>
                  <option value="AI&DS">AI & Data Science (AI&DS)</option>
                  <option value="ECE">Electronics (ECE)</option>
                  <option value="ME">Mechanical (ME)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => setShowProposalModal(false)}>Cancel</Button>
                <Button type="submit" variant="gradient">Propose Curriculum</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
