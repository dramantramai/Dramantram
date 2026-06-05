import express from "express";
import {
  createCaseStudyController,
  updateCaseStudyController,
  deleteCaseStudyController,
  getCaseStudyController,
  getAllCaseStudiesController,
  getThumbnailImageController,
  getImage1Controller,
  getImage2Controller,
  filterCaseStudyController,
  getImage3Controller,
  getImage4Controller,
  getImage5Controller,
  getHomepageCaseStudiesController,
} from "../controllers/managementController.js";
import formidable from "express-formidable";

// Router object
const router = express.Router();

// Routing

// Create Case Study
router.post("/create-case-study", formidable(), createCaseStudyController);

// Get Thumbnail Image
router.get("/get-thumbnail-image/:pid", getThumbnailImageController);

// Get Image 1
router.get("/get-image-1/:pid", getImage1Controller);

// Get Image 2
router.get("/get-image-2/:pid", getImage2Controller);

router.get("/get-image-3/:pid", getImage3Controller);
router.get("/get-image-4/:pid", getImage4Controller);
router.get("/get-image-5/:pid", getImage5Controller);

// Update Case Study
router.put("/update-case-study/:id", formidable(), updateCaseStudyController);

// Delete Case Study
router.delete("/delete-case-study/:id", deleteCaseStudyController);

// Get Single Case Study
router.get("/get-case-study/:slug", getCaseStudyController);

// Get All Case Studies
router.get("/get-case-studies", getAllCaseStudiesController);

router.post("/filter-case-studies", filterCaseStudyController);

// Route to get homepage specific case studies
router.get("/get-homepage-case-studies", getHomepageCaseStudiesController);

export default router;
