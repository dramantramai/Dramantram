import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
// OLD MODEL:
// import CaseStudyModel from "@/lib/models/caseStudyModel";
import CaseStudyModel from "@/lib/models/caseStudyCloudinaryModel";
import { getCachedData, setCachedData } from "@/lib/cache";

export async function GET() {
  try {
    const cacheKey = "homepage-case-studies";
    const cached = getCachedData(cacheKey);
    if (cached) {
      return NextResponse.json({
        success: true,
        count: cached.length,
        message: "Homepage Case Studies Fetched (Cached)",
        caseStudies: cached,
      });
    }

    await connectDB();
    const caseStudies = await CaseStudyModel.find({ showOnHomepage: true })
      .select("-image1 -image2 -image3 -image4 -image5")
      .sort({ createdAt: -1 })
      .limit(6);

    const result = caseStudies.map((cs) => {
      const obj = cs.toObject();
      /* OLD BUFFER STORAGE LOGIC
      if (obj.thumbnail_image?.data) {
        obj.thumbnailDataUri = `data:${obj.thumbnail_image.contentType};base64,${obj.thumbnail_image.data.toString("base64")}`;
      }
      delete obj.thumbnail_image;
      */
      
      // NEW CLOUDINARY LOGIC
      if (obj.thumbnail_image) {
        obj.thumbnailDataUri = obj.thumbnail_image;
      }
      return obj;
    });

    setCachedData(cacheKey, result);

    return NextResponse.json({
      success: true,
      count: result.length,
      message: "Homepage Case Studies Fetched",
      caseStudies: result,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Error fetching homepage case studies" },
      { status: 500 }
    );
  }
}
