import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Links = () => {
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'services', path: '/services' },
    { name: 'Browse Tasks', path: '/tasks' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="flex items-center gap-4 p-2">
      {navLinks.map((link) => {
        const isActive = location.pathname === link.path;

        return (
          <Link
            key={link.path}
            to={link.path}
            className="relative px-3 py-1 text-base font-semibold text-white hover:text-green-500 transition-colors duration-300"
          >
            <span className="relative z-10">{link.name}</span>
            {isActive && (
              <motion.div
                layoutId="nav-underline"
                className="absolute left-0 right-0 bottom-0 h-1 bg-green-500 rounded-full"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </Link>
        );
      })}

      {/* فاصل بسيط */}
      <div className="w-[1px] h-5 bg-zinc-400 mx-2" />
    </nav>
  );
};

export default Links;