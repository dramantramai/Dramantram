import React from "react";

const ClientList = ({ clients, loading, onEdit, onDelete, onAddClick }) => {
  return (
    <div>
      <div className="management-list-header">
        <h3 style={{ color: "#fff", margin: 0 }}>Existing Client Logos</h3>
        <button className="management-add-btn" onClick={onAddClick}>
          Add Client
        </button>
      </div>
      {loading ? (
        <div style={{ color: "#fff", padding: "40px 0", textAlign: "center" }}>Loading items...</div>
      ) : clients.length === 0 ? (
        <div style={{ color: "#888", padding: "40px 0", textAlign: "center" }}>
          No clients found. Click Add Client to create one.
        </div>
      ) : (
        <div className="management-table-wrapper">
          <table className="management-table">
            <thead>
              <tr>
                <th>Logo</th>
                <th>Client Name</th>
                <th>Category</th>
                <th>Width x Height</th>
                <th>Display Order</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => (
                <tr key={c._id}>
                  <td>
                    <div
                      style={{
                        background: "#222",
                        padding: "4px",
                        borderRadius: "4px",
                        display: "inline-block",
                      }}
                    >
                      <img
                        src={`/api/v1/management/client/${c._id}/image?t=${new Date(c.updatedAt).getTime()}`}
                        alt={c.name}
                        style={{ height: "30px", maxWidth: "100px", objectFit: "contain" }}
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/100x30?text=Logo";
                        }}
                      />
                    </div>
                  </td>
                  <td style={{ fontWeight: 600 }}>{c.name}</td>
                  <td>
                    <span
                      className="badge bg-danger"
                      style={{
                        fontSize: "0.75rem",
                        background: "#f00",
                        color: "#fff",
                        padding: "4px 8px",
                      }}
                    >
                      {c.category}
                    </span>
                  </td>
                  <td>
                    {c.width} x {c.height}
                  </td>
                  <td>{c.order}</td>
                  <td>
                    <div className="management-action-btns">
                      <button
                        className="management-action-btn management-edit-btn"
                        onClick={() => onEdit(c)}
                      >
                        Edit
                      </button>
                      <button
                        className="management-action-btn management-delete-btn"
                        onClick={() => onDelete(c._id)}
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

export default ClientList;
