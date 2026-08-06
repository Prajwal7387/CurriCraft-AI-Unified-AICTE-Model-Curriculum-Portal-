import mongoose, { Schema, Document } from 'mongoose';

export interface ICourseOutcome {
  code: string; // e.g. CO1, CO2
  description: string;
  bloomLevel: 'Remember' | 'Understand' | 'Apply' | 'Analyze' | 'Evaluate' | 'Create';
  mappedPOs: string[]; // Program Outcomes e.g. PO1, PO2
}

export interface IModule {
  title: string;
  moduleNumber: number;
  hours: number;
  topics: string[];
  learningOutcomes: string[];
}

export interface ICurriculum extends Document {
  _id: mongoose.Types.ObjectId;
  code: string; // e.g. PCC-CS-401
  title: string;
  degree: string; // B.Tech, M.Tech, Diploma, MCA
  department: string; // CSE, ECE, Mechanical, EE, AI&DS
  credits: {
    lecture: number;
    tutorial: number;
    practical: number;
    total: number;
  };
  overview: string;
  prerequisites: string[];
  courseOutcomes: ICourseOutcome[];
  modules: IModule[];
  assessmentScheme: {
    internalMarks: number;
    endSemMarks: number;
    practicalMarks: number;
    totalMarks: number;
  };
  textbooks: string[];
  references: string[];
  status: 'DRAFT' | 'REVIEW' | 'CHANGES_REQUESTED' | 'APPROVED' | 'PUBLISHED' | 'ARCHIVED';
  activeBranch: string;
  author: mongoose.Types.ObjectId;
  reviewers: mongoose.Types.ObjectId[];
  version: string;
  createdAt: Date;
  updatedAt: Date;
}

const CourseOutcomeSchema = new Schema<ICourseOutcome>({
  code: { type: String, required: true },
  description: { type: String, required: true },
  bloomLevel: {
    type: String,
    enum: ['Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate', 'Create'],
    required: true,
  },
  mappedPOs: [{ type: String }],
});

const ModuleSchema = new Schema<IModule>({
  title: { type: String, required: true },
  moduleNumber: { type: Number, required: true },
  hours: { type: Number, default: 8 },
  topics: [{ type: String }],
  learningOutcomes: [{ type: String }],
});

const CurriculumSchema = new Schema<ICurriculum>(
  {
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    title: { type: String, required: true, trim: true },
    degree: { type: String, required: true, default: 'B.Tech' },
    department: { type: String, required: true, default: 'Computer Science & Engineering' },
    credits: {
      lecture: { type: Number, default: 3 },
      tutorial: { type: Number, default: 1 },
      practical: { type: Number, default: 2 },
      total: { type: Number, default: 5 },
    },
    overview: { type: String, default: '' },
    prerequisites: [{ type: String }],
    courseOutcomes: [CourseOutcomeSchema],
    modules: [ModuleSchema],
    assessmentScheme: {
      internalMarks: { type: Number, default: 30 },
      endSemMarks: { type: Number, default: 70 },
      practicalMarks: { type: Number, default: 25 },
      totalMarks: { type: Number, default: 125 },
    },
    textbooks: [{ type: String }],
    references: [{ type: String }],
    status: {
      type: String,
      enum: ['DRAFT', 'REVIEW', 'CHANGES_REQUESTED', 'APPROVED', 'PUBLISHED', 'ARCHIVED'],
      default: 'DRAFT',
    },
    activeBranch: { type: String, default: 'main' },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    reviewers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    version: { type: String, default: '1.0.0' },
  },
  { timestamps: true }
);

CurriculumSchema.index({ code: 1 });
CurriculumSchema.index({ status: 1 });
CurriculumSchema.index({ department: 1 });

export const Curriculum = mongoose.model<ICurriculum>('Curriculum', CurriculumSchema);
