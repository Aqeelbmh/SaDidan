"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="p-6 bg-red-500/10 border border-red-400/30 rounded-lg text-red-300 text-center">
            <h3 className="text-lg font-semibold mb-2">Something went wrong</h3>
            <p className="text-sm">Please refresh the page to try again.</p>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
