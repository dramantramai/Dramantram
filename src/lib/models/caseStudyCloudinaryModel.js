import mongoose from "mongoose";

const CaseStudyCloudinarySchema = new mongoose.Schema(
  {
    case_study_name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    case_study_description: { type: String, required: true, trim: true },
    client: { type: String, required: true, trim: true },
    services: { type: String, required: true, trim: true },
    service: {
      type: String,
      required: true,
      enum: ["Branding", "Animated Videos", "Live Action", "UI/UX", "Experiential Lab"],
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
    thumbnail_image: { type: String, required: true }, // Cloudinary URL
    image1: { type: String }, // Cloudinary URL
    image2: { type: String }, // Cloudinary URL
    image3: { type: String }, // Cloudinary URL
    image4: { type: String }, // Cloudinary URL
    image5: { type: String }, // Cloudinary URL
    showOnHomepage: { type: Boolean, default: false },
  },
  { timestamps: true }
);

CaseStudyCloudinarySchema.index({ showOnHomepage: 1, createdAt: -1 });
CaseStudyCloudinarySchema.index({ createdAt: -1 });
CaseStudyCloudinarySchema.index({ services: 1, industry: 1, duration: 1, complexity: 1 });

export default mongoose.models.CaseStudyCloudinary ||
  mongoose.model("CaseStudyCloudinary", CaseStudyCloudinarySchema, "casestudies_cloudinary");
