import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout/AdminLayout";
import "../../styles/Management.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

// Subcomponents
import CaseStudyList from "../../components/Management/CaseStudyList";
import CaseStudyForm from "../../components/Management/CaseStudyForm";
import TeamList from "../../components/Management/TeamList";
import TeamForm from "../../components/Management/TeamForm";
import TestimonialList from "../../components/Management/TestimonialList";
import TestimonialForm from "../../components/Management/TestimonialForm";
import ClientList from "../../components/Management/ClientList";
import ClientForm from "../../components/Management/ClientForm";

// --- CONSTANTS FOR DROPDOWNS ---
const INDUSTRY_OPTIONS = [
  "Government",
  "Fintech",
  "Edtech",
  "Hospitality",
  "Consulting",
  "Technology",
  "NGO",
  "School",
  "Service",
  "Product",
  'Luxury Jewellery',
  'Healthcare',
  'Food & Agriculture',
  'Real Estate',
  'Data Security',
  'LogisticsTech',
  'Manufacturing & Printing',
];

const DURATION_OPTIONS = [
  'Under 1 month',
  "1 month",
  "2 months",
  "3 months",
  "4 months",
  "5 months",
  "6 months or more",
  'Monthly Retainer'
];

const SERVICE_OPTIONS = [
  "Brand Identity & Design",
  "Creating Logo",
  "Branding Strategy",
  "Booklet design",
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
  "Web Development",
  "App Design",
  "Game Development",
  "Interactive Screens (Touch, Gesture, Motion)",
  "Anamorphic",
  "AR/VR",
  'Production & Post Production'
];

const CLIENT_CATEGORIES = [
  "Consulting",
  "International",
  "Fintech",
  "Corporate",
  "Government",
  "CSR",
];

// --- INITIAL STATES ---
const initialCaseStudyForm = {
  case_study_name: "",
  case_study_description: "",
  client: "",
  services: "",
  service: "Branding",
  complexity: "",
  industry: "",
  duration: "",
  problem: "",
  solution: "",
  thumbnail_image: null,
  thumbnail_text: "",
  image1: null,
  image2: null,
  image3: null,
  image4: null,
  image5: null,
  video_link_1: "",
  video_link_2: "",
  website_link: "",
  showOnHomepage: false,
};

const initialTeamForm = {
  name: "",
  role: "",
  linkedin: "",
  order: 0,
  image: null,
};

const initialTestimonialForm = {
  firstName: "",
  lastName: "",
  post: "",
  company: "",
  quote: "",
  order: 0,
  image: null,
};

const initialClientForm = {
  name: "",
  category: "Consulting",
  width: "120px",
  height: "auto",
  order: 0,
  logo: null,
};

