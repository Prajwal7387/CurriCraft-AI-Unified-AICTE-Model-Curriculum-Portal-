import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Globe,
  Search,
  Download,
  FileText,
  CheckCircle2,
  Share2,
  Eye,
  GitCompare,
  Sparkles,
  BookOpen,
  Building,
} from 'lucide-react';
import { toast } from 'sonner';

export interface PublishedCurriculumItem {
  id: string;
  code: string;
  title: string;
  degree: string;
  department: string;
  credits: { lecture: number; tutorial: number; practical: number; total: number };
  version: string;
  effectiveYear: string;
  bureau: string;
  status: 'PUBLISHED';
  modulesCount: number;
  pdfUrl: string;
  overview: string;
}

export const publishedCurricula: PublishedCurriculumItem[] = [
  {
    id: 'pub-1',
    code: 'PCC-CS-401',
    title: 'AICTE Model Curriculum: Data Structures & Algorithms',
    degree: 'B.Tech',
    department: 'Computer Science & Engineering',
    credits: { lecture: 3, tutorial: 1, practical: 2, total: 5 },
    version: '2.1.0',
    effectiveYear: '2025 - 2026',
    bureau: 'AICTE Academic & Policy Bureau',
    status: 'PUBLISHED',
    modulesCount: 5,
    pdfUrl: 'https://www.aicte-india.org/sites/default/files/model_curriculum/CSE_UG.pdf',
    overview: 'Core undergraduate model curriculum covering algorithm analysis, linear and non-linear data structures, graph algorithms, and Bloom Taxonomy CO-PO mapping.',
  },
  {
    id: 'pub-2',
    code: 'PCC-AI-501',
    title: 'AICTE Model Curriculum: Deep Learning & Neural Architectures',
    degree: 'B.Tech',
    department: 'Artificial Intelligence & Data Science',
    credits: { lecture: 3, tutorial: 0, practical: 2, total: 4 },
    version: '1.2.0',
    effectiveYear: '2025 - 2026',
    bureau: 'AICTE Emerging Technologies Cell',
    status: 'PUBLISHED',
    modulesCount: 5,
    pdfUrl: 'https://www.aicte-india.org/sites/default/files/model_curriculum/AI_DataScience_UG.pdf',
    overview: 'Advanced emerging technology model syllabus covering convolutional networks, transformers, reinforcement learning, and PyTorch lab experiments.',
  },
  {
    id: 'pub-3',
    code: 'HSMC-101',
    title: 'AICTE Mandatory Course: Universal Human Values 2: Understanding Harmony',
    degree: 'B.Tech / B.E.',
    department: 'Humanities & Social Sciences (Mandatory NEP)',
    credits: { lecture: 2, tutorial: 1, practical: 0, total: 3 },
    version: '3.0.0',
    effectiveYear: '2024 - 2026',
    bureau: 'AICTE National Coordination Committee for UHV',
    status: 'PUBLISHED',
    modulesCount: 5,
    pdfUrl: 'https://www.aicte-india.org/sites/default/files/model_curriculum/UHV_Mandatory.pdf',
    overview: 'Mandatory NEP 2020 course introducing holistic value-based education, harmony in self, family, society, and nature.',
  },
  {
    id: 'pub-4',
    code: 'ESC-EE-201',
    title: 'AICTE Model Curriculum: Basic Electrical & Electronics Engineering',
    degree: 'B.Tech / Diploma',
    department: 'Electrical Engineering',
    credits: { lecture: 3, tutorial: 1, practical: 2, total: 5 },
    version: '1.0.0',
    effectiveYear: '2024 - 2025',
    bureau: 'AICTE Engineering Bureau',
    status: 'PUBLISHED',
    modulesCount: 4,
    pdfUrl: 'https://www.aicte-india.org/sites/default/files/model_curriculum/EE_UG.pdf',
    overview: 'Foundational engineering science course covering AC/DC circuits, transformers, electrical machines, and semiconductor diodes.',
  },
];

