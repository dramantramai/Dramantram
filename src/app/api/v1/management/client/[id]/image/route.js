import connectDB from "@/lib/db";
import ClientModel from "@/lib/models/clientModel";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const client = await ClientModel.findById(id).select("logo");

    if (client?.logo?.data) {
      return new Response(client.logo.data, {
        headers: {
          "Content-Type": client.logo.contentType,
          "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
        },
      });
    }
    return Response.json(
      { success: false, message: "Image not found" },
      { status: 404 }
    );
  } catch (error) {
    console.error("Error serving client logo:", error);
    return Response.json(
      { success: false, message: "Error serving image" },
      { status: 500 }
    );
  }
}
