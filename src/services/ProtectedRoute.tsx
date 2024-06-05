import { useContext, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

interface ProtectedRouteProps { children: ReactNode}

export const ProtectedRoute = ({children}: ProtectedRouteProps) => {

    const { isAuthenticated} = useContext(AuthContext);

    if(!isAuthenticated) {

    return <Navigate to="/" />;

} 

return children;

}
