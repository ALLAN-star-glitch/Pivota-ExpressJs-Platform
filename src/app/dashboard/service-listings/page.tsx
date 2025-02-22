"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FaPlus, FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import { useAppSelector } from "@/lib/hooks";
import { selectUserRoles } from "@/lib/features/authSelector";
import { usePathname, useRouter } from "next/navigation";
import LoadingBar from "@/components/common/LoadingBar";

const serviceListings = [
  {
    id: 1,
    title: "Plumbing Repair",
    category: "Home Services",
    location: "Los Angeles, USA",
    status: "Active",
  },
  {
    id: 2,
    title: "Graphic Design",
    category: "Creative Services",
    location: "Remote",
    status: "Pending",
  },
];

export default function ServiceProviderDashboard() {
  const [search, setSearch] = useState("");
  const userRoles = useAppSelector(selectUserRoles);
  const isServiceProvider = userRoles.includes("serviceProvider");
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(false);
  }, []);

  if (!isServiceProvider) {
    return (
      <div className="p-6 text-center text-gray-600">
        <h1 className="text-2xl font-semibold">Access Denied</h1>
        <p>You must have a Service Provider role to manage service listings.</p>
      </div>
    );
  }

  const filteredServices = serviceListings.filter((service) =>
    service.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 mt-20">
      {<LoadingBar isLoading={isLoading} />}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-pivotaTeal">Manage Service Listings</h1>
        <Button
          onClick={() => {
            if (pathname === "/dashboard/service-listings/post-service") {
              setLoading(false);
              return;
            }
            setLoading(true);
            router.push("/dashboard/service-listings/post-service");
          }}
          className="flex items-center gap-2 bg-pivotaGold hover:bg-pivotaAqua text-black"
        >
          <FaPlus size={16} />
          Post a Service
        </Button>
      </div>
      <div className="flex items-center gap-4 mb-6">
        <div className="relative w-full max-w-md">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <Input
            type="text"
            placeholder="Search services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <Card key={service.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <span className="text-gray-600">{service.category}</span>
                <span className="text-sm text-gray-500">{service.location}</span>
                <Badge variant="outline" className="w-fit">{service.status}</Badge>
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
          <p className="text-gray-500 text-center col-span-full">No services found.</p>
        )}
      </div>
    </div>
  );
}
