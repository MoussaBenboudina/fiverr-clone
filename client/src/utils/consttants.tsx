import { ICategory, IInfo, IInput } from "../types";

import {
  FaCode,
  FaPaintBrush,
  FaBullhorn,
  FaPenNib,
  FaVideo,
  FaRobot,
  FaMusic,
  FaBriefcase,
  FaUserTie,
  FaDatabase,
  FaCameraRetro,
  FaHammer,
  FaTruckLoading,
  FaTools,
  FaLanguage,
  FaChalkboardTeacher,
  FaCar,
  FaMobileAlt,
  FaGamepad,
  FaShieldAlt,
  FaCloud,
  FaShoppingCart,
  FaHandsHelping,
  FaLeaf
} from "react-icons/fa";

import { GiCakeSlice } from "react-icons/gi";

/* =========================
   ✅ CATEGORIES (موسعة)
========================= */

export const categories: ICategory[] = [
  // 🌐 Digital Services
  {
    name: "Programming and Tech",
    slug: "programming-tech",
    icon: <FaCode />,
  },
  {
    name: "Graphics and Design",
    slug: "graphics-design",
    icon: <FaPaintBrush />,
  },
  {
    name: "Digital Marketing",
    slug: "digital-marketing",
    icon: <FaBullhorn />,
  },
  {
    name: "Writing and Translation",
    slug: "writing-translation",
    icon: <FaPenNib />,
  },
  {
    name: "Video and Animation",
    slug: "video-animation",
    icon: <FaVideo />,
  },
  {
    name: "AI Services",
    slug: "ai-services",
    icon: <FaRobot />,
  },
  {
    name: "Music and Audio",
    slug: "music-audio",
    icon: <FaMusic />,
  },
  {
    name: "Business",
    slug: "business",
    icon: <FaBriefcase />,
  },
  {
    name: "Consulting",
    slug: "consulting",
    icon: <FaUserTie />,
  },
  {
    name: "Data Science",
    slug: "data-science",
    icon: <FaDatabase />,
  },
  {
    name: "Cyber Security",
    slug: "cyber-security",
    icon: <FaShieldAlt />,
  },
  {
    name: "Cloud Services",
    slug: "cloud",
    icon: <FaCloud />,
  },
  {
    name: "E-commerce Services",
    slug: "ecommerce",
    icon: <FaShoppingCart />,
  },
  {
    name: "Game Development",
    slug: "game-dev",
    icon: <FaGamepad />,
  },

  // 🧠 Education & Help
  {
    name: "Translation & Languages",
    slug: "languages",
    icon: <FaLanguage />,
  },
  {
    name: "Online Tutoring",
    slug: "tutoring",
    icon: <FaChalkboardTeacher />,
  },
  {
    name: "Personal Assistance",
    slug: "personal-assistance",
    icon: <FaHandsHelping />,
  },

  // 🏠 Local Services (مهم لمشروعك)
  {
    name: "Photography",
    slug: "photography",
    icon: <FaCameraRetro />,
  },
  {
    name: "Construction & Renovation",
    slug: "construction-renovation",
    icon: <FaHammer />,
  },
  {
    name: "Catering & Pastry",
    slug: "catering-pastry",
    icon: <GiCakeSlice />,
  },
  {
    name: "Home Services",
    slug: "home-services",
    icon: <FaTruckLoading />,
  },
  {
    name: "Repair & Maintenance",
    slug: "maintenance",
    icon: <FaTools />,
  },
  {
    name: "Car Services",
    slug: "car-services",
    icon: <FaCar />,
  },
  {
    name: "Mobile Repair",
    slug: "mobile-repair",
    icon: <FaMobileAlt />,
  },
  {
    name: "Agriculture Services",
    slug: "agriculture",
    icon: <FaLeaf />,
  },
];

/* =========================
   ✅ INFO SECTION
========================= */

export const items: IInfo[] = [
  {
    title: "Expert Recruitment Consultants",
    text: "Rely on an account manager to find the right talent and meet every need of your project.",
  },
  {
    title: "Satisfaction Guarantee",
    text: "Place your orders with confidence with guaranteed refunds for incomplete deliveries.",
  },
  {
    title: "Advanced Management Tools",
    text: "Seamlessly integrate freelancers into your teams and projects.",
  },
  {
    title: "Flexible Payment Models",
    text: "Pay per project or choose hourly rate options for longer-term collaborations.",
  },
];

/* =========================
   ✅ FORM INPUTS
========================= */

export const inputs: IInput[] = [
  {
    label: "Title",
    name: "title",
    required: true,
  },
  {
    label: "Cover Image",
    name: "coverImage",
    required: true,
    type: "file",
  },
  {
    label: "Images",
    name: "images",
    required: true,
    type: "file",
    multiple: true,
  },
  {
    label: "Location (Wilaya)",
    name: "location",
    required: true,
  },
  {
    label: "Revision Count",
    name: "package_revisions",
    required: true,
    type: "number",
    min: 1,
  },
  {
    label: "Features (comma separated)",
    name: "package_features",
    required: true,
    type: "textarea",
  },
  {
    label: "Description",
    name: "description",
    required: true,
    type: "textarea",
  },
  {
    label: "Package Description",
    name: "package_description",
    required: true,
  },
  {
    label: "Package Title",
    name: "package_title",
    required: true,
  },
  {
    label: "Delivery Time (days)",
    name: "package_duration",
    required: true,
    type: "number",
    min: 1,
    max: 90,
  },
  {
    label: "Price ($)",
    name: "package_price",
    type: "number",
    required: true,
    min: 1,
  },
];