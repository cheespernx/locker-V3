import { Navigate, useLocation } from "react-router-dom";
import { getUserLocalStorage } from '../../context/AuthProvider/util';

export const ProtectedLayout = ({ children }: { children: JSX.Element }) => { // The children inside this is the component that was requested to be rendered.

  let location = useLocation();
  
  const userLogged = getUserLocalStorage();

  if(!userLogged) {
    return <Navigate to="/login" state={{ from: location }} replace />; // Breaks here and return the login page if have not user logged in
  }

  return children;
};