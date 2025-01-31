"use client";  // Mark this as a client-side component

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const ClientSession = () => {
  const { data: session, status } = useSession();
  const [firstName, setFirstName] = useState<string>("");

  useEffect(() => {
    if (session?.user?.firstName) {
      setFirstName(session.user.firstName);
    }
  }, [session]);

  if (status === "loading") return <div>Loading...</div>;

  return <>{firstName || "Welcome"}</>;
};

export default ClientSession;
