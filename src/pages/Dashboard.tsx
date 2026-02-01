import { Calendar, Filter, MoreHorizontal, Share2, Heart, MessageCircle } from 'lucide-react';

export default function Dashboard() {
  const memories = [
    {
      id: 1,
      title: "Summer Vacation '23",
      date: "August 15, 2023",
      location: "Maui, Hawaii",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=60",
      likes: 12,
      comments: 4,
      author: "Sarah Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
    },
    {
      id: 2,
      title: "Leo's 5th Birthday",
      date: "July 22, 2023",
      location: "Home",
      image: "https://images.unsplash.com/photo-1530103862676-de3c9a59af38?w=800&auto=format&fit=crop&q=60",
      likes: 24,
      comments: 8,
      author: "Mike Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike"
    },
    {
      id: 3,
      title: "Family Hike",
      date: "June 10, 2023",
      location: "Yosemite",
      image: "https://images.unsplash.com/photo-1440778303588-435521a205bc?w=800&auto=format&fit=crop&q=60",
      likes: 8,
      comments: 2,
      author: "Grandma Jane",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane"
    },
    {
      id: 4,
      title: "Sunday Brunch",
      date: "May 28, 2023",
      location: "The Garden Café",
      image: "https://images.unsplash.com/photo-1621857053538-36d3f2c5897e?w=800&auto=format&fit=crop&q=60",
      likes: 15,
      comments: 5,
      author: "Sarah Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
    }
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-white shadow-xl border border-white/40">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-[#A0C4FF]/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-[#FFADAD]/30 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 p-8 md:p-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-slate-800 mb-4 tracking-tight">
                Welcome back, <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#7da9f0] to-[#e69898]">Smith Family</span>
              </h1>
              <p className="text-lg text-slate-500 max-w-lg leading-relaxed">
                You have 4 new memories to review from the last week. Relive the moments that matter most.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50 shadow-sm">
                <span className="block text-2xl font-bold text-slate-800">1,204</span>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Photos</span>
              </div>
              <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50 shadow-sm">
                <span className="block text-2xl font-bold text-slate-800">12</span>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Albums</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white/50 backdrop-blur-sm p-2 rounded-2xl border border-white/40">
        <div className="flex items-center gap-2 p-1 bg-slate-100/80 rounded-xl">
          <button className="px-4 py-2 bg-white rounded-lg shadow-sm text-sm font-semibold text-slate-800">Recent</button>
          <button className="px-4 py-2 text-slate-500 hover:text-slate-800 text-sm font-medium transition-colors">Favorites</button>
          <button className="px-4 py-2 text-slate-500 hover:text-slate-800 text-sm font-medium transition-colors">Albums</button>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="p-2.5 text-slate-500 hover:bg-white rounded-xl transition-all hover:shadow-sm">
            <Filter size={20} />
          </button>
          <button className="p-2.5 text-slate-500 hover:bg-white rounded-xl transition-all hover:shadow-sm">
            <Calendar size={20} />
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {memories.map((memory) => (
          <div 
            key={memory.id}
            className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 overflow-hidden flex flex-col"
          >
            {/* Image Container */}
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
              <img 
                src={memory.image} 
                alt={memory.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div className="flex gap-3 w-full justify-end">
                  <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-colors">
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-slate-800 text-lg leading-tight mb-1 group-hover:text-[#7da9f0] transition-colors">{memory.title}</h3>
                  <p className="text-xs text-slate-400 font-medium flex items-center gap-1">
                    {memory.date} • {memory.location}
                  </p>
                </div>
                <button className="text-slate-300 hover:text-slate-500">
                  <MoreHorizontal size={20} />
                </button>
              </div>

              <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-50">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-slate-100 ring-2 ring-white overflow-hidden">
                    <img src={memory.avatar} alt={memory.author} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-xs text-slate-500 font-medium">{memory.author}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400">
                  <div className="flex items-center gap-1 text-xs font-semibold hover:text-pink-500 transition-colors cursor-pointer">
                    <Heart size={14} className={memory.likes > 10 ? "fill-pink-100 text-pink-500" : ""} />
                    {memory.likes}
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold hover:text-blue-500 transition-colors cursor-pointer">
                    <MessageCircle size={14} />
                    {memory.comments}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
