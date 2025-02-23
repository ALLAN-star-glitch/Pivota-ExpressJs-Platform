"use client";

import { useRef } from "react";
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
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useAppSelector } from "@/lib/hooks";
import { selectUserRoles } from "@/lib/features/authSelector";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const jobSchema = z.object({
  title: z.string().min(1, "Job title is required"),
  employmentType: z.string().min(1, "Employment type is required"),
  description: z.string().min(1, "Job description is required"),
  location: z.string().min(1, "Location is required"),
  type: z.string().min(1, "Job type is required"),
  category: z.string().min(1, "Job category is required"),
  salaryType: z.string().min(1, "Salary type is required"),
  salary: z.string().optional(),
  experience: z.string().min(1, "Experience level is required"),
});

export default function PostJobPage() {
  const router = useRouter();
  const userRoles = useAppSelector(selectUserRoles);
  const isEmployer = userRoles.includes("employer");
  const editor = useRef(null);

  const form = useForm({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: "",
      employmentType: "",
      description: "",
      location: "",
      type: "",
      category: "",
      salaryType: "",
      salary: "",
      experience: "",
    },
  });

  const onSubmit = (data: z.infer<typeof jobSchema>) => {
    console.log("Job Posted:", data);
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-4 items-center">
                <label className="text-sm font-medium text-gray-700">Job Title *</label>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="Enter job title" required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 items-center">
                <label className="text-sm font-medium text-gray-700">Employment Type *</label>
                <FormField
                  control={form.control}
                  name="employmentType"
                  render={({ field }) => (
                    <FormItem>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select employment type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Casual">Casual</SelectItem>
                          <SelectItem value="Part-time">Part-time</SelectItem>
                          <SelectItem value="Full-time">Full-time</SelectItem>
                          <SelectItem value="Contract">Contract</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Job Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Job Description *
                </label>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <JoditEditor
                        ref={editor}
                        value={field.value}
                        config={{
                          readonly: false,
                          placeholder: "Describe your listing...",
                          height: 300,
                        }}
                        onBlur={(newDescription) => field.onChange(newDescription)}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 items-center">
                <label className="text-sm font-medium text-gray-700">Location *</label>
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="Enter job location" required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 items-center">
                <label className="text-sm font-medium text-gray-700">Experience Level *</label>
                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Entry Level">Entry Level</SelectItem>
                          <SelectItem value="Mid Level">Mid Level</SelectItem>
                          <SelectItem value="Senior Level">Senior Level</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 items-center">
                <label className="text-sm font-medium text-gray-700">Salary Type *</label>
                <FormField
                  control={form.control}
                  name="salaryType"
                  render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select salary type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Monthly">Monthly</SelectItem>
                          <SelectItem value="Wage">Wage</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 items-center">
                <label className="text-sm font-medium text-gray-700">Salary (Optional)</label>
                <FormField
                  control={form.control}
                  name="salary"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="Enter salary amount" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>



              <div className="flex justify-between mt-4">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-pivotaGold hover:bg-pivotaAqua">
                  Post Job
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
