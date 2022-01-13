import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider/useAuth";

export const ProtectedLayout = ({ children }: { children: JSX.Element }) => { // The children inside this is the component that was requested to be rendered.
  const auth = useAuth();                                                     // It will only be rendered if the conditional statement is true.
  let location = useLocation();
  
  if(!auth.email) {
    return <Navigate to="/login" state={{ from: location }} replace />; // Breaks here and return the login page if have not user logged in
  }

  return children;
};