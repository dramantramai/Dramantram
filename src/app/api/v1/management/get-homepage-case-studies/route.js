import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import CaseStudyModel from "@/lib/models/caseStudyModel";

export async function GET() {
  try {
    await connectDB();
    const caseStudies = await CaseStudyModel.find({ showOnHomepage: true })
      .select("-image1 -image2 -image3 -image4 -image5")
      .sort({ createdAt: -1 });

    const result = caseStudies.map((cs) => {
      const obj = cs.toObject();
      if (obj.thumbnail_image?.data) {
        obj.thumbnailDataUri = `data:${obj.thumbnail_image.contentType};base64,${obj.thumbnail_image.data.toString("base64")}`;
      }
      delete obj.thumbnail_image;
      return obj;
    });

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
