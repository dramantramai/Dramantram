import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
// OLD MODEL:
// import CaseStudyModel from "@/lib/models/caseStudyModel";
import CaseStudyModel from "@/lib/models/caseStudyCloudinaryModel";
import { unstable_cache } from "next/cache";

const fetchAllCaseStudies = unstable_cache(
  async () => {
    await connectDB();
    const caseStudies = await CaseStudyModel.find({})
      .select("-image1 -image2 -image3 -image4 -image5")
      .sort({ createdAt: -1 });

    return caseStudies.map((cs) => {
      const obj = cs.toObject();
      if (obj._id) {
        obj._id = obj._id.toString();
      }
      
      // NEW CLOUDINARY LOGIC
      if (obj.thumbnail_image) {
        obj.thumbnailDataUri = obj.thumbnail_image;
      }
      return obj;
    });
  },
  ["all-case-studies"],
  { tags: ["case-studies"] }
);

export async function GET() {
  try {
    const result = await fetchAllCaseStudies();

    return NextResponse.json({
      success: true,
      count: result.length,
      message: "All Case Studies Fetched",
      caseStudies: result,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Error in getting case studies" },
      { status: 500 }
    );
  }
}
