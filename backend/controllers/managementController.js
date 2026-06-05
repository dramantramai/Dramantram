import fs from "fs";
import slugify from "slugify";
import CaseStudyModel from "../models/caseStudyModel.js";

export const createCaseStudyController = async (req, res) => {
  try {
    // Debugging: Check your server terminal to see if data arrives
    console.log("Received Fields:", req.fields);
    console.log("Received Files:", req.files);

    const {
      case_study_name,
      case_study_description,
      client,
      services,
      complexity,
      industry,
      duration,
      problem,
      solution,
      thumbnail_text,
      video_link_1,
      video_link_2,
      showOnHomepage, // <--- ADDED HERE
    } = req.fields;

    const { thumbnail_image, image1, image2, image3, image4, image5 } =
      req.files;

    // --- Validation ---
    switch (true) {
      case !case_study_name:
        return res.status(500).send({ error: "Case Study Name is required" });
      case !case_study_description:
        return res.status(500).send({ error: "Description is required" });
      case !client:
        return res.status(500).send({ error: "Client is required" });
      case !services:
        return res.status(500).send({ error: "Services are required" });
      case !complexity:
        return res.status(500).send({ error: "Complexity is required" });
      case !industry:
        return res.status(500).send({ error: "Industry is required" });
      case !duration:
        return res.status(500).send({ error: "Duration is required" });
      case !problem:
        return res.status(500).send({ error: "Problem is required" });
      case !solution:
        return res.status(500).send({ error: "Solution is required" });
      case !thumbnail_text:
        return res.status(500).send({ error: "Thumbnail Text is required" });

      // Thumbnail Image Validation
      case !thumbnail_image:
        return res.status(500).send({ error: "Thumbnail Image is required" });

      // Check size (ensure thumbnail_image exists before checking size)
      case thumbnail_image && thumbnail_image.size > 1000000:
        return res.status(500).send({ error: "Thumbnail Image > 1MB" });
    }

    // --- Create Instance ---
    const caseStudy = new CaseStudyModel({
      ...req.fields, // This automatically includes showOnHomepage
      slug: slugify(case_study_name, { lower: true, strict: true }),
    });

    // --- Process Files ---
    // We add checks (thumbnail_image.path) to ensure the temp file actually exists
    if (thumbnail_image && thumbnail_image.path) {
      caseStudy.thumbnail_image.data = fs.readFileSync(thumbnail_image.path);
      caseStudy.thumbnail_image.contentType = thumbnail_image.type;
    }

    if (image1 && image1.path) {
      caseStudy.image1.data = fs.readFileSync(image1.path);
      caseStudy.image1.contentType = image1.type;
    }
    if (image2 && image2.path) {
      caseStudy.image2.data = fs.readFileSync(image2.path);
      caseStudy.image2.contentType = image2.type;
    }
    if (image3 && image3.path) {
      caseStudy.image3.data = fs.readFileSync(image3.path);
      caseStudy.image3.contentType = image3.type;
    }
    if (image4 && image4.path) {
      caseStudy.image4.data = fs.readFileSync(image4.path);
      caseStudy.image4.contentType = image4.type;
    }
    if (image5 && image5.path) {
      caseStudy.image5.data = fs.readFileSync(image5.path);
      caseStudy.image5.contentType = image5.type;
    }

    await caseStudy.save();

    res.status(201).send({
      success: true,
      message: "Case Study Created Successfully",
      caseStudy,
    });
  } catch (error) {
    // This will print the ACTUAL error to your VS Code terminal
    console.error("Error in Create Case Study:", error);

    res.status(500).send({
      success: false,
      error,
      message: "Error in creating case study",
    });
  }
};

