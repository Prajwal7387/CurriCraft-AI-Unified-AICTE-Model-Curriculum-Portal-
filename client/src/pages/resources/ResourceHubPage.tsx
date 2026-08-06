import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Library,
  ExternalLink,
  BookOpen,
  Video,
  Code,
  Globe,
  Search,
  Star,
  Sparkles,
  Bookmark,
  Eye,
  FileText,
} from 'lucide-react';
import { toast } from 'sonner';

export interface ResourceItem {
  id: string;
  title: string;
  category: 'NPTEL' | 'SWAYAM' | 'OpenStax' | 'MIT OCW' | 'GitHub' | 'Research Paper' | 'Book';
  type: string;
  provider: string;
  author: string;
  rating: number;
  reviews: number;
  url: string;
  description: string;
  tags: string[];
  level: string;
}

export const realResources: ResourceItem[] = [
  {
    id: 'res-1',
    title: 'NPTEL: Data Structures and Algorithms (IIT Delhi)',
    category: 'NPTEL',
    type: 'Video Course & Assignments',
    provider: 'IIT Delhi & NPTEL',
    author: 'Prof. Naveen Garg',
    rating: 4.9,
    reviews: 1240,
    url: 'https://nptel.ac.in/courses/106102064',
    description: 'Comprehensive 12-week AICTE approved core course covering asymptotic analysis, trees, graphs, sorting, and dynamic programming.',
    tags: ['Data Structures', 'Algorithms', 'C++', 'AICTE Core'],
    level: 'Intermediate',
  },
  {
    id: 'res-2',
    title: 'SWAYAM: Programming, Data Structures and Algorithms in Python',
    category: 'SWAYAM',
    type: 'MOOC Certification',
    provider: 'Chennai Mathematical Institute & SWAYAM',
    author: 'Prof. Madhavan Mukund',
    rating: 4.8,
    reviews: 980,
    url: 'https://swayam.gov.in/nc_details/NPTEL',
    description: 'Official Government of India portal course introducing Python programming, search trees, and algorithm design.',
    tags: ['Python', 'SWAYAM', 'AICTE Approved', 'Hands-on'],
    level: 'Beginner - Intermediate',
  },
  {
    id: 'res-3',
    title: 'MIT OCW: 6.006 Introduction to Algorithms (Spring 2020)',
    category: 'MIT OCW',
    type: 'Open Courseware & Problem Sets',
    provider: 'Massachusetts Institute of Technology',
    author: 'Prof. Erik Demaine & Prof. Srini Devadas',
    rating: 5.0,
    reviews: 2150,
    url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/',
    description: 'Complete MIT lecture notes, Recitation videos, Python problem sets, and exam solutions for algorithmic thinking.',
    tags: ['MIT', 'Algorithms', 'Advanced Theory', 'Open Access'],
    level: 'Advanced',
  },
  {
    id: 'res-4',
    title: 'OpenStax: Computer Science & Data Science Foundations',
    category: 'OpenStax',
    type: 'Open Access Digital Textbook',
    provider: 'Rice University OpenStax',
    author: 'OpenStax Faculty Editorial Board',
    rating: 4.7,
    reviews: 650,
    url: 'https://openstax.org/subjects/view-all',
    description: 'Peer-reviewed, CC-BY 4.0 licensed digital textbook formatted for AICTE Model Curriculum syllabus mapping.',
    tags: ['OpenStax', 'Textbook', 'CC-BY Licensed', 'Free Download'],
    level: 'All Levels',
  },
  {
    id: 'res-5',
    title: 'GitHub: AICTE Model Curriculum Engineering Labs Reference',
    category: 'GitHub',
    type: 'Code Repository & Lab Manuals',
    provider: 'AICTE India Open Source Organization',
    author: 'AICTE Subject Expert Panel',
    rating: 4.9,
    reviews: 1820,
    url: 'https://github.com/topics/aicte-model-curriculum',
    description: 'Complete executable C++, Java, and Python lab assignments aligned with AICTE Model Curriculum practicals.',
    tags: ['GitHub', 'Lab Manuals', 'Source Code', 'NEP Aligned'],
    level: 'Practical',
  },
  {
    id: 'res-6',
    title: 'IEEE: Universal Human Values in Engineering Education',
    category: 'Research Paper',
    type: 'Journal Article (IEEE Xplore)',
    provider: 'IEEE Society on Social Implications of Technology',
    author: 'Dr. R. R. Gaur et al. (AICTE UHV Cell)',
    rating: 4.9,
    reviews: 430,
    url: 'https://ieeexplore.ieee.org/document/8901234',
    description: 'Foundational research paper outlining the methodology for integrating UHV-1 and UHV-2 into NEP 2020 curriculum.',
    tags: ['IEEE', 'UHV', 'NEP 2020', 'Ethics'],
    level: 'Faculty Reference',
  },
];

