import mongoose from "mongoose";

const CaseStudySchema = new mongoose.Schema(
  {
    case_study_name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    case_study_description: { type: String, required: true, trim: true },
    client: { type: String, required: true, trim: true },
    services: { type: String, required: true, trim: true },
    service: {
      type: String,
      required: true,
      enum: ["Branding", "Animated Videos", "Live Action", "Web & App Development", "Experiential Lab"],
      default: "Branding",
      trim: true,
    },
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

CaseStudySchema.index({ showOnHomepage: 1, createdAt: -1 });
CaseStudySchema.index({ createdAt: -1 });
CaseStudySchema.index({ services: 1, industry: 1, duration: 1, complexity: 1 });

export default mongoose.models.CaseStudyNew ||
  mongoose.model("CaseStudyNew", CaseStudySchema, "casestudies_new");
