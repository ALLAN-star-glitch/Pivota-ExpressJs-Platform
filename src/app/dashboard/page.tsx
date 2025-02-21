import NavBarDashboard from "@/components/dashboard/NavBarDashboard";
import Menu from "@/components/common/Menu";
import DashboardContent from "@/components/dashboard/DashboardContent";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-pivotaLightGray pt-16">
      {/* TOP - Navbar */}
      <div>
        <NavBarDashboard />
      </div>

      {/* BOTTOM - Sidebar + Main Content */}
      <div className="flex bg-pivotaLightGray">
        {/* LEFT - Sidebar (Fixed) */}
        <div
          className="w-[15%] bg-white rounded-2xl shadow-xl mx-3 my-4 p-4 z-10 
          fixed top-[22%] left-0 h-auto"
        >
          <Menu />
        </div>

        {/* RIGHT - Main Content (Scrollable) */}
        <div className="w-[85%] bg-pivotaLightGray flex flex-col p-6 space-y-6 ml-[15%]">
          <DashboardContent />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
