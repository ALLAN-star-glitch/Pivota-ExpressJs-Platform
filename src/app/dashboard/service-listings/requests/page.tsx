"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/lib/hooks";
import { selectUserRoles } from "@/lib/features/authSelector";

interface ServiceRequest {
  id: string;
  user: string;
  serviceType: string;
  description: string;
  status: "pending" | "accepted" | "rejected";
}

export default function ServiceRequestsPage() {
  const userRoles = useAppSelector(selectUserRoles);
  const isServiceProvider = userRoles.includes("serviceProvider");
  const [requests, setRequests] = useState<ServiceRequest[]>([]);

  useEffect(() => {
    // Fetch service requests (Replace with actual API call)
    setRequests([
      {
        id: "1",
        user: "John Doe",
        serviceType: "Plumbing",
        description: "Fix leaking pipes in the kitchen",
        status: "pending",
      },
      {
        id: "2",
        user: "Jane Smith",
        serviceType: "Electrical Repair",
        description: "Repair faulty wiring in the living room",
        status: "pending",
      },
    ]);
  }, []);

  const handleAcceptRequest = (id: string) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: "accepted" } : req))
    );
  };

  const handleRejectRequest = (id: string) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: "rejected" } : req))
    );
  };

  if (!isServiceProvider) {
    return (
      <div className="p-6 text-center text-gray-600">
        <h1 className="text-2xl font-semibold">Access Denied</h1>
        <p>You must have a Service Provider role to view service requests.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto mt-20">
      <Card className="p-6 shadow-xl rounded-2xl border border-gray-200 bg-white">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-pivotaTeal font-bold">
            Service Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          {requests.length === 0 ? (
            <p className="text-center text-gray-500">No service requests available.</p>
          ) : (
            <div className="space-y-4">
              {requests.map((request) => (
                <div
                  key={request.id}
                  className="p-4 border rounded-lg shadow-md bg-gray-50"
                >
                  <h3 className="font-semibold">{request.serviceType}</h3>
                  <p className="text-gray-600">Requested by: {request.user}</p>
                  <p className="text-gray-700">{request.description}</p>
                  <div className="mt-3 space-x-2">
                    {request.status === "pending" && (
                      <>
                        <Button
                          className="bg-green-500 text-white"
                          onClick={() => handleAcceptRequest(request.id)}
                        >
                          Accept
                        </Button>
                        <Button
                          className="bg-red-500 text-white"
                          onClick={() => handleRejectRequest(request.id)}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                    {request.status === "accepted" && (
                      <span className="text-green-600 font-medium">Accepted</span>
                    )}
                    {request.status === "rejected" && (
                      <span className="text-red-600 font-medium">Rejected</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
