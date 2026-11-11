import CaseStudy from "../../../views/CaseStudy";
import { getCaseStudyBySlug } from "@/lib/getCaseStudy";

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
