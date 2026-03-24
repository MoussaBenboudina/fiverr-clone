import { FormEvent, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/authContext";
import { ILoginUser } from "../../types";

const Login = () => {
  const { login } = useContext(AuthContext);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());
    login(user as unknown as ILoginUser);
  };

  // نفس ستايل الـ inputs في صفحة Register لضمان التناسق
  const inputStyle = `
    w-full bg-gray-800/40 border border-gray-700 text-sm text-white rounded-xl p-3 outline-none 
    focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all 
    placeholder:text-gray-500 autofill:bg-gray-800/40
  `;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#090b11] p-4 text-white font-sans">
      {/* الخلفية المضيئة (Background Decor) */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full"></div>
      </div>

      <div className="w-full max-w-md bg-[#111827]/60 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 shadow-2xl">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-gray-400 mt-2 text-sm italic">Log in to your Jobify account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
          {/* Username */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-white uppercase tracking-wider ml-1">
              Username
            </label>
            <input 
              name="username" 
              placeholder="Enter your username" 
              required 
              className={inputStyle} 
              style={{ backgroundColor: 'rgba(31, 41, 55, 0.4)' }}
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-[11px] font-bold text-white uppercase tracking-wider">
                Password
              </label>
              <Link to="/forgot-password" size-xs className="text-[10px] text-emerald-400 hover:underline uppercase">
                Forgot?
              </Link>
            </div>
            <input 
              name="password" 
              type="password" 
              placeholder="••••••••" 
              required 
              className={inputStyle}
              style={{ backgroundColor: 'rgba(31, 41, 55, 0.4)' }}
            />
          </div>

          {/* Login Button */}
          <div className="pt-2">
            <button 
              type="submit" 
              className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-[#090b11] font-extrabold rounded-xl shadow-lg transition-all active:scale-[0.98] uppercase tracking-widest text-sm"
            >
              Sign In
            </button>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500 mt-6">
            New to Jobify? 
            <Link to="/register" className="text-emerald-400 font-bold ml-2 hover:text-emerald-300 transition-colors">
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;