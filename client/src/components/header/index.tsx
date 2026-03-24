import { Link, useLocation } from "react-router-dom";
import User from "./user";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/authContext";
import Links from "./links";
import Login from "./Login";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getHeaderStyles = () => {
    if (!isHomePage) {
      return "bg-[#020617] border-b border-white/10 shadow-lg";
    }
    
    return isScrolled 
      ? "bg-[#020617]/70 backdrop-blur-xl border-b border-white/10 shadow-lg"
      : "bg-transparent border-b border-transparent";
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 h-24 flex items-center ${getHeaderStyles()}`}
    >
      <div className="max-w-[1400px] mx-auto w-full relative flex justify-between items-center px-10 md:px-20">
        
        {/* Logo */}
        <div className="flex-shrink-0 z-10">
          <Link to="/" className="flex items-center">
            <div className="text-3xl font-black tracking-tighter text-white hover:text-emerald-500 transition-colors">
              JOB<span className="text-emerald-500">IFY</span>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center justify-center">
          <Links />
        </div>

        {/* Auth Section */}
        <div className="flex items-center gap-4 z-10">
          {/* تم إزالة كلاس group من هنا لضمان استقلالية أزرار Login */}
          <div className="flex items-center gap-2 relative">
            {user ? (
              <User data={user} logout={logout} />
            ) : (
              <Login />
            )}
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;