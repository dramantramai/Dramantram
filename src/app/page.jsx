import Home from "../views/Home";
import { getHomepageCaseStudies } from "@/lib/getHomepageCaseStudies";

export default async function HomePage() {
  let initialCaseStudies;
  try {
    // Fetched on the server so case studies arrive with the page (no client-side waterfall).
    // JSON round-trip strips Dates so it can cross to the client component.
    initialCaseStudies = JSON.parse(JSON.stringify(await getHomepageCaseStudies()));
  } catch (err) {
    console.error(err); // PortfolioSection falls back to fetching via the API
  }

  return <Home initialCaseStudies={initialCaseStudies} />;
}
