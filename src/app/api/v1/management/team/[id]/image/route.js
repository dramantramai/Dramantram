import connectDB from "@/lib/db";
import TeamMemberModel from "@/lib/models/teamMemberModel";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const teamMember = await TeamMemberModel.findById(id).select("image");

    if (teamMember?.image?.data) {
      return new Response(teamMember.image.data, {
        headers: {
          "Content-Type": teamMember.image.contentType,
          "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
        },
      });
    }
    return Response.json(
      { success: false, message: "Image not found" },
      { status: 404 }
    );
  } catch (error) {
    console.error("Error serving team member image:", error);
    return Response.json(
      { success: false, message: "Error serving image" },
      { status: 500 }
    );
  }
}
