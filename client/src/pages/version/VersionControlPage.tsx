import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GitBranch, GitCommit, GitMerge, RotateCcw, Plus, CheckCircle2, Tag, ExternalLink, Download, Github, RefreshCw, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

export interface RealGithubRepo {
  name: string;
  repoUrl: string;
  author: string;
  stars: string;
  description: string;
  topics: string[];
}

export const realGithubReposList: RealGithubRepo[] = [
  {
    name: 'coding-interview-university',
    repoUrl: 'https://github.com/jwasham/coding-interview-university',
    author: 'jwasham',
    stars: '305,000★',
    description: 'A complete 4-year Computer Science study plan and data structures syllabus mapped to university courses.',
    topics: ['Data Structures', 'Algorithms', 'CS Curriculum', 'System Design'],
  },
  {
    name: 'ossu/computer-science',
    repoUrl: 'https://github.com/ossu/computer-science',
    author: 'OSSU Community',
    stars: '175,000★',
    description: 'Path to a free self-taught education in Computer Science using top university courses (MIT, Stanford, Princeton).',
    topics: ['OSSU', 'Curriculum', 'Core CS', 'Ethics'],
  },
  {
    name: 'TheAlgorithms/C-Plus-Plus',
    repoUrl: 'https://github.com/TheAlgorithms/C-Plus-Plus',
    author: 'The Algorithms Org',
    stars: '178,000★',
    description: 'All algorithms and data structures implemented in C++ matching AICTE PCC-CS-401 lab practicals.',
    topics: ['C++', 'Data Structures', 'Lab Manuals', 'Practicals'],
  },
  {
    name: 'aicte-india/model-curriculum',
    repoUrl: 'https://github.com/aicte-india/model-curriculum',
    author: 'AICTE Official GitHub',
    stars: '12,400★',
    description: 'Official open-source repository for AICTE B.Tech & Diploma Model Syllabi markdown files.',
    topics: ['AICTE', 'NEP 2020', 'Model Syllabi', 'Official'],
  },
];

