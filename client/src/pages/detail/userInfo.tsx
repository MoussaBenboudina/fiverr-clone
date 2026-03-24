import { PiStarFourFill, PiMapPinLight, PiCalendarBlankLight, PiPhoneLight, PiEnvelopeSimpleLight, PiWhatsappLogoLight, PiQuotesFill } from "react-icons/pi";
import { ISellerUser } from "../../types";
import Rating from "../../components/rating";
import moment from "moment";

type Props = {
  user: ISellerUser;
};

const UserInfo = ({ user }: Props) => {
  // دالة لإنشاء رابط واتساب مباشر
  const whatsappUrl = `https://wa.me/${user.phone?.replace(/\D/g, '')}`;

  return (
    <div className="max-w-4xl mx-auto p-6 transition-colors duration-300">
      {/* Header Section */}
      <h1 className="font-bold text-2xl text-zinc-800 dark:text-zinc-100 mb-8 border-b border-zinc-200 dark:border-zinc-800 pb-4 flex items-center gap-2">
        Get to know <span className="text-blue-600 dark:text-emerald-500">{user.username}</span>
      </h1>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Avatar Section */}
        <div className="relative shrink-0">
          <div className="size-32 rounded-full p-1 border-2 border-blue-500 dark:border-emerald-500 overflow-hidden shadow-xl">
            <img 
              src={user.photo} 
              className="w-full h-full rounded-full object-cover transition-transform duration-500 hover:scale-110" 
              alt={user.username}
            />
          </div>
          <span className="absolute bottom-2 right-2 size-5 bg-green-500 border-2 border-white dark:border-zinc-900 rounded-full shadow-sm animate-pulse"></span>
        </div>

        {/* Content Section */}
        <div className="flex-1 text-center md:text-left space-y-6">
          <div>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <h4 className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight">{user.username}</h4>
              <span className="px-2 py-0.5 bg-blue-100 dark:bg-emerald-500/10 text-blue-600 dark:text-emerald-400 text-[10px] font-bold uppercase rounded border border-blue-200 dark:border-emerald-500/20">Verified</span>
            </div>
            
            {/* Bio Section - الاحترافي */}
            <div className="relative mt-4 group">
              <PiQuotesFill className="absolute -left-4 -top-2 text-zinc-200 dark:text-zinc-800 size-8 -z-10" />
              <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed max-w-2xl">
                {user.desc || "Professional freelancer dedicated to delivering high-quality results and innovative solutions for your business needs."}
              </p>
            </div>
          </div>

          {/* Stats & Rating */}
          <div className="flex flex-wrap justify-center md:justify-start gap-6 items-center">
            <Rating rating={4.5} reviews={"1.2k"} designs="font-bold text-lg text-amber-500 dark:text-emerald-500" />
            <div className="h-4 w-[1px] bg-zinc-200 dark:bg-zinc-800 hidden md:block"></div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Seller Level</span>
              <div className="flex text-amber-400 dark:text-emerald-400">
                <PiStarFourFill size={14} />
                <PiStarFourFill size={14} />
                <PiStarFourFill size={14} className="text-zinc-300 dark:text-zinc-700" />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 pt-2">
            <button className="flex-1 md:flex-none py-3 px-10 bg-zinc-900 dark:bg-emerald-600 text-white font-bold rounded-xl hover:bg-zinc-800 dark:hover:bg-emerald-500 transition-all active:scale-95 shadow-lg shadow-zinc-200 dark:shadow-none">
              Contact me
            </button>
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 md:flex-none flex items-center justify-center gap-2 py-3 px-8 border-2 border-green-500/20 dark:border-emerald-500/20 text-green-600 dark:text-emerald-400 font-bold rounded-xl hover:bg-green-50 dark:hover:bg-emerald-500/10 transition-all shadow-sm"
            >
              <PiWhatsappLogoLight size={20} />
              WhatsApp Direct
            </a>
          </div>
        </div>
      </div>

      {/* Info Grid Card */}
      <div className="mt-12 bg-white dark:bg-[#0f172a]/40 border border-zinc-100 dark:border-white/5 rounded-[2rem] p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 shadow-xl shadow-zinc-200/50 dark:shadow-none">
        <Field 
          label="Location" 
          value={user.country} 
          icon={<PiMapPinLight className="text-xl text-blue-500 dark:text-emerald-500" />} 
        />
        <Field 
          label="On Platform Since" 
          value={moment(user.createdAt).format("MMMM YYYY")} 
          icon={<PiCalendarBlankLight className="text-xl text-blue-500 dark:text-emerald-500" />} 
        />
        <Field 
          label="Official Email" 
          value={user.email} 
          icon={<PiEnvelopeSimpleLight className="text-xl text-blue-500 dark:text-emerald-500" />} 
        />
        <Field 
          label="Phone Support" 
          value={user.phone} 
          icon={<PiPhoneLight className="text-xl text-blue-500 dark:text-emerald-500" />} 
        />
        <Field 
          label="Instant Chat" 
          value="Available Now" 
          isLink
          href={whatsappUrl}
          icon={<PiWhatsappLogoLight className="text-xl text-green-500 dark:text-emerald-400" />} 
        />
      </div>
    </div>
  );
};

type FieldProps = {
  label: string;
  value: string | undefined;
  icon: React.ReactNode;
  isLink?: boolean;
  href?: string;
};

const Field = ({ label, value, icon, isLink, href }: FieldProps) => {
  const content = (
    <div className="flex items-start gap-4 group cursor-default">
      <div className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-100 dark:border-white/5 group-hover:bg-white dark:group-hover:bg-zinc-800 transition-all duration-300 group-hover:shadow-md">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 font-black">{label}</span>
        <span className={`text-zinc-800 dark:text-zinc-200 font-bold truncate ${isLink ? 'text-green-600 dark:text-emerald-400 underline decoration-green-500/30' : ''}`}>
          {value || "N/A"}
        </span>
      </div>
    </div>
  );

  return isLink ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="block hover:scale-[1.02] transition-transform">
      {content}
    </a>
  ) : content;
};

export default UserInfo;