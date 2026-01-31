"use client";
import { useEffect } from "react";
import { Eye, Truck, CheckCircle, Clock, XCircle } from "lucide-react";
import { format } from 'date-fns';
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders } from "@/features/order/orderSlice";

export default function AdminOrdersList() {


    const { allOrderItems = [] } = useSelector((state) => state.orders);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchAllOrders())
    }, [dispatch,]);

    const StatusBadge = ({ status }) => {
        const colors = {
            Delivered: "bg-green-100 text-green-700",
            Shipped: "bg-blue-100 text-blue-700",
            Processing: "bg-yellow-100 text-yellow-700",
            Cancelled: "bg-red-100 text-red-700",
        };

        const icons = {
            Delivered: <CheckCircle size={14} />,
            Shipped: <Truck size={14} />,
            Processing: <Clock size={14} />,
            Cancelled: <XCircle size={14} />,
        };

        return (
            <span
                className={`px-3 py-1 rounded-full flex items-center gap-1 text-sm font-semibold ${colors[status]}`}
            >
                {icons[status]} {status}
            </span>
        );
    };

    return (
        <div className="w-full md:w-[85%] bg-gray-50 md:p-10 p-1 md:ml-[15%]">
            <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">
                    Admin — Orders List
                </h1>

                <div className="overflow-x-auto shadow rounded-xl bg-white">
                    <table className="w-full border-collapse">
                        <thead className="bg-gray-100 text-left text-gray-600 text-sm uppercase tracking-wider">
                            <tr>
                                <th className="p-4">Order ID</th>
                                <th className="p-4">Customer</th>
                                <th className="p-4">Total</th>
                                <th className="p-4">Payment</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Date</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {Array.isArray(allOrderItems) && allOrderItems?.map((order, index) => (
                                <tr key={index} className="border-b hover:bg-gray-50">
                                    <td className="p-4 font-medium text-gray-800">{order.orderId}</td>

                                    <td className="p-4">
                                        <p className="font-medium text-gray-900">
                                            {order.address.fullName}
                                        </p>
                                        <p className="text-xs text-gray-500">{order.email}</p>
                                    </td>

                                    <td className="p-4 font-semibold text-gray-800">
                                        ${order.total.toFixed(2)}
                                    </td>

                                    <td className="p-4 text-gray-700">{order.paymentMethod}</td>

                                    <td className="p-4">
                                        <StatusBadge status={order.status} />
                                    </td>

                                    <td className="p-4 text-gray-600">{format(new Date(order.createdAt), 'MMM dd, yyyy HH:mm')}</td>

                                    <td className="p-4 text-right">
                                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg flex items-center gap-2 text-sm">
                                            <Eye size={16} /> View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    );
}
