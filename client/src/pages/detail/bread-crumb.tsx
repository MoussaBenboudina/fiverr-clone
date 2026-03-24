import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { HiChevronRight } from "react-icons/hi2"; // أيقونة سهم أجمل للفصل

type Props = {
  category: string;
};

const BreadCrumb = ({ category }: Props) => {
  return (
    <div className="my-6">
      <nav className="flex items-center space-x-2 text-sm font-medium">
        {/* أيقونة الصفحة الرئيسية */}
        <Link 
          to="/" 
          className="p-1.5 rounded-md text-gray-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-200"
          aria-label="Home"
        >
          <AiOutlineHome size={18} />
        </Link>

        {/* أيقونة الفاصل (Separator) */}
        <HiChevronRight className="text-gray-400 dark:text-zinc-600" size={14} />

        {/* رابط القسم/الفئة */}
        <Link 
          to={`/search?category=${category}`} 
          className="px-2 py-1 rounded-md text-gray-600 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-all duration-200 capitalize"
        >
          {category}
        </Link>
      </nav>
    </div>
  );
};

export default BreadCrumb;