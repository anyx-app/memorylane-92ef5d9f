import { ArrowRight, Lock, Users, Camera } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-900 text-white shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-[#A0C4FF]/30 via-transparent to-[#FFADAD]/20 z-0"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=2070&auto=format&fit=crop')] opacity-20 bg-cover bg-center mix-blend-overlay"></div>
        
        <div className="relative z-10 p-8 md:p-16 flex flex-col items-start gap-6 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium text-[#A0C4FF]">
            <Lock size={14} />
            <span>Private & Secure</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            Relive your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A0C4FF] to-[#FFADAD]">
              favorite moments.
            </span>
          </h1>
          
          <p className="text-lg text-slate-300 leading-relaxed max-w-lg">
            A safe space for your family's precious memories. Share photos, create albums, and connect with loved ones away from social media noise.
          </p>
          
          <button className="group mt-4 flex items-center gap-3 px-6 py-3 rounded-full bg-white text-slate-900 font-bold hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            Start Uploading
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Recent Memories Grid */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Recent Memories</h2>
          <button className="text-[#5a8fd1] font-medium hover:underline text-sm">View all</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-slate-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
               {/* Placeholder Images using Unsplash */}
               <img 
                 src={`https://images.unsplash.com/photo-${1500000000000 + i * 123456}?auto=format&fit=crop&w=800&q=80`} 
                 alt="Memory"
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                 <p className="text-white font-medium text-sm">Family Gathering</p>
                 <p className="text-white/70 text-xs">2 days ago</p>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Highlight */}
      <section className="grid md:grid-cols-3 gap-6">
        {[
          { icon: Camera, title: "Original Quality", desc: "Store photos in full resolution without compression." },
          { icon: Users, title: "Family Only", desc: "Invite members to private groups. No public feeds." },
          { icon: Lock, title: "End-to-End", desc: "Your data is encrypted and owned by you." },
        ].map((feature, idx) => (
          <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-4 text-[#A0C4FF]">
              <feature.icon size={24} />
            </div>
            <h3 className="font-bold text-slate-800 mb-2">{feature.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

