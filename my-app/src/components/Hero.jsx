'use client'
import React from "react";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <div className="w-full flex justify-center mt-[35px] sm:mt-[70px]">
            <div className="col-span-2 w-[90%]">
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center justify-center lg:justify-start h-[300px] rounded-2xl bg-gradient-to-r from-indigo-600 to-teal-400 text-white p-10 shadow-lg overflow-hidden"
                >
                    <div className="lg:ml-[50px] flex flex-col gap-[5px]">
                        <h1 className="mt-3 text-[25px] lg:text-3xl sm:text-4xl font-extrabold">A marketplace for every maker and seller</h1>
                        <p className="text-[14px] lg:mt-3 lg:text-[18px] max-w-xl text-indigo-50/90">Discover unique products from hundreds of independent vendors — all in one place. Fast shipping, easy returns, and seller-driven selections.</p>

                        <div className="mt-3 lg:mt-6 flex gap-3">
                            <a className="text-[13px] lg:text-[16px] inline-flex items-center gap-2 rounded-full px-3 py-[5px] lg:px-5 lg:py-2 bg-white/90  text-indigo-700 font-medium shadow hover:scale-102" href="#featured">Shop Featured</a>
                            <a className="text-[13px] lg:text-[16px] inline-flex items-center gap-2 rounded-full px-3 py-[5px] lg:px-5 lg:py-2 border border-white/30 text-white hover:bg-white/10" href="#vendors">Explore Vendors</a>
                        </div>
                    </div>

                </motion.div>


                <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="flex items-center h-[150px] rounded-xl bg-white p-4 shadow-lg">
                        <div className="ml-[10px]">
                            <h3 className="text-[17px] sm:text-[20px] font-semibold">Seller Spotlight</h3>
                            <p className="mt-1 text-[14px] sm:text-[17px] text-gray-600">Handmade ceramics from ClayCorner.</p>
                        </div>
                    </div>


                    <div className="flex items-center h-[150px] rounded-xl bg-white p-4 shadow-lg">
                        <div className="ml-[10px]">
                            <h3 className="text-[17px] sm:text-[20px] font-semibold">Secure Payments</h3>
                            <p className="mt-1 text-[14px] sm:text-[17px] text-gray-600">We support cards, PayPal, and major wallets.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}