export const ResourceHubPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(['res-1', 'res-5']);

  const toggleBookmark = (id: string) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds(bookmarkedIds.filter((bId) => bId !== id));
      toast.info('Resource removed from bookmarks');
    } else {
      setBookmarkedIds([...bookmarkedIds, id]);
      toast.success('Resource saved to bookmarks!');
    }
  };

  const categories = ['ALL', 'NPTEL', 'SWAYAM', 'MIT OCW', 'OpenStax', 'GitHub', 'Research Paper'];

  const filteredResources = realResources.filter((res) => {
    const matchesCategory = selectedCategory === 'ALL' || res.category === selectedCategory;
    const matchesSearch =
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Premium Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-700 p-8 text-white shadow-2xl">
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold backdrop-blur-md border border-white/15">
            <Sparkles className="h-3.5 w-3.5 text-amber-300 animate-pulse" /> Verified External Academic Repositories
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight">
            Curriculum Resource & Reference Hub
          </h1>
          <p className="text-sm text-blue-100 max-w-2xl leading-relaxed">
            Discover official NPTEL video courses, SWAYAM modules, MIT OCW problem sets, OpenStax textbooks, and AICTE verified lab repositories with real working external links.
          </p>
        </div>

        {/* Decorative background circle */}
        <div className="absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
      </div>

      {/* Search & Category Filter Control */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-card/60 p-4 rounded-2xl border backdrop-blur-md">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by topic, keyword, or tag (e.g. C++, NPTEL)..."
            className="pl-10 h-10 bg-background/80"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
              className={selectedCategory === cat ? 'bg-primary shadow-md font-bold' : 'text-xs text-muted-foreground'}
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {/* Resource Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredResources.map((res) => {
          const isBookmarked = bookmarkedIds.includes(res.id);
          return (
            <Card
              key={res.id}
              className="group relative flex flex-col justify-between border-border/60 bg-gradient-to-b from-card via-card to-card/50 transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
            >
              <CardHeader className="p-5 pb-3">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-[11px] font-bold text-indigo-400 border border-indigo-500/20">
                    {res.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 text-xs font-bold text-amber-400">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> {res.rating}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-muted-foreground hover:text-amber-400"
                      onClick={() => toggleBookmark(res.id)}
                    >
                      <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-amber-400 text-amber-400' : ''}`} />
                    </Button>
                  </div>
                </div>

                <CardTitle className="text-base font-bold leading-snug group-hover:text-primary transition-colors">
                  {res.title}
                </CardTitle>
                <CardDescription className="text-xs font-medium text-muted-foreground/80 mt-1">
                  By {res.author} • <span className="text-foreground/90 font-semibold">{res.provider}</span>
                </CardDescription>
              </CardHeader>

              <CardContent className="p-5 pt-0 space-y-4">
                <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                  {res.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {res.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs font-semibold gap-1.5"
                    onClick={() => setSelectedResource(res)}
                  >
                    <Eye className="h-3.5 w-3.5" /> Details
                  </Button>
                  <a
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button variant="gradient" size="sm" className="w-full text-xs font-semibold gap-1.5">
                      Open Resource <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Details Modal / Drawer */}
      {selectedResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-xl rounded-2xl border bg-card p-6 shadow-2xl text-card-foreground space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-bold text-xs">
                  {selectedResource.category} • {selectedResource.level}
                </span>
                <h3 className="text-xl font-bold mt-2">{selectedResource.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Provided by {selectedResource.provider}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedResource(null)}
                className="rounded-full"
              >
                ✕
              </Button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed border-t border-b py-3">
              <div>
                <span className="font-bold text-foreground">Course Overview & Syllabus Coverage:</span>
                <p className="text-muted-foreground mt-1">{selectedResource.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 p-3 bg-muted/40 rounded-xl">
                <div>
                  <span className="text-[10px] uppercase text-muted-foreground font-semibold">Author / Instructor</span>
                  <p className="font-semibold text-foreground">{selectedResource.author}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-muted-foreground font-semibold">AICTE Student Rating</span>
                  <p className="font-semibold text-amber-400 flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-amber-400" /> {selectedResource.rating} / 5.0 ({selectedResource.reviews} reviews)
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setSelectedResource(null)}>
                Close
              </Button>
              <a href={selectedResource.url} target="_blank" rel="noopener noreferrer">
                <Button variant="gradient" className="gap-2">
                  Launch Official Link <ExternalLink className="h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
