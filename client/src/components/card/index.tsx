import { Link } from "react-router-dom";
import { IGig } from "../../types";
import Rating from "../rating";
import Buttons from "./buttons";

type Props = {
  item: IGig;
  expand?: boolean;
};

const Card = ({ item, expand }: Props) => {
  return (
    <div className="group relative bg-[#020617]/50 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden hover:border-emerald-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] flex flex-col h-full">
      
      {/* 1. أزرار التحكم (تظهر في حالة الـ expand) */}
      {expand && (
        <div className="absolute top-3 right-3 z-20">
          <Buttons item={item} />
        </div>
      )}

      <Link
        to={`/detail/${item._id}`}
        className="flex flex-col h-full cursor-pointer"
      >
        {/* 2. صورة الغلاف مع تأثير التكبير */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={item?.coverImage}
            alt={item?.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* طبقة تظليل خفيفة على الصورة */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60" />
        </div>

        {/* 3. محتوى الكارد */}
        <div className="p-4 flex flex-col flex-grow gap-3">
          
          {/* معلومات صاحب الإعلان */}
          <div className="flex items-center gap-3">
            <img 
              src={item?.user?.photo} 
              className="size-8 rounded-full ring-2 ring-emerald-500/20 object-cover" 
              alt={item?.user?.username}
            />
            <p className="text-sm truncate">
              <span className="text-gray-400">by </span>
              <span className="font-medium text-white group-hover:text-emerald-400 transition-colors">
                {item?.user?.username}
              </span>
            </p>
          </div>

          {/* العنوان مع تحديد عدد الأسطر */}
          <h3 className="text-white font-semibold leading-snug line-clamp-2 h-[2.8rem] group-hover:text-emerald-500 transition-colors">
            {item?.title}
          </h3>

          {/* التقييم */}
          <div className="mt-auto">
             <Rating rating={4.5} reviews={"1k+"} designs="text-emerald-500 text-sm font-bold" />
          </div>

          <hr className="border-white/5 my-1" />

          {/* السعر */}
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-gray-500 font-bold">Starting At</span>
            <p className="text-white font-bold">
              <span className=" text-xl">
                <span className="text-emerald-500 mx-1">DZ</span>{item.package_price.toLocaleString("en")}
              </span>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;