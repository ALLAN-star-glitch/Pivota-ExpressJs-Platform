import { useSelector } from "react-redux";
import NavBarDashboardClient from "./NavBarDashboardClient"; // New client-side component
import { RootState } from "@/lib/store";

const NavBarDashboard = () => {

  const{firstName, plan} = useSelector(
    (state: RootState) => state.auth
  )

  console.log("Plan from Redux Store", plan)
  
 

  return (
    <div className="flex justify-between items-center py-4 pr-3 h-20 px-4 bg-pivotaWhite">
      {/* Pass session to the client-side component */}
      <NavBarDashboardClient firstName={firstName} plan={plan} />
    </div>
  );
};

export default NavBarDashboard;
