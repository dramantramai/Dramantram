import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import CaseStudyModel from "@/lib/models/caseStudyModel";
import slugify from "slugify";

export async function POST(request) {
  try {
    await connectDB();
    const formData = await request.formData();

    const case_study_name = formData.get("case_study_name");
    const case_study_description = formData.get("case_study_description");
    const client = formData.get("client");
    const services = formData.get("services");
    const complexity = formData.get("complexity");
    const industry = formData.get("industry");
    const duration = formData.get("duration");
    const problem = formData.get("problem");
    const solution = formData.get("solution");
    const thumbnail_text = formData.get("thumbnail_text");
    const video_link_1 = formData.get("video_link_1");
    const video_link_2 = formData.get("video_link_2");
    const showOnHomepage = formData.get("showOnHomepage");
    const thumbnail_image = formData.get("thumbnail_image");
    const service = formData.get("service");

    // Validation
    if (!case_study_name)
      return NextResponse.json(
        { error: "Case Study Name is required" },
        { status: 400 }
      );
    if (!case_study_description)
      return NextResponse.json(
        { error: "Description is required" },
        { status: 400 }
      );
    if (!client)
      return NextResponse.json(
        { error: "Client is required" },
        { status: 400 }
      );
    if (!services)
      return NextResponse.json(
        { error: "Services are required" },
        { status: 400 }
      );
    if (!service)
      return NextResponse.json(
        { error: "Service classification is required" },
        { status: 400 }
      );
    const ALLOWED_SERVICES = ["Branding", "Animated Videos", "Live Action", "UI/UX", "Experiential Lab"];
    if (!ALLOWED_SERVICES.includes(service)) {
      return NextResponse.json(
        { error: `Invalid service classification. Must be one of: ${ALLOWED_SERVICES.join(", ")}` },
        { status: 400 }
      );
    }
    if (!complexity)
      return NextResponse.json(
        { error: "Complexity is required" },
        { status: 400 }
      );
    if (!industry)
      return NextResponse.json(
        { error: "Industry is required" },
        { status: 400 }
      );
    if (!duration)
      return NextResponse.json(
        { error: "Duration is required" },
        { status: 400 }
      );
    if (!problem)
      return NextResponse.json(
        { error: "Problem is required" },
        { status: 400 }
      );
    if (!solution)
      return NextResponse.json(
        { error: "Solution is required" },
        { status: 400 }
      );
    if (!thumbnail_text)
      return NextResponse.json(
        { error: "Thumbnail Text is required" },
        { status: 400 }
      );
    if (!thumbnail_image)
      return NextResponse.json(
        { error: "Thumbnail Image is required" },
        { status: 400 }
      );
    if (thumbnail_image.size > 1000000)
      return NextResponse.json(
        { error: "Thumbnail Image > 1MB" },
        { status: 400 }
      );

    const caseStudy = new CaseStudyModel({
      case_study_name,
      case_study_description,
      client,
      services,
      service,
      complexity,
      industry,
      duration,
      problem,
      solution,
      thumbnail_text,
      video_link_1: video_link_1 || "",
      video_link_2: video_link_2 || "",
      showOnHomepage: showOnHomepage === "true",
      slug: slugify(case_study_name, { lower: true, strict: true }),
    });

    // Process images
    const thumbBuffer = Buffer.from(await thumbnail_image.arrayBuffer());
    caseStudy.thumbnail_image = {
      data: thumbBuffer,
      contentType: thumbnail_image.type,
    };

    for (let i = 1; i <= 5; i++) {
      const file = formData.get(`image${i}`);
      if (file && file.size > 0) {
        const buf = Buffer.from(await file.arrayBuffer());
        caseStudy[`image${i}`] = { data: buf, contentType: file.type };
      }
    }

    await caseStudy.save();

    return NextResponse.json(
      {
        success: true,
        message: "Case Study Created Successfully",
        caseStudy: { _id: caseStudy._id, slug: caseStudy.slug },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in Create Case Study:", error);
    return NextResponse.json(
      { success: false, message: "Error in creating case study" },
      { status: 500 }
    );
  }
}
