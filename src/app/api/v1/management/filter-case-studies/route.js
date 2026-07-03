import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
// OLD MODEL:
// import CaseStudyModel from "@/lib/models/caseStudyModel";
import CaseStudyModel from "@/lib/models/caseStudyCloudinaryModel";
import { unstable_cache } from "next/cache";

const fetchFilteredCaseStudies = unstable_cache(
  async (service, industry, duration, complexity, baseService) => {
    await connectDB();

    // Determine active filter values (non-empty strings)
    const hasDropdownService = service && typeof service === "string" && service.trim() !== "";
    const hasNavbarService = baseService && typeof baseService === "string" && baseService.trim() !== "";
    const hasIndustry = industry && typeof industry === "string" && industry.trim() !== "";
    const hasDuration = duration && typeof duration === "string" && duration.trim() !== "";
    const hasComplexity = complexity && typeof complexity === "string" && complexity.trim() !== "";

    // Define query levels from most specific to least specific
    const queryLevels = [];

    // Level 4: All active filters
    const q4 = {};
    if (hasDropdownService) {
      q4.services = service;
    } else if (hasNavbarService) {
      q4.service = baseService;
    }
    if (hasIndustry) q4.industry = industry;
    if (hasDuration) q4.duration = duration;
    if (hasComplexity) q4.complexity = complexity;
    queryLevels.push({ level: 4, query: q4, description: "All active filters" });

    // Level 3: Remove complexity & duration
    const q3 = {};
    if (hasDropdownService) {
      q3.services = service;
    } else if (hasNavbarService) {
      q3.service = baseService;
    }
    if (hasIndustry) q3.industry = industry;
    queryLevels.push({ level: 3, query: q3, description: "Removed complexity/duration" });

    // Level 2: Remove industry
    const q2 = {};
    if (hasDropdownService) {
      q2.services = service;
    } else if (hasNavbarService) {
      q2.service = baseService;
    }
    queryLevels.push({ level: 2, query: q2, description: "Removed industry" });

    // Level 1: Remove services dropdown detail -> fallback to navbar service
    const q1 = {};
    if (hasNavbarService) {
      q1.service = baseService;
    }
    queryLevels.push({ level: 1, query: q1, description: "Removed dropdown service filter (fallback to navbar service)" });

    // Level 0: All case studies
    queryLevels.push({ level: 0, query: {}, description: "All case studies" });

    let finalCaseStudies = [];
    let appliedLevel = null;

    // Run queries sequentially until we find a match
    for (const levelObj of queryLevels) {
      const caseStudies = await CaseStudyModel.find(levelObj.query)
        .select("-image1 -image2 -image3 -image4 -image5")
        .lean();

      if (caseStudies.length > 0) {
        finalCaseStudies = caseStudies;
        appliedLevel = levelObj;
        break;
      }
    }

    const result = finalCaseStudies.map((cs) => {
      if (cs._id) {
        cs._id = cs._id.toString();
      }
      if (cs.thumbnail_image) {
        cs.thumbnailDataUri = cs.thumbnail_image;
      }
      return cs;
    });

    return {
      caseStudies: result,
      fallbackLevel: appliedLevel ? appliedLevel.level : 0,
      fallbackDescription: appliedLevel ? appliedLevel.description : "No records",
    };
  },
  ["filtered-case-studies"],
  { tags: ["case-studies"], revalidate: 120 }
);

export async function POST(request) {
  try {
    const { service, industry, duration, complexity, baseService } = await request.json();

    const cachedData = await fetchFilteredCaseStudies(service, industry, duration, complexity, baseService);

    return NextResponse.json({
      success: true,
      count: cachedData.caseStudies.length,
      caseStudies: cachedData.caseStudies,
      fallbackLevel: cachedData.fallbackLevel,
      fallbackDescription: cachedData.fallbackDescription,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Error while filtering Case Studies" },
      { status: 400 }
    );
  }
}
