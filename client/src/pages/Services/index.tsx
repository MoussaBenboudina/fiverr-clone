import { Link } from "react-router-dom";
import { categories } from "../../utils/consttants";
import { motion } from "framer-motion"; // تأكد من تثبيت: npm install framer-motion

const Services = () => {
  // إعدادات حركة الظهور للمجموعة (Container)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // ظهور الكروت بالتوالي
      },
    },
  };

  // إعدادات حركة الظهور لكل كرت (Item)
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="my-24 px-6 max-w-7xl mx-auto flex flex-col items-center">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20 space-y-4"
      >
        <h2 className="text-3xl md:text-4xl font-light text-white tracking-tight">
          Explore Our <span className="font-bold border-b-2 border-emerald-500 pb-1">Specialized Services</span>
        </h2>
        <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
          Professional solutions tailored to meet your business requirements with precision and excellence.
        </p>
      </motion.div>

      {/* Grid with Framer Motion */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }} // تتحرك الأنيميشن مرة واحدة فقط عند التمرير
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full"
      >
        {categories.map((category) => (
          <motion.div key={category.name} variants={itemVariants}>
            <Link
              to={`/search?category=${category.name}`}
              className="group relative flex flex-col items-start p-8 rounded-2xl 
                         bg-gradient-to-b from-[#1a1a1a] to-[#111111] 
                         border border-white/[0.05]
                         transition-all duration-500 ease-out
                         hover:scale-[1.02] hover:border-emerald-500/30
                         hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7),0_0_20px_-5px_rgba(16,185,129,0.1)]"
            >
              {/* 1. Icon Container with Glow */}
              <div className="mb-8 w-14 h-14 flex items-center justify-center rounded-xl 
                              bg-white/[0.03] border border-white/[0.08]
                              group-hover:bg-emerald-500 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]
                              group-hover:border-emerald-400
                              transition-all duration-500">
                <span className="text-3xl grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110">
                  {category.icon}
                </span>
              </div>

              {/* 2. Text Content */}
              <div className="relative z-10 space-y-2">
                <h3 className="text-white font-semibold text-lg tracking-wide group-hover:text-emerald-400 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-500 text-xs uppercase tracking-[0.15em] font-medium group-hover:text-gray-400">
                  Professional Grade
                </p>
              </div>

              {/* 3. Decorative Arrow */}
              <div className="absolute bottom-8 right-8 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>

              {/* 4. Background Gradient Hover Effect */}
              <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
              
              {/* 5. Left Border Accent */}
              <div className="absolute top-0 left-0 w-[2px] h-0 bg-emerald-500 group-hover:h-full transition-all duration-500 rounded-l-2xl" />
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Services;