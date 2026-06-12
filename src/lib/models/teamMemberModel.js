import mongoose from "mongoose";

const TeamMemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    linkedin: { type: String, trim: true },
    image: {
      data: Buffer,
      contentType: String,
    },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

TeamMemberSchema.index({ order: 1, createdAt: -1 });

export default mongoose.models.TeamMember ||
  mongoose.model("TeamMember", TeamMemberSchema);
