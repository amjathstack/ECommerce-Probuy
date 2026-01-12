'use client'
import OrderDetailsCard from "@/components/OrderDetailsCard";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function OrderPage() {

    const { orderItems = [] } = useSelector((state) => state.orders);
    const [ showOrderDetails, setShowOrderDetails ] = useState(false);
    const dispatch = useDispatch();

    return (
        <div className="w-full min-h-screen bg-gray-100 p-6 flex flex-col items-center">
            <h1 className="text-xl md:text-3xl font-bold mb-6">My Orders</h1>
            <div className="md:w-[80%] w-[100%] grid gap-4">
                {Array.isArray(orderItems) ? orderItems.map((order, index) =>
                    <div
                        key={index}
                        className="bg-white p-6 rounded-md shadow-md flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                    >
                        {showOrderDetails && <OrderDetailsCard order={order} onSetShow={setShowOrderDetails} />}
                        <div className="md:flex gap-5">
                            <p className="text-sm sm:text-lg font-semibold">Order ID: {order.orderId}</p>
                            <p className="text-gray-700">Order Placed: {new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>

                        <div className="md:flex-row gap-5 flex flex-col items-start md:items-end">
                            <p className="text-sm sm:text-lg font-bold">Total: ${order.total.toFixed(2)}</p>
                            <div className="flex justify-center md:flex-row gap-5">
                                <span
                                    className={`px-3 py-1 rounded-full text-[12px] sm:text-sm font-medium mt-2 ${order.status === "delivered"
                                        ? "bg-green-100 text-green-700"
                                        : order.status === "pending"
                                            ? "bg-blue-100 text-blue-700"
                                            : "bg-yellow-100 text-yellow-700"
                                        }`}
                                >
                                    {order.status}
                                </span>
                                <button onClick={() => setShowOrderDetails(true)} className="cursor-pointer text-[12px] md:text-sm rounded-full">
                                    View details
                                </button>
                            </div>
                        </div>
                    </div>
                ) : <p className="text-center">Orders not found</p>
                }
            </div>
        </div>
    );
}
