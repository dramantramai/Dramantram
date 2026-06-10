import connectDB from "@/lib/db";
import CaseStudyModel from "@/lib/models/caseStudyModel";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { pid } = await params;
    const caseStudy = await CaseStudyModel.findById(pid).select(
      "thumbnail_image"
    );

    if (caseStudy?.thumbnail_image?.data) {
      return new Response(caseStudy.thumbnail_image.data, {
        headers: {
          "Content-Type": caseStudy.thumbnail_image.contentType,
          "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
        },
      });
    }
    return Response.json(
      { success: false, message: "Thumbnail image not found" },
      { status: 404 }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { success: false, message: "Error in getting thumbnail image" },
      { status: 500 }
    );
  }
}
