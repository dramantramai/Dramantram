import connectDB from "@/lib/db";
import ClientModel from "@/lib/models/clientModel";
import { unstable_cache } from "next/cache";

// Logo metadata only (never the logo buffer). The admin routes call
// revalidateTag("clients") on every change, so no time-based expiry is needed.
export const getClients = unstable_cache(
  async () => {
    await connectDB();
    const clients = await ClientModel.find({})
      .select("-logo")
      .sort({ category: 1, order: 1, createdAt: -1 })
      .lean();
    return JSON.parse(JSON.stringify(clients));
  },
  ["clients-list"],
  { tags: ["clients"], revalidate: false }
);

