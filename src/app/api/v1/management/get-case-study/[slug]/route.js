import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
// OLD MODEL:
// import CaseStudyModel from "@/lib/models/caseStudyModel";
import CaseStudyModel from "@/lib/models/caseStudyCloudinaryModel";
import { getCachedData, setCachedData } from "@/lib/cache";

export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    const cacheKey = `case-study-${slug}`;
    const cached = getCachedData(cacheKey);
    if (cached) {
      return NextResponse.json({
        success: true,
        message: "Case Study Fetched (Cached)",
        caseStudy: cached,
      });
    }

    await connectDB();

    /* OLD BUFFER STORAGE LOGIC
    const caseStudy = await CaseStudyModel.findOne({ slug })
      .select("-thumbnail_image -image1 -image2 -image3 -image4 -image5")
      .lean();
    */

    // NEW CLOUDINARY LOGIC
    // We include thumbnail_image and image1-image5 since they are now short Cloudinary URL strings
    const caseStudy = await CaseStudyModel.findOne({ slug }).lean();

    if (!caseStudy) {
      return NextResponse.json(
        { success: false, message: "Case Study not found" },
        { status: 404 }
      );
    }

    setCachedData(cacheKey, caseStudy);

    return NextResponse.json({
      success: true,
      message: "Case Study Fetched",
      caseStudy,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Error in getting case study" },
      { status: 500 }
    );
  }
}
