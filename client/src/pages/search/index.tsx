import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import api from "../../api";
import Loader from "../../components/loader";
import Error from "../../components/error";
import Card from "../../components/card";
import { IGig } from "../../types";
import { HiAdjustments, HiSearch, HiOutlineChevronDown, HiLocationMarker } from "react-icons/hi";

// قائمة الولايات (يمكنك استبدالها ببيانات من الـ API)
const ALGERIA_STATES = ["Adrar", "Chlef", "Alger", "Oran", "Constantine", "Annaba", "Setif"]; 

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // استخراج القيم
  const query = searchParams.get("query") || "";
  const category = searchParams.get("category") || "";
  const min = searchParams.get("min") || "";
  const max = searchParams.get("max") || "";
  const sort = searchParams.get("sort") || "newest";
  const location = searchParams.get("location") || "";

  const params = { category, search: query, min, max, sort, location };

  const { isLoading, error, data, refetch } = useQuery<IGig[]>({
    queryKey: ["gigs", params],
    queryFn: () => api.get("/gigs", { params }).then((res) => res.data.gigs),
  });

  // تحديث أي فلتر بسهولة
  const updateFilter = (name: string, value: string) => {
    setSearchParams((prev) => {
      if (value) prev.set(name, value); else prev.delete(name);
      return prev;
    });
  };

  const handlePriceSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    updateFilter("min", formData.get("min") as string);
    updateFilter("max", formData.get("max") as string);
  };

  return (
    <div className="min-h-screen bg-[#030014] transition-colors duration-300 mt-24">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12">
        
        {/* --- Header Section --- */}
        <header className="mb-12">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        

            {!isLoading && (
              <div className="px-6 py-3 bg-zinc-100 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 text-sm font-bold">
                {data?.length || 0} services available
              </div>
            )}
          </div>
        </header>

        {/* --- Advanced Sticky Filter Bar --- */}
        <div className="sticky top-6 z-40 mb-16 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl p-4 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-2xl shadow-zinc-200/20 dark:shadow-none flex flex-wrap items-center gap-4 lg:gap-8">
          
          {/* 1. البحث بالاسم (Inline Search) */}
          <div className="relative flex-1 min-w-[200px]">
            <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Search by name..."
              defaultValue={query}
              onKeyDown={(e) => e.key === "Enter" && updateFilter("query", e.currentTarget.value)}
              className="w-full bg-zinc-100 dark:bg-zinc-800 border-none rounded-2xl py-3 pl-12 pr-4 text-sm dark:text-white focus:ring-2 focus:ring-emerald-500/50 outline-none"
            />
          </div>

          {/* 2. فلتر الولاية (Location) */}
          <div className="relative group">
            <HiLocationMarker className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500 z-10" />
            <select 
              value={location}
              onChange={(e) => updateFilter("location", e.target.value)}
              className="appearance-none bg-zinc-100 dark:bg-zinc-800 pl-11 pr-10 py-3 rounded-2xl text-sm font-bold dark:text-zinc-200 outline-none focus:ring-2 focus:ring-emerald-500/50 cursor-pointer"
            >
              <option value="">All States</option>
              {ALGERIA_STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <HiOutlineChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
          </div>

          {/* 3. فلتر السعر */}
          <form onSubmit={handlePriceSubmit} className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 p-1.5 rounded-2xl">
            <input name="min" type="number" placeholder="Min $" defaultValue={min} className="w-20 bg-white dark:bg-zinc-700 rounded-xl py-2 px-3 text-xs font-bold dark:text-white outline-none" />
            <input name="max" type="number" placeholder="Max $" defaultValue={max} className="w-20 bg-white dark:bg-zinc-700 rounded-xl py-2 px-3 text-xs font-bold dark:text-white outline-none" />
            <button type="submit" className="bg-zinc-900 dark:bg-emerald-600 text-white p-2.5 rounded-xl hover:scale-105 transition-transform">
              <HiAdjustments />
            </button>
          </form>

          {/* 4. الترتيب */}
          <div className="hidden lg:block h-8 w-px bg-zinc-200 dark:bg-zinc-800" />
          
          <div className="relative">
            <select 
              value={sort}
              onChange={(e) => updateFilter("sort", e.target.value)}
              className="appearance-none bg-transparent font-black text-zinc-900 dark:text-white pr-8 outline-none cursor-pointer hover:text-emerald-500 transition-colors text-sm"
            >
              <option value="newest">Newest Arrivals</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
            </select>
            <HiOutlineChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
          </div>
        </div>

        {/* --- Content Grid --- */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <Loader designs="size-14 border-t-emerald-500" />
            <p className="mt-6 text-zinc-400 font-bold tracking-widest text-xs uppercase animate-pulse">Syncing Services...</p>
          </div>
        ) : error ? (
          <Error error={error} refetch={refetch} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
            {data?.map((item) => (
               <Card key={item._id} item={item} />
            ))}
          </div>
        )}

        {/* No Data State */}
        {!isLoading && data?.length === 0 && (
          <div className="py-32 flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mb-8">
              <HiSearch className="text-4xl text-zinc-300 dark:text-zinc-700" />
            </div>
            <h3 className="text-2xl font-black dark:text-white">No results found</h3>
            <p className="text-zinc-500 dark:text-zinc-400 mt-2">Try changing your filters or searching for something else.</p>
            <button 
              onClick={() => setSearchParams({})}
              className="mt-8 px-10 py-4 bg-emerald-500 text-white font-bold rounded-2xl hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;