import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, HelpCircle, User, Zap, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: 'Public Space', path: '/', icon: Home },
  { name: 'Ask a Question', path: '/ask', icon: HelpCircle },
  { name: 'Profile', path: '/profile', icon: User },
];

const MainLayout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 text-white flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col p-4 bg-slate-900/50 backdrop-blur-lg border-r border-slate-700">
        <div className="flex items-center gap-3 mb-10 px-2">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="p-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
          >
            <img alt="Galaxy logo" class="w-10 h-10" src="https://images.unsplash.com/photo-1640114198747-fa498a232dd7" />
          </motion.div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">ConnectSphere</h1>
        </div>
        <nav className="flex flex-col gap-2 flex-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-lg ${
                  isActive
                    ? 'bg-purple-600/50 text-white'
                    : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                }`
              }
            >
              <item.icon className="w-6 h-6" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
        <NavLink to="/connect-backend" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-yellow-500/10 text-yellow-300 hover:bg-yellow-500/20 transition-colors">
            <Zap className="w-6 h-6 text-yellow-400" />
            <span>Connect Backend</span>
        </NavLink>
      </aside>

      {/* Mobile Header */}
      <div className="flex flex-col flex-1">
        <header className="md:hidden flex justify-between items-center p-4 bg-slate-900/70 backdrop-blur-lg sticky top-0 z-50 border-b border-slate-700">
          <div className="flex items-center gap-3">
             <img alt="Galaxy logo" class="w-8 h-8" src="https://images.unsplash.com/photo-1640114198747-fa498a232dd7" />
            <h1 className="text-xl font-bold">ConnectSphere</h1>
          </div>
          <button onClick={() => setIsMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </header>
        
        {/* Mobile Menu */}
        <AnimatePresence>
            {isMenuOpen && (
                 <motion.div 
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="fixed inset-0 bg-slate-900/90 backdrop-blur-md z-50 p-4 flex flex-col"
                 >
                    <div className="flex justify-end mb-8">
                         <button onClick={() => setIsMenuOpen(false)}><X className="w-8 h-8"/></button>
                    </div>
                     <nav className="flex flex-col gap-4 flex-1">
                        {navItems.map((item) => (
                            <NavLink
                            key={item.name}
                            to={item.path}
                            onClick={() => setIsMenuOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-4 px-4 py-4 rounded-lg text-2xl ${
                                isActive
                                    ? 'bg-purple-600/50 text-white'
                                    : 'text-slate-300'
                                }`
                            }
                            >
                            <item.icon className="w-8 h-8" />
                            <span>{item.name}</span>
                            </NavLink>
                        ))}
                    </nav>
                    <NavLink to="/connect-backend" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center gap-3 px-4 py-4 rounded-lg bg-yellow-500/10 text-yellow-300 text-xl">
                        <Zap className="w-8 h-8 text-yellow-400" />
                        <span>Connect Backend</span>
                    </NavLink>
                 </motion.div>
            )}
        </AnimatePresence>


        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
            {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;