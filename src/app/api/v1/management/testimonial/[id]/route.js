import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import TestimonialModel from "@/lib/models/testimonialModel";

// PUT update testimonial details
export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const formData = await request.formData();

    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const post = formData.get("post");
    const company = formData.get("company");
    const quote = formData.get("quote");
    const orderStr = formData.get("order");
    const imageFile = formData.get("image");

    const testimonial = await TestimonialModel.findById(id);
    if (!testimonial) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }

    if (firstName) testimonial.firstName = firstName;
    if (lastName) testimonial.lastName = lastName;
    if (post) testimonial.post = post;
    if (company) testimonial.company = company;
    if (quote) testimonial.quote = quote;
    if (orderStr) {
      const order = parseInt(orderStr, 10);
      testimonial.order = isNaN(order) ? testimonial.order : order;
    }

    // Process image if a new one is provided
    if (imageFile && imageFile.size > 0) {
      if (imageFile.size > 1000000) {
        return NextResponse.json({ error: "Image size should be less than 1MB" }, { status: 400 });
      }
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      testimonial.image = {
        data: buffer,
        contentType: imageFile.type,
      };
    }

    await testimonial.save();

    return NextResponse.json({
      success: true,
      message: "Testimonial Updated Successfully",
      testimonial: { _id: testimonial._id, firstName: testimonial.firstName },
    });
  } catch (error) {
    console.error("Error updating testimonial:", error);
    return NextResponse.json(
      { success: false, message: "Error updating testimonial" },
      { status: 500 }
    );
  }
}

// DELETE testimonial
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const testimonial = await TestimonialModel.findByIdAndDelete(id);
    if (!testimonial) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Testimonial Deleted Successfully",
    });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return NextResponse.json(
      { success: false, message: "Error deleting testimonial" },
      { status: 500 }
    );
  }
}
