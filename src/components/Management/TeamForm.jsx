import React from "react";

const TeamForm = ({
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
        {viewMode === "edit" ? "Edit Team Member" : "Create Team Member"}
      </h3>
      <form onSubmit={onSubmit} className="management-grid">
        <div>
          <label className="management-label">
            <strong>Member Name</strong><span style={{ color: "#e60000", marginLeft: "4px" }}>*</span>
          </label>
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            className="management-input"
            placeholder="John Doe"
            required
          />
        </div>

        <div>
          <label className="management-label">
            <strong>Role / Designation</strong><span style={{ color: "#e60000", marginLeft: "4px" }}>*</span>
          </label>
          <input
            name="role"
            value={form.role}
            onChange={onChange}
            className="management-input"
            placeholder="e.g. Lead Designer"
            required
          />
        </div>

        <div>
          <label className="management-label">LinkedIn URL</label>
          <input
            name="linkedin"
            value={form.linkedin}
            onChange={onChange}
            className="management-input"
            placeholder="https://linkedin.com/in/username"
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
            Member Photo / Avatar <span style={infoStyle}>(Max 1MB, Square aspect recommended, e.g. 200x200 px)</span>
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
                <img src={imagePreview} alt="Team member avatar preview" />
              </div>
            </div>
          )}
        </div>

        <div style={{ gridColumn: "1 / -1", display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 15 }}>
          <button type="button" onClick={onCancel} className="management-btn management-reset">
            Cancel
          </button>
          <button type="submit" disabled={submitting} className="management-btn management-save">
            {submitting ? "Saving..." : viewMode === "edit" ? "Save Changes" : "Create Team Member"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeamForm;
