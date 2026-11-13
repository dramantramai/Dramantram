import { NextResponse } from "next/server";
import { getHomepageCaseStudies } from "@/lib/getHomepageCaseStudies";

export async function GET() {
  try {
    const result = await getHomepageCaseStudies();

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
