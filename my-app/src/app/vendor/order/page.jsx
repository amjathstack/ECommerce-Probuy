"use client";
import { useEffect, useState } from "react";
import { format } from 'date-fns';
import axios from "axios";
import { toast } from "react-toastify";
import preloader from "../../../assets/preeloader.gif";
import Image from "next/image";

export default function AdminOrdersList() {

    const [orders, setOrders] = useState(null);
    const [isOpen, setIsOpen] = useState(null);
    const [loading, setLoading] = useState(false);

    const statuses = ['Pending', 'Processing', 'Delivered'];


    async function fetchOrders() {

        setLoading(true)

        try {

            const response = await axios.get('/api/vendor/orders');

            if (response.data.message && response.data.status) {
                setOrders(response.data.message);
            } else {
                toast.error(response.data.message);
            }

        } catch (error) {

            toast.error(error.message);

        }

        setLoading(false);

    }

    const changeStatus = async (id, status) => {


        try {

            const response = await axios.put('/api/vendor/orders', { subOrderId: id, status }, { headers: { "Content-Type": "application/json" } });

            if (response.data.status && response.data.message) {

                toast.success("Status updated");

                const updatedOrderList = orders.map((o) =>
                    o.orderDetails._id === response.data.message._id
                        ? { ...o, orderDetails: { ...o.orderDetails, status: response.data.message.status } }
                        : { ...o }
                );

                setOrders(updatedOrderList);

            } else {

                toast.error(response.data.message);
            }

        } catch (error) {

            toast.error(error.message);

        }

    }

    useEffect(() => {

        fetchOrders()

    }, []);

    useEffect(() => {
        console.log(orders)
    }, [orders])


    return (
        <div className="w-full bg-gray-50 md:w-[85%] md:p-10 p-1 md:ml-[15%]">
            <div className="">
                <h1 className="text-xl font-semibold text-gray-800 mb-6">
                    Orders List
                </h1>

                <div className="overflow-x-auto rounded-xl bg-white">
                    <table className="w-full">
                        <thead className="text-left text-gray-500 uppercase">
                            <tr className="text-[14px]">
                                <th className="p-4">Customer</th>
                                <th className="p-4">Items</th>
                                <th className="p-4">Address</th>
                                <th className="p-4">Total</th>
                                <th className="p-4">Payment</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Date</th>
                            </tr>
                        </thead>

                        <tbody>
                            {Array.isArray(orders) && orders?.map((order, index) => (
                                <tr key={index} className="text-[13px] hover:bg-gray-50 border-t border-gray-200">
                                    <td className="p-4 font-medium text-gray-800"> <span>{order.customerId.name}</span> </td>

                                    <td className="p-4">
                                        {order?.orderDetails?.Items?.map((i) => (
                                            <div key={i._id}>
                                                <span >{i.title} (X{i.quantity})</span> <br />
                                            </div>
                                        ))}
                                    </td>

                                    <td className="p-4 text-gray-800">
                                        {order?.address?.name}, {order?.address?.streetAddress1} {order?.address?.streetAddress2}<br />
                                        {order?.address?.city}, {order?.address?.province}, {order?.address?.postalCode}
                                    </td>

                                    <td className="p-4 text-gray-800">
                                        ${order?.orderDetails?.subTotal?.toFixed(2)}
                                    </td>

                                    <td className="p-4 max-h-20">
                                        {order?.paymentMethod}
                                    </td>

                                    <td className="p-4 max-h-20">

                                        <div>
                                            <div className="flex flex-col w-40 text-sm">
                                                <button type="button" onClick={() => setIsOpen(isOpen !== index ? index : null)}
                                                    className="w-full border px-4 text-left py-2 rounded bg-white text-gray-800 border-gray-300 hover:bg-gray-50 focus:outline-none"
                                                >
                                                    <span>{order.orderDetails.status}</span>
                                                </button>

                                                {isOpen === index && (
                                                    <ul className="absolute w-40 bg-white border border-gray-300 rounded shadow-md mt-10 py-2">
                                                        {statuses.map((status) => (
                                                            <li key={status}
                                                                className="px-4 py-2 hover:bg-indigo-500 hover:text-white cursor-pointer"
                                                                onClick={() => {
                                                                    changeStatus(order.orderDetails._id, status);
                                                                    setIsOpen(null);
                                                                }} >
                                                                {status}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        </div>

                                    </td>

                                    <td className="p-4 text-gray-600">{format(new Date(order.createdAt), 'MMM dd, yyyy HH:mm')}</td>
                                </tr>
                            ))}

                            {
                                !loading && orders && orders.length === 0 && (
                                    <tr>
                                        <td className="py-10" colSpan="100%" style={{ textAlign: "center" }}>
                                            Products not found
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>

                    {
                        loading &&
                        <div className="w-full flex justify-center py-20">
                            <Image src={preloader} alt="preloader" />
                        </div>

                    }

                </div>
            </div>
        </div>

    );
}
