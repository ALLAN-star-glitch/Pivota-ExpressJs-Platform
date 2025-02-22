// "use client";

// import { useState, useRef } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { useRouter } from "next/navigation";
// import dynamic from "next/dynamic";

// const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

// export default function PostService() {
//   const router = useRouter();
//   const editor = useRef(null);
//   const [service, setService] = useState({
//     title: "",
//     category: "",
//     price: "",
//     description: "",
//     image: null as File | null,
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setService((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setService((prev) => ({ ...prev, image: e.target.files[0] }));
//     }
//   };

//   const handleEditorChange = (content: string) => {
//     setService((prev) => ({ ...prev, description: content }));
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     console.log("Service Submitted", service);
//     router.push("/dashboard/service-listings");
//   };

//   return (
//     <div className="p-6 max-w-2xl mx-auto">
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-xl">Post a New Service</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <Label>Service Title</Label>
//               <Input
//                 type="text"
//                 name="title"
//                 value={service.title}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div>
//               <Label>Category</Label>
//               <Input
//                 type="text"
//                 name="category"
//                 value={service.category}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div>
//               <Label>Price</Label>
//               <Input
//                 type="text"
//                 name="price"
//                 value={service.price}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div>
//               <Label>Description</Label>
//               <JoditEditor
//                 ref={editor}
//                 value={service.description}
//                 onChange={handleEditorChange}
//               />
//             </div>
//             <div>
//               <Label>Upload Image</Label>
//               <Input type="file" accept="image/*" onChange={handleImageChange} />
//             </div>
//             <Button type="submit" className="w-full bg-pivotaAqua hover:bg-pivotaGold">
//               Post Service
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