export const PublicPortalPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [previewItem, setPreviewItem] = useState<PublishedCurriculumItem | null>(null);
  const [compareItem, setCompareItem] = useState<PublishedCurriculumItem | null>(null);

  const handleDownloadPdf = (code: string, url: string) => {
    toast.success(`Downloading Official AICTE Model Syllabus PDF for ${code}...`);
    window.open(url, '_blank');
  };

  const handleExportDocx = (code: string) => {
    toast.success(`Generating Word Document (.docx) export for ${code}...`);
  };

  const filteredList = publishedCurricula.filter((item) => {
    const matchesDept = selectedDept === 'ALL' || item.department.includes(selectedDept);
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-700 p-8 text-white shadow-2xl">
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold backdrop-blur-md border border-white/15">
            <Globe className="h-3.5 w-3.5 text-indigo-300" /> AICTE National Model Curriculum Repository
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight">
            Official Model Curriculum Public Portal
          </h1>
          <p className="text-sm text-indigo-100 max-w-2xl leading-relaxed">
            Search, preview, and download official AICTE Model Curricula approved by All India Council for Technical Education under NEP 2020 guidelines.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card/60 p-4 rounded-2xl border backdrop-blur-md">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by course code or title (e.g. PCC-CS-401)..."
            className="pl-10 h-10 bg-background/80"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <select
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          className="h-10 w-full md:w-64 rounded-xl border bg-background px-4 text-xs font-semibold"
        >
          <option value="ALL">All Departments & Streams</option>
          <option value="Computer Science">Computer Science & Engineering</option>
          <option value="Artificial Intelligence">AI & Data Science</option>
          <option value="Electrical">Electrical Engineering</option>
          <option value="Humanities">Humanities & Ethics (UHV)</option>
        </select>
      </div>

      {/* Published Syllabi List */}
      <div className="space-y-4">
        {filteredList.map((item) => (
          <Card key={item.id} className="card-hover border-border/60">
            <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono font-bold text-xs px-2.5 py-1 rounded-md bg-primary/10 text-primary border border-primary/20">
                    {item.code}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-bold text-[10px] border border-emerald-500/20 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> v{item.version} PUBLISHED
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">
                    Effective: {item.effectiveYear}
                  </span>
                </div>

                <h3 className="font-bold text-lg text-foreground hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {item.overview}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground/80 font-medium pt-1">
                  <span>🎓 Degree: <strong className="text-foreground">{item.degree}</strong></span>
                  <span>🏛️ Department: <strong className="text-foreground">{item.department}</strong></span>
                  <span>⚡ Total Credits: <strong className="text-primary font-bold">{item.credits.total} (L:{item.credits.lecture} T:{item.credits.tutorial} P:{item.credits.practical})</strong></span>
                </div>
              </div>

              <div className="flex flex-wrap md:flex-col items-center justify-end gap-2 shrink-0">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs font-semibold gap-1.5 w-full sm:w-auto"
                  onClick={() => setPreviewItem(item)}
                >
                  <Eye className="h-3.5 w-3.5" /> Preview Document
                </Button>
                <Button
                  size="sm"
                  variant="gradient"
                  className="text-xs font-semibold gap-1.5 w-full sm:w-auto"
                  onClick={() => handleDownloadPdf(item.code, item.pdfUrl)}
                >
                  <Download className="h-3.5 w-3.5" /> Download Official PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Document Preview Modal */}
      {previewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl rounded-2xl border bg-card p-6 shadow-2xl text-card-foreground space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b pb-3">
              <div>
                <span className="font-mono font-bold text-xs text-primary">{previewItem.code} • v{previewItem.version}</span>
                <h3 className="text-xl font-bold mt-1">{previewItem.title}</h3>
                <p className="text-xs text-muted-foreground">{previewItem.bureau}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setPreviewItem(null)}>✕</Button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <h4 className="font-bold text-foreground mb-1">Course Overview & Scope</h4>
                <p className="text-muted-foreground leading-relaxed">{previewItem.overview}</p>
              </div>

              <div className="p-4 rounded-xl bg-muted/40 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div>
                  <span className="text-[10px] uppercase text-muted-foreground">Lecture (L)</span>
                  <p className="text-sm font-bold text-foreground">{previewItem.credits.lecture} Hrs</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-muted-foreground">Tutorial (T)</span>
                  <p className="text-sm font-bold text-foreground">{previewItem.credits.tutorial} Hrs</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-muted-foreground">Practical (P)</span>
                  <p className="text-sm font-bold text-foreground">{previewItem.credits.practical} Hrs</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-muted-foreground">Total Credits</span>
                  <p className="text-sm font-black text-primary">{previewItem.credits.total} Credits</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t">
              <Button variant="outline" onClick={() => setPreviewItem(null)}>Close</Button>
              <Button variant="gradient" onClick={() => handleDownloadPdf(previewItem.code, previewItem.pdfUrl)}>
                <Download className="h-4 w-4 mr-1.5" /> Download Official PDF
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
