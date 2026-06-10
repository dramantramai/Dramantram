import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import CaseStudyModel from "@/lib/models/caseStudyModel";

export async function POST(request) {
  try {
    await connectDB();
    const { service, industry, duration, complexity } = await request.json();

    const args = {};
    if (service && service.length > 0) args.services = service;
    if (industry && industry.length > 0) args.industry = industry;
    if (duration && duration.length > 0) args.duration = duration;
    if (complexity && complexity.length > 0) args.complexity = complexity;

    const caseStudies = await CaseStudyModel.find(args).select(
      "-thumbnail_image -image1 -image2 -image3 -image4 -image5"
    );

    return NextResponse.json({
      success: true,
      count: caseStudies.length,
      caseStudies,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Error while filtering Case Studies" },
      { status: 400 }
    );
  }
}
