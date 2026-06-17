import React from "react";

const CaseStudyForm = ({
  form,
  onChange,
  onFileChange,
  onSubmit,
  onCancel,
  submitting,
  thumbnailPreview,
  imagePreviews,
  SERVICE_OPTIONS,
  INDUSTRY_OPTIONS,
  DURATION_OPTIONS,
  infoStyle,
}) => {
  return (
    <div>
      <h3 style={{ color: "#fff", marginBottom: "20px" }}>Create Case Study</h3>
      <form onSubmit={onSubmit} className="management-grid">
        <div>
          <label className="management-label">
            <strong>Case Study Heading</strong><span style={{ color: "#e60000", marginLeft: "4px" }}>*</span>
          </label>
          <input
            name="case_study_name"
            value={form.case_study_name}
            onChange={onChange}
            className="management-input"
            placeholder="Case Study Name"
            required
          />
        </div>

        <div>
          <label className="management-label">
            <strong>{"Client's Name"}</strong><span style={{ color: "#e60000", marginLeft: "4px" }}>*</span>
          </label>
          <input
            name="client"
            value={form.client}
            onChange={onChange}
            className="management-input"
            placeholder="Client name"
            required
          />
        </div>

        <div>
          <label className="management-label">Website Link</label>
          <input
            name="website_link"
            value={form.website_link || ""}
            onChange={onChange}
            className="management-input"
            placeholder="e.g. https://example.com"
          />
        </div>

        <div>
          <label className="management-label">Services<span style={{ color: "#e60000", marginLeft: "4px" }}>*</span></label>
          <select
            name="services"
            value={form.services}
            onChange={onChange}
            className="management-select"
            required
          >
            <option value="">Select Service</option>
            {SERVICE_OPTIONS.map((service) => (
              <option key={service} value={service}>{service}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="management-label">
            <strong>Navbar Service Category</strong><span style={{ color: "#e60000", marginLeft: "4px" }}>*</span>
          </label>
          <select
            name="service"
            value={form.service}
            onChange={onChange}
            className="management-select"
            required
          >
            <option value="Branding">Branding</option>
            <option value="Animated Videos">Animated Videos</option>
            <option value="Live Action">Live Action</option>
            <option value="UI/UX">UI/UX</option>
            <option value="Experiential Lab">Experiential Lab</option>
          </select>
        </div>

        <div style={{ gridColumn: "1 / -1" }}>
          <label className="management-label">Case Study Description<span style={{ color: "#e60000", marginLeft: "4px" }}>*</span></label>
          <textarea
            name="case_study_description"
            value={form.case_study_description}
            onChange={onChange}
            className="management-textarea"
            rows={2}
            placeholder="Short description / overview of the case study"
            required
          />
        </div>

        <div>
          <label className="management-label">Thumbnail Text<span style={{ color: "#e60000", marginLeft: "4px" }}>*</span></label>
          <input
            name="thumbnail_text"
            value={form.thumbnail_text}
            onChange={onChange}
            className="management-input"
            placeholder="Text shown on the case study card"
            required
          />
        </div>

        <div>
          <label className="management-label">Complexity<span style={{ color: "#e60000", marginLeft: "4px" }}>*</span></label>
          <select
            name="complexity"
            value={form.complexity}
            onChange={onChange}
            className="management-select"
            required
          >
            <option value="">Select complexity</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div>
          <label className="management-label">Industry<span style={{ color: "#e60000", marginLeft: "4px" }}>*</span></label>
          <select
            name="industry"
            value={form.industry}
            onChange={onChange}
            className="management-select"
            required
          >
            <option value="">Select Industry</option>
            {INDUSTRY_OPTIONS.map((ind) => (
              <option key={ind} value={ind}>{ind}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="management-label">Duration<span style={{ color: "#e60000", marginLeft: "4px" }}>*</span></label>
          <select
            name="duration"
            value={form.duration}
            onChange={onChange}
            className="management-select"
            required
          >
            <option value="">Select Duration</option>
            {DURATION_OPTIONS.map((dur) => (
              <option key={dur} value={dur}>{dur}</option>
            ))}
          </select>
        </div>

        <div style={{ gridColumn: "1 / -1" }}>
          <label className="management-label">Problem<span style={{ color: "#e60000", marginLeft: "4px" }}>*</span></label>
          <textarea
            name="problem"
            value={form.problem}
            onChange={onChange}
            className="management-textarea"
            rows={3}
            placeholder="Describe the problem faced"
            required
          />
        </div>

        <div style={{ gridColumn: "1 / -1" }}>
          <label className="management-label">Solution<span style={{ color: "#e60000", marginLeft: "4px" }}>*</span></label>
          <textarea
            name="solution"
            value={form.solution}
            onChange={onChange}
            className="management-textarea"
            rows={3}
            placeholder="Solution summary"
            required
          />
        </div>

        <div style={{ gridColumn: "1 / -1" }}>
          <label className="management-label">
            Thumbnail Image <span style={infoStyle}>(Max 1MB, recommended 384x467 px)</span>
          </label>
          <input
            name="thumbnail_image"
            onChange={onFileChange}
            type="file"
            accept="image/*"
            className="management-file"
          />
          {thumbnailPreview && (
            <div className="image-preview-container">
              <span style={{ color: "#aaa", fontSize: "0.8rem" }}>Selected:</span>
              <div className="image-preview-box">
                <img src={thumbnailPreview} alt="Thumbnail preview" />
              </div>
            </div>
          )}
        </div>

        <hr style={{ gridColumn: "1 / -1", border: "1px solid #222", margin: "10px 0" }} />

        <div style={{ gridColumn: "1 / -1" }}>
          <h4 style={{ color: "#fff", marginBottom: "5px" }}>Video Embed Links (Optional)</h4>
        </div>

        <div>
          <label className="management-label">Video Link 1</label>
          <input
            name="video_link_1"
            value={form.video_link_1}
            onChange={onChange}
            className="management-input"
            placeholder="Paste YouTube embed link"
          />
        </div>

        <div>
          <label className="management-label">Video Link 2</label>
          <input
            name="video_link_2"
            value={form.video_link_2}
            onChange={onChange}
            className="management-input"
            placeholder="Paste YouTube embed link"
          />
        </div>

        <hr style={{ gridColumn: "1 / -1", border: "1px solid #222", margin: "10px 0" }} />

        <div style={{ gridColumn: "1 / -1" }}>
          <h4 style={{ color: "#fff", marginBottom: "5px" }}>Project Images (Optional)</h4>
        </div>

        {[1, 2, 3, 4, 5].map((idx) => (
          <div key={idx}>
            <label className="management-label">
              Image {idx} <span style={infoStyle}>(Max 1MB, recommended 1200x703 px)</span>
            </label>
            <input
              name={`image${idx}`}
              onChange={onFileChange}
              type="file"
              accept="image/*"
              className="management-file"
            />
            {imagePreviews[`image${idx}`] && (
              <div className="image-preview-container">
                <div className="image-preview-box">
                  <img src={imagePreviews[`image${idx}`]} alt={`Image ${idx} preview`} />
                </div>
              </div>
            )}
          </div>
        ))}

        <hr style={{ gridColumn: "1 / -1", border: "1px solid #222", margin: "10px 0" }} />

        <div style={{ gridColumn: "1 / -1", display: "flex", alignItems: "center", gap: "10px" }}>
          <input
            type="checkbox"
            name="showOnHomepage"
            id="showOnHomepage"
            checked={form.showOnHomepage}
            onChange={onChange}
            style={{ width: "18px", height: "18px", cursor: "pointer" }}
          />
          <label htmlFor="showOnHomepage" style={{ color: "#fff", cursor: "pointer", fontSize: "0.95rem" }}>
            Feature this Case Study on the Homepage?
          </label>
        </div>

        <div style={{ gridColumn: "1 / -1", display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 15 }}>
          <button type="button" onClick={onCancel} className="management-btn management-reset">
            Cancel
          </button>
          <button type="submit" disabled={submitting} className="management-btn management-save">
            {submitting ? "Saving..." : "Create Case-Study"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CaseStudyForm;
