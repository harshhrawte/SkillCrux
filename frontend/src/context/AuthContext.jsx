import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
  } from "react";
  import api from "../api/api";
  
  const AuthContext = createContext(null);
  
  export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
    // ------------------------------
    // INITIAL HYDRATION
    // ------------------------------
    useEffect(() => {
      const storedUser = localStorage.getItem("user");
      const accessToken = localStorage.getItem("accessToken");
  
      if (storedUser && accessToken) {
        try {
          setUser(JSON.parse(storedUser));
        } catch {
          // Corrupted localStorage cleanup
          localStorage.removeItem("user");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
        }
      }
  
      setLoading(false);
    }, []);
  
    // ------------------------------
    // HANDLE SUCCESSFUL AUTH
    // ------------------------------
    const handleAuthSuccess = useCallback((data) => {
      const authUser = data.user;
  
      setUser(authUser);
      localStorage.setItem("user", JSON.stringify(authUser));
  
      if (data.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
      }
      if (data.refreshToken) {
        localStorage.setItem("refreshToken", data.refreshToken);
      }
    }, []);
  
    // ------------------------------
    // LOGIN
    // ------------------------------
    const login = useCallback(
      async (email, password) => {
        const { data } = await api.post("/auth/login", { email, password });
        handleAuthSuccess(data);
        return data;
      },
      [handleAuthSuccess]
    );
  
    // ------------------------------
    // SIGNUP
    // ------------------------------
    const signup = useCallback(
      async (name, email, password, role = "student") => {
        const { data } = await api.post("/auth/register", {
          name,
          email,
          password,
          role,
        });
        handleAuthSuccess(data);
        return data;
      },
      [handleAuthSuccess]
    );
  
    // ------------------------------
    // LOGOUT
    // ------------------------------
    const logout = useCallback(() => {
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
  
      // Optional: redirect immediately
      window.location.href = "/login";
    }, []);
  
    // ------------------------------
    // AUTO REFRESH TOKEN LOOP
    // ------------------------------
    useEffect(() => {
      const interval = setInterval(async () => {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) return;
  
        try {
          const { data } = await api.post("/auth/refresh", { refreshToken });
  
          if (data.accessToken) {
            localStorage.setItem("accessToken", data.accessToken);
          } else {
            logout();
          }
        } catch (err) {
          console.error("Token refresh failed:", err);
          logout();
        }
      }, 5 * 60 * 1000); // every 5 minutes
  
      return () => clearInterval(interval);
    }, [logout]);
  
    // ------------------------------
    // CONTEXT VALUE
    // ------------------------------
    const value = {
      user,
      loading,
      isAuthenticated: !!user,
      login,
      signup,
      logout,
    };
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  };
  
  export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) {
      throw new Error("useAuth must be used within AuthProvider");
    }
    return ctx;
  };
  


