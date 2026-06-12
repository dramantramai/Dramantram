import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ["Consulting", "International", "Fintech", "Corporate", "Government", "CSR"],
    },
    logo: {
      data: Buffer,
      contentType: String,
    },
    width: { type: String, default: "120px" },
    height: { type: String, default: "auto" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

ClientSchema.index({ category: 1, order: 1, createdAt: -1 });

export default mongoose.models.Client ||
  mongoose.model("Client", ClientSchema);
