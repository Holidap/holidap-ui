"use client";

import React from "react";
import { useRouter } from "next/navigation";

function HomePage() {
  const router = useRouter();

  React.useEffect(() => {
    router.replace("/login");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
    </div>
  );
}

export default HomePage;
