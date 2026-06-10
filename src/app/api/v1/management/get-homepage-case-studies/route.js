import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import CaseStudyModel from "@/lib/models/caseStudyModel";

export async function GET() {
  try {
    await connectDB();
    const caseStudies = await CaseStudyModel.find({ showOnHomepage: true })
      .select("-thumbnail_image -image1 -image2 -image3 -image4 -image5")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      count: caseStudies.length,
      message: "Homepage Case Studies Fetched",
      caseStudies,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Error fetching homepage case studies" },
      { status: 500 }
    );
  }
}
