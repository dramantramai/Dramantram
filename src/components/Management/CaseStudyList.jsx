import React from "react";

const CaseStudyList = ({ caseStudies, loading, onDelete, onAddClick, router }) => {
  return (
    <div>
      <div className="management-list-header">
        <h3 style={{ color: "#fff", margin: 0 }}>Existing Case Studies</h3>
        <button className="management-add-btn" onClick={onAddClick}>
          Add Case Study
        </button>
      </div>
      {loading ? (
        <div style={{ color: "#fff", padding: "40px 0", textAlign: "center" }}>Loading items...</div>
      ) : caseStudies.length === 0 ? (
        <div style={{ color: "#888", padding: "40px 0", textAlign: "center" }}>
          No case studies found. Click Add Case Study to create one.
        </div>
      ) : (
        <div className="management-table-wrapper">
          <table className="management-table">
            <thead>
              <tr>
                <th>Thumbnail</th>
                <th>Heading</th>
                <th>Client</th>
                <th>Industry</th>
                <th>Services (Tags)</th>
                <th>Service (Navbar)</th>
                <th>Featured</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {caseStudies.map((cs) => (
                <tr key={cs._id}>
                  <td>
                    <img
                      src={cs.thumbnailDataUri || `/api/v1/management/get-thumbnail-image/${cs._id}?t=${new Date(cs.updatedAt).getTime()}`}
                      alt={cs.case_study_name}
                      className="management-table-img"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/60x60?text=No+Image";
                      }}
                    />
                  </td>
                  <td style={{ fontWeight: 600 }}>{cs.case_study_name}</td>
                  <td>{cs.client}</td>
                  <td>{cs.industry}</td>
                  <td>{cs.services}</td>
                  <td>
                    <span className="badge bg-danger" style={{ fontSize: "0.75rem", background: "#f00", color: "#fff", padding: "4px 8px" }}>
                      {cs.service || "Branding"}
                    </span>
                  </td>
                  <td>
                    {cs.showOnHomepage ? (
                      <span style={{ color: "#00ff88" }}>Yes</span>
                    ) : (
                      <span style={{ color: "#888" }}>No</span>
                    )}
                  </td>
                  <td>
                    <div className="management-action-btns">
                      <button
                        className="management-action-btn management-edit-btn"
                        onClick={() => window.open(`/case-study/${cs.slug}`, "_blank")}
                      >
                        View
                      </button>
                      <button
                        className="management-action-btn management-edit-btn"
                        onClick={() => router.push(`/internal/update-case-study/${cs.slug}`)}
                      >
                        Edit
                      </button>
                      <button
                        className="management-action-btn management-delete-btn"
                        onClick={() => onDelete(cs._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CaseStudyList;
