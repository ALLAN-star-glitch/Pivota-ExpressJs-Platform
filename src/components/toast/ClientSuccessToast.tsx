"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

// This component will handle showing the success toast based on query params
const ClientSuccessToast = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("success") === "true") {
      toast.success("Login Successful", {
        position: "top-right",
      });
    }
  }, [searchParams]);

  return null; // Return null as there is no need to render anything here
};

export default ClientSuccessToast;
