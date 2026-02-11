"use client";
import { deleteProduct } from "@/features/products/productSlice";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import EditProductModal from "./EditProductsModel";
import Image from "next/image";
import preloader from "../../src/assets/preeloader.gif"

export default function AdminProductsTable({ products, loading }) {

  const [showEditTable, setShowEditTable] = useState(false);

  const dispatch = useDispatch();

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-gray-600 bg-white">
        <thead className="text-gray-500 text-[13px] uppercase">
          <tr>
            <th className="px-6 py-3">Product</th>
            <th className="px-6 py-3">Category</th>
            <th className="px-6 py-3">Price</th>
            <th className="px-6 py-3">Stock</th>
            <th className="px-6 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products && products.length > 0 && (
            products.map((p) => (
              <tr
                key={p._id}
                className="text-[13px] border-t border-gray-200 last:border-none hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 font-medium text-gray-800">{p.title}</td>
                <td className="px-6 py-4">{p.category}</td>
                <td className="px-6 py-4">${p.price}</td>
                <td className="px-6 py-4">{p.stockCount}</td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => setShowEditTable(p)}
                    className="text-indigo-600 hover:text-indigo-800 mr-6"
                  >
                    <Edit size={16} />
                  </button>
                  <button onClick={() => dispatch(deleteProduct({ productId: p._id }))} className="text-red-500 hover:text-red-700">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))
          )}

          {
            !loading && products && products.length === 0 && (
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
        !products.length > 0 && loading &&
        <div className="w-full flex justify-center py-20">
          <Image src={preloader} alt="preloader" />
        </div>

      }

      {showEditTable && <EditProductModal onClose={setShowEditTable} data={showEditTable} />}
    </div>
  );
}
