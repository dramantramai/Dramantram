import React from "react";

const TestimonialForm = ({
  form,
  onChange,
  onFileChange,
  onSubmit,
  onCancel,
  submitting,
  imagePreview,
  viewMode,
  infoStyle,
}) => {
  return (
    <div>
      <h3 style={{ color: "#fff", marginBottom: "20px" }}>
        {viewMode === "edit" ? "Edit Testimonial" : "Create Testimonial"}
      </h3>
      <form onSubmit={onSubmit} className="management-grid">
        <div>
          <label className="management-label">
            <strong>First Name</strong><span style={{ color: "#e60000", marginLeft: "4px" }}>*</span>
          </label>
          <input
            name="firstName"
            value={form.firstName}
            onChange={onChange}
            className="management-input"
            placeholder="John"
            required
          />
        </div>

        <div>
          <label className="management-label">
            <strong>Last Name</strong><span style={{ color: "#e60000", marginLeft: "4px" }}>*</span>
          </label>
          <input
            name="lastName"
            value={form.lastName}
            onChange={onChange}
            className="management-input"
            placeholder="Doe"
            required
          />
        </div>

        <div>
          <label className="management-label">
            <strong>Post / Designation</strong><span style={{ color: "#e60000", marginLeft: "4px" }}>*</span>
          </label>
          <input
            name="post"
            value={form.post}
            onChange={onChange}
            className="management-input"
            placeholder="e.g. Managing Director"
            required
          />
        </div>

        <div>
          <label className="management-label">
            <strong>Company Name</strong><span style={{ color: "#e60000", marginLeft: "4px" }}>*</span>
          </label>
          <input
            name="company"
            value={form.company}
            onChange={onChange}
            className="management-input"
            placeholder="e.g. Acme Corp"
            required
          />
        </div>

        <div>
          <label className="management-label">Display Order</label>
          <input
            type="number"
            name="order"
            value={form.order}
            onChange={onChange}
            className="management-input"
            placeholder="0"
          />
        </div>

        <div style={{ gridColumn: "1 / -1" }}>
          <label className="management-label">
            <strong>Quote / Review</strong><span style={{ color: "#e60000", marginLeft: "4px" }}>*</span>
          </label>
          <textarea
            name="quote"
            value={form.quote}
            onChange={onChange}
            className="management-textarea"
            rows={3}
            placeholder="Write client testimonial quote..."
            required
          />
        </div>

        <div style={{ gridColumn: "1 / -1" }}>
          <label className="management-label">
            Client Photo <span style={infoStyle}>(Max 1MB, Square avatar recommended, e.g. 200x200 px)</span>
          </label>
          <input
            name="image"
            onChange={onFileChange}
            type="file"
            accept="image/*"
            className="management-file"
          />
          {imagePreview && (
            <div className="image-preview-container">
              <span style={{ color: "#aaa", fontSize: "0.8rem" }}>Preview:</span>
              <div className="image-preview-box">
                <img src={imagePreview} alt="Testimonial avatar preview" />
              </div>
            </div>
          )}
        </div>

        <div style={{ gridColumn: "1 / -1", display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 15 }}>
          <button type="button" onClick={onCancel} className="management-btn management-reset">
            Cancel
          </button>
          <button type="submit" disabled={submitting} className="management-btn management-save">
            {submitting ? "Saving..." : viewMode === "edit" ? "Save Changes" : "Create Testimonial"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TestimonialForm;