export default function Management() {
  const router = useRouter();

  // --- GENERAL STATE ---
  const [activeTab, setActiveTab] = useState("case-studies"); // case-studies, team, testimonials, clients
  const [viewMode, setViewMode] = useState("list"); // list, create, edit
  const [editingId, setEditingId] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // --- LISTS STATE ---
  const [caseStudies, setCaseStudies] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [clients, setClients] = useState([]);

  // --- FORMS STATE ---
  const [caseStudyForm, setCaseStudyForm] = useState(initialCaseStudyForm);
  const [teamForm, setTeamForm] = useState(initialTeamForm);
  const [testimonialForm, setTestimonialForm] = useState(initialTestimonialForm);
  const [clientForm, setClientForm] = useState(initialClientForm);

  // --- IMAGE PREVIEWS STATE ---
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [imagePreviews, setImagePreviews] = useState({
    image1: "",
    image2: "",
    image3: "",
    image4: "",
    image5: "",
  });
  const [teamImagePreview, setTeamImagePreview] = useState("");
  const [testimonialImagePreview, setTestimonialImagePreview] = useState("");
  const [clientLogoPreview, setClientLogoPreview] = useState("");

  // --- FETCH DATA FUNCTION ---
  const fetchData = async (tab) => {
    setLoading(true);
    try {
      if (tab === "case-studies") {
        const { data } = await axios.get("/api/v1/management/get-case-studies");
        if (data?.success) setCaseStudies(data.caseStudies);
      } else if (tab === "team") {
        const { data } = await axios.get("/api/v1/management/team");
        if (data?.success) setTeamMembers(data.teamMembers);
      } else if (tab === "testimonials") {
        const { data } = await axios.get("/api/v1/management/testimonial");
        if (data?.success) setTestimonials(data.testimonials);
      } else if (tab === "clients") {
        const { data } = await axios.get("/api/v1/management/client");
        if (data?.success) setClients(data.clients);
      }
    } catch (error) {
      console.error(`Error fetching ${tab}:`, error);
      toast.error(`Error fetching ${tab} list`);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when active tab changes
  useEffect(() => {
    fetchData(activeTab);
    setViewMode("list");
    setEditingId("");
    resetAllForms();
  }, [activeTab]);

  // --- RESET ALL FORMS ---
  const resetAllForms = () => {
    setCaseStudyForm(initialCaseStudyForm);
    setTeamForm(initialTeamForm);
    setTestimonialForm(initialTestimonialForm);
    setClientForm(initialClientForm);

    setThumbnailPreview("");
    setImagePreviews({
      image1: "",
      image2: "",
      image3: "",
      image4: "",
      image5: "",
    });
    setTeamImagePreview("");
    setTestimonialImagePreview("");
    setClientLogoPreview("");
  };

  // --- RESETS INDIVIDUAL FORMS FOR ACTIONS ---
  const resetCaseStudyForm = () => {
    setCaseStudyForm(initialCaseStudyForm);
    setThumbnailPreview("");
    setImagePreviews({
      image1: "",
      image2: "",
      image3: "",
      image4: "",
      image5: "",
    });
  };
  const resetTeamForm = () => {
    setTeamForm(initialTeamForm);
    setTeamImagePreview("");
  };
  const resetTestimonialForm = () => {
    setTestimonialForm(initialTestimonialForm);
    setTestimonialImagePreview("");
  };
  const resetClientForm = () => {
    setClientForm(initialClientForm);
    setClientLogoPreview("");
  };

  // --- FILE CHANGE HANDLER WITH SIZE CHECKS & PREVIEWS ---
  const handleFileChange = (e, setPreview, formSetter, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 1000000) {
      toast.error("Image size should be less than 1MB");
      e.target.value = null; // Clear input field
      return;
    }

    formSetter((prev) => ({ ...prev, [fieldName]: file }));

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleCaseStudyFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 1000000) {
      toast.error("Image size should be less than 1MB");
      e.target.value = null;
      return;
    }

    setCaseStudyForm((prev) => ({ ...prev, [name]: file }));

    const reader = new FileReader();
    reader.onloadend = () => {
      if (name === "thumbnail_image") {
        setThumbnailPreview(reader.result);
      } else {
        setImagePreviews((prev) => ({ ...prev, [name]: reader.result }));
      }
    };
    reader.readAsDataURL(file);
  };

  // --- HANDLE INPUT CHANGE ---
  const handleCaseStudyChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCaseStudyForm((s) => ({
      ...s,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleTeamChange = (e) => {
    const { name, value } = e.target;
    setTeamForm((s) => ({ ...s, [name]: value }));
  };

  const handleTestimonialChange = (e) => {
    const { name, value } = e.target;
    setTestimonialForm((s) => ({ ...s, [name]: value }));
  };

  const handleClientChange = (e) => {
    const { name, value } = e.target;
    setClientForm((s) => ({ ...s, [name]: value }));
  };

  // --- EDIT STATE INITIALIZATIONS ---
  const initEditTeam = (member) => {
    setEditingId(member._id);
    setTeamForm({
      name: member.name,
      role: member.role,
      linkedin: member.linkedin || "",
      order: member.order || 0,
      image: null,
    });
    setTeamImagePreview(`/api/v1/management/team/${member._id}/image?t=${new Date(member.updatedAt).getTime()}`);
    setViewMode("edit");
  };

  const initEditTestimonial = (t) => {
    setEditingId(t._id);
    setTestimonialForm({
      firstName: t.firstName,
      lastName: t.lastName,
      post: t.post,
      company: t.company,
      quote: t.quote,
      order: t.order || 0,
      image: null,
    });
    setTestimonialImagePreview(`/api/v1/management/testimonial/${t._id}/image?t=${new Date(t.updatedAt).getTime()}`);
    setViewMode("edit");
  };

  const initEditClient = (c) => {
    setEditingId(c._id);
    setClientForm({
      name: c.name,
      category: c.category,
      width: c.width || "120px",
      height: c.height || "auto",
      order: c.order || 0,
      logo: null,
    });
    setClientLogoPreview(`/api/v1/management/client/${c._id}/image?t=${new Date(c.updatedAt).getTime()}`);
    setViewMode("edit");
  };

  // --- DELETE HANDLERS ---
  const handleDeleteCaseStudy = async (id) => {
    if (!window.confirm("Are you sure you want to delete this case study?")) return;
    try {
      const { data } = await axios.delete(`/api/v1/management/delete-case-study/${id}`);
      if (data?.success) {
        toast.success("Case study deleted successfully");
        setCaseStudies(caseStudies.filter((cs) => cs._id !== id));
      } else {
        toast.error(data?.message || "Error deleting item");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const handleDeleteTeam = async (id) => {
    if (!window.confirm("Are you sure you want to delete this team member?")) return;
    try {
      const { data } = await axios.delete(`/api/v1/management/team/${id}`);
      if (data?.success) {
        toast.success("Team member deleted successfully");
        setTeamMembers(teamMembers.filter((t) => t._id !== id));
      } else {
        toast.error(data?.message || "Error deleting item");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const handleDeleteTestimonial = async (id) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      const { data } = await axios.delete(`/api/v1/management/testimonial/${id}`);
      if (data?.success) {
        toast.success("Testimonial deleted successfully");
        setTestimonials(testimonials.filter((t) => t._id !== id));
      } else {
        toast.error(data?.message || "Error deleting item");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const handleDeleteClient = async (id) => {
    if (!window.confirm("Are you sure you want to delete this client?")) return;
    try {
      const { data } = await axios.delete(`/api/v1/management/client/${id}`);
      if (data?.success) {
        toast.success("Client deleted successfully");
        setClients(clients.filter((c) => c._id !== id));
      } else {
        toast.error(data?.message || "Error deleting item");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  // --- SUBMIT HANDLERS ---
  const handleCaseStudySubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const caseStudyData = new FormData();
      caseStudyData.append("case_study_name", caseStudyForm.case_study_name);
      caseStudyData.append("case_study_description", caseStudyForm.case_study_description);
      caseStudyData.append("client", caseStudyForm.client);
      caseStudyData.append("services", caseStudyForm.services);
      caseStudyData.append("service", caseStudyForm.service);
      caseStudyData.append("complexity", caseStudyForm.complexity);
      caseStudyData.append("industry", caseStudyForm.industry);
      caseStudyData.append("duration", caseStudyForm.duration);
      caseStudyData.append("problem", caseStudyForm.problem);
      caseStudyData.append("solution", caseStudyForm.solution);
      caseStudyData.append("thumbnail_text", caseStudyForm.thumbnail_text);
      caseStudyData.append("showOnHomepage", caseStudyForm.showOnHomepage);

      if (caseStudyForm.thumbnail_image) {
        caseStudyData.append("thumbnail_image", caseStudyForm.thumbnail_image);
      } else {
        toast.error("Thumbnail Image is required");
        setSubmitting(false);
        return;
      }

      for (let i = 1; i <= 5; i++) {
        if (caseStudyForm[`image${i}`]) {
          caseStudyData.append(`image${i}`, caseStudyForm[`image${i}`]);
        }
      }

      if (caseStudyForm.video_link_1) caseStudyData.append("video_link_1", caseStudyForm.video_link_1);
      if (caseStudyForm.video_link_2) caseStudyData.append("video_link_2", caseStudyForm.video_link_2);
      if (caseStudyForm.website_link) caseStudyData.append("website_link", caseStudyForm.website_link);

      const { data } = await axios.post("/api/v1/management/create-case-study", caseStudyData);
      if (data?.success) {
        toast.success(data?.message || "Created Successfully");
        setViewMode("list");
        fetchData("case-studies");
      } else {
        toast.error(data?.message || "An error occurred");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error creating case study");
    } finally {
      setSubmitting(false);
    }
  };

  const handleTeamSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", teamForm.name);
      formData.append("role", teamForm.role);
      formData.append("linkedin", teamForm.linkedin);
      formData.append("order", teamForm.order);
      if (teamForm.image) {
        formData.append("image", teamForm.image);
      }

      let res;
      if (viewMode === "edit") {
        res = await axios.put(`/api/v1/management/team/${editingId}`, formData);
      } else {
        if (!teamForm.image) {
          toast.error("Image avatar is required");
          setSubmitting(false);
          return;
        }
        res = await axios.post("/api/v1/management/team", formData);
      }

      if (res.data?.success) {
        toast.success(res.data?.message || "Saved Successfully");
        setViewMode("list");
        fetchData("team");
      } else {
        toast.error(res.data?.error || res.data?.message || "An error occurred");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error submitting team member details");
    } finally {
      setSubmitting(false);
    }
  };

  const handleTestimonialSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("firstName", testimonialForm.firstName);
      formData.append("lastName", testimonialForm.lastName);
      formData.append("post", testimonialForm.post);
      formData.append("company", testimonialForm.company);
      formData.append("quote", testimonialForm.quote);
      formData.append("order", testimonialForm.order);
      if (testimonialForm.image) {
        formData.append("image", testimonialForm.image);
      }

      let res;
      if (viewMode === "edit") {
        res = await axios.put(`/api/v1/management/testimonial/${editingId}`, formData);
      } else {
        if (!testimonialForm.image) {
          toast.error("Avatar image is required");
          setSubmitting(false);
          return;
        }
        res = await axios.post("/api/v1/management/testimonial", formData);
      }

      if (res.data?.success) {
        toast.success(res.data?.message || "Saved Successfully");
        setViewMode("list");
        fetchData("testimonials");
      } else {
        toast.error(res.data?.error || res.data?.message || "An error occurred");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error submitting testimonial");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClientSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", clientForm.name);
      formData.append("category", clientForm.category);
      formData.append("width", clientForm.width);
      formData.append("height", clientForm.height);
      formData.append("order", clientForm.order);
      if (clientForm.logo) {
        formData.append("logo", clientForm.logo);
      }

      let res;
      if (viewMode === "edit") {
        res = await axios.put(`/api/v1/management/client/${editingId}`, formData);
      } else {
        if (!clientForm.logo) {
          toast.error("Logo file is required");
          setSubmitting(false);
          return;
        }
        res = await axios.post("/api/v1/management/client", formData);
      }

      if (res.data?.success) {
        toast.success(res.data?.message || "Saved Successfully");
        setViewMode("list");
        fetchData("clients");
      } else {
        toast.error(res.data?.error || res.data?.message || "An error occurred");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error submitting client details");
    } finally {
      setSubmitting(false);
    }
  };

  // Helper info style
  const infoStyle = {
    fontSize: "0.8rem",
    color: "#aaa",
    fontWeight: "normal",
    marginLeft: "6px",
  };

  return (
    <AdminLayout>
      <div className="management-wrapper">
        <div className="management-form-box" style={{ maxWidth: viewMode === "list" ? "1050px" : "850px" }}>

          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <h2 style={{ color: "#fff", fontSize: 20, margin: 0 }}>
              Dramantram Management Control
            </h2>
            <div style={{
              padding: "6px 12px",
              borderRadius: 999,
              background: "linear-gradient(90deg, #ff3b3b, #ff7b7b)",
              color: "#000",
              fontWeight: 600,
              fontSize: 13,
            }}>
              Admin Portal
            </div>
          </div>

          {/* Tab Selection */}
          <div className="management-tabs">
            <button
              className={`management-tab-btn ${activeTab === "case-studies" ? "active" : ""}`}
              onClick={() => setActiveTab("case-studies")}
            >
              Case Studies
            </button>
            <button
              className={`management-tab-btn ${activeTab === "team" ? "active" : ""}`}
              onClick={() => setActiveTab("team")}
            >
              Team Members
            </button>
            <button
              className={`management-tab-btn ${activeTab === "testimonials" ? "active" : ""}`}
              onClick={() => setActiveTab("testimonials")}
            >
              Testimonials
            </button>
            <button
              className={`management-tab-btn ${activeTab === "clients" ? "active" : ""}`}
              onClick={() => setActiveTab("clients")}
            >
              Clients
            </button>
          </div>

          {/* Tab Views rendering */}
          {activeTab === "case-studies" && (
            viewMode === "list" ? (
              <CaseStudyList
                caseStudies={caseStudies}
                loading={loading}
                onDelete={handleDeleteCaseStudy}
                onAddClick={() => { resetCaseStudyForm(); setViewMode("create"); }}
                router={router}
              />
            ) : (
              <CaseStudyForm
                form={caseStudyForm}
                onChange={handleCaseStudyChange}
                onFileChange={handleCaseStudyFileChange}
                onSubmit={handleCaseStudySubmit}
                onCancel={() => setViewMode("list")}
                submitting={submitting}
                thumbnailPreview={thumbnailPreview}
                imagePreviews={imagePreviews}
                SERVICE_OPTIONS={SERVICE_OPTIONS}
                INDUSTRY_OPTIONS={INDUSTRY_OPTIONS}
                DURATION_OPTIONS={DURATION_OPTIONS}
                infoStyle={infoStyle}
              />
            )
          )}

          {activeTab === "team" && (
            viewMode === "list" ? (
              <TeamList
                teamMembers={teamMembers}
                loading={loading}
                onEdit={initEditTeam}
                onDelete={handleDeleteTeam}
                onAddClick={() => { resetTeamForm(); setViewMode("create"); }}
              />
            ) : (
              <TeamForm
                form={teamForm}
                onChange={handleTeamChange}
                onFileChange={(e) => handleFileChange(e, setTeamImagePreview, setTeamForm, "image")}
                onSubmit={handleTeamSubmit}
                onCancel={() => setViewMode("list")}
                submitting={submitting}
                imagePreview={teamImagePreview}
                viewMode={viewMode}
                infoStyle={infoStyle}
              />
            )
          )}

          {activeTab === "testimonials" && (
            viewMode === "list" ? (
              <TestimonialList
                testimonials={testimonials}
                loading={loading}
                onEdit={initEditTestimonial}
                onDelete={handleDeleteTestimonial}
                onAddClick={() => { resetTestimonialForm(); setViewMode("create"); }}
              />
            ) : (
              <TestimonialForm
                form={testimonialForm}
                onChange={handleTestimonialChange}
                onFileChange={(e) => handleFileChange(e, setTestimonialImagePreview, setTestimonialForm, "image")}
                onSubmit={handleTestimonialSubmit}
                onCancel={() => setViewMode("list")}
                submitting={submitting}
                imagePreview={testimonialImagePreview}
                viewMode={viewMode}
                infoStyle={infoStyle}
              />
            )
          )}

          {activeTab === "clients" && (
            viewMode === "list" ? (
              <ClientList
                clients={clients}
                loading={loading}
                onEdit={initEditClient}
                onDelete={handleDeleteClient}
                onAddClick={() => { resetClientForm(); setViewMode("create"); }}
              />
            ) : (
              <ClientForm
                form={clientForm}
                onChange={handleClientChange}
                onFileChange={(e) => handleFileChange(e, setClientLogoPreview, setClientForm, "logo")}
                onSubmit={handleClientSubmit}
                onCancel={() => setViewMode("list")}
                submitting={submitting}
                logoPreview={clientLogoPreview}
                viewMode={viewMode}
                CLIENT_CATEGORIES={CLIENT_CATEGORIES}
                infoStyle={infoStyle}
              />
            )
          )}

        </div>
      </div>
    </AdminLayout>
  );
}
