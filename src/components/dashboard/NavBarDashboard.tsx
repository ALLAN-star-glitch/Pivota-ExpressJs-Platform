import NavBarDashboardClient from "./NavBarDashboardClient"; // New client-side component


const NavBarDashboard = () => {

 

  return (
    <div className="flex justify-between items-center py-4 pr-3 h-20 px-4 bg-pivotaWhite">
      {/* Pass session to the client-side component */}
      <NavBarDashboardClient/>
    </div>
  );
};

export default NavBarDashboard;
