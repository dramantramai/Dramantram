import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
// OLD MODEL:
// import CaseStudyModel from "@/lib/models/caseStudyModel";
import CaseStudyModel from "@/lib/models/caseStudyCloudinaryModel";
import { unstable_cache } from "next/cache";

const fetchCaseStudyBySlug = unstable_cache(
  async (slug) => {
    await connectDB();
    const caseStudy = await CaseStudyModel.findOne({ slug }).lean();
    if (caseStudy && caseStudy._id) {
      caseStudy._id = caseStudy._id.toString();
    }
    return caseStudy;
  },
  ["case-study-by-slug"],
  { tags: ["case-studies"] }
);

export async function GET(request, { params }) {
  try {
    const { slug } = await params;

    const caseStudy = await fetchCaseStudyBySlug(slug);

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
