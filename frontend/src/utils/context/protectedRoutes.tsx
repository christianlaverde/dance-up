import { Navigate } from "react-router";
import { useAuth } from "./appContext";
import { ReactNode } from "react";

interface ProtectedRouteProps {
    children: ReactNode;
  }

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    // const { user }: null | object = useAuth();
    console.log(useAuth());
    const { user } = useAuth() || {};


    return user ? children : <Navigate to="/dashboard/signin" replace/>;
}

export default ProtectedRoute;