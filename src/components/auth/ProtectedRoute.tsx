import { ReactNode } from "react";

// Authentication removed: allow access to all routes
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default ProtectedRoute;