export const getThumbnailImageController = async (req, res) => {
  try {
    const { pid } = req.params;
    const caseStudy = await CaseStudyModel.findById(pid).select(
      "thumbnail_image"
    );

    if (caseStudy?.thumbnail_image?.data) {
      res.set("Content-type", caseStudy.thumbnail_image.contentType);
      return res.status(200).send(caseStudy.thumbnail_image.data);
    } else {
      return res.status(404).send({
        success: false,
        message: "Thumbnail image not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting thumbnail image",
    });
  }
};

// Get Image 1
export const getImage1Controller = async (req, res) => {
  try {
    const { pid } = req.params;
    const image_1 = await CaseStudyModel.findById(pid).select("image1");

    if (image_1?.image1?.data) {
      res.set("Content-type", image_1.image1.contentType);
      return res.status(200).send(image_1.image1.data);
    } else {
      return res.status(404).send({
        success: false,
        message: "Image 1 not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting image 1",
    });
  }
};

// Get Image 2
export const getImage2Controller = async (req, res) => {
  try {
    const { pid } = req.params;
    const image_2 = await CaseStudyModel.findById(pid).select("image2");

    if (image_2?.image2?.data) {
      res.set("Content-type", image_2.image2.contentType);
      return res.status(200).send(image_2.image2.data);
    } else {
      return res.status(404).send({
        success: false,
        message: "Image 2 not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting image 2",
    });
  }
};

// Get Image 3
export const getImage3Controller = async (req, res) => {
  try {
    const { pid } = req.params;
    const image_3 = await CaseStudyModel.findById(pid).select("image3");

    if (image_3?.image3?.data) {
      res.set("Content-type", image_3.image3.contentType);
      return res.status(200).send(image_3.image3.data);
    } else {
      return res.status(404).send({
        success: false,
        message: "Image 3 not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting image 3",
    });
  }
};

// Get Image 4
export const getImage4Controller = async (req, res) => {
  try {
    const { pid } = req.params;
    const image_4 = await CaseStudyModel.findById(pid).select("image4");

    if (image_4?.image4?.data) {
      res.set("Content-type", image_4.image4.contentType);
      return res.status(200).send(image_4.image4.data);
    } else {
      return res.status(404).send({
        success: false,
        message: "Image 4 not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting image 4",
    });
  }
};

// Get Image 5
export const getImage5Controller = async (req, res) => {
  try {
    const { pid } = req.params;
    const image_5 = await CaseStudyModel.findById(pid).select("image5");

    if (image_5?.image5?.data) {
      res.set("Content-type", image_5.image5.contentType);
      return res.status(200).send(image_5.image5.data);
    } else {
      return res.status(404).send({
        success: false,
        message: "Image 5 not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting image 5",
    });
  }
};

// Update Case Study
export const updateCaseStudyController = async (req, res) => {
  try {
    // 1. Extract ID from params
    const { id } = req.params;

    // 2. Extract text fields
    const {
      case_study_name,
      case_study_description,
      client,
      services,
      complexity,
      industry,
      duration,
      problem,
      solution,
      thumbnail_text,
      video_link_1,
      video_link_2,
      showOnHomepage, // <--- ADDED HERE
    } = req.fields;

    // 3. Extract files
    const { thumbnail_image, image1, image2, image3, image4, image5 } =
      req.files;

    // 4. Validation
    if (!id) {
      return res
        .status(400)
        .send({ success: false, message: "Case Study ID is required" });
    }

    // 5. Find existing
    const caseStudy = await CaseStudyModel.findById(id);
    if (!caseStudy) {
      return res
        .status(404)
        .send({ success: false, message: "Case Study not found" });
    }

    // 6. Update Text Fields
    if (case_study_name) {
      caseStudy.case_study_name = case_study_name;
      caseStudy.slug = slugify(case_study_name, { lower: true, strict: true });
    }

    if (case_study_description)
      caseStudy.case_study_description = case_study_description;
    if (client) caseStudy.client = client;
    if (services) caseStudy.services = services;
    if (complexity) caseStudy.complexity = complexity;
    if (industry) caseStudy.industry = industry;
    if (duration) caseStudy.duration = duration;
    if (problem) caseStudy.problem = problem;
    if (solution) caseStudy.solution = solution;
    if (thumbnail_text) caseStudy.thumbnail_text = thumbnail_text;

    // Update Boolean Field
    // We check !== undefined because false is a valid value we want to save
    if (showOnHomepage !== undefined) {
      caseStudy.showOnHomepage = showOnHomepage;
    }

    // Update Video Links (Allow empty strings to clear them if needed)
    if (video_link_1 !== undefined) caseStudy.video_link_1 = video_link_1;
    if (video_link_2 !== undefined) caseStudy.video_link_2 = video_link_2;

    // 7. Handle Image Updates
    // We only update if a file is actually sent (size > 0)

    // Thumbnail
    if (thumbnail_image && thumbnail_image.size > 0) {
      if (thumbnail_image.size > 1000000) {
        return res
          .status(500)
          .send({ success: false, message: "Thumbnail > 1MB" });
      }
      caseStudy.thumbnail_image.data = fs.readFileSync(thumbnail_image.path);
      caseStudy.thumbnail_image.contentType = thumbnail_image.type;
    }

    // Image 1
    if (image1 && image1.size > 0) {
      if (image1.size > 1000000) {
        return res
          .status(500)
          .send({ success: false, message: "Image 1 > 1MB" });
      }
      caseStudy.image1.data = fs.readFileSync(image1.path);
      caseStudy.image1.contentType = image1.type;
    }

    // Image 2
    if (image2 && image2.size > 0) {
      if (image2.size > 1000000) {
        return res
          .status(500)
          .send({ success: false, message: "Image 2 > 1MB" });
      }
      caseStudy.image2.data = fs.readFileSync(image2.path);
      caseStudy.image2.contentType = image2.type;
    }

    // Image 3
    if (image3 && image3.size > 0) {
      if (image3.size > 1000000) {
        return res
          .status(500)
          .send({ success: false, message: "Image 3 > 1MB" });
      }
      caseStudy.image3.data = fs.readFileSync(image3.path);
      caseStudy.image3.contentType = image3.type;
    }

    // Image 4
    if (image4 && image4.size > 0) {
      if (image4.size > 1000000) {
        return res
          .status(500)
          .send({ success: false, message: "Image 4 > 1MB" });
      }
      caseStudy.image4.data = fs.readFileSync(image4.path);
      caseStudy.image4.contentType = image4.type;
    }

    // Image 5
    if (image5 && image5.size > 0) {
      if (image5.size > 1000000) {
        return res
          .status(500)
          .send({ success: false, message: "Image 5 > 1MB" });
      }
      caseStudy.image5.data = fs.readFileSync(image5.path);
      caseStudy.image5.contentType = image5.type;
    }

    // 8. Save
    await caseStudy.save();

    res.status(200).send({
      success: true,
      message: "Case Study Updated Successfully",
      caseStudy,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating case study",
      error,
    });
  }
};
// Delete Case Study
export const deleteCaseStudyController = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Find and Delete the case study in one step
    // Since your images are stored as Buffer data inside the document,
    // deleting the document automatically cleans up the images too.
    const result = await CaseStudyModel.findByIdAndDelete(id);

    // 2. Check if case study existed
    if (!result) {
      return res.status(404).send({
        success: false,
        message: "Case Study not found",
      });
    }

    // 3. Send Success Response
    res.status(200).send({
      success: true,
      message: "Case Study Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting case study",
      error,
    });
  }
};

// Get Single Case Study
// Get Single Case Study by Slug
export const getCaseStudyController = async (req, res) => {
  try {
    const { slug } = req.params;

    // 1. Find by slug
    // 2. Exclude the binary photo data (we will fetch via URL)
    const caseStudy = await CaseStudyModel.findOne({ slug }).select(
      "-thumbnail_image -image1 -image2 -image3 -image4 -image5"
    );

    if (!caseStudy) {
      return res.status(404).send({
        success: false,
        message: "Case Study not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Case Study Fetched",
      caseStudy,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting case study",
    });
  }
};

// Get All Case Studies
export const getAllCaseStudiesController = async (req, res) => {
  try {
    // 1. Find all case studies
    // 2. .select("-thumbnail_image -image1 -image2") means:
    //    "Give me everything EXCEPT the heavy image files"
    // 3. We sort by createdAt so newest show first
    const caseStudies = await CaseStudyModel.find({})
      .select("-thumbnail_image -image1 -image2 -image3 -image4 -image5")
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      count: caseStudies.length,
      message: "All Case Studies Fetched",
      caseStudies,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting case studies",
      error: error.message,
    });
  }
};

export const filterCaseStudyController = async (req, res) => {
  try {
    // Note: 'req.fields' typically requires 'express-formidable'.
    // If you are using standard 'express.json()', change this to:
    // const { service, industry, duration, complexity } = req.body;
    const { service, industry, duration, complexity } = req.fields;

    // Create a query object
    const args = {};

    // Only add to query if the value exists and is not empty
    if (service && service.length > 0) args.services = service;
    if (industry && industry.length > 0) args.industry = industry;
    if (duration && duration.length > 0) args.duration = duration;
    if (complexity && complexity.length > 0) args.complexity = complexity;

    // Execute query
    const caseStudies = await CaseStudyModel.find(args);
    console.log(caseStudies);
    res.status(200).send({
      success: true,
      count: caseStudies.length,
      caseStudies,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while filtering Case Studies",
      error,
    });
  }
};

// Get ONLY case studies marked as showOnHomepage: true
export const getHomepageCaseStudiesController = async (req, res) => {
  try {
    const caseStudies = await CaseStudyModel.find({
      showOnHomepage: true,
    }).sort({ createdAt: -1 }); // Optional: Show newest first

    res.status(200).send({
      success: true,
      count: caseStudies.length,
      message: "Homepage Case Studies Fetched",
      caseStudies,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching homepage case studies",
      error,
    });
  }
};
