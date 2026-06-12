import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import TestimonialModel from "@/lib/models/testimonialModel";

// GET all testimonials (metadata only, no heavy image buffer)
export async function GET() {
  try {
    await connectDB();
    const testimonials = await TestimonialModel.find({})
      .select("-image")
      .sort({ order: 1, createdAt: -1 });

    return NextResponse.json({ success: true, testimonials });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching testimonials" },
      { status: 500 }
    );
  }
}

// POST create a new testimonial
export async function POST(request) {
  try {
    await connectDB();
    const formData = await request.formData();

    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const post = formData.get("post");
    const company = formData.get("company");
    const quote = formData.get("quote");
    const orderStr = formData.get("order");
    const imageFile = formData.get("image");

    // Validations
    if (!firstName) {
      return NextResponse.json({ error: "First Name is required" }, { status: 400 });
    }
    if (!lastName) {
      return NextResponse.json({ error: "Last Name is required" }, { status: 400 });
    }
    if (!post) {
      return NextResponse.json({ error: "Post/Designation is required" }, { status: 400 });
    }
    if (!company) {
      return NextResponse.json({ error: "Company is required" }, { status: 400 });
    }
    if (!quote) {
      return NextResponse.json({ error: "Quote is required" }, { status: 400 });
    }
    if (!imageFile || imageFile.size === 0) {
      return NextResponse.json({ error: "Avatar image is required" }, { status: 400 });
    }
    if (imageFile.size > 1000000) {
      return NextResponse.json({ error: "Image size should be less than 1MB" }, { status: 400 });
    }

    const order = orderStr ? parseInt(orderStr, 10) : 0;

    const testimonial = new TestimonialModel({
      firstName,
      lastName,
      post,
      company,
      quote,
      order: isNaN(order) ? 0 : order,
    });

    // Process image buffer
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    testimonial.image = {
      data: buffer,
      contentType: imageFile.type,
    };

    await testimonial.save();

    return NextResponse.json(
      {
        success: true,
        message: "Testimonial Created Successfully",
        testimonial: { _id: testimonial._id, firstName: testimonial.firstName },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return NextResponse.json(
      { success: false, message: "Error in creating testimonial" },
      { status: 500 }
    );
  }
}
