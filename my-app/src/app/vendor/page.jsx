"use client";
import React, { useEffect, useState } from "react";
import { ShoppingBag, Package, DollarSign, Users } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import Image from "next/image";
import preloader from "../../assets/preeloader.gif";

const Dashboard = () => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchDashboardData() {

    setLoading(true);

    try {

      const response = await axios.get('/api/vendor/dashboard');
      if (response.data.status && response.data.message) {
        setData(response.data.message);
      }

      toast.error(response.data.message);

    } catch (error) {

      toast.error(error.message);

    }

    setLoading(false);

  }

  useEffect(() => {

    fetchDashboardData()

  }, [])


  useEffect(() => {
    console.log(data)
  }, [data]);

  return (
    <div className="w-full md:w-[85%] bg-gray-50 flex md:ml-[15%]">
      <main className="flex-1 p-10">

        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Dashboard Overview
        </h2>

        {
          loading &&
          <div className="w-full flex items-center justify-center py-20">
            <Image src={preloader} alt="preloader" />
          </div>
        }

        {

          data &&

          <div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
                <div className="flex items-center justify-between">
                  <h3 className="text-gray-600 text-sm font-medium">Total Sales</h3>
                  <DollarSign className="text-indigo-600 w-5 h-5" />
                </div>
                <p className="mt-3 text-2xl font-bold text-gray-800">${data?.totalEarnings}</p>
                <p className="text-sm text-green-600 mt-1">+12% this month</p>
              </div>

              <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
                <div className="flex items-center justify-between">
                  <h3 className="text-gray-600 text-sm font-medium">Orders</h3>
                  <ShoppingBag className="text-indigo-600 w-5 h-5" />
                </div>
                <p className="mt-3 text-2xl font-bold text-gray-800">{data?.allOrders}</p>
                <p className="text-sm text-green-600 mt-1">+8% this week</p>
              </div>

              <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
                <div className="flex items-center justify-between">
                  <h3 className="text-gray-600 text-sm font-medium">Products</h3>
                  <Package className="text-indigo-600 w-5 h-5" />
                </div>
                <p className="mt-3 text-2xl font-bold text-gray-800">{data?.allProducts}</p>
                <p className="text-sm text-gray-500 mt-1">In stock</p>
              </div>

              <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
                <div className="flex items-center justify-between">
                  <h3 className="text-gray-600 text-sm font-medium">Customers</h3>
                  <Users className="text-indigo-600 w-5 h-5" />
                </div>
                <p className="mt-3 text-2xl font-bold text-gray-800">{data?.customers}</p>
                <p className="text-sm text-green-600 mt-1">+1 new today</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Recent Orders
              </h3>
              <table className="w-full text-left text-sm text-gray-600">
                <thead>
                  <tr className="border-b text-gray-500">
                    <th className="pb-3">Customer</th>
                    <th className="pb-3">City</th>
                    <th className="pb-3">Date</th>
                    <th className="pb-3">Total</th>
                    <th className="pb-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.currentOrders?.map((order) => (
                    <tr key={order._id} className="border-b last:border-0">
                      <td className="py-3">{order.customerId.name}</td>
                      <td className="py-3">{order.address.city}</td>
                      <td className="py-3">{order.createdAt.split('T')[0]}</td>
                      <td className="py-3">{order.orderStatus}</td>
                      <td className="py-3 text-right">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${order.status === "Shipped"
                            ? "bg-blue-100 text-blue-700"
                            : order.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                            }`}
                        >
                          {order.orderStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>


        }

      </main>
    </div>
  );
};

export default Dashboard;
