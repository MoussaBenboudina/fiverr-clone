import { Link } from "react-router-dom";
import { FiGithub, FiTwitter, FiLinkedin, FiInstagram, FiMail, FiSend } from "react-icons/fi";
import React from "react";

// --- تعريف أنواع البيانات (TypeScript Interfaces) ---

interface FooterLink {
  name: string;
  path: string;
}

interface FooterColumnProps {
  title: string;
  links: FooterLink[];
}

interface SocialIconProps {
  icon: React.ReactNode;
  href: string;
}

// --- المكونات الفرعية (Sub-components) ---

const FooterColumn = ({ title, links }: FooterColumnProps) => (
  <div className="flex flex-col gap-6">
    <h3 className="text-white font-bold text-lg">{title}</h3>
    <ul className="flex flex-col gap-4">
      {links.map((link, index) => (
        <li key={index}>
          <Link 
            to={link.path} 
            className="text-gray-400 hover:text-emerald-400 text-sm transition-all duration-300 hover:translate-x-1 inline-block"
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const SocialIcon = ({ icon, href }: SocialIconProps) => (
  <a 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:bg-emerald-500 hover:text-[#020617] transition-all duration-300 border border-white/10 hover:border-emerald-500 hover:-translate-y-1 shadow-lg"
  >
    {icon}
  </a>
);

// --- المكون الرئيسي (Main Component) ---

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#020617] border-t border-white/5 pt-16 pb-8 font-sans">
      <div className="max-w-[1400px] mx-auto px-10 md:px-20">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand */}
          <div className="flex flex-col gap-6">
            <Link to="/" className="text-3xl font-black tracking-tighter text-white">
              JOB<span className="text-emerald-500">IFY</span>
            </Link>
            <p className="text-gray-400 leading-relaxed text-sm">
              The world's largest marketplace for digital services. Empowering freelancers and businesses to thrive in the modern economy.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={<FiGithub />} href="#" />
              <SocialIcon icon={<FiTwitter />} href="#" />
              <SocialIcon icon={<FiLinkedin />} href="#" />
              <SocialIcon icon={<FiInstagram />} href="#" />
            </div>
          </div>

          {/* Column 2: Navigation */}
          <FooterColumn 
            title="Platform" 
            links={[
              { name: "Browse Services", path: "/services" },
              { name: "Find Gigs", path: "/search" },
              { name: "Post a Gig", path: "/add-gig" },
              { name: "Success Stories", path: "#" },
            ]} 
          />

          {/* Column 3: Legal */}
          <FooterColumn 
            title="Support" 
            links={[
              { name: "Help Center", path: "#" },
              { name: "Privacy Policy", path: "#" },
              { name: "Terms of Service", path: "#" },
              { name: "Trust & Safety", path: "#" },
            ]} 
          />

          {/* Column 4: Newsletter */}
          <div className="flex flex-col gap-6">
            <h3 className="text-white font-bold text-lg">Newsletter</h3>
            <p className="text-gray-400 text-sm">Get the latest updates and job alerts directly to your inbox.</p>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-emerald-500 transition-all placeholder:text-gray-600"
              />
              <button className="absolute right-2 top-1.5 bg-emerald-500 text-[#020617] p-2 rounded-lg hover:bg-emerald-400 transition-all active:scale-95">
                <FiSend size={16} />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-500">
          <p>© {currentYear} JOBIFY Inc. All Rights Reserved.</p>
          
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 hover:text-emerald-500 cursor-pointer transition-colors group">
              <span className="w-2 h-2 rounded-full bg-emerald-500 group-hover:animate-ping"></span>
              English (US)
            </div>
            <span className="hover:text-emerald-500 cursor-pointer transition-colors">USD $</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;