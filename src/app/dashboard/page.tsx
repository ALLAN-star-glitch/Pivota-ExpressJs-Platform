import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import JobSection from "@/components/portal/jobs/JobSection";
import PropertySection from "@/components/portal/property/PropertySection";
import ServiceSection from "@/components/portal/service/ServiceSection";
import ProfileSection from "@/components/portal/profile/ProfileSection";

const roleComponents: Record<string, React.FC> = {
  employer: JobSection,
  landlord: PropertySection,
  serviceProvider: ServiceSection,
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  
  console.log("User name", session?.user.name)
  console.log("Session", session)
  console.log("Session token", session?.token)

  if (!session) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
        <p>You must be logged in to access the dashboard.</p>
      </div>
    );
  }

  const userRoles: string[] = session.user.roles || [];

  return (
    <div className="p-6 flex flex-col lg:flex-row gap-6">
      {/* Left Column (Wider) */}
      <div className="lg:w-2/3 bg-white p-5">
        {/* Dynamically render role-based sections */}
        {userRoles.map((role) => {
          const Component = roleComponents[role];
          return Component ? <Component key={role} /> : null;
        })}

        {/* Profile section (Visible to all users) */}
        <ProfileSection />
      </div>

      {/* Right Column (Black Background) */}
      <div className="lg:w-1/3 bg-pivotaTeal min-h-screen"></div>
    </div>
  );
}
