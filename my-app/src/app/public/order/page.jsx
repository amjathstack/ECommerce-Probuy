'use client'
import axios from "axios";
import { useEffect, useState } from "react";

export default function OrderTable() {

    const [orders, setOrders] = useState([])

    async function getAllOrders() {
        const response = await axios.get('http://localhost:3000/api/order/admin');
        setOrders(response.data.message)
    }

    const statusStyles = {
        Completed: "bg-green-500",
        pending: "bg-yellow-500",
        Cancelled: "bg-red-500",
    };

    const paymentStyles = {
        Paid: "text-green-600 font-semibold",
        pending: "text-yellow-600 font-semibold",
        Failed: "text-red-600 font-semibold",
    };

    useEffect(() => {
        getAllOrders()
    }, [])

    return (


        <div className="w-full flex items-center justify-center relative">
            <div className="hidden w-[90%] md:block overflow-x-auto bg-white rounded-xl shadow-md mt-8">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700">
                            <th className="p-3 text-left">Order ID</th>
                            <th className="p-3 text-left">Total</th>
                            <th className="p-3 text-left">Payment</th>
                            <th className="p-3 text-left">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map((order, i) => (
                            <tr key={i} className="border-b hover:bg-gray-50 transition">


                                <td className="flex p-4">
                                    <span className="text-sm font-medium">{order.orderId}</span>
                                </td>


                                <td className="p-4 text-sm">
                                    <p>SubTotal: ${order.subTotal.toFixed(2)}</p>
                                    <p>Tax: ${order.tax.toFixed(2)}</p>
                                    <p className="font-semibold">Total: ${order.total.toFixed(2)}</p>
                                </td>


                                <td className="p-4 text-sm">
                                    <div className={`flex flex-col gap-1`}>
                                        <p>Status: <span className={`${paymentStyles[order.paymentStatus]}`}>{order.paymentStatus}</span></p>
                                        <p>Method: {order.paymentMethod}</p>
                                    </div>
                                </td>


                                <td className="p-4 text-sm">
                                    <p className="mb-1 text-[14px]">Order Placed on: {order.date}</p>
                                    Order:
                                    <span
                                        className={`ml-1 px-3 py-[2px] rounded-full text-[12px] text-white ${statusStyles[order.status]}`}
                                    >
                                        {order.status}
                                    </span>
                                </td>

                            </tr>

                        ))}
                    </tbody>
                </table>
            </div>

            <div className="md:hidden space-y-4">
                {orders.map((order, i) => (
                    <div
                        key={i}
                        className="bg-white shadow-md rounded-xl p-4 border border-gray-100"
                    >
                        <div className="flex justify-between mb-2">
                            <span className="font-semibold">Order ID:</span>
                            <span>{order.orderId}</span>
                        </div>

                        <div className="flex justify-between">
                            <span>Subtotal:</span>
                            <span>${order.subTotal.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between">
                            <span>Tax:</span>
                            <span>${order.tax.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between">
                            <span>Total:</span>
                            <span className="font-bold">${order.total.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between mt-2">
                            <span>Status:</span>
                            <span
                                className={`px-2 py-1 rounded-full text-white text-sm ${statusStyles[order.status]}`}
                            >
                                {order.status}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span>Payment:</span>
                            <span className={`${paymentStyles[order.paymentStatus]}`}>
                                {order.paymentStatus}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span>Method:</span>
                            <span>{order.paymentMethod}</span>
                        </div>

                        <div className="flex justify-between mt-2">
                            <span>Order Placed:</span>
                            <span>{order.createdAt}</span>
                        </div>
                    </div>
                ))}
            </div>

        </div>


    );
}
