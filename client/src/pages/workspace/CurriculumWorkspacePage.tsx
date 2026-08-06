import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  BookOpen,
  Sparkles,
  Save,
  MessageSquare,
  Plus,
  Trash2,
  Layers,
  Award,
  CheckCircle2,
  FileText,
  UserCheck,
  Zap,
  HelpCircle,
  Copy,
} from 'lucide-react';
import { toast } from 'sonner';

export const CurriculumWorkspacePage: React.FC = () => {
  const [code, setCode] = useState('PCC-CS-401');
  const [title, setTitle] = useState('Data Structures and Algorithms');
  const [degree, setDegree] = useState('B.Tech');
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [lecture, setLecture] = useState(3);
  const [tutorial, setTutorial] = useState(1);
  const [practical, setPractical] = useState(2);
  const [activeTab, setActiveTab] = useState<'info' | 'modules' | 'cos' | 'assessment' | 'comments'>('info');

  const [modules, setModules] = useState([
    {
      num: 1,
      title: 'Module 1: Basic Concepts & Algorithm Analysis',
      hours: 8,
      topics: 'Asymptotic Notation (Big-O, Big-Omega, Theta), Recurrence Relations, Master Theorem, Time and Space Complexity Tradeoffs.',
    },
    {
      num: 2,
      title: 'Module 2: Linear Data Structures',
      hours: 10,
      topics: 'Arrays, Stacks, Queues, Circular Queues, Priority Queues, Doubly Linked Lists, Polynomial Arithmetic using Linked Lists.',
    },
    {
      num: 3,
      title: 'Module 3: Non-Linear Data Structures: Trees & Graphs',
      hours: 12,
      topics: 'Binary Search Trees, AVL Trees, Red-Black Trees, B-Trees, Graph Representation (Adjacency Matrix/List), Breadth First Search (BFS), Depth First Search (DFS).',
    },
    {
      num: 4,
      title: 'Module 4: Graph Algorithms & Minimum Spanning Trees',
      hours: 10,
      topics: 'Dijkstra Shortest Path, Bellman-Ford, Prim & Kruskal Spanning Trees, Topological Sorting, Disjoint Set Union (DSU).',
    },
    {
      num: 5,
      title: 'Module 5: Hashing & Dynamic Programming',
      hours: 8,
      topics: 'Hash Tables, Collision Resolution (Chaining, Open Addressing), Dynamic Programming Paradigms (Knapsack, LCS, Matrix Chain Multiplication).',
    },
  ]);

  const [cos, setCos] = useState([
    { code: 'CO1', desc: 'Formulate time and space complexity of iterative and recursive algorithms using mathematical asymptotic notations.', bloom: 'Analyze' },
    { code: 'CO2', desc: 'Implement linear data structures (stacks, queues, linked lists) for efficient data storage and retrieval in real-world software.', bloom: 'Apply' },
    { code: 'CO3', desc: 'Design balanced search trees and graph algorithms for network routing and structural data processing.', bloom: 'Create' },
    { code: 'CO4', desc: 'Evaluate hash functions and collision resolution strategies for high-performance memory management.', bloom: 'Evaluate' },
  ]);

  const [comments, setComments] = useState([
    { id: '1', author: 'Dr. Priya Nair (Peer Reviewer)', text: 'Module 4 topics are excellently structured. Ensure minimum 2 practical lab sessions allocated for Dijkstra and Prim/Kruskal algorithms.', time: '15 mins ago', resolved: false },
    { id: '2', author: 'Prof. Anil Sahasrabudhe (Bureau Head)', text: 'Verified CO-PO mapping against AICTE Model Curriculum standards. Higher-order skills balance is 100%.', time: '1 hour ago', resolved: false },
  ]);

  const [newCommentText, setNewCommentText] = useState('');

  const totalCredits = lecture + tutorial + Math.floor(practical / 2);

  const handleSave = () => {
    toast.success('Curriculum saved to database! Git commit hash: a8f9c2d1 created.');
  };

  const handleAiAutoFill = () => {
    toast.info('Invoking AI Assistant for Bloom CO Optimization...');
    setTimeout(() => {
      toast.success('AI optimized Course Outcomes mapped to Bloom Taxonomy!');
    }, 1000);
  };

  const handleAddModule = () => {
    const nextNum = modules.length + 1;
    setModules([
      ...modules,
      {
        num: nextNum,
        title: `Module ${nextNum}: Advanced Algorithmic Paradigms`,
        hours: 8,
        topics: 'Greedy Algorithms, Divide and Conquer, Backtracking (N-Queens), Branch and Bound.',
      },
    ]);
    toast.success(`Module ${nextNum} added to syllabus.`);
  };

  const handleAddCo = () => {
    const nextNum = cos.length + 1;
    setCos([
      ...cos,
      { code: `CO${nextNum}`, desc: 'Synthesize optimal computational pipelines for industrial scale data workloads.', bloom: 'Create' },
    ]);
    toast.success(`Course Outcome CO${nextNum} added.`);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    setComments([
      ...comments,
      {
        id: Date.now().toString(),
        author: 'Dr. Abhay Jere (AICTE Admin)',
        text: newCommentText,
        time: 'Just now',
        resolved: false,
      },
    ]);
    setNewCommentText('');
    toast.success('Comment added to review thread.');
  };

  return (
    <div className="space-y-6">
      {/* Workspace Header Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl border bg-card/80 backdrop-blur-md shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-white flex items-center justify-center font-extrabold shadow-md shadow-indigo-500/20">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs px-2.5 py-0.5 rounded-md bg-primary/10 text-primary font-black border border-primary/20">{code}</span>
              <h2 className="font-black text-xl text-foreground">{title}</h2>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">{degree} • {department} • Branch: <span className="font-semibold text-foreground font-mono">main</span></p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleAiAutoFill} className="text-xs font-semibold text-indigo-400 border-indigo-500/20 bg-indigo-500/5">
            <Sparkles className="h-4 w-4 mr-1.5 animate-pulse text-indigo-400" /> AI Enhance
          </Button>
          <Button variant="gradient" size="sm" onClick={handleSave} className="text-xs font-semibold shadow-md">
            <Save className="h-4 w-4 mr-1.5" /> Save & Commit
          </Button>
        </div>
      </div>

      {/* Tabs Toolbar */}
      <div className="flex items-center gap-1.5 border-b pb-2 overflow-x-auto">
        <Button variant={activeTab === 'info' ? 'default' : 'ghost'} size="sm" onClick={() => setActiveTab('info')} className="text-xs font-semibold">
          <FileText className="h-4 w-4 mr-1.5" /> Course Parameters
        </Button>
        <Button variant={activeTab === 'modules' ? 'default' : 'ghost'} size="sm" onClick={() => setActiveTab('modules')} className="text-xs font-semibold">
          <Layers className="h-4 w-4 mr-1.5" /> Modules ({modules.length})
        </Button>
        <Button variant={activeTab === 'cos' ? 'default' : 'ghost'} size="sm" onClick={() => setActiveTab('cos')} className="text-xs font-semibold">
          <Award className="h-4 w-4 mr-1.5" /> Bloom COs ({cos.length})
        </Button>
        <Button variant={activeTab === 'comments' ? 'default' : 'ghost'} size="sm" onClick={() => setActiveTab('comments')} className="text-xs font-semibold">
          <MessageSquare className="h-4 w-4 mr-1.5" /> Review Thread ({comments.length})
        </Button>
      </div>

      {/* Course Info Tab */}
      {activeTab === 'info' && (
        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="text-base">Course Information & Credit Calculation</CardTitle>
            <CardDescription>AICTE Model Curriculum L-T-P Credit Distribution</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label required>Course Code</Label>
                <Input value={code} onChange={(e) => setCode(e.target.value)} className="font-mono" />
              </div>
              <div>
                <Label required>Course Title</Label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Lecture (L) Hours/Week</Label>
                <Input type="number" value={lecture} onChange={(e) => setLecture(Number(e.target.value))} />
              </div>
              <div>
                <Label>Tutorial (T) Hours/Week</Label>
                <Input type="number" value={tutorial} onChange={(e) => setTutorial(Number(e.target.value))} />
              </div>
              <div>
                <Label>Practical (P) Hours/Week</Label>
                <Input type="number" value={practical} onChange={(e) => setPractical(Number(e.target.value))} />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 flex items-center justify-between">
              <div>
                <span className="font-bold text-sm text-foreground">AICTE Credit Formula Result:</span>
                <p className="text-xs text-muted-foreground">Formula: L + T + (P / 2) = {lecture} + {tutorial} + ({practical}/2)</p>
              </div>
              <span className="text-2xl font-black text-primary">{totalCredits} Credits</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Modules Tab */}
      {activeTab === 'modules' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg text-foreground">Syllabus Module Breakdown ({modules.length} Modules)</h3>
            <Button size="sm" variant="outline" onClick={handleAddModule}>
              <Plus className="h-4 w-4 mr-1.5" /> Add Module
            </Button>
          </div>
          {modules.map((mod, idx) => (
            <Card key={idx} className="card-hover border-border/60">
              <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-sm font-bold text-foreground">
                    {mod.title}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-primary px-2 py-0.5 rounded bg-primary/10">
                      {mod.hours} Hours
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-muted-foreground hover:text-destructive"
                      onClick={() => {
                        setModules(modules.filter((_, i) => i !== idx));
                        toast.info(`Module ${mod.num} removed.`);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-1 text-xs text-muted-foreground leading-relaxed">
                <p><strong className="text-foreground font-semibold">Topics Covered:</strong> {mod.topics}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* COs Tab */}
      {activeTab === 'cos' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg text-foreground">Course Outcomes (Bloom's Taxonomy Mapped)</h3>
            <Button size="sm" variant="outline" onClick={handleAddCo}>
              <Plus className="h-4 w-4 mr-1.5" /> Add CO
            </Button>
          </div>
          {cos.map((co, idx) => (
            <Card key={idx} className="card-hover border-border/60">
              <CardContent className="p-4 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-primary/10 text-primary">
                      {co.code}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400 font-bold text-[10px] border border-purple-500/20">
                      Bloom: {co.bloom}
                    </span>
                  </div>
                  <p className="text-xs text-foreground/90 font-medium">{co.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Review Comments Tab */}
      {activeTab === 'comments' && (
        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="text-base">Review Annotations & Expert Feedback</CardTitle>
            <CardDescription>Figma & Google Docs style discussion thread</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleAddComment} className="flex gap-2">
              <Input
                placeholder="Write inline comment or review suggestion..."
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
              />
              <Button type="submit" variant="gradient">Post Note</Button>
            </form>

            <div className="space-y-3 pt-2">
              {comments.map((c) => (
                <div key={c.id} className="p-4 rounded-xl border bg-muted/30 space-y-1 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-foreground">{c.author}</span>
                    <span className="text-[10px] text-muted-foreground">{c.time}</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{c.text}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
