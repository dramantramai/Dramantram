import React, { useState, useEffect } from "react";
import { IMAGE_KEYS, normalizeMediaOrder } from "../../lib/caseStudyMedia";
import MediaOrderEditor from "../../components/Management/MediaOrderEditor";
import AdminLayout from "../../components/AdminLayout/AdminLayout";
import "../../styles/Management.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

// --- CONSTANTS FOR DROPDOWNS ---
const INDUSTRY_OPTIONS = [
  "Government",
  "Fintech",
  "Edtech",
  "Hospitality",
  "Consulting",
  "Technology",
  "NGO",  
  "School",
  "Service",
  "Product",
  'Luxury Jewellery',
  'Healthcare',
  'Food & Agriculture',
  'Real Estate',
  'Data Security',
  'LogisticsTech',
  'Manufacturing & Printing',
];

const DURATION_OPTIONS = [
  'Under 1 month',
  "1 month",
  "2 months",
  "3 months",
  "4 months",
  "5 months",
  "6 months or more",
  'Monthly Retainer'
];

const SERVICE_OPTIONS = [
  "Brand Identity & Design",
  "Creating Logo",
  "Branding Strategy",
  "Defining Brand Style Guide",
  "Social Media Branding",
  "Re-Branding",
  "Stationery Design",
  "Catalogues & Brochure Design",
  "Packaging Design",
  "Explainer Animated Video",
  "Ad Film",
  "Sales & Marketing Video",
  "Demo Video",
  "e-Learning Video",
  "Animated Graphic/GIF",
  "Corporate Videos",
  "Testimonials",
  "Event Video",
  "Website Design",
  "Web Development",
  "App Design",
  "Game Development",
  "Interactive Screens (Touch, Gesture, Motion)",
  "Anamorphic",
  "AR/VR",
  'Production & Post Production'
];

