import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import ClientModel from "@/lib/models/clientModel";

const ALLOWED_CATEGORIES = ["Consulting", "International", "Fintech", "Corporate", "Government", "CSR"];

// GET all client partners (metadata only, no heavy logo buffer)
export async function GET() {
  try {
    await connectDB();
    const clients = await ClientModel.find({})
      .select("-logo")
      .sort({ category: 1, order: 1, createdAt: -1 });

    return NextResponse.json({ success: true, clients });
  } catch (error) {
    console.error("Error fetching clients:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching clients" },
      { status: 500 }
    );
  }
}

// POST create a new client partner
export async function POST(request) {
  try {
    await connectDB();
    const formData = await request.formData();

    const name = formData.get("name");
    const category = formData.get("category");
    const width = formData.get("width") || "120px";
    const height = formData.get("height") || "auto";
    const orderStr = formData.get("order");
    const logoFile = formData.get("logo");

    // Validations
    if (!name) {
      return NextResponse.json({ error: "Client Name is required" }, { status: 400 });
    }
    if (!category) {
      return NextResponse.json({ error: "Category is required" }, { status: 400 });
    }
    if (!ALLOWED_CATEGORIES.includes(category)) {
      return NextResponse.json({ error: `Invalid category. Must be one of: ${ALLOWED_CATEGORIES.join(", ")}` }, { status: 400 });
    }
    if (!logoFile || logoFile.size === 0) {
      return NextResponse.json({ error: "Logo image is required" }, { status: 400 });
    }
    if (logoFile.size > 1000000) {
      return NextResponse.json({ error: "Logo size should be less than 1MB" }, { status: 400 });
    }

    const order = orderStr ? parseInt(orderStr, 10) : 0;

    const client = new ClientModel({
      name,
      category,
      width,
      height,
      order: isNaN(order) ? 0 : order,
    });

    // Process logo buffer
    const buffer = Buffer.from(await logoFile.arrayBuffer());
    client.logo = {
      data: buffer,
      contentType: logoFile.type,
    };

    await client.save();

    return NextResponse.json(
      {
        success: true,
        message: "Client Logo Created Successfully",
        client: { _id: client._id, name: client.name },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating client:", error);
    return NextResponse.json(
      { success: false, message: "Error in creating client" },
      { status: 500 }
    );
  }
}
