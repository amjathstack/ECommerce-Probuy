'use client'

import { X } from "lucide-react";
import { useEffect } from "react";

export default function OrderDetailsCard({ order, onSetShow }) {

    if (!order) return null;

    useEffect(() => {
        
        if(order){
            document.body.style.overflow = "hidden";
        }

        return () => document.body.style.overflow = "";

    }, [order]);

    return (
        <div className="fixed w-full h-full insert-0 top-0 left-0 flex items-center justify-center bg-white/40 z-50">
            <div className="bg-white border border-gray-100 rounded-[10px] p-6 relative">

                <div className="flex gap-60">
                    <h2 className="text-2xl font-bold mb-4">Order Details</h2>
                    <X className="text-gray-500 hover:text-gray-800"
                        onClick={() => onSetShow(false)}
                    />
                </div>


                <div className="space-y-4">

                    <div className="py-1 border-b border-gray-200 flex gap-2">
                        <p className="font-semibold text-gray-700">Order ID:</p>
                        <p className="text-gray-900">{order.orderId}</p>
                    </div>

                    <div className="py-1 border-b border-gray-200">
                        <p className="font-semibold text-gray-700">Items:</p>
                        <ul className="list-disc list-inside text-gray-900 space-y-1">
                            {order.subOrders.map((item, index) => (
                                <li key={index}>
                                    {item.title} x {item.quantity} (${item.price})
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="py-1 border-b border-gray-200 flex justify-between text-gray-700">
                        <span>SubTotal:</span>
                        <span>${order.subTotal.toFixed(2)}</span>
                    </div>

                    <div className="py-1 border-b border-gray-200 flex justify-between text-gray-700">
                        <span>Tax:</span>
                        <span>${order.tax.toFixed(2)}</span>
                    </div>

                    <div className="py-1 border-b border-gray-200 flex justify-between font-bold text-gray-900">
                        <span>Total:</span>
                        <span>${order.total.toFixed(2)}</span>
                    </div>

                    <div className="py-1 border-b border-gray-200 flex justify-between">
                        <span className="font-semibold text-gray-700">Status:</span>
                        <span
                            className={`px-2 py-1 rounded-full text-sm font-medium ${order.status === 'delivered'
                                ? 'bg-green-100 text-green-700'
                                : order.status === 'pending'
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'bg-yellow-100 text-yellow-700'
                                }`}
                        >
                            {order.orderStatus}
                        </span>
                    </div>

                    <div className="py-1 border-b border-gray-200 flex justify-between text-gray-700">
                        <span>Payment Status:</span>
                        <span>{order.paymentStatus}</span>
                    </div>

                    <div className="py-1 border-b border-gray-200 flex justify-between text-gray-700">
                        <span>Payment Method:</span>
                        <span>{order.paymentMethod}</span>
                    </div>

                    <div className="py-1 border-b border-gray-200">
                        <p className="font-semibold text-gray-700">Shipping Address:</p>
                        <p className="text-gray-900">{order.address.city}</p>
                    </div>

                    <div className="py-1 border-b border-gray-200 flex justify-between text-gray-700">
                        <span>Ordered On:</span>
                        <span>{new Date(order.createdAt).toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