const UpdateCaseStudy = () => {
  const router = useRouter();
  const { slug } = useParams();
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    case_study_name: "",
    case_study_description: "",
    client: "",
    services: "",
    service: "Branding",
    complexity: "",
    industry: "",
    duration: "",
    problem: "",
    solution: "",
    thumbnail_text: "",
    thumbnail_image: null,
    // Images (Initialized to null, only set if user uploads NEW file)
    ...Object.fromEntries(IMAGE_KEYS.map((k) => [k, null])),
    // Video Links
    video_link_1: "",
    video_link_2: "",
    website_link: "",
    // --- 1. NEW STATE FIELD ---
    showOnHomepage: false,
  });

  const [existingThumbnail, setExistingThumbnail] = useState("");
  const [existingImages, setExistingImages] = useState({}); // saved Cloudinary URLs
  const [newPreviews, setNewPreviews] = useState({}); // object URLs for newly picked files
  const [mediaOrder, setMediaOrder] = useState(normalizeMediaOrder([]));
  const [updatedAt, setUpdatedAt] = useState("");
  const apiUrl = "";

  // 1. Fetch existing data
  const getSingleCaseStudy = async () => {
    try {
      const { data } = await axios.get(
        `${apiUrl}/api/v1/management/get-case-study/${slug}`
      );
      if (data?.success) {
        const cs = data.caseStudy;
        setId(cs._id);
        setExistingThumbnail(cs.thumbnail_image || "");
        setExistingImages(Object.fromEntries(IMAGE_KEYS.map((k) => [k, cs[k] || ""])));
        setMediaOrder(normalizeMediaOrder(cs.media_order));
        setUpdatedAt(cs.updatedAt || "");
        setForm({
          case_study_name: cs.case_study_name || "",
          case_study_description: cs.case_study_description || "",
          client: cs.client || "",
          services: cs.services || "",
          service: cs.service || "Branding",
          complexity: cs.complexity || "",
          industry: cs.industry || "",
          duration: cs.duration || "",
          problem: cs.problem || "",
          solution: cs.solution || "",
          thumbnail_text: cs.thumbnail_text || "",
          // Load existing video links
          video_link_1: cs.video_link_1 || "",
          video_link_2: cs.video_link_2 || "",
          website_link: cs.website_link || "",
          // --- 2. POPULATE STATE FROM DB ---
          showOnHomepage: cs.showOnHomepage || false,

          // Images remain null (we don't prefill file inputs)
          thumbnail_image: null,
          ...Object.fromEntries(IMAGE_KEYS.map((k) => [k, null])),
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching case study details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSingleCaseStudy();
    // eslint-disable-next-line
  }, [slug]);

  // --- 3. UPDATED HANDLE CHANGE ---
  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;

    // Handle File Inputs
    if (type === "file") {
      const file = files[0];
      if (!file) {
        setForm((s) => ({ ...s, [name]: null }));
        return;
      }
      if (file.size > 1000000) {
        toast.error("Image size should be less than 1MB");
        e.target.value = null;
        return;
      }
      setForm((s) => ({ ...s, [name]: file }));
      if (IMAGE_KEYS.includes(name)) {
        setNewPreviews((p) => ({ ...p, [name]: URL.createObjectURL(file) }));
      }
      return;
    }

    // Handle Checkbox Inputs
    if (type === "checkbox") {
      setForm((s) => ({ ...s, [name]: checked }));
      return;
    }

    // Handle Standard Inputs
    setForm((s) => ({ ...s, [name]: value }));
  };

  // 4. Handle Submit (Update)
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const caseStudyData = new FormData();
      caseStudyData.append("case_study_name", form.case_study_name);
      caseStudyData.append(
        "case_study_description",
        form.case_study_description
      );
      caseStudyData.append("client", form.client);
      caseStudyData.append("services", form.services);
      caseStudyData.append("service", form.service);
      caseStudyData.append("complexity", form.complexity);
      caseStudyData.append("industry", form.industry);
      caseStudyData.append("duration", form.duration);
      caseStudyData.append("problem", form.problem);
      caseStudyData.append("solution", form.solution);
      caseStudyData.append("thumbnail_text", form.thumbnail_text);

      // --- 4. APPEND NEW FIELD TO FORMDATA ---
      caseStudyData.append("showOnHomepage", form.showOnHomepage);

      // Append Video Links (Always send the current state string, whether empty or filled)
      caseStudyData.append("video_link_1", form.video_link_1);
      caseStudyData.append("video_link_2", form.video_link_2);
      caseStudyData.append("website_link", form.website_link || "");

      // Append Images ONLY if a new file is selected
      if (form.thumbnail_image)
        caseStudyData.append("thumbnail_image", form.thumbnail_image);
      for (const key of IMAGE_KEYS) {
        if (form[key]) caseStudyData.append(key, form[key]);
      }
      caseStudyData.append("media_order", JSON.stringify(mediaOrder));

      // Hosting platforms cap request bodies (~6MB on Netlify); upload the rest in another save.
      const totalBytes = [form.thumbnail_image, ...IMAGE_KEYS.map((k) => form[k])]
        .filter(Boolean)
        .reduce((sum, f) => sum + f.size, 0);
      if (totalBytes > 5.5 * 1024 * 1024) {
        toast.error("Selected images total over 5.5MB. Save these first, then add the rest in another edit.");
        return;
      }

      const { data } = await axios.put(
        `${apiUrl}/api/v1/management/update-case-study/${id}`, //
        caseStudyData
      );

      if (data?.success) {
        toast.success("Case Study Updated Successfully");
        router.push("/internal/management");
      } else {
        toast.error(data?.message || "Update failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while updating");
    }
  };

  // Helper style for the small info text
  const infoStyle = {
    fontSize: "0.8rem",
    color: "#aaa",
    fontWeight: "normal",
    marginLeft: "6px",
  };

  if (loading) {
    return (
      <AdminLayout>
        <div
          style={{
            minHeight: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
          }}
        >
          <h2>Loading...</h2>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="management-wrapper">
        <div className="management-form-box">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 18,
            }}
          >
            <h2 style={{ color: "#fff", fontSize: 20, margin: 0 }}>
              Update Case Study
            </h2>
            <div
              style={{
                padding: "6px 10px",
                borderRadius: 999,
                background: "linear-gradient(90deg, #ff3b3b, #ff7b7b)",
                color: "#000",
                fontWeight: 600,
                fontSize: 13,
              }}
            >
              Editing
            </div>
          </div>

          <form onSubmit={handleUpdate} className="management-grid">
            {/* CASE STUDY NAME */}
            <div>
              <label className="management-label">
                <strong>Case Study Heading</strong><span style={{ color: "#e60000", marginLeft: "4px" }}>*</span>
              </label>
              <input
                name="case_study_name"
                value={form.case_study_name}
                onChange={handleChange}
                className="management-input"
                placeholder="Case Study Name"
              />
            </div>

            {/* CLIENT */}
            <div>
              <label className="management-label">
                <strong>{"Client's Name"}</strong><span style={{ color: "#e60000", marginLeft: "4px" }}>*</span>
              </label>
              <input
                name="client"
                value={form.client}
                onChange={handleChange}
                className="management-input"
                placeholder="Client name"
              />
            </div>

            {/* WEBSITE LINK */}
            <div>
              <label className="management-label">Website Link</label>
              <input
                name="website_link"
                value={form.website_link || ""}
                onChange={handleChange}
                className="management-input"
                placeholder="e.g. https://example.com"
              />
            </div>

             {/* SERVICES */}
             <div>
                <label className="management-label">Services<span style={{ color: "#e60000", marginLeft: "4px" }}>*</span></label>
                <select
                  name="services"
                  value={form.services}
                  onChange={handleChange}
                  className="management-select"
                >
                  <option value="">Select Service</option>
                  {SERVICE_OPTIONS.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
             </div>

              {/* NAVBAR SERVICE CATEGORY */}
              <div>
                <label className="management-label"><strong>Navbar Service Category</strong><span style={{ color: "#e60000", marginLeft: "4px" }}>*</span></label>
                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  className="management-select"
                  required
                >
                  <option value="Branding">Branding</option>
                  <option value="Animated Videos">Animated Videos</option>
                  <option value="Live Action">Live Action</option>
                  <option value="Web & App Development">Web & App Development</option>
                  <option value="Experiential Lab">Experiential Lab</option>
                </select>
              </div>

             {/* DESCRIPTION */}
             <div style={{ gridColumn: "1 / -1" }}>
               <label className="management-label">Case Study Description<span style={{ color: "#e60000", marginLeft: "4px" }}>*</span></label>
               <textarea
                 name="case_study_description"
                 value={form.case_study_description}
                 onChange={handleChange}
                 className="management-textarea"
                 rows={2}
                 placeholder="Short description"
               />
             </div>

             {/* THUMBNAIL TEXT */}
             <div>
               <label className="management-label">Thumbnail Text<span style={{ color: "#e60000", marginLeft: "4px" }}>*</span></label>
               <input
                 name="thumbnail_text"
                 value={form.thumbnail_text}
                 onChange={handleChange}
                 className="management-input"
                 placeholder="Text shown on card"
               />
             </div>

            {/* COMPLEXITY */}
            <div>
              <label className="management-label">Complexity<span style={{ color: "#e60000", marginLeft: "4px" }}>*</span></label>
              <select
                name="complexity"
                value={form.complexity}
                onChange={handleChange}
                className="management-select"
              >
                <option value="">Select complexity</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            {/* INDUSTRY */}
            <div>
              <label className="management-label">Industry<span style={{ color: "#e60000", marginLeft: "4px" }}>*</span></label>
              <select
                name="industry"
                value={form.industry}
                onChange={handleChange}
                className="management-select"
              >
                <option value="">Select Industry</option>
                {INDUSTRY_OPTIONS.map((ind) => (
                  <option key={ind} value={ind}>
                    {ind}
                  </option>
                ))}
              </select>
            </div>

            {/* DURATION */}
            <div>
              <label className="management-label">Duration<span style={{ color: "#e60000", marginLeft: "4px" }}>*</span></label>
              <select
                name="duration"
                value={form.duration}
                onChange={handleChange}
                className="management-select"
              >
                <option value="">Select Duration</option>
                {DURATION_OPTIONS.map((dur) => (
                  <option key={dur} value={dur}>
                    {dur}
                  </option>
                ))}
              </select>
            </div>

            {/* PROBLEM */}
            <div style={{ gridColumn: "1 / -1" }}>
              <label className="management-label">Problem<span style={{ color: "#e60000", marginLeft: "4px" }}>*</span></label>
              <textarea
                name="problem"
                value={form.problem}
                onChange={handleChange}
                className="management-textarea"
                rows={4}
                placeholder="Describe the problem"
              />
            </div>

            {/* SOLUTION */}
            <div style={{ gridColumn: "1 / -1" }}>
              <label className="management-label">Solution<span style={{ color: "#e60000", marginLeft: "4px" }}>*</span></label>
              <textarea
                name="solution"
                value={form.solution}
                onChange={handleChange}
                className="management-textarea"
                rows={4}
                placeholder="Solution summary"
              />
            </div>

            {/* THUMBNAIL IMAGE */}
            <div style={{ gridColumn: "1 / -1" }}>
              <label className="management-label">
                Thumbnail Image
                <span style={infoStyle}>(Max 1MB, recommended 384x467 px)</span>
              </label>

              {/* Preview existing thumbnail */}
              <div style={{ marginBottom: "10px" }}>
                <Image
                  src={
                    existingThumbnail && existingThumbnail.startsWith("http")
                      ? existingThumbnail
                      : `${apiUrl}/api/v1/management/get-thumbnail-image/${id}?t=${updatedAt ? new Date(updatedAt).getTime() : ""}`
                  }
                  alt="current"
                  width={48}
                  height={48}
                  style={{
                    height: "48px",
                    width: "auto",
                    borderRadius: "4px",
                    border: "1px solid #444",
                  }}
                  onError={(e) => (e.target.style.display = "none")}
                />
              </div>

              <input
                name="thumbnail_image"
                onChange={handleChange}
                type="file"
                accept="image/*"
                className="management-file"
              />
            </div>

            <hr
              style={{
                gridColumn: "1 / -1",
                border: "1px solid #333",
                margin: "10px 0",
              }}
            />

            {/* --- VIDEO LINKS SECTION --- */}
            <div style={{ gridColumn: "1 / -1" }}>
              <h4 style={{ color: "#fff", marginBottom: "10px" }}>
                Video Embed Links (Optional)
              </h4>
            </div>

            <div>
              <label className="management-label">Video Link 1</label>
              <input
                name="video_link_1"
                value={form.video_link_1}
                onChange={handleChange}
                className="management-input"
                placeholder="Paste Youtube Embed Link"
              />
            </div>

            <div>
              <label className="management-label">Video Link 2</label>
              <input
                name="video_link_2"
                value={form.video_link_2}
                onChange={handleChange}
                className="management-input"
                placeholder="Paste Youtube Embed Link"
              />
            </div>

            <hr
              style={{
                gridColumn: "1 / -1",
                border: "1px solid #333",
                margin: "10px 0",
              }}
            />

            {/* --- PROJECT IMAGES SECTION (UP TO 10 IMAGES) --- */}
            <div style={{ gridColumn: "1 / -1" }}>
              <h4 style={{ color: "#fff", marginBottom: "10px" }}>
                Project Images (Optional, up to {IMAGE_KEYS.length})
              </h4>
            </div>

            {IMAGE_KEYS.map((key, i) => (
              <div key={key}>
                <label className="management-label">
                  Image {i + 1} <span style={infoStyle}>(Max 1MB, recommended 1200x703 px)</span>
                  {existingImages[key] && !form[key] && (
                    <span style={{ ...infoStyle, color: "#7bd88f" }}> · current image kept unless you choose a new file</span>
                  )}
                </label>
                <input
                  name={key}
                  onChange={handleChange}
                  type="file"
                  accept="image/*"
                  className="management-file"
                />
              </div>
            ))}

            <hr
              style={{
                gridColumn: "1 / -1",
                border: "1px solid #333",
                margin: "10px 0",
              }}
            />

            {/* --- DISPLAY ORDER (images + videos) --- */}
            <div style={{ gridColumn: "1 / -1" }}>
              <h4 style={{ color: "#fff", marginBottom: "5px" }}>Display Order</h4>
              <p style={{ color: "#888", fontSize: "0.85rem", margin: "0 0 10px" }}>
                Arrange how images and videos appear on the case study page, top to bottom.
              </p>
              <MediaOrderEditor
                order={mediaOrder}
                active={{
                  video_link_1: form.video_link_1?.trim() ? true : undefined,
                  video_link_2: form.video_link_2?.trim() ? true : undefined,
                  ...Object.fromEntries(
                    IMAGE_KEYS.map((k) => [
                      k,
                      (form[k] && newPreviews[k]) ||
                        (existingImages[k] &&
                          existingImages[k].replace("/upload/", "/upload/f_auto,q_auto,w_160/")) ||
                        undefined,
                    ])
                  ),
                }}
                onChange={setMediaOrder}
              />
            </div>

            <hr
              style={{
                gridColumn: "1 / -1",
                border: "1px solid #333",
                margin: "10px 0",
              }}
            />

            {/* --- 5. NEW CHECKBOX INPUT --- */}
            <div
              style={{
                gridColumn: "1 / -1",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginTop: "10px",
              }}
            >
              <input
                type="checkbox"
                name="showOnHomepage"
                id="showOnHomepage"
                checked={form.showOnHomepage}
                onChange={handleChange}
                style={{ width: "20px", height: "20px", cursor: "pointer" }}
              />
              <label
                htmlFor="showOnHomepage"
                style={{
                  color: "#fff",
                  cursor: "pointer",
                  fontSize: "1rem",
                  userSelect: "none",
                }}
              >
                Feature this Case Study on the Homepage?
              </label>
            </div>

            {/* ACTIONS */}
            <div
              style={{
                gridColumn: "1 / -1",
                display: "flex",
                justifyContent: "flex-end",
                gap: 12,
                marginTop: 20,
              }}
            >
              <button
                type="button"
                onClick={() => router.push("/internal/management")}
                className="management-btn management-reset"
                aria-label="Cancel"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="management-btn management-save"
                aria-label="Update Case-Study"
              >
                Update Case-Study
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UpdateCaseStudy;
