'use client'
import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";


export default function Products() {

  const { products = [] } = useSelector((state) => state.products);
  const router = useRouter();


  return (

    <div className="w-full flex justify-center">
      <section id="featured" className="mt-10 w-[90%]">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Featured Products</h3>
          <a href="#deals" className="text-sm text-indigo-600">View all deals</a>
        </div>


        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {Array.isArray(products) && products?.map((p) => (
            <div key={p._id} onClick={() => router.push(`product/${p._id}`)} className="cursor-pointer relative group bg-white border border-gray-100 overflow-hidden rounded-[5px]">
              <div className="aspect-[4/3] bg-gray-50">
                <Image
                  src={p?.image?.[0] || "/fallback.png"}
                  alt={p?._id || "product"}
                  width={300}
                  height={300}
                  className="object-cover rounded-lg w-full h-full"
                />
              </div>
              <div className="p-4 relative h-[95px]">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-sm md:font-semibold text-md lg:font-semibold lg:text-[15px] md:text-[15px]">{p.title.slice(0, 23)}{p.title.length > 23 && <span>....</span>}</h4>
                    <p className="text-xs text-gray-500 mt-1">by <span className="font-medium text-gray-700">{p.vendorId.title}</span> {p.stockCount > 0 ? (<span className="text-[Green]">Stock In</span>) : (<span className="text-[red]">Sold Out</span>)}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">${p.price}</div>
                    <div className="text-xs text-gray-500">{p.category.slice(0, 15)}</div>
                  </div>
                </div>
              </div>
            </div>

          ))}
        </div>
      </section>
    </div>

  )
}