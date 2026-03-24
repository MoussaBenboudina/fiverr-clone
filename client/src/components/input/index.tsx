import { useState } from "react";

const CustomInput = ({ label, ...props }: any) => {
  const [focus, setFocus] = useState(false);

  return (
    <div className="relative w-full">

      {/* Input */}
      <input
        {...props}
        onFocus={() => setFocus(true)}
        onBlur={(e) => setFocus(!!e.target.value)}
        className="
          peer w-full px-4 pt-6 pb-2 rounded-xl
          bg-white/5 text-white
          border border-white/10
          outline-none
          focus:border-green-400
          focus:ring-1 focus:ring-green-400
          transition-all duration-300
        "
      />

      {/* Floating Label */}
      <label
        className={`
          absolute left-4 text-gray-400
          transition-all duration-300
          pointer-events-none
          ${
            focus
              ? "top-1 text-xs text-green-400"
              : "top-3 text-sm"
          }
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default CustomInput;