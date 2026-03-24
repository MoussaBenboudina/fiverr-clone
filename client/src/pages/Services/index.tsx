import { Link } from "react-router-dom";
import { categories } from "../../utils/consttants";

const Services = () => {
  return (
    <div className="my-24 px-6 max-w-7xl mx-auto flex flex-col items-center">
      {/* رأس الصفحة: بسيط وواضح */}
      <div className="text-center mb-20 space-y-4">
        <h2 className="text-3xl md:text-4xl font-light text-white tracking-tight">
          Explore Our <span className="font-bold border-b-2 border-emerald-500 pb-1">Specialized Services</span>
        </h2>
        <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
          Professional solutions tailored to meet your business requirements with precision and excellence.
        </p>
      </div>

      {/* الشبكة: تباعد مريح للعين */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {categories.map((category) => (
          <Link
            key={category.name}
            to={`/search?category=${category.name}`}
            className="group relative flex flex-col items-start p-8 rounded-2xl 
                       bg-[#111111] border border-white/[0.08]
                       transition-all duration-300 ease-in-out
                       hover:bg-[#161616] hover:border-emerald-500/50"
          >
            {/* 1. أيقونة رسمية: بسيطة وبدون توهج مفرط */}
            <div className="mb-8 w-14 h-14 flex items-center justify-center rounded-xl 
                            bg-white/[0.03] border border-white/[0.1]
                            group-hover:bg-emerald-500 group-hover:border-emerald-400
                            transition-colors duration-500">
              <span className="text-3xl grayscale group-hover:grayscale-0 transition-all duration-500">
                {category.icon}
              </span>
            </div>

            {/* 2. النصوص: محاذاة لليسار لتبدو أكثر رسمية */}
            <div className="space-y-2">
              <h3 className="text-white font-semibold text-lg tracking-wide group-hover:text-emerald-400 transition-colors">
                {category.name}
              </h3>
              <p className="text-gray-500 text-xs uppercase tracking-[0.15em] font-medium">
                Professional Grade
              </p>
            </div>

            {/* 3. سهم صغير يظهر عند التحويم (اختياري) */}
            <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
              <svg 
                className="w-5 h-5 text-emerald-500" 
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>

            {/* 4. تفصيل خطي بسيط جداً في الأسفل */}
            <div className="absolute top-0 left-0 w-1 h-0 bg-emerald-500 group-hover:h-full transition-all duration-500 rounded-l-2xl" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Services;