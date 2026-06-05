import React, { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout/AdminLayout";
import axios from "axios";
import "../styles/CaseStudiesPage.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CaseStudies = () => {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // API URL helper
  const apiUrl = import.meta.env.VITE_API_URL;

  // Fetch all case studies
  const getAllCaseStudies = async () => {
    try {
      const { data } = await axios.get(
        `${apiUrl}/api/v1/management/get-case-studies`
      );
      if (data?.success) {
        setCaseStudies(data.caseStudies);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching data");
    } finally {
      setLoading(false);
    }
  };

  // Handle Delete Functionality
  const handleDelete = async (id) => {
    try {
      // Basic confirmation before deleting
      let answer = window.confirm(
        "Are you sure you want to delete this case study?"
      );
      if (!answer) return;

      const { data } = await axios.delete(
        `${apiUrl}/api/v1/management/delete-case-study/${id}`
      );

      if (data?.success) {
        toast.success("Case study deleted successfully");
        // Refresh the list locally without reloading page
        setCaseStudies(caseStudies.filter((c) => c._id !== id));
      } else {
        toast.error(data?.message || "Error deleting item");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllCaseStudies();
  }, []);

  return (
    <AdminLayout>
      <div className="case-studies-container">
        <div className="container">
          {/* Header Section */}
          <div className="text-center mb-5">
            <h1 className="display-4 text-white">
              Our <span className="gradient-text">Case Studies</span>
            </h1>
            <p className="text-secondary">
              Manage your projects and success stories.
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center text-white">
              <h3>Loading projects...</h3>
            </div>
          )}

          {/* Grid System */}
          <div className="row">
            {!loading &&
              caseStudies?.map((c) => (
                <div className="col-md-4 mb-4" key={c._id}>
                  <div className="custom-card">
                    {/* Thumbnail Image */}
                    <div className="card-img-wrapper">
                      <img
                        src={`${apiUrl}/api/v1/management/get-thumbnail-image/${c._id}`}
                        alt={c.case_study_name}
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/400x200?text=No+Image";
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="card-body">
                      <h5 className="card-title px-2">{c.case_study_name}</h5>

                      {/* Display Industry Badge */}
                      {c.industry && (
                        <div>
                          <span className="badge bg-secondary mb-3 mx-2">
                            {c.industry}
                          </span>
                        </div>
                      )}

                      {/* Description (Truncated) */}
                      <p className="card-text mx-2">
                        {c.case_study_description?.length > 90
                          ? c.case_study_description.substring(0, 90) + "..."
                          : c.case_study_description}
                      </p>

                      {/* ACTION BUTTONS */}
                      <div className="card-actions">
                        {/* Primary Action */}
                        <button
                          className="btn-view"
                          onClick={() => navigate(`/case-study/${c.slug}`)}
                        >
                          View Case Study
                        </button>

                        {/* Admin Actions Row */}
                        <div className="admin-actions">
                          <button
                            className="btn-action btn-edit"
                            onClick={() =>
                              navigate(`/internal/update-case-study/${c.slug}`)
                            }
                          >
                            Edit
                          </button>

                          <button
                            className="btn-action btn-delete"
                            onClick={() => handleDelete(c._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* No Results State */}
          {!loading && caseStudies.length === 0 && (
            <div className="text-center text-white mt-5">
              <h4>No case studies found.</h4>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default CaseStudies;
