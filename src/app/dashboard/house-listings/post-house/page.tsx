"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useAppSelector } from "@/lib/hooks";
import { selectUserRoles } from "@/lib/features/authSelector";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { XCircle } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const houseSchema = z.object({
  title: z.string().min(1, "House title is required"),
  location: z.string().min(1, "Location is required"),
  price: z.string().min(1, "Price is required"),
  type: z.string().min(1, "Type is required"),
  category: z.enum(["rental", "sale"]),
  chargePeriod: z.enum(["monthly", "yearly", "one-time"]).optional(),
  description: z.string().min(1, "Description is required"),
  images: z.array(
    z.object({
      url: z.string().min(1, "Image URL is required"),
      description: z.string().optional(),
    })
  ).optional(),
  chargeAmount: z.string().optional(),
  depositAmount: z.string().optional(),
  houseCondition: z.string().min(1, "House condition is required"),
  numberOfRooms: z.string().min(1, "Number of rooms is required"),
  numberofBathrooms: z.string().min(1, "Number of bathrooms is required"),
});

export default function PostHousePage() {
  const router = useRouter();
  const userRoles = useAppSelector(selectUserRoles);
  const isLandlord = userRoles.includes("landlord");
  const editor = useRef(null);

  const form = useForm<z.infer<typeof houseSchema>>({
  resolver: zodResolver(houseSchema),
  defaultValues: {
    title: "",
    location: "",
    price: "",
    description: "",
    images: [],
    type: "",
    category: "rental" as "rental" | "sale", // Explicitly casting
    chargePeriod: "monthly" as "monthly" | "yearly" | "one-time", // Explicitly casting
    chargeAmount: "",
    depositAmount: "",
    houseCondition: "",
    numberOfRooms: "",
    numberofBathrooms: ""
  },
});


  const [images, setImages] = useState<{ url: string; description: string }[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
  
    const newImages = Array.from(files).map((file) => ({
      url: URL.createObjectURL(file),
      description: "",
    }));
  
    // Prevent duplicate images
    const filteredImages = newImages.filter(
      (newImg) => !images.some((img) => img.url === newImg.url)
    );
  
    if (images.length + filteredImages.length > 6) {
      toast.warn("You can only upload upto 6 images")
      return;
    }
  
    setImages((prev) => [...prev, ...filteredImages]);
  
    // Focus on the first empty description field
    setTimeout(() => {
      const descInputs = document.querySelectorAll(".image-description");
      if (descInputs.length > 0) {
        (descInputs[descInputs.length - filteredImages.length] as HTMLInputElement)?.focus();
      }
    }, 100);
  
    e.target.value = "";
  };
  
  

  const handleImageDescriptionChange = (index: number, desc: string) => {
    setImages((prev) => {
      const newImages = [...prev];
      newImages[index].description = desc;
      return newImages;
    });
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveAllImages = () => {
    setImages([]);
  };

  const onSubmit = (data: z.infer<typeof houseSchema>) => {
    if (images.some((img) => !img.description.trim())) {
      alert("Please provide a description for all images.");
  
      // Highlight missing descriptions
     setTimeout(() => {
  const descInputs = document.querySelectorAll(".image-description");

  descInputs.forEach((input) => {
    const inputElement = input as HTMLInputElement; // ✅ Correctly cast the element
    if (!inputElement.value.trim()) {
      inputElement.classList.add("border-red-500");
      inputElement.focus(); // ✅ No more TypeScript error
    } else {
      inputElement.classList.remove("border-red-500");
    }
  });
}, 100);

  
      return;
    }
  
    console.log("House Posted:", { ...data, images });
    router.push("/dashboard/houses");
  };
  

  if (!isLandlord) {
    return (
      <div className="p-6 text-center text-gray-600">
        <h1 className="text-2xl font-semibold">Access Denied</h1>
        <p>You must have a Landlord role to post a house.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto mt-20">
      <Card className="p-6 shadow-xl rounded-2xl border border-gray-200 bg-white overflow-auto max-h-[80vh]">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-pivotaTeal font-bold">
            Post a New House
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 items-center">
                <FormField control={form.control} name="title" render={({ field }) => (
                  <FormItem className="flex items-center gap-4">
                    <label className="text-sm font-medium text-gray-700 w-1/3">House Title *</label>
                    <FormControl className="w-2/3">
                      <Input {...field} placeholder="Enter house title" required className="rounded-lg border-gray-300 focus:ring-pivotaTeal" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="location" render={({ field }) => (
                  <FormItem className="flex items-center gap-4">
                    <label className="text-sm font-medium text-gray-700 w-1/3">Location *</label>
                    <FormControl className="w-2/3">
                      <Input {...field} placeholder="Enter location" required className="rounded-lg border-gray-300 focus:ring-pivotaTeal" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <div className="grid grid-cols-1 gap-6 items-center">
                <FormField control={form.control} name="category" render={({ field }) => (
                  <FormItem className="flex items-center gap-4">
                    <label className="text-sm font-medium text-gray-700 w-1/3">Category *</label>
                    <FormControl className="w-2/3">
                      <Select {...field} onValueChange={(value) => field.onChange(value as "rental" | "sale")}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rental">Rental</SelectItem>
                          <SelectItem value="sale">For Sale</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <div className="grid grid-cols-2 gap-6 items-center">
                <FormField control={form.control} name="type" render={({ field }) => (
                  <FormItem className="flex items-center gap-4">
                    <label className="text-sm font-medium text-gray-700 w-1/3">House Type *</label>
                    <FormControl className="w-2/3">
                      <Input {...field} placeholder="e.g., Bedsitter, 2 Bedroom" required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <FormField control={form.control} name="depositAmount" render={({ field }) => (
                <FormItem>
                  <label className="text-sm font-medium text-gray-700">Deposit Amount (KSH) *</label>
                  <FormControl>
                    <Input {...field} placeholder="Enter deposit amount" required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="houseCondition" render={({ field }) => (
                <FormItem>
                  <label className="text-sm font-medium text-gray-700">House Condition *</label>
                  <FormControl>
                    <Input {...field} placeholder="Enter house condition" required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="numberOfRooms" render={({ field }) => (
                <FormItem>
                  <label className="text-sm font-medium text-gray-700">Number of Rooms *</label>
                  <FormControl>
                    <Input {...field} placeholder="Enter number of rooms" required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="numberofBathrooms" render={({ field }) => (
                <FormItem>
                  <label className="text-sm font-medium text-gray-700">Number of Bathrooms *</label>
                  <FormControl>
                    <Input {...field} placeholder="Enter number of bathrooms" required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
             
              

              <div className="grid grid-cols-1 gap-6 items-center">
                <FormField control={form.control} name="chargeAmount" render={({ field }) => (
                  <FormItem className="flex items-center gap-4">
                    <label className="text-sm font-medium text-gray-700 w-1/3">Charge Amount *</label>
                    <FormControl className="w-2/3">
                      <Input {...field} placeholder="Enter charge amount" required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <div className="grid grid-cols-1 gap-6 items-center">
                <FormField control={form.control} name="chargePeriod" render={({ field }) => (
                  <FormItem className="flex items-center gap-4">
                    <label className="text-sm font-medium text-gray-700 w-1/3">Charge Period *</label>
                    <FormControl className="w-2/3">
                      <Select {...field}  onValueChange={(value) => field.onChange(value as "monthly" | "yearly" | "one-time")}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="yearly">Yearly</SelectItem>
                          <SelectItem value="one-time">One-time Payment</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">House Description *</label>
                <JoditEditor
                  ref={editor}
                  value={form.getValues("description")}
                  config={{
                     readonly: false,
                     placeholder: "Describe the house...",
                     height: 300
                     }}
                  onBlur={(newContent) => form.setValue("description", newContent)}
                  className="border border-gray-300 rounded-lg"
                />
              </div>

              <div>
              <label className="text-sm font-medium text-gray-700">House Images (Max: 6)</label>
                <div className="grid gap-4 mt-4">
                  {images.map((img, index) => (
                    <div key={index} className="flex flex-col sm:flex-row relative items-center gap-4 border p-2 rounded-lg shadow">
                      <Image src={img.url} alt="House" height={80} width={80} className="object-cover rounded-lg border" />
                      <Input
                        placeholder="E.g., Sitting Room, ..."
                        value={img.description}
                        onChange={(e) => handleImageDescriptionChange(index, e.target.value)}
                        className="image-description rounded-lg border-gray-300 focus:ring-pivotaTeal"
                      />
                      <XCircle
                        className="absolute top-0 right-0 text-red-500 cursor-pointer hover:scale-110"
                        size={20}
                        onClick={() => handleRemoveImage(index)}
                      />
                    </div>
                  ))}
                  <p className="text-sm text-gray-600 mt-2">Please provide a brief description for each image.</p>
                </div>
                {images.length >= 6 && (
                  <p className="text-red-500 text-sm mt-2">You can only upload up to 6 images.</p>
                )}
                <Button type="button" onClick={() => document.getElementById('imageInput')?.click()} className="mt-4 bg-pivotaTeal text-white rounded-lg shadow">Add Image</Button>
                {images.length > 1 && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={handleRemoveAllImages}
                    className="mt-4 ml-2"
                  >
                    Remove All
                  </Button>
                )}

                <input id="imageInput" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </div>

              <Button type="submit" className="bg-pivotaGold text-black hover:bg-pivotaAqua rounded-lg shadow">Post House</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <ToastContainer/>
    </div>
  );
}