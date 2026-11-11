import connectDB from "@/lib/db";
import CaseStudyModel from "@/lib/models/caseStudyCloudinaryModel";
import { unstable_cache } from "next/cache";

export const getCaseStudyBySlug = unstable_cache(
  async (slug) => {
    await connectDB();
    const caseStudy = await CaseStudyModel.findOne({ slug }).lean();
    if (caseStudy && caseStudy._id) {
      caseStudy._id = caseStudy._id.toString();
    }
    return caseStudy;
  },
  ["case-study-by-slug"],
  { tags: ["case-studies"], revalidate: 120 }
);
