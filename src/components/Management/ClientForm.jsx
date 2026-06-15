import React from "react";

const ClientForm = ({
  form,
  onChange,
  onFileChange,
  onSubmit,
  onCancel,
  submitting,
  logoPreview,
  viewMode,
  CLIENT_CATEGORIES,
  infoStyle,
}) => {
  return (
    <div>
      <h3 style={{ color: "#fff", marginBottom: "20px" }}>
        {viewMode === "edit" ? "Edit Client Partner" : "Create Client Partner"}
      </h3>
      <form onSubmit={onSubmit} className="management-grid">
        <div>
          <label className="management-label">
            <strong>Client Name</strong><span style={{ color: "#e60000", marginLeft: "4px" }}>*</span>
          </label>
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            className="management-input"
            placeholder="e.g. Fintech Solutions"
            required
          />
        </div>

        <div>
          <label className="management-label">Category<span style={{ color: "#e60000", marginLeft: "4px" }}>*</span></label>
          <select
            name="category"
            value={form.category}
            onChange={onChange}
            className="management-select"
            required
          >
            {CLIENT_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="management-label">Display Width</label>
          <input
            name="width"
            value={form.width}
            onChange={onChange}
            className="management-input"
            placeholder="120px"
          />
        </div>

        <div>
          <label className="management-label">Display Height</label>
          <input
            name="height"
            value={form.height}
            onChange={onChange}
            className="management-input"
            placeholder="auto"
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
            Client Logo <span style={infoStyle}>(Max 1MB, Transparent PNG recommended, e.g. max 130x40 px)</span>
          </label>
          <input
            name="logo"
            onChange={onFileChange}
            type="file"
            accept="image/*"
            className="management-file"
          />
          {logoPreview && (
            <div className="image-preview-container">
              <span style={{ color: "#aaa", fontSize: "0.8rem" }}>Preview:</span>
              <div className="image-preview-box">
                <img src={logoPreview} alt="Client logo preview" />
              </div>
            </div>
          )}
        </div>

        <div style={{ gridColumn: "1 / -1", display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 15 }}>
          <button type="button" onClick={onCancel} className="management-btn management-reset">
            Cancel
          </button>
          <button type="submit" disabled={submitting} className="management-btn management-save">
            {submitting ? "Saving..." : viewMode === "edit" ? "Save Changes" : "Create Client"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClientForm;
