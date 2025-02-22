"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FaEye, FaTimes } from "react-icons/fa";
import { useAppSelector } from "@/lib/hooks";
import { selectUserRoles } from "@/lib/features/authSelector";
import { useRouter } from "next/navigation";
import LoadingBar from "@/components/common/LoadingBar";

const jobApplications = [
  {
    id: 1,
    applicantName: "John Doe",
    jobTitle: "Frontend Developer",
    status: "Pending",
    appliedDate: "3 days ago",
  },
  {
    id: 2,
    applicantName: "Jane Smith",
    jobTitle: "Marketing Manager",
    status: "Reviewed",
    appliedDate: "1 week ago",
  },
  {
    id: 3,
    applicantName: "Alice Johnson",
    jobTitle: "UI/UX Designer",
    status: "Pending",
    appliedDate: "2 days ago",
  },
];

export default function EmployerJobApplications() {
  const userRoles = useAppSelector(selectUserRoles);
  const isEmployer = userRoles.includes("employer");
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (!isEmployer) {
    return (
      <div className="p-6 text-center text-gray-600">
        <h1 className="text-2xl font-semibold">Access Denied</h1>
        <p>You must have an Employer role to view job applications.</p>
      </div>
    );
  }

  return (
    <div className="p-6 mt-20">
      {<LoadingBar isLoading={isLoading} />}
      <h1 className="text-3xl font-bold text-pivotaTeal mb-6">Job Applications</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobApplications.length > 0 ? (
          jobApplications.map((application) => (
            <Card key={application.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">{application.applicantName}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <span className="text-gray-600">{application.jobTitle}</span>
                <Badge variant={application.status === "Pending" ? "destructive" : "outline"} className="w-fit">
                  {application.status}
                </Badge>
                <span className="text-xs text-gray-400">Applied: {application.appliedDate}</span>
                <div className="flex justify-between mt-3">
                  <Button size="sm" variant="outline" className="flex items-center gap-2">
                    <FaEye size={14} />
                    View
                  </Button>
                  <Button size="sm" variant="destructive" className="flex items-center gap-2">
                    <FaTimes size={14} />
                    Reject
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">No job applications found.</p>
        )}
      </div>
    </div>
  );
}
