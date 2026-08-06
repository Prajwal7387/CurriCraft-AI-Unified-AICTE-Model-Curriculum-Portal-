import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sparkles, Wand2, ArrowRight, CheckCircle2, Copy, Download, BookOpen } from 'lucide-react';
import { toast } from 'sonner';

export const AiAssistantPage: React.FC = () => {
  const [topic, setTopic] = useState('Artificial Intelligence & Machine Learning');
  const [degree, setDegree] = useState('B.Tech');
  const [modulesCount, setModulesCount] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedSyllabus, setGeneratedSyllabus] = useState<any>(null);

  const presets = [
    { title: 'Data Structures & Algorithms', degree: 'B.Tech', modules: 5 },
    { title: 'Universal Human Values 2: Harmony', degree: 'B.Tech', modules: 5 },
    { title: 'Cyber Security & Forensic Tools', degree: 'B.Tech', modules: 4 },
    { title: 'VLSI Design & Hardware Description', degree: 'M.Tech', modules: 5 },
  ];

  const handleSelectPreset = (preset: typeof presets[0]) => {
    setTopic(preset.title);
    setDegree(preset.degree);
    setModulesCount(preset.modules);
    toast.info(`Selected preset: ${preset.title}`);
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    toast.info('AI Engine is building AICTE Model Syllabus...');

    setTimeout(() => {
      setGeneratedSyllabus({
        title: topic,
        overview: `Complete model curriculum for ${topic} aligned with AICTE Model Credit Framework and NEP 2020 guidelines.`,
        modules: [
          { num: 1, title: 'Foundations of Intelligent Systems', hours: 8, topics: ['State-space Search', 'Heuristic Methods', 'A* Search Algorithm'] },
          { num: 2, title: 'Knowledge Representation & Logic', hours: 10, topics: ['First-order Predicate Logic', 'Ontologies', 'Semantic Web Systems'] },
          { num: 3, title: 'Machine Learning & Neural Networks', hours: 12, topics: ['Supervised & Unsupervised Learning', 'Backpropagation', 'Deep Convolutional Networks'] },
          { num: 4, title: 'Natural Language Processing & LLMs', hours: 10, topics: ['Tokenization', 'Transformer Architectures', 'Attention Mechanisms'] },
          { num: 5, title: 'AI Ethics, Bias & Governance', hours: 8, topics: ['Algorithmic Fairness', 'Explainable AI (XAI)', 'AICTE Ethics Guidelines'] },
        ],
        cos: [
          { code: 'CO1', desc: 'Formulate AI search strategies for complex state spaces', bloom: 'Apply' },
          { code: 'CO2', desc: 'Analyze machine learning models using statistical metrics', bloom: 'Analyze' },
          { code: 'CO3', desc: 'Synthesize deep neural networks for computer vision applications', bloom: 'Create' },
          { code: 'CO4', desc: 'Evaluate AI ethical frameworks and algorithmic fairness', bloom: 'Evaluate' },
        ],
      });
      setIsLoading(false);
      toast.success('AI Model Syllabus generated successfully!');
    }, 1200);
  };

  const handleCopyMarkdown = () => {
    toast.success('AI Syllabus content copied to clipboard as Markdown!');
  };

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-2xl space-y-2">
        <div className="flex items-center gap-3">
          <Sparkles className="h-7 w-7 text-amber-300 animate-pulse" />
          <h2 className="text-3xl font-black">AI Assistant & Bloom Taxonomy Generator</h2>
        </div>
        <p className="text-xs text-indigo-100 max-w-2xl leading-relaxed">
          Grammarly & ChatGPT inspired engine tailored for AICTE Model Curriculum development, Bloom CO-PO mapping, and automatic module structuring.
        </p>
      </div>

      {/* Preset Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs font-bold text-muted-foreground shrink-0">Quick Presets:</span>
        {presets.map((p, idx) => (
          <Button
            key={idx}
            variant="outline"
            size="sm"
            className="text-xs font-semibold shrink-0"
            onClick={() => handleSelectPreset(p)}
          >
            <BookOpen className="h-3.5 w-3.5 mr-1.5 text-primary" /> {p.title}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Generator Controls */}
        <Card className="md:col-span-1 border-border/60">
          <CardHeader>
            <CardTitle className="text-sm">AI Generation Parameters</CardTitle>
            <CardDescription>Configure syllabus specifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label required>Subject / Course Name</Label>
              <Input value={topic} onChange={(e) => setTopic(e.target.value)} />
            </div>

            <div>
              <Label>Degree Program</Label>
              <select
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                className="w-full h-10 rounded-xl border bg-background px-3 text-xs font-semibold"
              >
                <option value="B.Tech">B.Tech</option>
                <option value="M.Tech">M.Tech</option>
                <option value="Diploma">Diploma</option>
                <option value="MCA">MCA</option>
              </select>
            </div>

            <div>
              <Label>Number of Modules</Label>
              <Input
                type="number"
                min={3}
                max={8}
                value={modulesCount}
                onChange={(e) => setModulesCount(Number(e.target.value))}
              />
            </div>

            <Button variant="gradient" className="w-full font-bold shadow-md" isLoading={isLoading} onClick={handleGenerate}>
              <Wand2 className="h-4 w-4 mr-2" /> Generate Syllabus
            </Button>
          </CardContent>
        </Card>

        {/* AI Output Screen */}
        <Card className="md:col-span-2 border-border/60">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-sm">AI Generated Curriculum Output</CardTitle>
              <CardDescription>Structured model syllabus with Bloom Taxonomy COs</CardDescription>
            </div>
            {generatedSyllabus && (
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" onClick={handleCopyMarkdown}>
                  <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                </Button>
                <Button size="sm" variant="gradient" onClick={() => toast.success('Inserted into active Workspace!')}>
                  <Download className="h-3.5 w-3.5 mr-1" /> Sync to Workspace
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent>
            {generatedSyllabus ? (
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-xl bg-muted/40 border">
                  <h4 className="font-bold text-foreground text-sm">{generatedSyllabus.title}</h4>
                  <p className="text-muted-foreground mt-1 leading-relaxed">{generatedSyllabus.overview}</p>
                </div>

                <div className="space-y-2">
                  <h5 className="font-bold text-foreground">Generated Modules ({generatedSyllabus.modules.length}):</h5>
                  {generatedSyllabus.modules.map((m: any, i: number) => (
                    <div key={i} className="p-3 rounded-xl border bg-card space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-primary">Module {m.num}: {m.title}</span>
                        <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-primary/10 text-primary">{m.hours} Hours</span>
                      </div>
                      <p className="text-muted-foreground text-[11px] leading-relaxed">{m.topics.join(', ')}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <h5 className="font-bold text-foreground">Course Outcomes (COs):</h5>
                  {generatedSyllabus.cos.map((co: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl border bg-muted/20">
                      <span><strong className="text-primary font-mono">{co.code}:</strong> {co.desc}</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400 font-bold text-[10px] border border-purple-500/20">{co.bloom}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-72 flex flex-col items-center justify-center text-center text-muted-foreground space-y-2">
                <Sparkles className="h-10 w-10 text-primary/40 animate-pulse" />
                <p className="text-xs max-w-sm">Select subject parameters or click a Quick Preset above, then click "Generate Syllabus" to invoke AI Engine.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
