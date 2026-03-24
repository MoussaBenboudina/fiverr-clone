import { useEffect, useState } from "react";
import { IFormUser, ILoginUser, IUser } from "../types";
import api from "../api";
import AuthContext from "./authContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<IUser | null>(null);
  const navigate = useNavigate();

  // 1. تتبع التحقق من التوكن عند تشغيل التطبيق
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("🔄 [INIT] Checking token in LocalStorage:", token ? "Found" : "Not Found");

    if (!token) {
      setIsLoading(false);
      return;
    }

    console.log("📡 [INIT] Fetching user profile...");
    api.get("/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("✅ [INIT] Profile fetched successfully:", res.data.user?.username);
        setUser(res.data.user);
      })
      .catch((err) => {
        console.error("❌ [INIT] Profile fetch failed:", err.response?.data || err.message);
        localStorage.removeItem("token");
      })
      .finally(() => setIsLoading(false));
  }, []);

  // 2. تتبع عملية التسجيل
  const register = (user: IFormUser) => {
    console.log("📡 [REGISTER] Sending data to API...");
    api.post("/auth/register", user, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log("✅ [REGISTER] Success:", res.data);
        toast.info("Registered successfully");
        navigate("/login");
      })
      .catch((err) => {
        console.error("❌ [REGISTER] Failed:", err.response?.data || err.message);
        toast.error(err.response?.data?.message || "Registration failed");
      });
  };

  // 3. تتبع عملية تسجيل الدخول (نقطة الخلل الحالية)
  const login = (userData: ILoginUser) => {
    console.log("🚀 [LOGIN] 1. Login function triggered");
    console.log("🚀 [LOGIN] 2. Attempting POST to /auth/login with:", { username: userData.username });
    
    setIsLoading(true);

    api.post("/auth/login", userData)
      .then((res) => {
        console.log("✅ [LOGIN] 3. Server Responded Successfully!");
        console.log("✅ [LOGIN] 4. User Data:", res.data.user);
        
        setUser(res.data.user);
        localStorage.setItem("token", res.data.token);
        toast.success("Login successfully");
        navigate("/");
      })
      .catch((err) => {
        console.log("🔴 [LOGIN] 3. Error caught in Axios catch block");
        
        // تفصيل الخطأ لمعرفة هل هو CORS أم لا
        if (!err.response) {
          console.error("🚨 [NETWORK ERROR]: No response from server. This is likely a CORS issue or the server is down.");
          console.error("Check if the URL is correct:", api.defaults.baseURL);
        } else {
          console.error(`⚠️ [SERVER ERROR]: Status ${err.response.status}`);
          console.error("Data:", err.response.data);
        }
        
        toast.error(err.response?.data?.message || "Login failed");
      })
      .finally(() => {
        console.log("🏁 [LOGIN] 5. Login process finished (Loading: false)");
        setIsLoading(false);
      });
  };

  // 4. تتبع تسجيل الخروج
  const logout = () => {
    console.log("🚪 [LOGOUT] Triggered");
    api.post("/auth/logout")
      .then(() => {
        console.log("✅ [LOGOUT] Success");
        setUser(null);
        localStorage.removeItem("token");
        toast.info("Logout successfully");
        navigate("/login");
      })
      .catch((err) => console.error("❌ [LOGOUT] Error:", err));
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};