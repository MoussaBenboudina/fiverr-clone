// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { IGigDetail } from "../../types";
import Rating from "../../components/rating";

type Props = {
  gig: IGigDetail;
};

const Info = ({ gig }: Props) => {
  return (
    <div className="flex flex-1 flex-col gap-8 max-w-4xl transition-colors duration-300">
      
      {/* 1. العنوان (Title Section) */}
      <h1 className="font-extrabold text-2xl md:text-3xl text-zinc-900 dark:text-white leading-tight">
        {gig.title}
      </h1>

   

      {/* 3. سلايدر الصور (Main Image Slider) */}
      <div className="group relative overflow-hidden rounded-2xl shadow-xl bg-zinc-100 dark:bg-zinc-800 border border-transparent dark:border-white/5">
        <Splide
          options={{
            type: "fade",
            rewind: true,
            speed: 800,
            pagination: true,
            arrows: true,
            gap: "1rem",
          }}
          className="dark-arrows-fix" // يمكنك إضافة CSS مخصص لأسهم السلايدر في الدارك مود
        >
          {gig.images.map((url, key) => (
            <SplideSlide key={key}>
              <div className="aspect-video w-full overflow-hidden">
                <img 
                  src={url} 
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  alt={`Gig work ${key + 1}`}
                />
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>

      {/* 4. قسم الوصف (Description Section) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-6 w-1 bg-emerald-500 rounded-full"></div>
          <h2 className="font-black text-xl text-zinc-800 dark:text-white uppercase tracking-wide">
            About this gig
          </h2>
        </div>
        
        <div className="bg-zinc-50/50 dark:bg-white/5 p-6 rounded-2xl border border-zinc-100 dark:border-white/5">
          <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-lg whitespace-pre-line">
            {gig.description}
          </p>
        </div>
      </div>

      {/* 5. الأوسمة (Skills/Tags) */}
      <div className="flex flex-wrap gap-2 pt-4">
        {["Expert", "Professional", "High Quality"].map((tag) => (
          <span 
            key={tag} 
            className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 text-xs font-bold rounded-full uppercase border border-transparent dark:border-white/5"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Info;