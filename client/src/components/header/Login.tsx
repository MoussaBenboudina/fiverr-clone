import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";

const Login = () => {
  return (
    <div className="flex items-center gap-8 font-bold text-[14px]">
      {/* Sign In - Clean White with Green Hover */}
      <Link
        to="/login"
        className="text-white hover:text-emerald-400 transition-all duration-300 flex items-center gap-2 group relative py-1"
      >
        <span>Sign In</span>
        {/* خط سفلي أخضر ناعم */}
        <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-emerald-500 transition-all duration-300 group-hover:w-full"></span>
      </Link>

      {/* Join Button - The "Emerald Glow" Style */}
      <Link
        to="/register"
        className="relative group px-7 py-2.5 flex items-center gap-2 overflow-hidden rounded-full 
                   bg-emerald-500 text-[#020617] transition-all duration-500 
                   hover:bg-emerald-400 hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] 
                   active:scale-95 border border-emerald-400/20"
      >
        {/* طبقة داخلية تعطي إحساس بالعمق */}
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <span className="relative z-10 font-extrabold uppercase tracking-tight">
          Join Now
        </span>
        
        <div className="relative z-10 bg-[#020617]/10 p-1 rounded-full group-hover:bg-[#020617]/20 transition-colors">
          <FiArrowUpRight className="text-lg transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>

        {/* تأثير اللمعة السريع (Shimmer) */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
      </Link>
    </div>
  );
};

export default Login;