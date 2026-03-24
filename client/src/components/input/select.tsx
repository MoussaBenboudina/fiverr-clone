import { ICategory } from "../../types";

type Props = {
  label: string;
  options: ICategory[];
  name?: string;
};

const Select = ({ label, options, name }: Props) => {
  return (
    <div className="mb-6 flex flex-col group">
      {/* Label باللون الأبيض الناصع في وضع الدارك */}
      <label 
        htmlFor={name}
        className="mb-2 text-sm font-bold text-zinc-700 dark:text-white ml-1 transition-colors group-focus-within:text-emerald-500"
      >
        {label}
      </label>

      {/* Select Box بتصميم داكن وعصري */}
      <div className="relative">
        <select
          id={name}
          required
          name={name}
          className="w-full bg-zinc-50 dark:bg-zinc-900/50 text-zinc-900 dark:text-zinc-100 border border-zinc-300 dark:border-white/10 rounded-xl p-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all cursor-pointer appearance-none"
        >
          <option value="" className="dark:bg-zinc-900">Select {label}</option>
          {options.map((option, key) => (
            <option 
              key={key} 
              value={option.name} 
              className="dark:bg-zinc-900 dark:text-white"
            >
              {option.name}
            </option>
          ))}
        </select>
        
        {/* أيقونة السهم المخصصة (اختياري لجمالية أكثر) */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-400">
          <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Select;