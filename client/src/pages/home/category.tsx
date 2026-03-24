import { Link } from "react-router-dom";
import { categories } from "../../utils/consttants";
import { HiOutlineArrowRight } from "react-icons/hi"; 

const Category = () => {
  // عرض أول 12 تصنيفاً فقط
  const topCategories = categories.slice(0, 12);

  return (
    <div className="my-20 px-6 max-w-7xl mx-auto flex flex-col items-center">
      
      {/* رأس القسم */}
      <div className="w-full mb-12 flex justify-between items-end border-b border-gray-800 pb-6">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Explore Top <span className="text-emerald-400">Categories</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 mt-3 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
        </div>
        
        <Link 
          to="/services" 
          className="hidden md:flex items-center gap-2 text-emerald-400 font-bold hover:text-emerald-300 transition-all group"
        >
          See all categories 
          <HiOutlineArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Grid العرض */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 w-full">
        {topCategories.map((i) => (
          <Link
            to={`/search?category=${i.name}`}
            key={i.name}
            className="group relative flex flex-col items-center justify-center 
                       aspect-square p-6 rounded-[2rem] 
                       bg-gray-900/40 border border-gray-800
                       backdrop-blur-sm
                       transition-all duration-500 ease-out
                       hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] 
                       hover:-translate-y-3 hover:border-emerald-500/50"
          >
            {/* تأثير التوهج عند الحوم */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]" />

            <div className="relative z-10 flex flex-col items-center gap-5">
              {/* أيقونة التصنيف */}
              <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-gray-800/50 border border-gray-700 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/30 transition-all duration-500">
                <span className="text-4xl transition-transform duration-500 group-hover:scale-125">
                  {i.icon}
                </span>
              </div>
              
              {/* اسم التصنيف */}
              <span className="font-bold text-gray-300 transition-colors duration-300 group-hover:text-white text-sm md:text-base text-center">
                {i.name}
              </span>
            </div>

            {/* الخط السفلي المضيء */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)] transition-all duration-500 group-hover:w-1/3 rounded-full" />
          </Link>
        ))}
      </div>

      {/* زر الانتقال الرئيسي */}
      <div className="mt-16">
        <Link
          to="/Services"
          className="flex items-center gap-3 px-12 py-4 rounded-xl bg-emerald-600 
                      font-black shadow-[0_10px_20px_rgba(16,185,129,0.2)]
                     hover:bg-emerald-500 hover:shadow-[0_15px_30px_rgba(16,185,129,0.3)] 
                     hover:-translate-y-1 transition-all duration-300 active:scale-95 group uppercase text-sm tracking-widest"
        >
          View All Categories
          <HiOutlineArrowRight className="group-hover:translate-x-2 transition-transform text-lg" />
        </Link>
      </div>
      
    </div>
  );
};

export default Category;