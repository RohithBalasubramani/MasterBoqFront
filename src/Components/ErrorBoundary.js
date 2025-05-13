// src/components/ErrorBoundary.js
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(/* error */) {
    // Update state so the next render shows the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can log this to an external service
    console.error("Uncaught error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div style={{ padding: 20, textAlign: "center" }}>
          <h1>Something went wrong.</h1>
          <p>
            Please try refreshing the page, or contact support if it persists.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
