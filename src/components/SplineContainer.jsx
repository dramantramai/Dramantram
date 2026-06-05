// src/components/SplineContainer.jsx
import React, { memo, useState } from "react";
import Spline from "@splinetool/react-spline";

// 1. IMPROVED ERROR BOUNDARY
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Spline 3D Crash:", error);
  }

  handleRetry = () => {
    this.setState({ hasError: false });
    // This forces the children to re-mount
    this.props.onRetry && this.props.onRetry();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="spline-error-fallback" style={fallbackStyle}>
          <p>Graphics context lost.</p>
          <button onClick={this.handleRetry} style={btnStyle}>
            Reload 3D Scene
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// 2. THE CONTAINER COMPONENT
const SplineContainer = memo(() => {
  // We use a key to force React to destroy and recreate the component completely
  const [resetKey, setResetKey] = useState(0);

  const handleRetry = () => {
    setResetKey((prev) => prev + 1);
  };

  return (
    <ErrorBoundary onRetry={handleRetry} key={resetKey}>
      <Spline
        scene="https://prod.spline.design/conlVET3ho6gKvDo/scene.splinecode"
        onLoad={() => console.log("Spline Loaded")}
      />
    </ErrorBoundary>
  );
});

// Styles for the fallback
const fallbackStyle = {
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  color: "#000000",
  background: "transparent",
  textAlign: "center",
  padding: "20px",
};

const btnStyle = {
  marginTop: "10px",
  padding: "8px 16px",
  background: "#333333",
  color: "#fff",
  border: "1px solid #555",
  cursor: "pointer",
  borderRadius: "4px",
};

export default SplineContainer;
