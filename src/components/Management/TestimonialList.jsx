import React from "react";

const TestimonialList = ({ testimonials, loading, onEdit, onDelete, onAddClick }) => {
  return (
    <div>
      <div className="management-list-header">
        <h3 style={{ color: "#fff", margin: 0 }}>Existing Testimonials</h3>
        <button className="management-add-btn" onClick={onAddClick}>
          Add Testimonial
        </button>
      </div>
      {loading ? (
        <div style={{ color: "#fff", padding: "40px 0", textAlign: "center" }}>Loading items...</div>
      ) : testimonials.length === 0 ? (
        <div style={{ color: "#888", padding: "40px 0", textAlign: "center" }}>
          No testimonials found. Click Add Testimonial to create one.
        </div>
      ) : (
        <div className="management-table-wrapper">
          <table className="management-table">
            <thead>
              <tr>
                <th>Photo</th>
                <th>Author Name</th>
                <th>Designation / Post</th>
                <th>Company</th>
                <th>Quote</th>
                <th>Order</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map((t) => (
                <tr key={t._id}>
                  <td>
                    <img
                      src={`/api/v1/management/testimonial/${t._id}/image`}
                      alt={`${t.firstName} ${t.lastName}`}
                      className="management-table-img"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/60x60?text=Avatar";
                      }}
                    />
                  </td>
                  <td style={{ fontWeight: 600 }}>
                    {t.firstName} {t.lastName}
                  </td>
                  <td>{t.post}</td>
                  <td>{t.company}</td>
                  <td
                    style={{
                      fontStyle: "italic",
                      fontSize: "0.85rem",
                      maxWidth: "250px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    &quot;{t.quote}&quot;
                  </td>
                  <td>{t.order}</td>
                  <td>
                    <div className="management-action-btns">
                      <button
                        className="management-action-btn management-edit-btn"
                        onClick={() => onEdit(t)}
                      >
                        Edit
                      </button>
                      <button
                        className="management-action-btn management-delete-btn"
                        onClick={() => onDelete(t._id)}
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

export default TestimonialList;
