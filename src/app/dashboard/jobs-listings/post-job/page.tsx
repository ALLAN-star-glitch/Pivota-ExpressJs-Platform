"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppSelector } from "@/lib/hooks";
import { selectUserRoles } from "@/lib/features/authSelector";
import dynamic from "next/dynamic";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function PostJobPage() {
  const router = useRouter();
  const userRoles = useAppSelector(selectUserRoles);
  const isEmployer = userRoles.includes("employer");

  const editor = useRef(null);
  const [jobDetails, setJobDetails] = useState({
    title: "",
    description: "",
    location: "",
    type: "",
    salary: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setJobDetails({ ...jobDetails, [e.target.name]: e.target.value });
  };

  const handleDescriptionChange = (newDescription: string) => {
    setJobDetails((prev) => ({ ...prev, description: newDescription }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobDetails.title || !jobDetails.description || !jobDetails.type || !jobDetails.location) {
      alert("Please fill in all required fields.");
      return;
    }

    console.log("Job Posted:", jobDetails);
    router.push("/dashboard/jobs"); // Redirect after posting
  };

  if (!isEmployer) {
    return (
      <div className="p-6 text-center text-gray-600">
        <h1 className="text-2xl font-semibold">Access Denied</h1>
        <p>You must have an Employer role to post a job.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto mt-20">
      <Card className="p-6 shadow-lg overflow-auto max-h-[80vh]">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-pivotaTeal">
            Post a New Job
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Job Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Job Title *
              </label>
              <Input
                name="title"
                placeholder="Enter job title"
                value={jobDetails.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* Job Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Job Description *
              </label>
              <JoditEditor
                ref={editor}
                value={jobDetails.description}
                config={{
                  readonly: false,
                  placeholder: "Describe your listing...",
                }}
                onBlur={handleDescriptionChange} // Corrected onBlur to update state
              />
            </div>

            {/* Job Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Job Type *
              </label>
              <Select
                onValueChange={(value) =>
                  setJobDetails((prev) => ({ ...prev, type: value }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Remote">Remote</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location *
              </label>
              <Input
                name="location"
                placeholder="Job location (e.g., Remote, New York)"
                value={jobDetails.location}
                onChange={handleChange}
                required
              />
            </div>

            {/* Salary */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Salary (Optional)
              </label>
              <Input
                name="salary"
                type="number"
                placeholder="Enter salary (if applicable)"
                value={jobDetails.salary}
                onChange={handleChange}
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-4">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" className="bg-pivotaGold hover:bg-pivotaAqua">
                Post Job
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
