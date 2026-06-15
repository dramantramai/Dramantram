import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import axios from "axios";
import "../styles/CaseStudyPage.css";
import LightLayout from "../components/Layout/LightLayout";

// Helper component for meta fields
const MetaRow = ({ label, value }) => (
  <div className="d-flex flex-column mb-2">
    <span className="cs-meta-label">{label}</span>
    <span className="cs-meta-value">{value || "—"}</span>
  </div>
);

// Helper component for Video Embeds
const VideoEmbed = ({ src }) => {
  if (!src) return null;
  const videoSrc = `${src}?rel=0&autoplay=1&mute=1&loop=1`;
  return (
    <div className="cs-video-wrap mb-4" style={{ width: "100%" }}>
      {/* Youtube embeds require a defined height or aspect ratio to display.
        16/9 is standard for YouTube. The iframe contents will letterbox 
        automatically if the video source is different, preserving the video ratio.
      */}
      <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
        <iframe
          src={videoSrc}
          title="Case Study Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "10px",
          }}
        />
      </div>
    </div>
  );
};

// Helper component for Images
const ImageEmbed = ({ src, alt }) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  if (error || !src) return null;

  return (
    <div className="cs-image-wrap mb-4 position-relative" style={{ width: "100%" }}>
      {!loaded && (
        <div
          className="cs-skeleton-shimmer"
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "10px",
            minHeight: "400px",
            zIndex: 2,
          }}
        />
      )}
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={703}
        className="cs-hero img-fluid"
        style={{
          width: "100%",
          height: "auto",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
    </div>
  );
};

// Helper component for Thumbnail
const ThumbnailEmbed = ({ src, alt, text }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  if (error || !src) return null;

  return (
    <figure className="cs-card-figure position-relative">
      {!loaded && (
        <div
          className="cs-skeleton-shimmer"
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "6px",
            minHeight: "250px",
            zIndex: 2,
          }}
        />
      )}
      <Image
        src={src}
        className="img-fluid cs-card"
        alt={alt}
        width={384}
        height={467}
        style={{
          width: "100%",
          height: "auto",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
      {loaded && text && (
        <figcaption className="cs-card-overlay">
          {text}
        </figcaption>
      )}
    </figure>
  );
};

