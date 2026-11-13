import connectDB from "@/lib/db";
import CaseStudyModel from "@/lib/models/caseStudyCloudinaryModel";
import { unstable_cache } from "next/cache";

export const getHomepageCaseStudies = unstable_cache(
  async () => {
    await connectDB();
    const caseStudies = await CaseStudyModel.find({ showOnHomepage: true })
      .select("-image1 -image2 -image3 -image4 -image5 -image6 -image7 -image8 -image9 -image10")
      .sort({ createdAt: -1 })
      .limit(6);

    return caseStudies.map((cs) => {
      const obj = cs.toObject();
      if (obj._id) {
        obj._id = obj._id.toString();
      }
      if (obj.thumbnail_image) {
        obj.thumbnailDataUri = obj.thumbnail_image;
      }
      return obj;
    });
  },
  ["homepage-case-studies"],
  { tags: ["case-studies"], revalidate: 120 }
);
