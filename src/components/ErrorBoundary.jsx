import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.silent) {
        return null;
      }
      if (this.props.fallback !== undefined) {
        return this.props.fallback;
      }

      // Default fallback UI with a Reload/Retry button
      return (
        <div 
          className="section-error-fallback" 
          style={{
            padding: "15px",
            border: "1px dashed rgba(255, 255, 255, 0.2)",
            borderRadius: "8px",
            textAlign: "center",
            background: "rgba(255, 255, 255, 0.03)",
            color: "#ccc",
            fontSize: "0.9rem",
            margin: "15px 0"
          }}
        >
          <p style={{ marginBottom: "10px" }}>Something went wrong loading this section.</p>
          <button 
            onClick={this.handleRetry} 
            style={{
              padding: "6px 12px",
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "#fff",
              borderRadius: "4px",
              cursor: "pointer",
              transition: "background 0.2s ease"
            }}
            onMouseEnter={(e) => e.target.style.background = "rgba(255, 255, 255, 0.2)"}
            onMouseLeave={(e) => e.target.style.background = "rgba(255, 255, 255, 0.1)"}
          >
            Reload Section
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