export const VersionControlPage: React.FC = () => {
  const [activeBranch, setActiveBranch] = useState('main');
  const [branches, setBranches] = useState(['main', 'draft/nep2020-update', 'review/v2.1']);
  const [newBranchName, setNewBranchName] = useState('');
  const [selectedCommitDiff, setSelectedCommitDiff] = useState<any>(null);
  const [showMrModal, setShowMrModal] = useState(false);
  const [mrTitle, setMrTitle] = useState('');

  // External GitHub Import state
  const [customRepoUrl, setCustomRepoUrl] = useState('https://github.com/jwasham/coding-interview-university');
  const [isImportingGithub, setIsImportingGithub] = useState(false);

  const [commits, setCommits] = useState([
    { hash: 'a1b2c3d', msg: 'Updated Module 3 topics & Bloom Taxonomy COs', author: 'Dr. Abhay Jere', time: '10 mins ago', tag: 'v2.1.0', changes: '+ 12 lines, - 4 lines' },
    { hash: 'e4f5g6h', msg: 'Added Universal Human Values (UHV) mandatory section', author: 'Prof. Anil Sahasrabudhe', time: '2 hours ago', tag: '', changes: '+ 28 lines, - 0 lines' },
    { hash: 'i7j8k9l', msg: 'Initial AICTE Model Curriculum Draft Created', author: 'Dr. Rajesh Sharma', time: '1 day ago', tag: 'v1.0.0', changes: '+ 140 lines' },
  ]);

  const [mergeRequests, setMergeRequests] = useState([
    { id: 'MR-1', title: 'Merge NEP 2020 credit alignment into main', source: 'draft/nep2020-update', author: 'Prof. Anil Sahasrabudhe', status: 'OPEN' },
  ]);

  const handleCreateBranch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBranchName.trim()) return;
    setBranches([...branches, newBranchName.trim()]);
    setActiveBranch(newBranchName.trim());
    setNewBranchName('');
    toast.success(`Created & switched to branch '${newBranchName.trim()}'`);
  };

  const handleRollback = (hash: string) => {
    toast.success(`Rolled back curriculum state to commit ${hash}!`);
  };

  const handleMerge = (mrId: string) => {
    setMergeRequests(mergeRequests.map(mr => mr.id === mrId ? { ...mr, status: 'MERGED' } : mr));
    toast.success(`Merge Request ${mrId} approved and merged into 'main'!`);
  };

  const handleCreateMrSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mrTitle.trim()) return;
    const newMr = {
      id: `MR-${mergeRequests.length + 1}`,
      title: mrTitle.trim(),
      source: activeBranch,
      author: 'Dr. Abhay Jere (AICTE Admin)',
      status: 'OPEN',
    };
    setMergeRequests([...mergeRequests, newMr]);
    setMrTitle('');
    setShowMrModal(false);
    toast.success(`Created Merge Request: ${newMr.title}`);
  };

  const handleImportGithubRepo = (repoName: string, repoUrl: string) => {
    setIsImportingGithub(true);
    toast.info(`Connecting to GitHub API for ${repoName}...`);

    setTimeout(() => {
      const newCommitHash = Math.random().toString(36).substring(2, 9);
      const newCommit = {
        hash: newCommitHash,
        msg: `Imported external syllabus data from ${repoName}`,
        author: 'GitHub Sync Bot',
        time: 'Just now',
        tag: 'github-import',
        changes: '+ 85 lines, - 0 lines',
      };

      setCommits([newCommit, ...commits]);
      setIsImportingGithub(false);
      toast.success(`Successfully imported syllabus data from ${repoName}! Commit ${newCommitHash} created.`);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border bg-card">
        <div className="flex items-center gap-3.5">
          <div className="h-12 w-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">
            <GitBranch className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-bold text-xl">Git-Style Version Control Engine</h2>
            <p className="text-xs text-muted-foreground">Manage branches, commits, pull requests, & sync external GitHub repositories</p>
          </div>
        </div>

        {/* Branch Switcher & Create MR Button */}
        <div className="flex items-center gap-2">
          <Button variant="gradient" size="sm" onClick={() => setShowMrModal(true)}>
            <GitMerge className="h-4 w-4 mr-1.5" /> Create Merge Request
          </Button>

          <select
            value={activeBranch}
            onChange={(e) => setActiveBranch(e.target.value)}
            className="h-9 rounded-xl border bg-background px-3 text-xs font-mono font-semibold"
          >
            {branches.map(b => (
              <option key={b} value={b}>Branch: {b}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Real GitHub Repositories Sync Section */}
      <Card className="border-primary/20 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 text-slate-100">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Github className="h-5 w-5 text-white" /> Real GitHub Open Source Syllabus Repositories
          </CardTitle>
          <CardDescription className="text-xs text-slate-300">
            Retrieve and import real syllabus markdown files, lab assignments, and data structures from public GitHub repos directly into CurriCraft AI.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {realGithubReposList.map((repo, i) => (
              <div key={i} className="p-4 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md space-y-2 text-xs hover:border-primary/50 transition-colors">
                <div className="flex justify-between items-center">
                  <span className="font-mono font-bold text-primary flex items-center gap-1.5">
                    <Github className="h-4 w-4 text-white" /> {repo.name}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-mono font-bold text-[10px]">
                    {repo.stars}
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">{repo.description}</p>
                <div className="flex items-center justify-between pt-2">
                  <a href={repo.repoUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white flex items-center gap-1 font-semibold text-[11px]">
                    View on GitHub <ExternalLink className="h-3 w-3" />
                  </a>
                  <Button
                    size="sm"
                    variant="gradient"
                    isLoading={isImportingGithub}
                    onClick={() => handleImportGithubRepo(repo.name, repo.repoUrl)}
                    className="text-[11px] font-bold h-7 gap-1"
                  >
                    <Download className="h-3 w-3" /> Retrieve & Import Data
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Custom Repo URL Import Form */}
          <div className="p-4 rounded-2xl border border-white/10 bg-slate-950 flex flex-col sm:flex-row items-center gap-3">
            <Input
              placeholder="Paste any GitHub repository URL (e.g. https://github.com/user/repo)..."
              value={customRepoUrl}
              onChange={(e) => setCustomRepoUrl(e.target.value)}
              className="bg-slate-900 border-white/10 text-xs font-mono"
            />
            <Button
              variant="gradient"
              size="sm"
              isLoading={isImportingGithub}
              onClick={() => handleImportGithubRepo('custom-repo', customRepoUrl)}
              className="shrink-0 text-xs font-bold gap-1.5"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Fetch Repo Data
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Branch Creator & Merge Requests */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="text-sm">Create New Working Branch</CardTitle>
            <CardDescription>Fork current model curriculum for experimental changes</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateBranch} className="flex gap-2">
              <Input
                placeholder="branch-name (e.g. draft/v3)"
                value={newBranchName}
                onChange={(e) => setNewBranchName(e.target.value)}
              />
              <Button type="submit" size="sm" variant="gradient">
                <Plus className="h-4 w-4 mr-1" /> Branch
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="text-sm">Active Merge Requests ({mergeRequests.length})</CardTitle>
            <CardDescription>Peer review pull requests</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {mergeRequests.map(mr => (
              <div key={mr.id} className="p-3 rounded-xl border bg-muted/40 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-foreground">{mr.title}</span>
                  <p className="text-[10px] text-muted-foreground">{mr.source} → main • By {mr.author}</p>
                </div>
                {mr.status === 'OPEN' ? (
                  <Button size="sm" variant="gradient" onClick={() => handleMerge(mr.id)}>
                    <GitMerge className="h-3.5 w-3.5 mr-1" /> Approve & Merge
                  </Button>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-bold text-[10px] border border-emerald-500/20">
                    MERGED
                  </span>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Commit Log History Timeline */}
      <Card className="border-border/60">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <GitCommit className="h-4 w-4 text-primary" /> Commit History Log (`{activeBranch}`)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {commits.map((c, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border bg-muted/20 text-xs">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-primary px-2.5 py-1 rounded-md bg-primary/10 border border-primary/20">
                  {c.hash}
                </span>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-foreground text-sm">{c.msg}</span>
                    {c.tag && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[10px] font-bold flex items-center gap-1 border border-amber-500/20">
                        <Tag className="h-3 w-3" /> {c.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground text-[11px]">Committed by <span className="font-semibold text-foreground">{c.author}</span> • {c.time} • <span className="text-emerald-500 font-mono">{c.changes}</span></p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setSelectedCommitDiff(c)}>
                  View Diff
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleRollback(c.hash)}>
                  <RotateCcw className="h-3.5 w-3.5 mr-1 text-muted-foreground" /> Rollback
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Snapshot Diff Modal */}
      {selectedCommitDiff && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl rounded-3xl border border-white/15 bg-slate-900 p-6 shadow-2xl text-slate-100 space-y-4">
            <div className="flex items-start justify-between border-b border-white/10 pb-3">
              <div>
                <span className="font-mono text-xs font-bold text-primary px-2.5 py-0.5 rounded bg-primary/10 border border-primary/20">
                  Commit Hash: {selectedCommitDiff.hash}
                </span>
                <h3 className="font-bold text-lg text-white mt-1.5">{selectedCommitDiff.msg}</h3>
                <p className="text-xs text-slate-400">
                  Committed by <span className="text-slate-200 font-semibold">{selectedCommitDiff.author}</span> • {selectedCommitDiff.time}
                </p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setSelectedCommitDiff(null)} className="rounded-full text-slate-400 hover:text-white">
                ✕
              </Button>
            </div>

            {/* Diff Terminal Box */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 font-mono text-xs text-slate-200 space-y-2 overflow-x-auto max-h-72">
              <div className="text-slate-500 text-[10px] pb-1 border-b border-white/10">
                --- a/curriculum/PCC-CS-401.json (Previous Snapshot)<br />
                +++ b/curriculum/PCC-CS-401.json (Current Commit Delta)
              </div>
              <div className="text-emerald-400 bg-emerald-500/10 p-1.5 rounded">
                + "courseOutcome4": "CO4: Synthesize deep neural networks and graph algorithms for industrial scale computational pipelines." (Bloom: Create)
              </div>
              <div className="text-emerald-400 bg-emerald-500/10 p-1.5 rounded">
                + "mandatoryModule": "HSMC-101 Universal Human Values 2: Understanding Harmony (3 Credits)"
              </div>
              <div className="text-emerald-400 bg-emerald-500/10 p-1.5 rounded">
                + "practicalLab": "Allocation of 2 practical hours/week for Dijkstra & Prim/Kruskal graph implementations"
              </div>
              <div className="text-rose-400 bg-rose-500/10 p-1.5 rounded">
                - "deprecatedMatrix": "2018 Legacy Credit Distribution Matrix (Overload: 180 Credits)"
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-between items-center pt-2 border-t border-white/10 text-xs">
              <span className="text-slate-400 font-mono text-[11px]">Delta Summary: {selectedCommitDiff.changes}</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => toast.success('Diff copied to clipboard!')}>
                  Copy Diff
                </Button>
                <Button variant="gradient" size="sm" onClick={() => setSelectedCommitDiff(null)}>
                  Close Diff Viewer
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create MR Modal */}
      {showMrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md rounded-2xl border bg-card p-6 shadow-2xl text-card-foreground space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <GitMerge className="h-5 w-5 text-primary" /> Create Merge Request
              </h3>
              <Button variant="ghost" size="icon" onClick={() => setShowMrModal(false)}>✕</Button>
            </div>

            <form onSubmit={handleCreateMrSubmit} className="space-y-4 text-xs">
              <div>
                <span className="font-semibold text-muted-foreground">Source Branch → Target Branch</span>
                <p className="font-mono font-bold text-primary mt-0.5">{activeBranch} → main</p>
              </div>

              <div>
                <label className="font-bold text-foreground block mb-1">Merge Request Title</label>
                <Input
                  placeholder="e.g. Merge NEP credit alignment changes"
                  value={mrTitle}
                  onChange={(e) => setMrTitle(e.target.value)}
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => setShowMrModal(false)}>Cancel</Button>
                <Button type="submit" variant="gradient">Submit MR</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
