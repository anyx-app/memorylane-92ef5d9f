import { Plus, MoreHorizontal } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

export default function Albums() {
  const albums = [
    {
      id: 1,
      title: "Summer 2023",
      count: 142,
      cover: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=60",
      date: "Aug 2023",
      sharedWith: ["Sarah", "Mike"]
    },
    {
      id: 2,
      title: "Leo's Birthday",
      count: 45,
      cover: "https://images.unsplash.com/photo-1530103862676-de3c9a59af38?w=800&auto=format&fit=crop&q=60",
      date: "July 2023",
      sharedWith: ["Grandma"]
    },
    {
      id: 3,
      title: "Family Hike",
      count: 28,
      cover: "https://images.unsplash.com/photo-1440778303588-435521a205bc?w=800&auto=format&fit=crop&q=60",
      date: "June 2023",
      sharedWith: []
    },
    {
      id: 4,
      title: "Brunch Dates",
      count: 12,
      cover: "https://images.unsplash.com/photo-1621857053538-36d3f2c5897e?w=800&auto=format&fit=crop&q=60",
      date: "May 2023",
      sharedWith: ["Sarah"]
    },
    {
      id: 5,
      title: "Christmas 2022",
      count: 89,
      cover: "https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=800&auto=format&fit=crop&q=60",
      date: "Dec 2022",
      sharedWith: ["All Family"]
    },
    {
      id: 6,
      title: "Beach Weekend",
      count: 56,
      cover: "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=800&auto=format&fit=crop&q=60",
      date: "Sept 2022",
      sharedWith: ["Mike"]
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Albums</h1>
          <p className="text-slate-500 mt-1">Organize and share your family memories</p>
        </div>
        <button className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-slate-200">
          <Plus size={20} />
          <span className="font-medium">Create Album</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {albums.map((album) => (
          <div 
            key={album.id}
            className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 overflow-hidden cursor-pointer"
          >
            <AspectRatio ratio={1} className="bg-slate-100">
              <img 
                src={album.cover} 
                alt={album.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="font-bold text-lg leading-tight mb-1">{album.title}</h3>
                <div className="flex items-center justify-between text-xs font-medium text-white/80">
                  <span>{album.count} photos</span>
                  <span>{album.date}</span>
                </div>
              </div>

              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-colors">
                  <MoreHorizontal size={18} />
                </button>
              </div>
            </AspectRatio>
          </div>
        ))}
      </div>
    </div>
  );
}

