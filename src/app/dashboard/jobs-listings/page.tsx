"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FaPlus, FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import { useAppSelector } from "@/lib/hooks";
import { selectUserRoles } from "@/lib/features/authSelector";
import { usePathname, useRouter } from "next/navigation";
import LoadingBar from "@/components/common/LoadingBar";

const jobListings = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Tech Solutions Inc.",
    location: "Remote",
    type: "Full-time",
    posted: "2 days ago",
  },
  {
    id: 2,
    title: "Marketing Manager",
    company: "Creative Minds",
    location: "New York, USA",
    type: "Part-time",
    posted: "5 days ago",
  },
  {
    id: 3,
    title: "Backend Developer",
    company: "Code Masters",
    location: "San Francisco, USA",
    type: "Full-time",
    posted: "1 week ago",
  },
  {
    id: 4,
    title: "UI/UX Designer",
    company: "Design Hub",
    location: "Berlin, Germany",
    type: "Contract",
    posted: "3 days ago",
  },
  {
    id: 5,
    title: "Data Analyst",
    company: "Data Insights",
    location: "Toronto, Canada",
    type: "Full-time",
    posted: "2 weeks ago",
  },
  {
    id: 6,
    title: "Product Manager",
    company: "Innovatech",
    location: "London, UK",
    type: "Part-time",
    posted: "4 days ago",
  },
];

export default function EmployerJobDashboard() {
  const [search, setSearch] = useState("");
  const userRoles = useAppSelector(selectUserRoles);
  const isEmployer = userRoles.includes("employer");
  const router = useRouter();
  const [mounted, setMountend] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const pathname = usePathname(); // Get the current path

  useEffect(() => {
    setMountend(true);
  }, []);

  if (!isEmployer) {
    return (
      <div className="p-6 text-center text-gray-600">
        <h1 className="text-2xl font-semibold">Access Denied</h1>
        <p>You must have an Employer role to manage job listings.</p>
      </div>
    );
  }

  const filteredJobs = jobListings.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 mt-20"> {/* Added margin for navbar spacing */}
      {/* Loading Bar */}
      {<LoadingBar isLoading={isLoading} />}
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-pivotaTeal">Manage Job Listings</h1>
        <Button 
          onClick={() => {
            if (pathname === "/dashboard/jobs-listings/post-job") {
              setLoading(false);
              return;
            }
            setLoading(true); // Show Loading Bar
            router.push("/dashboard/jobs-listings/post-job")
          }} 
          className="flex items-center gap-2 bg-pivotaGold hover:bg-pivotaAqua text-black"
        >
          <FaPlus size={16} />
          Post a Job
        </Button>
      </div>
      {/* Search Bar */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative w-full max-w-md">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <Input
            type="text"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      {/* Job Listings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">{job.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <span className="text-gray-600">{job.company}</span>
                <span className="text-sm text-gray-500">{job.location}</span>
                <Badge variant="outline" className="w-fit">{job.type}</Badge>
                <span className="text-xs text-gray-400">{job.posted}</span>
                {/* Action Buttons */}
                <div className="flex justify-between mt-3">
                  <Button size="sm" variant="outline" className="flex items-center gap-2">
                    <FaEdit size={14} />
                    Edit
                  </Button>
                  <Button size="sm" variant="destructive" className="flex items-center gap-2">
                    <FaTrash size={14} />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">No jobs found.</p>
        )}
      </div>
    </div>
  );
}
