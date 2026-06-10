import connectDB from "@/lib/db";
import CaseStudyModel from "@/lib/models/caseStudyModel";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { pid } = await params;
    const doc = await CaseStudyModel.findById(pid).select("image2");

    if (doc?.image2?.data) {
      return new Response(doc.image2.data, {
        headers: {
          "Content-Type": doc.image2.contentType,
          "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
        },
      });
    }
    return Response.json(
      { success: false, message: "Image 2 not found" },
      { status: 404 }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { success: false, message: "Error in getting image 2" },
      { status: 500 }
    );
  }
}
