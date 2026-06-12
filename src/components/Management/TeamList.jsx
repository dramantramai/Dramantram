import React from "react";

const TeamList = ({ teamMembers, loading, onEdit, onDelete, onAddClick }) => {
  return (
    <div>
      <div className="management-list-header">
        <h3 style={{ color: "#fff", margin: 0 }}>Existing Team Members</h3>
        <button className="management-add-btn" onClick={onAddClick}>
          Add Member
        </button>
      </div>
      {loading ? (
        <div style={{ color: "#fff", padding: "40px 0", textAlign: "center" }}>Loading items...</div>
      ) : teamMembers.length === 0 ? (
        <div style={{ color: "#888", padding: "40px 0", textAlign: "center" }}>
          No team members found. Click Add Member to create one.
        </div>
      ) : (
        <div className="management-table-wrapper">
          <table className="management-table">
            <thead>
              <tr>
                <th>Avatar</th>
                <th>Name</th>
                <th>Role</th>
                <th>LinkedIn</th>
                <th>Display Order</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((member) => (
                <tr key={member._id}>
                  <td>
                    <img
                      src={`/api/v1/management/team/${member._id}/image`}
                      alt={member.name}
                      className="management-table-img"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/60x60?text=Avatar";
                      }}
                    />
                  </td>
                  <td style={{ fontWeight: 600 }}>{member.name}</td>
                  <td>{member.role}</td>
                  <td>
                    {member.linkedin ? (
                      <a href={member.linkedin} target="_blank" rel="noreferrer" style={{ color: "#00aaff" }}>
                        Profile
                      </a>
                    ) : (
                      <span style={{ color: "#555" }}>None</span>
                    )}
                  </td>
                  <td>{member.order}</td>
                  <td>
                    <div className="management-action-btns">
                      <button
                        className="management-action-btn management-edit-btn"
                        onClick={() => onEdit(member)}
                      >
                        Edit
                      </button>
                      <button
                        className="management-action-btn management-delete-btn"
                        onClick={() => onDelete(member._id)}
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

export default TeamList;
