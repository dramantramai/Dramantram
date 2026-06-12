import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import TeamMemberModel from "@/lib/models/teamMemberModel";

// PUT update team member details
export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const formData = await request.formData();

    const name = formData.get("name");
    const role = formData.get("role");
    const linkedin = formData.get("linkedin");
    const orderStr = formData.get("order");
    const imageFile = formData.get("image");

    const teamMember = await TeamMemberModel.findById(id);
    if (!teamMember) {
      return NextResponse.json({ error: "Team Member not found" }, { status: 404 });
    }

    if (name) teamMember.name = name;
    if (role) teamMember.role = role;
    if (linkedin !== null && linkedin !== undefined) teamMember.linkedin = linkedin;
    if (orderStr) {
      const order = parseInt(orderStr, 10);
      teamMember.order = isNaN(order) ? teamMember.order : order;
    }

    // Process image if a new one is provided
    if (imageFile && imageFile.size > 0) {
      if (imageFile.size > 1000000) {
        return NextResponse.json({ error: "Image size should be less than 1MB" }, { status: 400 });
      }
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      teamMember.image = {
        data: buffer,
        contentType: imageFile.type,
      };
    }

    await teamMember.save();

    return NextResponse.json({
      success: true,
      message: "Team Member Updated Successfully",
      teamMember: { _id: teamMember._id, name: teamMember.name },
    });
  } catch (error) {
    console.error("Error updating team member:", error);
    return NextResponse.json(
      { success: false, message: "Error updating team member" },
      { status: 500 }
    );
  }
}

// DELETE team member
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const teamMember = await TeamMemberModel.findByIdAndDelete(id);
    if (!teamMember) {
      return NextResponse.json({ error: "Team Member not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Team Member Deleted Successfully",
    });
  } catch (error) {
    console.error("Error deleting team member:", error);
    return NextResponse.json(
      { success: false, message: "Error deleting team member" },
      { status: 500 }
    );
  }
}
