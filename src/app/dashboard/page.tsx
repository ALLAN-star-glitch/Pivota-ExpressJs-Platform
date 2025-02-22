import NavBarDashboard from "@/components/dashboard/NavBarDashboard";
import DashboardContent from "@/components/dashboard/DashboardContent";
import Sidebar from "@/components/Sidebar";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-pivotaLightGray pt-16">

      <div className="flex bg-pivotaLightGray">
        

        <main className="flex-grow bg-pivotaLightGray flex flex-col p-6 space-y-6 ">
          <DashboardContent />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
