import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import ClientModel from "@/lib/models/clientModel";

const ALLOWED_CATEGORIES = ["Consulting", "International", "Fintech", "Corporate", "Government", "CSR"];

// PUT update client details
export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const formData = await request.formData();

    const name = formData.get("name");
    const category = formData.get("category");
    const width = formData.get("width");
    const height = formData.get("height");
    const orderStr = formData.get("order");
    const logoFile = formData.get("logo");

    const client = await ClientModel.findById(id);
    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    if (name) client.name = name;
    if (category) {
      if (!ALLOWED_CATEGORIES.includes(category)) {
        return NextResponse.json({ error: `Invalid category. Must be one of: ${ALLOWED_CATEGORIES.join(", ")}` }, { status: 400 });
      }
      client.category = category;
    }
    if (width) client.width = width;
    if (height) client.height = height;
    if (orderStr) {
      const order = parseInt(orderStr, 10);
      client.order = isNaN(order) ? client.order : order;
    }

    // Process logo if a new one is provided
    if (logoFile && logoFile.size > 0) {
      if (logoFile.size > 1000000) {
        return NextResponse.json({ error: "Logo size should be less than 1MB" }, { status: 400 });
      }
      const buffer = Buffer.from(await logoFile.arrayBuffer());
      client.logo = {
        data: buffer,
        contentType: logoFile.type,
      };
    }

    await client.save();

    return NextResponse.json({
      success: true,
      message: "Client Updated Successfully",
      client: { _id: client._id, name: client.name },
    });
  } catch (error) {
    console.error("Error updating client:", error);
    return NextResponse.json(
      { success: false, message: "Error updating client" },
      { status: 500 }
    );
  }
}

// DELETE client
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const client = await ClientModel.findByIdAndDelete(id);
    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Client Deleted Successfully",
    });
  } catch (error) {
    console.error("Error deleting client:", error);
    return NextResponse.json(
      { success: false, message: "Error deleting client" },
      { status: 500 }
    );
  }
}
