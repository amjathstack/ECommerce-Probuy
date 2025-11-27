import React from "react";

export default function Footer() {
    return (
        <footer className="mt-12 border-t border-gray-100 pt-8 pb-12">
            <div className="text-center sm:text-space-between max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="sm:text-start">
                    <div className="font-extrabold text-lg">MarketHub</div>
                    <p className="mt-2 text-sm text-gray-600">A marketplace where creators and buyers meet.</p>
                </div>

                <div className="text-sm text-gray-600 sm:text-start">
                    <h5 className="font-semibold">Company</h5>
                    <ul className="mt-2 space-y-2">
                        <li>About</li>
                        <li>Careers</li>
                        <li>Press</li>
                    </ul>
                </div>

                <div className="text-sm text-gray-600 sm:text-start">
                    <h5 className="font-semibold">Support</h5>
                    <ul className="mt-2 space-y-2">
                        <li>Help center</li>
                        <li>Seller resources</li>
                        <li>Contact us</li>
                    </ul>
                </div>
            </div>

            <div className="mt-12 text-center text-xs text-gray-500">© {new Date().getFullYear()} MarketHub — All rights reserved</div>
        </footer>
    )
}