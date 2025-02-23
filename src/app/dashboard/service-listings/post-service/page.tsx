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
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useAppSelector } from "@/lib/hooks";
import { selectUserRoles } from "@/lib/features/authSelector";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const serviceSchema = z.object({
  title: z.string().min(1, "Service title is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  location: z.string().min(1, "Location is required"),
  price: z.string().optional(),
});

export default function PostServicePage() {
  const router = useRouter();
  const userRoles = useAppSelector(selectUserRoles);
  const isServiceProvider = userRoles.includes("serviceProvider");
  const editor = useRef(null);

  const form = useForm({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: "",
      category: "",
      description: "",
      location: "",
      price: "",
    },
  });

  const onSubmit = (data: z.infer<typeof serviceSchema>) => {
    console.log("Service Posted:", data);
    router.push("/dashboard/services"); // Redirect after posting
  };

  if (!isServiceProvider) {
    return (
      <div className="p-6 text-center text-gray-600">
        <h1 className="text-2xl font-semibold">Access Denied</h1>
        <p>You must have a Service Provider role to post a service.</p>
      </div>
    );
  }

  const [serviceDetails, setServiceDetails] = useState({
    description: "",
  });

  const handleDescriptionChange = (newDescription: string) => {
    setServiceDetails((prev) => ({ ...prev, description: newDescription }));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto mt-20">
      <Card className="p-6 shadow-lg overflow-auto max-h-[80vh]">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-pivotaTeal">
            Post a New Service
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-4 items-center">
                <label className="text-sm font-medium text-gray-700">Service Title *</label>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="Enter service title" required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 items-center">
                <label className="text-sm font-medium text-gray-700">Category *</label>
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Plumbing">Plumbing</SelectItem>
                          <SelectItem value="Electrician">Electrician</SelectItem>
                          <SelectItem value="Cleaning">Cleaning</SelectItem>
                          <SelectItem value="Carpentry">Carpentry</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description *</label>
                <JoditEditor
                  ref={editor}
                  value={serviceDetails.description}
                  config={{
                    readonly: false,
                    placeholder: "Describe your service...",
                    height: 300,
                  }}
                  onBlur={handleDescriptionChange}
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
                        <Input {...field} placeholder="Enter location" required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 items-center">
                <label className="text-sm font-medium text-gray-700">Price (Optional)</label>
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="Enter price (if applicable)" />
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
                  Post Service
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
