'use client'
import React from "react";

export default function Categories() {

    const categories = [
        { id: 1, name: "Electronics", icon: "⚡" },
        { id: 2, name: "Fashion", icon: "👗" },
        { id: 3, name: "Home", icon: "🏠" },
        { id: 4, name: "Beauty", icon: "💄" },
        { id: 5, name: "Sports", icon: "🏀" },
    ];

    return (
        <div className="w-full flex justify-center mt-10">
            <aside id="categories" className="rounded-xl bg-white p-4 shadow w-[90%]">
                <h4 className="text-lg font-semibold">Categories</h4>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {categories.map((c) => (
                        <button key={c.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 text-sm">
                            <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center text-xl">{c.icon}</div>
                            <div className="text-left">
                                <div className="font-semibold">{c.name}</div>
                                <div className="text-xs text-gray-500">Explore</div>
                            </div>
                        </button>
                    ))}
                </div>
            </aside>
        </div>
    )
}