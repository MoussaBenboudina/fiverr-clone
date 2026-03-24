import { Link } from "react-router-dom";
import { IUser } from "../../types";
import { FiGrid, FiPlusCircle, FiPackage, FiMessageCircle, FiLogOut, FiChevronDown, FiUser, FiArrowRight } from "react-icons/fi";

type Props = {
  data: IUser;
  logout: () => void;
};

const User = ({ data, logout }: Props) => {
  return (
    <div className="flex items-center gap-3 cursor-pointer group relative py-1 px-2 rounded-full hover:bg-white/5 transition-all duration-300">
      
      {/* 1. الصورة الشخصية وحالة الاتصال */}
      <div className="relative shrink-0">
        <div className="size-10 rounded-full p-0.5 border-2 border-emerald-500/20 group-hover:border-emerald-500 transition-all duration-500 shadow-lg shadow-emerald-500/10">
          <img 
            src={data.photo} 
            className="w-full h-full rounded-full object-cover" 
            alt={data.username}
          />
        </div>
        <span className="absolute bottom-0 right-0 size-3 bg-emerald-500 border-2 border-[#020617] rounded-full"></span>
      </div>

      {/* 2. النصوص الجانبية (Username & Label) */}
      <div className="hidden md:flex flex-col items-start gap-0.5">
        <span className="font-bold text-sm text-zinc-100 group-hover:text-emerald-400 transition-colors">
          {data.username}
        </span>
        <span className="text-[9px] text-emerald-500 font-black uppercase tracking-widest bg-emerald-500/10 px-1.5 py-0.5 rounded-md">
          {data.isSeller ? "Pro Seller" : "Buyer Account"}
        </span>
      </div>
      
      <FiChevronDown className="text-zinc-500 group-hover:text-emerald-500 group-hover:rotate-180 transition-all duration-500" />

      {/* 3. القائمة المنسدلة الاحترافية */}
      <div className="absolute top-[130%] right-0 w-72 bg-[#0f172a]/95 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 translate-y-4 transition-all duration-500 z-50 overflow-hidden">
        
        {/* رأس القائمة */}
        <div className="px-7 py-6 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent border-b border-white/5">
           <p className="text-[10px] text-emerald-500 uppercase font-black tracking-[0.2em] mb-1">Authenticated as</p>
           <p className="text-zinc-100 font-bold truncate text-sm">{data.email || data.username}</p>
        </div>

        <div className="p-3 flex flex-col gap-1.5">
          {data.isSeller && (
            <>
              <Link to="/my-gigs" className="nav-dropdown-item group/item">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-xl bg-white/5 group-hover/item:bg-emerald-500/20 transition-colors">
                    <FiGrid className="text-lg" />
                  </div>
                  <span className="font-semibold">Dashboard</span>
                </div>
                <FiArrowRight className="opacity-0 group-hover/item:opacity-100 -translate-x-2 group-hover/item:translate-x-0 transition-all" />
              </Link>

              <Link to="/add-gig" className="nav-dropdown-item group/item">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-xl bg-white/5 group-hover/item:bg-emerald-500/20 transition-colors">
                    <FiPlusCircle className="text-lg" />
                  </div>
                  <span className="font-semibold">Create Service</span>
                </div>
                <FiArrowRight className="opacity-0 group-hover/item:opacity-100 -translate-x-2 group-hover/item:translate-x-0 transition-all" />
              </Link>
              <div className="h-[1px] bg-white/5 my-1 mx-4"></div>
            </>
          )}
          
          <Link to="/" className="nav-dropdown-item group/item">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-xl bg-white/5 group-hover/item:bg-emerald-500/20 transition-colors">
                <FiPackage className="text-lg" />
              </div>
              <span className="font-semibold">Manage Orders</span>
            </div>
          </Link>
          
          <Link to="/" className="nav-dropdown-item group/item justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-xl bg-white/5 group-hover/item:bg-emerald-500/20 transition-colors">
                <FiMessageCircle className="text-lg" />
              </div>
              <span className="font-semibold">Messages</span>
            </div>
            <span className="bg-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg shadow-emerald-500/20">3</span>
          </Link>

          <Link to="/" className="nav-dropdown-item group/item">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-xl bg-white/5 group-hover/item:bg-emerald-500/20 transition-colors">
                <FiUser className="text-lg" />
              </div>
              <span className="font-semibold">Settings</span>
            </div>
          </Link>

          <div className="h-[1px] bg-white/5 my-1 mx-4"></div>

          <button
            onClick={logout}
            className="nav-dropdown-item group/item text-red-400 hover:bg-red-500/10 hover:text-red-300"
          >
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-xl bg-red-500/10 group-hover/item:bg-red-500/20 transition-colors">
                <FiLogOut className="text-lg" />
              </div>
              <span className="font-bold uppercase tracking-wider text-xs">Sign Out</span>
            </div>
          </button>
        </div>
      </div>

      <style>{`
        .nav-dropdown-item {
          @apply flex items-center justify-between gap-3 px-3 py-2 rounded-[1.2rem] text-sm text-zinc-400 transition-all duration-300 hover:bg-white/5 hover:text-emerald-400;
        }
      `}</style>
    </div>
  );
};

export default User;