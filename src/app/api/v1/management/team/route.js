import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import TeamMemberModel from "@/lib/models/teamMemberModel";

// GET all team members (metadata only, no heavy image buffer)
export async function GET() {
  try {
    await connectDB();
    const teamMembers = await TeamMemberModel.find({})
      .select("-image")
      .sort({ order: 1, createdAt: -1 });

    return NextResponse.json({ success: true, teamMembers });
  } catch (error) {
    console.error("Error fetching team members:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching team members" },
      { status: 500 }
    );
  }
}

// POST create a new team member
export async function POST(request) {
  try {
    await connectDB();
    const formData = await request.formData();

    const name = formData.get("name");
    const role = formData.get("role");
    const linkedin = formData.get("linkedin") || "";
    const orderStr = formData.get("order");
    const imageFile = formData.get("image");

    // Validations
    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!role) {
      return NextResponse.json({ error: "Role is required" }, { status: 400 });
    }
    if (!imageFile || imageFile.size === 0) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }
    if (imageFile.size > 1000000) {
      return NextResponse.json({ error: "Image size should be less than 1MB" }, { status: 400 });
    }

    const order = orderStr ? parseInt(orderStr, 10) : 0;

    const teamMember = new TeamMemberModel({
      name,
      role,
      linkedin,
      order: isNaN(order) ? 0 : order,
    });

    // Process image buffer
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    teamMember.image = {
      data: buffer,
      contentType: imageFile.type,
    };

    await teamMember.save();

    return NextResponse.json(
      {
        success: true,
        message: "Team Member Created Successfully",
        teamMember: { _id: teamMember._id, name: teamMember.name },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating team member:", error);
    return NextResponse.json(
      { success: false, message: "Error in creating team member" },
      { status: 500 }
    );
  }
}
