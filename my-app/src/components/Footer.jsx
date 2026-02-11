"use client"
import React from "react";

export default function Footer() {
    return (
        <footer className="mt-40 px-6 md:px-16 lg:px-24 xl:px-32 w-full">
            <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30">

                <div className="max-w-96">
                    <h1 className="text-[25px] font-semibold text-indigo-600">Probuy</h1>
                    <p className="mt-6 text-sm text-gray-500">
                        Discover unique products from hundreds of independent vendors — all in one place.
                    </p>
                </div>

                <div className="w-1/2 flex flex-wrap md:mr-40 justify-between">
                    <div>
                        <h2 className="font-semibold text-gray-900 mb-5">RESOURCES</h2>
                        <ul className="text-sm text-gray-500 space-y-2 list-none">
                            <li><a href="#">Documentation</a></li>
                            <li><a href="#">Tutorials</a></li>
                            <li><a href="#">Blog</a></li>
                            <li><a href="#">Community</a></li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="font-semibold text-gray-900 mb-5">COMPANY</h2>
                        <div className="text-sm text-gray-500 space-y-2 list-none">
                            <li><a href="#">About</a></li>
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">Privacy</a></li>
                            <li><a href="#">Terms</a></li>
                        </div>
                    </div>
                </div>

            </div>
            <p className="py-4 text-center text-xs md:text-sm text-gray-500">
                Copyright 2026 © <a href="https://prebuiltui.com">PrebuiltUI</a>. All Right Reserved.
            </p>
        </footer>
    )
}