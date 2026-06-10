import connectDB from "@/lib/db";
import CaseStudyModel from "@/lib/models/caseStudyModel";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { pid } = await params;
    const doc = await CaseStudyModel.findById(pid).select("image5");

    if (doc?.image5?.data) {
      return new Response(doc.image5.data, {
        headers: { "Content-Type": doc.image5.contentType },
      });
    }
    return Response.json(
      { success: false, message: "Image 5 not found" },
      { status: 404 }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { success: false, message: "Error in getting image 5" },
      { status: 500 }
    );
  }
}
