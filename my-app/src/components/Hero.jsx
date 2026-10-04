'use client'
import React from "react";
import { Globe, Search, ShieldCheck, ShoppingCart, Zap } from "lucide-react";
import Hero_Logo from "../assets/Hero.png"

export default function Hero() {
    return (
        <div className="relative w-full py-15 md:py-25 flex items-center bg-white overflow-hidden">

            <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-50/50 skew-x-12 translate-x-32 hidden lg:block" />

            <div className=" mx-auto px-6 sm:px-7 lg:px-50 w-full relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

    
                    <div className="lg:col-span-7 space-y-12">

                        <div className="inline-flex items-center gap-2 px-3 py-1 md:px-5 md:py-2 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                            <Zap size={14} className="fill-current" />
                            <span className="text-[11px] md:text-[12px] font-bold uppercase tracking-wider">Fast Shipping Across 50+ Countries</span>
                        </div>

                        <h1 className="mt-4 text-4xl md:text-6xl font-black text-slate-900 leading-[1.1]">
                            The Pro Way to <br />
                            <span className="text-indigo-600">Buy & Sell.</span>
                        </h1>

                        <p className="mt-4 text-sm text-slate-500 max-w-xl leading-relaxed">
                            Join Probuy, the global multi-vendor ecosystem where quality meets convenience.
                            Shop from verified masters of their craft or start your own store in minutes.
                        </p>

                        <div className="mt-4 flex flex-col sm:flex-row items-center gap-3 p-2 bg-white rounded-xl border border-gray-100 max-w-2xl">
                            <div className="relative flex-1 w-full">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="What are you looking for today?"
                                    className="w-full pl-12 pr-4 py-3 bg-transparent outline-none text-slate-700"
                                />
                            </div>
                            <button className="w-full sm:w-auto px-8 py-3 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition-all transform active:scale-95">
                                Explore
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-8 pt-4">
                            <div className="flex items-center gap-2 text-slate-400">
                                <ShieldCheck size={20} className="text-indigo-500" />
                                <span className="text-sm font-medium">Buyer Protection</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-400">
                                <Globe size={20} className="text-indigo-500" />
                                <span className="text-sm font-medium">Global Logistics</span>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-5 relative">
                        <div className="relative bg-gradient-to-br from-indigo-100 to-white p-8 rounded-[3rem] border border-white shadow-inner">
                            <img
                                src={Hero_Logo}
                                alt="Shopping Experience"
                                className="rounded-[2.5rem] shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-700 object-cover h-[380px] md:h-[500px] w-full"
                            />

                            <div className="absolute -left-3 md:-left-10 top-1/4 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 animate-bounce-slow">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                                        <ShoppingCart className="text-green-600" size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 font-medium">Recent Purchase</p>
                                        <p className="text-sm font-bold text-slate-900">Organic Coffee Beans</p>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute -right-3 md:-right-6 bottom-12 bg-indigo-600 p-5 rounded-2xl shadow-2xl text-white">
                                <p className="text-2xl font-black italic">4.9/5</p>
                                <p className="text-[10px] uppercase tracking-tighter opacity-80">Average Vendor Rating</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}