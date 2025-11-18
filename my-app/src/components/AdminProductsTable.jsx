"use client";
import { Edit, Trash2 } from "lucide-react";

export default function AdminProductsTable({ products }) {
  return (
    <div className="overflow-x-auto bg-white shadow">
      <table className="min-w-full text-left text-gray-600">
        <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
          <tr>
            <th className="px-6 py-3">Product</th>
            <th className="px-6 py-3">Category</th>
            <th className="px-6 py-3">Price</th>
            <th className="px-6 py-3">Stock</th>
            <th className="px-6 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((p) => (
              <tr
                key={p._id}
                className="border-b last:border-none hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 font-medium text-gray-800">{p.title}</td>
                <td className="px-6 py-4">{p.category}</td>
                <td className="px-6 py-4">${p.price}</td>
                <td className="px-6 py-4">{p.stockCount}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-indigo-600 hover:text-indigo-800 mr-3">
                    <Edit size={18} />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="px-6 py-6 text-center text-gray-500">
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
