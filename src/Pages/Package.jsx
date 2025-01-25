import { Outlet } from "react-router-dom";

function Package() {
  // bg-gradient-to-br from-background to-primary
  return (
    <div className="min-h-screen ">
      {/* Content Outlet */}
      <div className="border border-neutral-light/30">
        <Outlet />
      </div>
    </div>
  );
}

export default Package;
