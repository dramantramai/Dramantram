import { NextResponse } from "next/server";
import { getCaseStudyBySlug } from "@/lib/getCaseStudy";

export async function GET(request, { params }) {
  try {
    const { slug } = await params;

    const caseStudy = await getCaseStudyBySlug(slug);

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
