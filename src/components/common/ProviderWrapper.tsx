// components/common/ProviderWrapper.tsx
"use client";

import React from "react";
import Provider from "./Provider";

const ProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Provider>{children}</Provider>;
};

export default ProviderWrapper;
