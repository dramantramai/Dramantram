import Home from "../views/Home";
import { getHomepageCaseStudies } from "@/lib/getHomepageCaseStudies";
import { getClients } from "@/lib/getClients";

export default async function HomePage() {
  // Fetched on the server so this data arrives with the page (no client-side waterfall).
  // JSON round-trip strips Dates so it can cross to the client component.
  // Each falls back to its own client-side fetch if the lookup fails.
  const [initialCaseStudies, initialClients] = await Promise.all([
    getHomepageCaseStudies()
      .then((r) => JSON.parse(JSON.stringify(r)))
      .catch((err) => void console.error(err)),
    getClients().catch((err) => void console.error(err)),
  ]);

  return <Home initialCaseStudies={initialCaseStudies} initialClients={initialClients} />;
}
