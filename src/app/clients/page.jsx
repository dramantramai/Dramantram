import ClientsPage from "../../views/ClientsPage";
import { getClients } from "@/lib/getClients";

export default async function ClientsRoute() {
  let initialClients;
  try {
    // Fetched on the server so the logos start loading with the page
    // (no wait for hydration + an API round trip first).
    initialClients = await getClients();
  } catch (err) {
    console.error(err); // ClientsPage falls back to fetching via the API
  }

  return <ClientsPage initialClients={initialClients} />;
}
