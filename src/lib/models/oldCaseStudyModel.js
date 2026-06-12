import mongoose from "mongoose";

const OldCaseStudySchema = new mongoose.Schema(
  {
    case_study_name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    case_study_description: { type: String, required: true, trim: true },
    client: { type: String, required: true, trim: true },
    services: { type: String, required: true, trim: true },
    service: { type: String, required: false, trim: true },
    complexity: { type: String, required: true, trim: true },
    industry: { type: String, required: true, trim: true },
    duration: { type: String, required: true, trim: true },
    problem: { type: String, required: true, trim: true },
    solution: { type: String, required: true, trim: true },
    thumbnail_text: { type: String, required: true, trim: true },
    video_link_1: { type: String, trim: true },
    video_link_2: { type: String, trim: true },
    thumbnail_image: { data: Buffer, contentType: String },
    image1: { data: Buffer, contentType: String },
    image2: { data: Buffer, contentType: String },
    image3: { data: Buffer, contentType: String },
    image4: { data: Buffer, contentType: String },
    image5: { data: Buffer, contentType: String },
    showOnHomepage: { type: Boolean, default: false },
  },
  { timestamps: true }
);

OldCaseStudySchema.index({ showOnHomepage: 1, createdAt: -1 });
OldCaseStudySchema.index({ createdAt: -1 });
OldCaseStudySchema.index({ services: 1, industry: 1, duration: 1, complexity: 1 });

export default mongoose.models.OldCaseStudy ||
  mongoose.model("OldCaseStudy", OldCaseStudySchema, "casestudies");
