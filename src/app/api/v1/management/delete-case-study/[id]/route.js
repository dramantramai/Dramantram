import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
// OLD MODEL:
// import CaseStudyModel from "@/lib/models/caseStudyModel";
import CaseStudyModel from "@/lib/models/caseStudyCloudinaryModel";
import { revalidateTag } from "next/cache";

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const result = await CaseStudyModel.findByIdAndDelete(id);
    if (!result) {
      return NextResponse.json(
        { success: false, message: "Case Study not found" },
        { status: 404 }
      );
    }
    revalidateTag("case-studies");

    return NextResponse.json({
      success: true,
      message: "Case Study Deleted Successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Error while deleting case study" },
      { status: 500 }
    );
  }
}
