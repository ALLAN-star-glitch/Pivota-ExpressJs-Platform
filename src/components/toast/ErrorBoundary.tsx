"use client"; // Mark this file as a client component

import React, { useState, useEffect, ReactNode } from 'react';
import { toast } from 'react-toastify';

interface ErrorBoundaryProps {
  children: ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (hasError) {
      toast.error("An error occurred! Please try again later.");
    }
  }, [hasError]);

  const onError = (error: Error, errorInfo: React.ErrorInfo) => {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    setHasError(true);
  };

  if (hasError) {
    return null; // Optionally render a fallback UI if needed
  }

  return (
    <ErrorBoundaryWrapper onError={onError}>
      {children}
    </ErrorBoundaryWrapper>
  );
};

// Component that catches errors using `ErrorBoundary`
const ErrorBoundaryWrapper: React.FC<{
  onError: (error: Error, errorInfo: React.ErrorInfo) => void;
  children: ReactNode; // Add `children` prop type here
}> = ({ children, onError }) => {
  try {
    return <>{children}</>;
  } catch (error) {
    onError(error as Error, {} as React.ErrorInfo);
    return null;
  }
};

export default ErrorBoundary;
