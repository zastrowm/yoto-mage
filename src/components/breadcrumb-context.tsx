"use client";

import { createContext, useContext, useState } from "react";

interface BreadcrumbContextValue {
  pageTitle: string | null;
  setPageTitle: (title: string | null) => void;
}

const BreadcrumbContext = createContext<BreadcrumbContextValue>({
  pageTitle: null,
  setPageTitle: () => {},
});

export function BreadcrumbProvider({ children }: { children: React.ReactNode }) {
  const [pageTitle, setPageTitle] = useState<string | null>(null);
  return (
    <BreadcrumbContext.Provider value={{ pageTitle, setPageTitle }}>
      {children}
    </BreadcrumbContext.Provider>
  );
}

export function useSetPageTitle() {
  return useContext(BreadcrumbContext).setPageTitle;
}

export function usePageTitle() {
  return useContext(BreadcrumbContext).pageTitle;
}
