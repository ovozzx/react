import { Outlet } from "react-router-dom";
import Navigation from "../../navigation/Navigation";

export default function MainLayout() {
  return (
    <div className="main-container">
      <Navigation />
      <Outlet />
    </div>
  );
}
