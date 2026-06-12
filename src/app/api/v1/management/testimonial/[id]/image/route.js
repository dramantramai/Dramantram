import connectDB from "@/lib/db";
import TestimonialModel from "@/lib/models/testimonialModel";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const testimonial = await TestimonialModel.findById(id).select("image");

    if (testimonial?.image?.data) {
      return new Response(testimonial.image.data, {
        headers: {
          "Content-Type": testimonial.image.contentType,
          "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
        },
      });
    }
    return Response.json(
      { success: false, message: "Image not found" },
      { status: 404 }
    );
  } catch (error) {
    console.error("Error serving testimonial image:", error);
    return Response.json(
      { success: false, message: "Error serving image" },
      { status: 500 }
    );
  }
}
