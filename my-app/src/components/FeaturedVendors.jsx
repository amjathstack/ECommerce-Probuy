import React from 'react';
import { Store, Star, ArrowUpRight } from 'lucide-react';

const vendors = [
  {
    name: "Lumina Tech",
    category: "Electronics",
    rating: 4.9,
    products: 124,
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=200",
  },
  {
    name: "Urban Threads",
    category: "Sustainable Fashion",
    rating: 4.8,
    products: 86,
    image: "https://images.unsplash.com/photo-1534452203294-49c8913721b2?auto=format&fit=crop&q=80&w=200",
  },
  {
    name: "Nomad Leather",
    category: "Handcrafted Goods",
    rating: 5.0,
    products: 42,
    image: "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&q=80&w=200",
  }
];

const FeaturedVendors = () => {
  return (
    <section className="bg-slate-50 py-20">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-50">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Top Rated Vendors</h2>
            <p className="text-slate-500 mt-2 font-medium">Shop directly from the world's most trusted creators.</p>
          </div>
          <button className="text-indigo-600 font-bold flex items-center gap-1 hover:underline">
            View all shops <ArrowUpRight size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {vendors.map((vendor, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-indigo-300 transition-all hover:shadow-xl group">
              <div className="flex items-center gap-4 mb-6">
                <img src={vendor.image} alt={vendor.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-100" />
                <div>
                  <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{vendor.name}</h3>
                  <p className="text-xs text-slate-500 font-medium">{vendor.category}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-50">
                <div>
                  <p className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">Rating</p>
                  <div className="flex items-center gap-1">
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-bold text-slate-700">{vendor.rating}</span>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">Total Products</p>
                  <p className="text-sm font-bold text-slate-700">{vendor.products}+</p>
                </div>
              </div>

              <button className="w-full mt-6 py-3 bg-slate-50 text-slate-700 font-bold rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-all flex items-center justify-center gap-2">
                <Store size={18} />
                Visit Store
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedVendors;