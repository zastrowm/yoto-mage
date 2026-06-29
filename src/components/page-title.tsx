"use client";

import { useEffect } from "react";
import { useSetPageTitle } from "./breadcrumb-context";

export function PageTitle({ title }: { title: string }) {
  const setPageTitle = useSetPageTitle();

  useEffect(() => {
    setPageTitle(title);
    return () => setPageTitle(null);
  }, [title, setPageTitle]);

  return null;
}
