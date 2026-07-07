import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
// OLD MODEL:
// import CaseStudyModel from "@/lib/models/caseStudyModel";
import CaseStudyModel from "@/lib/models/caseStudyCloudinaryModel";
import { uploadToCloudinary } from "@/lib/cloudinary";
import slugify from "slugify";
import { revalidateTag } from "next/cache";

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const formData = await request.formData();

    const caseStudy = await CaseStudyModel.findById(id);
    if (!caseStudy) {
      return NextResponse.json(
        { success: false, message: "Case Study not found" },
        { status: 404 }
      );
    }

    // Update text fields
    const textFields = [
      "case_study_description",
      "client",
      "services",
      "complexity",
      "industry",
      "duration",
      "problem",
      "solution",
      "thumbnail_text",
    ];

    const case_study_name = formData.get("case_study_name");
    if (case_study_name) {
      caseStudy.case_study_name = case_study_name;
      caseStudy.slug = slugify(case_study_name, { lower: true, strict: true });
    }

    for (const field of textFields) {
      const val = formData.get(field);
      if (val) caseStudy[field] = val;
    }

    const service = formData.get("service");
    if (service) {
      const ALLOWED_SERVICES = ["Branding", "Animated Videos", "Live Action", "Web & App Development", "Experiential Lab"];
      if (!ALLOWED_SERVICES.includes(service)) {
        return NextResponse.json(
          { success: false, message: `Invalid service classification: ${service}` },
          { status: 400 }
        );
      }
      caseStudy.service = service;
    }

    const showOnHomepage = formData.get("showOnHomepage");
    if (showOnHomepage !== null) {
      caseStudy.showOnHomepage = showOnHomepage === "true";
    }

    const video_link_1 = formData.get("video_link_1");
    if (video_link_1 !== null) caseStudy.video_link_1 = video_link_1;
    const video_link_2 = formData.get("video_link_2");
    if (video_link_2 !== null) caseStudy.video_link_2 = video_link_2;
    const website_link = formData.get("website_link");
    if (website_link !== null) caseStudy.website_link = website_link;

    /* OLD BUFFER STORAGE LOGIC
    // Handle image updates
    const thumbnail_image = formData.get("thumbnail_image");
    if (thumbnail_image && thumbnail_image.size > 0) {
      if (thumbnail_image.size > 1000000) {
        return NextResponse.json(
          { success: false, message: "Thumbnail > 1MB" },
          { status: 400 }
        );
      }
      caseStudy.thumbnail_image = {
        data: Buffer.from(await thumbnail_image.arrayBuffer()),
        contentType: thumbnail_image.type,
      };
    }

    for (let i = 1; i <= 5; i++) {
      const file = formData.get(`image${i}`);
      if (file && file.size > 0) {
        if (file.size > 1000000) {
          return NextResponse.json(
            { success: false, message: `Image ${i} > 1MB` },
            { status: 400 }
          );
        }
        caseStudy[`image${i}`] = {
          data: Buffer.from(await file.arrayBuffer()),
          contentType: file.type,
        };
      }
    }
    */

    // NEW CLOUDINARY UPLOAD LOGIC
    const thumbnail_image = formData.get("thumbnail_image");
    if (thumbnail_image && thumbnail_image.size > 0) {
      const thumbBuffer = Buffer.from(await thumbnail_image.arrayBuffer());
      caseStudy.thumbnail_image = await uploadToCloudinary(thumbBuffer);
    }

    for (let i = 1; i <= 5; i++) {
      const file = formData.get(`image${i}`);
      if (file && file.size > 0) {
        const buf = Buffer.from(await file.arrayBuffer());
        caseStudy[`image${i}`] = await uploadToCloudinary(buf);
      }
    }

    await caseStudy.save();
    revalidateTag("case-studies");

    return NextResponse.json({
      success: true,
      message: "Case Study Updated Successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Error while updating case study" },
      { status: 500 }
    );
  }
}
