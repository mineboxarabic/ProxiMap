import React, { createContext, useState, ReactNode, useContext } from "react";
import User, { UserInterface } from "../Classes/User";

interface AuthInterface {
  user: User | null;
  accessToken: string;
}

// Define the shape of the context data including the setAuth function
interface AuthContextType {
  auth: AuthInterface;
  setAuth: React.Dispatch<React.SetStateAction<AuthInterface>>;
}

// Provide a default state for context
const defaultAuthContext: AuthContextType = {
  auth: { user: null, accessToken: '' },
  setAuth: () => {}, // This will be overridden by the useState hook in AuthProvider
};

// Create the context with the default value
const AuthContext = createContext<AuthContextType>(defaultAuthContext);

// AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}




export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<AuthInterface>(defaultAuthContext.auth);

  // The value passed to AuthContext.Provider includes both auth state and setAuth function
  const value = { auth, setAuth };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Export the AuthContext and a useAuth hook for easier consumption
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
