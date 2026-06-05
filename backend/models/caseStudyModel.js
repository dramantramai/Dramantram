import mongoose from "mongoose";

const CaseStudySchema = new mongoose.Schema(
  {
    case_study_name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    case_study_description: {
      type: String,
      required: true,
      trim: true,
    },
    client: {
      type: String,
      required: true,
      trim: true,
    },
    services: {
      type: String,
      required: true,
      trim: true,
    },
    complexity: {
      type: String,
      required: true,
      trim: true,
    },
    industry: {
      type: String,
      required: true,
      trim: true,
    },
    duration: {
      type: String,
      required: true,
      trim: true,
    },
    problem: {
      type: String,
      required: true,
      trim: true,
    },
    solution: {
      type: String,
      required: true,
      trim: true,
    },
    thumbnail_text: {
      type: String,
      required: true,
      trim: true,
    },
    // Optional Video Links
    video_link_1: {
      type: String,
      trim: true,
    },
    video_link_2: {
      type: String,
      trim: true,
    },
    // Images
    thumbnail_image: {
      data: Buffer,
      contentType: String,
    },
    image1: { data: Buffer, contentType: String },
    image2: { data: Buffer, contentType: String },
    image3: { data: Buffer, contentType: String },
    image4: { data: Buffer, contentType: String },
    image5: { data: Buffer, contentType: String },

    // --- NEW FIELD ADDED BELOW ---
    showOnHomepage: {
      type: Boolean,
      default: false, // Set to true if you want it on the homepage
    },
  },
  { timestamps: true }
);

export default mongoose.model("CaseStudy", CaseStudySchema);
