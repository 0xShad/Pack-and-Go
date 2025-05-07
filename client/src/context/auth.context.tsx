import { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  token: string | null; // Add token to context
  setToken: React.Dispatch<React.SetStateAction<string | null>>; // Function to set token
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {}, // empty function default
  token: null,
  setToken: () => {}, // empty function default
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);

  // Retrieve token and authentication status from localStorage when app loads
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedIsAuthenticated = localStorage.getItem("isAuthenticated");

    if (storedToken && storedIsAuthenticated === "true") {
      setToken(storedToken);
      setIsAuthenticated(true);
    }
  }, []);

  // Sync `token` and `isAuthenticated` with localStorage when they change
  useEffect(() => {
    if (token) {
      localStorage.setItem("authToken", token);
    } else {
      localStorage.removeItem("authToken");
    }

    if (isAuthenticated) {
      localStorage.setItem("isAuthenticated", "true");
    } else {
      localStorage.removeItem("isAuthenticated");
    }
  }, [token, isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
