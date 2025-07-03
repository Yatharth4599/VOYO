'use client'

import { useState, useEffect } from "react";

export default function ClientMounted({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null; // Prevents hydration mismatch on initial load

  return <>{children}</>;
}
