import connectDB from "@/lib/db";
import CaseStudyModel from "@/lib/models/caseStudyModel";

export default async function sitemap() {
  const baseUrl = "https://dramantram.com";

  // Static routes configuration
  const staticRoutes = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services/ui-ux`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/branding`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/animated-videos`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/experiential-lab`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/live-action`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Dynamic routes configuration from Mongoose (Case Studies)
  let dynamicRoutes = [];
  try {
    await connectDB();
    const caseStudies = await CaseStudyModel.find({}).select("slug updatedAt");
    
    dynamicRoutes = caseStudies.map((cs) => ({
      url: `${baseUrl}/case-study/${cs.slug}`,
      lastModified: cs.updatedAt ? new Date(cs.updatedAt) : new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Error generating dynamic sitemap routes:", error);
  }

  return [...staticRoutes, ...dynamicRoutes];
}
