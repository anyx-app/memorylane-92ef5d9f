import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Home, Image, Heart, Settings, Menu, X, LogOut, PlusCircle } from 'lucide-react';

export default function AppShell() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { icon: Home, label: 'Timeline', path: '/' },
    { icon: Image, label: 'Albums', path: '/albums' },
    { icon: Heart, label: 'Favorites', path: '/favorites' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-4 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#A0C4FF] to-[#FFADAD] flex items-center justify-center text-white font-bold text-xs shadow-md">
            ML
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-800">MemoryLane</span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-white/95 backdrop-blur-xl pt-20 px-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-4 p-4 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? "bg-[#A0C4FF]/10 text-[#4a6fa5] font-semibold" 
                    : "text-slate-500 hover:bg-slate-100"
                }`
              }
            >
              <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-lg">{item.label}</span>
            </NavLink>
          ))}
          <div className="pt-8 border-t border-slate-100">
            <button className="flex items-center gap-4 p-4 text-slate-400 w-full hover:text-red-500 transition-colors">
              <LogOut size={24} />
              <span className="text-lg">Sign Out</span>
            </button>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-72 h-screen sticky top-0 bg-white/70 backdrop-blur-xl border-r border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.03)] z-40">
        <div className="p-8 pb-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#A0C4FF] to-[#FFADAD] shadow-lg flex items-center justify-center text-white font-bold text-xl ring-2 ring-white">
              M
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-700 to-slate-900 tracking-tight">
              MemoryLane
            </h1>
          </div>
          
          <button className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow-lg shadow-slate-200">
            <PlusCircle size={20} />
            <span className="font-medium">New Memory</span>
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 py-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                  isActive
                    ? "bg-gradient-to-r from-[#A0C4FF]/20 to-[#BDB2FF]/10 text-slate-800 font-semibold shadow-sm"
                    : "text-slate-500 hover:bg-white hover:text-slate-900 hover:shadow-sm"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon 
                    size={22} 
                    className={`transition-colors ${isActive ? 'text-[#7da9f0]' : 'text-slate-400 group-hover:text-slate-600'}`} 
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-white transition-colors cursor-pointer border border-transparent hover:border-slate-100 hover:shadow-sm">
            <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden ring-2 ring-white">
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
                alt="User" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-800 truncate">The Smith Family</p>
              <p className="text-xs text-slate-500 truncate">admin@memorylane.family</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#A0C4FF]/10 via-white to-[#FFADAD]/10 -z-10 pointer-events-none" />
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl min-h-[calc(100vh-4rem)]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
