import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout/AdminLayout";
import "../../styles/Management.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

// --- CONSTANTS FOR DROPDOWNS ---
const INDUSTRY_OPTIONS = [
  "Government",
  "Fintech",
  "Edtech",
  "Hospitality",
  "Consulting",
  "Tech",
  "NGO",
  "School",
  "Service",
  "Product",
];

const DURATION_OPTIONS = [
  "1 month",
  "2 months",
  "3 months",
  "4 months",
  "5 months",
  "6 months or more",
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
  "web development",
  "app design",
  "game development",
  "Interactive Screens (Touch, Gesture, Motion)",
  "Anamorphic",
  "AR/VR",
];

const UpdateCaseStudy = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    case_study_name: "",
    case_study_description: "",
    client: "",
    services: "",
    complexity: "",
    industry: "",
    duration: "",
    problem: "",
    solution: "",
    thumbnail_text: "",
    thumbnail_image: null,
    // Images (Initialized to null, only set if user uploads NEW file)
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    image5: null,
    // Video Links
    video_link_1: "",
    video_link_2: "",
    // --- 1. NEW STATE FIELD ---
    showOnHomepage: false,
  });

  const apiUrl = import.meta.env.VITE_API_URL;

  // 1. Fetch existing data
  const getSingleCaseStudy = async () => {
    try {
      const { data } = await axios.get(
        `${apiUrl}/api/v1/management/get-case-study/${slug}`
      );
      if (data?.success) {
        const cs = data.caseStudy;
        setId(cs._id);
        setForm({
          case_study_name: cs.case_study_name || "",
          case_study_description: cs.case_study_description || "",
          client: cs.client || "",
          services: cs.services || "",
          complexity: cs.complexity || "",
          industry: cs.industry || "",
          duration: cs.duration || "",
          problem: cs.problem || "",
          solution: cs.solution || "",
          thumbnail_text: cs.thumbnail_text || "",
          // Load existing video links
          video_link_1: cs.video_link_1 || "",
          video_link_2: cs.video_link_2 || "",
          // --- 2. POPULATE STATE FROM DB ---
          showOnHomepage: cs.showOnHomepage || false,

          // Images remain null (we don't prefill file inputs)
          thumbnail_image: null,
          image1: null,
          image2: null,
          image3: null,
          image4: null,
          image5: null,
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
      setForm((s) => ({ ...s, [name]: files[0] || null }));
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

      // Append Images ONLY if a new file is selected
      if (form.thumbnail_image)
        caseStudyData.append("thumbnail_image", form.thumbnail_image);
      if (form.image1) caseStudyData.append("image1", form.image1);
      if (form.image2) caseStudyData.append("image2", form.image2);
      if (form.image3) caseStudyData.append("image3", form.image3);
      if (form.image4) caseStudyData.append("image4", form.image4);
      if (form.image5) caseStudyData.append("image5", form.image5);

      const { data } = await axios.put(
        `${apiUrl}/api/v1/management/update-case-study/${id}`, //
        caseStudyData
      );

      if (data?.success) {
        toast.success("Case Study Updated Successfully");
        navigate("/internal/case-studies");
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
                <strong>Case Study Heading</strong>
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
                <strong>Client's Name</strong>
              </label>
              <input
                name="client"
                value={form.client}
                onChange={handleChange}
                className="management-input"
                placeholder="Client name"
              />
            </div>

            {/* SERVICES */}
            <div>
              <label className="management-label">Services</label>
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

            {/* DESCRIPTION */}
            <div style={{ gridColumn: "1 / -1" }}>
              <label className="management-label">Case Study Description</label>
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
              <label className="management-label">Thumbnail Text</label>
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
              <label className="management-label">Complexity</label>
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
              <label className="management-label">Industry</label>
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
              <label className="management-label">Duration</label>
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
              <label className="management-label">Problem</label>
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
              <label className="management-label">Solution</label>
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
                <span style={infoStyle}>(Max 1MB, 377x458 px)</span>
              </label>

              {/* Preview existing thumbnail */}
              <div style={{ marginBottom: "10px" }}>
                <img
                  src={`${apiUrl}/api/v1/management/case-study-thumbnail/${id}`}
                  alt="current"
                  style={{
                    height: "50px",
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

            {/* --- PROJECT IMAGES SECTION (5 IMAGES) --- */}
            <div style={{ gridColumn: "1 / -1" }}>
              <h4 style={{ color: "#fff", marginBottom: "10px" }}>
                Project Images (Optional)
              </h4>
            </div>

            {/* IMAGE 1 */}
            <div>
              <label className="management-label">
                Image 1 <span style={infoStyle}>(Max 1MB, 1280x750 px)</span>
              </label>
              <input
                name="image1"
                onChange={handleChange}
                type="file"
                accept="image/*"
                className="management-file"
              />
            </div>

            {/* IMAGE 2 */}
            <div>
              <label className="management-label">
                Image 2 <span style={infoStyle}>(Max 1MB, 1280x750 px)</span>
              </label>
              <input
                name="image2"
                onChange={handleChange}
                type="file"
                accept="image/*"
                className="management-file"
              />
            </div>

            {/* IMAGE 3 */}
            <div>
              <label className="management-label">
                Image 3 <span style={infoStyle}>(Max 1MB, 1280x750 px)</span>
              </label>
              <input
                name="image3"
                onChange={handleChange}
                type="file"
                accept="image/*"
                className="management-file"
              />
            </div>

            {/* IMAGE 4 */}
            <div>
              <label className="management-label">
                Image 4 <span style={infoStyle}>(Max 1MB, 1280x750 px)</span>
              </label>
              <input
                name="image4"
                onChange={handleChange}
                type="file"
                accept="image/*"
                className="management-file"
              />
            </div>

            {/* IMAGE 5 */}
            <div>
              <label className="management-label">
                Image 5 <span style={infoStyle}>(Max 1MB, 1280x750 px)</span>
              </label>
              <input
                name="image5"
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
                onClick={() => navigate("/internal/case-studies")}
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
