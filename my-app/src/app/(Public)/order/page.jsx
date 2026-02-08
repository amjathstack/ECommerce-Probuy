'use client'
import OrderDetailsCard from "@/components/OrderDetailsCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function OrderPage() {

    const [showOrderDetails, setShowOrderDetails] = useState(false);
    const [orders, setOrders] = useState([]);

    async function fetchOrders() {

        try {

            const response = await axios.get('/api/order');

            if (response.data.message && response.data.status) {
                setOrders(response.data.message);
                return
            }

            toast.error(response.data.message);

        } catch (error) {

            toast.error(response.data.message);

        }
    }

    useEffect(() => {
        fetchOrders()
    }, []);

    useEffect(() => {
        console.log(orders)
    }, [orders])

    return (
        <div className="w-full min-h-screen p-6 flex flex-col items-center">
            {showOrderDetails && <OrderDetailsCard order={showOrderDetails} onSetShow={setShowOrderDetails} />}

            <div className="md:w-[90%] w-full">
                <h1 className="ml-5 text-xl md:text-2xl font-semibold py-10">My Orders</h1>
            </div>

            <div className="md:w-[90%] w-[100%] grid gap-4">

                {Array.isArray(orders) && orders.length > 0 ? orders.map((order, index) =>
                    <div
                        key={index}
                        className="border border-gray-300 shadow-sm bg-white p-6 gap-3 rounded-md flex flex-col md:flex-row md:justify-between"
                    >
                        <div className="gap-5">
                            <p className="text-sm text-[14px] text-gray-900 font-semibold"><span className="text-sm text-[16px]">Order ID:</span> {order.orderId}</p>
                            <p className="text-gray-700 text-[14px]">Order Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>

                        <div>
                            <p className="text-sm text-[16px] text-gray-900">Items:</p>
                            <p className="text-gray-700 sm:text-[14px]">
                                {order?.items?.map((item, index) => (
                                    <span key={index}>
                                        {item.title} (x{item.quantity})
                                        <br />
                                    </span>
                                ))}
                            </p>
                        </div>

                        <div className="gap-5">
                            <p className="text-sm text-[12px] text-gray-700">Sub Total: ${order.subTotal.toFixed(2)}</p>
                            <p className="text-sm text-[12px] text-gray-700">Tax: ${order.tax.toFixed(2)}</p>
                            <p className="text-sm text-[14px] text-gray-900">Total: ${order.total.toFixed(2)}</p>
                        </div>

                        <div>
                            <p className="text-sm text-[16px] text-gray-900">Address:</p>
                            <p className="text-gray-700 text-[14px]">{order.address.name + ", " + order.address.streetAddress1 + " " + order.address.streetAddress2}</p>
                            <p className="text-gray-700 text-[14px]">{order.address.city + ", " + order.address.province + ", " + order.address.postalCode}</p>
                        </div>

                        <div className="gap-5">
                            <p className="w-22 p-1 h-6 border border-gray-500 flex items-center justify-center bg-gray-200 rounded-full text-sm sm:text-lg sm:text-[13px]">{order.orderStatus}</p>
                        </div>

                    </div>
                ) : <p className="text-center">Orders not found</p>
                }
            </div>
        </div>
    );
}
