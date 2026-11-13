import CaseStudy from "../../../views/CaseStudy";
import { getCaseStudyBySlug } from "@/lib/getCaseStudy";
import connectDB from "@/lib/db";
import CaseStudyModel from "@/lib/models/caseStudyCloudinaryModel";

// Pre-render case study pages so they're served from the CDN (no per-click server render).
// Admin edits call revalidateTag("case-studies"), which refreshes them (no time-based expiry).
export const revalidate = false;

export async function generateStaticParams() {
  try {
    await connectDB();
    const all = await CaseStudyModel.find({}).select("slug").lean();
    return all.filter((c) => c.slug).map((c) => ({ slug: c.slug }));
  } catch (err) {
    console.error(err);
    return []; // unknown slugs are still rendered on demand and then cached
  }
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;

  let initialCaseStudy;
  try {
    // Fetched on the server so the data arrives with the page (no client-side waterfall).
    const cs = await getCaseStudyBySlug(slug);
    // JSON round-trip: strips Dates/ObjectIds so it can cross to the client component.
    if (cs) initialCaseStudy = JSON.parse(JSON.stringify(cs));
  } catch (err) {
    console.error(err); // client falls back to fetching via the API
  }

  // key remounts the view when navigating between case studies
  return <CaseStudy key={slug} initialCaseStudy={initialCaseStudy} />;
}
