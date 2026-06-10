import connectDB from "@/lib/db";
import CaseStudyModel from "@/lib/models/caseStudyModel";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { pid } = await params;
    const doc = await CaseStudyModel.findById(pid).select("image3");

    if (doc?.image3?.data) {
      return new Response(doc.image3.data, {
        headers: { "Content-Type": doc.image3.contentType },
      });
    }
    return Response.json(
      { success: false, message: "Image 3 not found" },
      { status: 404 }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { success: false, message: "Error in getting image 3" },
      { status: 500 }
    );
  }
}
