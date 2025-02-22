import NavBarDashboard from "@/components/dashboard/NavBarDashboard";
import DashboardContent from "@/components/dashboard/DashboardContent";
import Sidebar from "@/components/Sidebar";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-pivotaLightGray pt-16">
      <NavBarDashboard />

      <div className="flex bg-pivotaLightGray">
        <Sidebar /> {/* Sidebar now handled in a client component */}

        <main className="flex-grow bg-pivotaLightGray flex flex-col p-6 space-y-6 lg:ml-[15%]">
          <DashboardContent />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
