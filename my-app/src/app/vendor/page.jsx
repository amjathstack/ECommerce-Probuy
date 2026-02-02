"use client";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ShoppingBag, Package, DollarSign, Users } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/features/products/productSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { vendorProducts } = useSelector((state) => state.products);
  const totalInStockCount = vendorProducts?.reduce((total, item) => total + item?.stockCount, 0) 
  const [salesData] = useState([
    { month: "Jan", sales: 3200 },
    { month: "Feb", sales: 4100 },
    { month: "Mar", sales: 3700 },
    { month: "Apr", sales: 5200 },
    { month: "May", sales: 6100 },
    { month: "Jun", sales: 5400 },
  ]);



  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  return (
    <div className="w-full md:w-[85%] bg-gray-50 flex md:ml-[15%]">
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Dashboard Overview
        </h2>


        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-600 text-sm font-medium">Total Sales</h3>
              <DollarSign className="text-indigo-600 w-5 h-5" />
            </div>
            <p className="mt-3 text-2xl font-bold text-gray-800">$24,560</p>
            <p className="text-sm text-green-600 mt-1">+12% this month</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-600 text-sm font-medium">Orders</h3>
              <ShoppingBag className="text-indigo-600 w-5 h-5" />
            </div>
            <p className="mt-3 text-2xl font-bold text-gray-800">356</p>
            <p className="text-sm text-green-600 mt-1">+8% this week</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-600 text-sm font-medium">Products</h3>
              <Package className="text-indigo-600 w-5 h-5" />
            </div>
            <p className="mt-3 text-2xl font-bold text-gray-800">{totalInStockCount}</p>
            <p className="text-sm text-gray-500 mt-1">In stock</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-600 text-sm font-medium">Customers</h3>
              <Users className="text-indigo-600 w-5 h-5" />
            </div>
            <p className="mt-3 text-2xl font-bold text-gray-800">1,248</p>
            <p className="text-sm text-green-600 mt-1">+5 new today</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Recent Orders
          </h3>
          <table className="w-full text-left text-sm text-gray-600">
            <thead>
              <tr className="border-b text-gray-500">
                <th className="pb-3">Order ID</th>
                <th className="pb-3">Customer</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Total</th>
                <th className="pb-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  id: "#A1024",
                  name: "John Doe",
                  date: "Oct 24, 2025",
                  total: "$249.99",
                  status: "Shipped",
                },
                {
                  id: "#A1023",
                  name: "Sarah Smith",
                  date: "Oct 22, 2025",
                  total: "$89.99",
                  status: "Pending",
                },
                {
                  id: "#A1022",
                  name: "James Wilson",
                  date: "Oct 21, 2025",
                  total: "$179.00",
                  status: "Delivered",
                },
              ].map((order) => (
                <tr key={order.id} className="border-b last:border-0">
                  <td className="py-3">{order.id}</td>
                  <td className="py-3">{order.name}</td>
                  <td className="py-3">{order.date}</td>
                  <td className="py-3">{order.total}</td>
                  <td className="py-3 text-right">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${order.status === "Shipped"
                        ? "bg-blue-100 text-blue-700"
                        : order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                        }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