const CaseStudy = () => {
  const { slug } = useParams();
  const [cs, setCs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const apiUrl = "";

  // Fetch Data
  const getCaseStudy = async () => {
    try {
      const { data } = await axios.get(
        `${apiUrl}/api/v1/management/get-case-study/${slug}`
      );
      if (data?.success) {
        setCs(data.caseStudy);
      } else {
        setError(true);
      }
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCaseStudy();
  }, [slug]);

  // Loading State
  if (loading) {
    return (
      <LightLayout>
        <section className="case-study-wrap">
          <div className="container-fluid cs-container">
            {/* Top row skeleton */}
            <div className="row g-0 cs-header">
              {/* Left col */}
              <div className="col-12 col-md-3 cs-col cs-col-left">
                <div className="cs-pad">
                  <div className="cs-skeleton-shimmer cs-skeleton-title" />
                  <div className="cs-skeleton-shimmer cs-skeleton-thumbnail" />
                </div>
              </div>

              {/* Middle col */}
              <div className="col-12 col-md-3 cs-col">
                <div className="cs-pad">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="mb-4">
                      <div className="cs-skeleton-shimmer cs-skeleton-meta-label" style={{ marginTop: i === 1 ? "0px" : "10px" }} />
                      <div className="cs-skeleton-shimmer cs-skeleton-meta-value" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right col */}
              <div className="col-12 col-md-6 cs-col cs-col-right">
                <div className="cs-pad">
                  <div className="cs-skeleton-shimmer cs-skeleton-problem-title" />
                  <div className="cs-skeleton-shimmer cs-skeleton-pill" />
                  <div className="cs-skeleton-text-line cs-skeleton-shimmer" />
                  <div className="cs-skeleton-text-line cs-skeleton-shimmer" />
                  <div className="cs-skeleton-text-line cs-skeleton-shimmer" />
                  <div className="cs-skeleton-text-line cs-skeleton-shimmer short" />
                </div>
              </div>
            </div>

            {/* Bottom row skeleton */}
            <div className="row g-0 cs-content-row">
              {/* Left media */}
              <div className="col-12 col-md-9 p-0">
                <div className="cs-media-stream cs-pad">
                  <div className="cs-skeleton-shimmer cs-skeleton-media" />
                  <div className="cs-skeleton-shimmer cs-skeleton-media" />
                </div>
              </div>

              {/* Right solution */}
              <div className="col-12 col-md-3 cs-solution-col">
                <div className="cs-pad w-100">
                  <div className="cs-skeleton-shimmer cs-skeleton-solution-title" />
                  <div className="cs-skeleton-text-line cs-skeleton-shimmer" />
                  <div className="cs-skeleton-text-line cs-skeleton-shimmer" />
                  <div className="cs-skeleton-text-line cs-skeleton-shimmer" />
                  <div className="cs-skeleton-text-line cs-skeleton-shimmer short" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </LightLayout>
    );
  }

  // Error State
  if (error || !cs) {
    return (
      <LightLayout>
        <section
          className="container py-5 text-white"
          style={{ minHeight: "80vh" }}
        >
          <h1>Case study not found</h1>
          <p className="text-muted">Check the URL or go back to the list.</p>
          <Link href="/" className="text-danger">
            ← Back home
          </Link>
        </section>
      </LightLayout>
    );
  }

  // --- ASSET URL CONSTRUCTION ---
  // If stored as Cloudinary URL, use it directly. Otherwise fallback to old database buffer routes.
  const getImgUrl = (num) => {
    const val = cs[`image${num}`];
    if (val && typeof val === "string" && val.trim() !== "") {
      if (val.startsWith("http")) {
        return val;
      }
      return `${apiUrl}/api/v1/management/get-image-${num}/${cs._id}`;
    }
    return null;
  };

  const thumbnailSrc =
    cs.thumbnail_image && typeof cs.thumbnail_image === "string" && cs.thumbnail_image.trim() !== ""
      ? (cs.thumbnail_image.startsWith("http") ? cs.thumbnail_image : `${apiUrl}/api/v1/management/get-thumbnail-image/${cs._id}`)
      : null;

  return (
    <LightLayout>
      <section className="case-study-wrap">
        <div className="container-fluid cs-container">
          {/* --- TOP ROW: Header info --- */}
          <div className="row g-0 cs-header">
            {/* Col 1: Title + Thumbnail Card */}
            <div className="col-12 col-md-3 cs-col cs-col-left">
              <div className="cs-pad">
                <h2 className="cs-title"> {cs.case_study_name}</h2>
                <ThumbnailEmbed
                  src={thumbnailSrc}
                  alt={cs.case_study_name}
                  text={cs.thumbnail_text}
                />
              </div>
            </div>

            {/* Col 2: Meta list */}
            <div className="col-12 col-md-3 cs-col">
              <div className="cs-pad">
                <MetaRow label="Client" value={cs.client} />
                <MetaRow label="Services" value={cs.services} />
                <MetaRow label="Complexity" value={cs.complexity} />
                <MetaRow label="Industry" value={cs.industry} />
                <MetaRow label="Duration" value={cs.duration} />
              </div>
            </div>

            {/* Col 3: Problem statement */}
            <div className="col-12 col-md-6 cs-col cs-col-right">
              <div className="cs-pad">
                <h3>
                  {cs.case_study_description ||
                    "Bringing your brand vision to life."}
                </h3>
                <p className="cs-pill-muted">Case Study</p>
                <div className="cs-body">
                  {cs.problem?.split("\n").map((line, i) => (
                    <p key={i} style={{ marginTop: "10px", marginBottom: "0" }}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* --- BOTTOM ROW: Media Sequence (Left) + Solution (Right) --- */}
          <div className="row g-0 cs-content-row">
            {/* LEFT: MEDIA SEQUENCE (Col 9) */}
            <div className="col-12 col-md-9 p-0">
              <div className="cs-media-stream">
                {/* 1. Video 1 */}
                {cs.video_link_1 && <VideoEmbed src={cs.video_link_1} />}

                {/* 2. Image 1 */}
                <ImageEmbed src={getImgUrl(1)} alt="Project View 1" />

                {/* 3. Image 2 */}
                <ImageEmbed src={getImgUrl(2)} alt="Project View 2" />

                {/* 4. Video 2 */}
                {cs.video_link_2 && <VideoEmbed src={cs.video_link_2} />}

                {/* 5. Image 3 */}
                <ImageEmbed src={getImgUrl(3)} alt="Project View 3" />

                {/* 6. Image 4 */}
                <ImageEmbed src={getImgUrl(4)} alt="Project View 4" />

                {/* 7. Image 5 */}
                <ImageEmbed src={getImgUrl(5)} alt="Project View 5" />
              </div>
            </div>

            {/* RIGHT: SOLUTION TEXT (Col 3) — natural height, flows with page */}
            <div className="col-12 col-md-3 cs-solution-col">
              <div className="cs-pad">
                <h3 className="cs-h3">Our Solution</h3>
                <div className="cs-body">
                  {cs.solution
                    ?.split("\n")
                    .map((p) => p.trim())
                    .filter(Boolean)
                    .map((p, i) => (
                      <p key={i} className="cs-solution-para">{p}</p>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </LightLayout>
  );
};

export default CaseStudy;
