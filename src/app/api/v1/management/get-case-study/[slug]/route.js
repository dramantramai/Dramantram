import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import CaseStudyModel from "@/lib/models/caseStudyModel";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { slug } = await params;

    const caseStudy = await CaseStudyModel.findOne({ slug })
      .select("-thumbnail_image -image1 -image2 -image3 -image4 -image5")
      .lean();

    if (!caseStudy) {
      return NextResponse.json(
        { success: false, message: "Case Study not found" },
        { status: 404 }
      );
    }

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
