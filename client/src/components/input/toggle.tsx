import React from "react";

type Props = {
  setIsSeller: React.Dispatch<React.SetStateAction<boolean>>;
  color?: string; // أضفنا هذا السطر لحل خطأ الـ TypeScript
};

const Toggle = ({ setIsSeller, color = "#10B981" }: Props) => {
  return (
    <div className="flex gap-4 items-center text-gray-400">
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          onChange={(e) => setIsSeller(e.target.checked)}
          type="checkbox"
          className="sr-only peer"
        />
        {/* تم تغيير bg-white إلى bg-gray-800 ليتناسب مع التصميم الداكن */}
        <div className="group peer bg-gray-800 rounded-full duration-300 w-14 h-7 ring-2 ring-gray-700 after:duration-300 after:bg-gray-500 peer-checked:after:bg-emerald-500 peer-checked:ring-emerald-500/50 after:rounded-full after:absolute after:h-5 after:w-5 after:top-1 after:left-1 peer-checked:after:translate-x-7 peer-hover:after:scale-95 shadow-inner"></div>
      </label>
    </div>
  );
};

export default Toggle;