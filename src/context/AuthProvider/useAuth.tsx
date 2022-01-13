import { useContext } from "react"
import { AuthContext } from "."

export const useAuth = () => { // Export the AuthContext
  const context = useContext(AuthContext)

  return context;
}