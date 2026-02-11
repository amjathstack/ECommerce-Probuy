"use client";
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import AdminProductsTable from "@/components/AdminProductsTable";
import AddProductModal from "@/components/AddProductsModel";
import { useDispatch, useSelector } from "react-redux";
import { fetchVendorProducts } from "@/features/products/productSlice";


export default function AdminProducts() {

  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const { vendorProducts, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchVendorProducts());
  }, []);

  return (
    <div className="w-full md:w-[85%] bg-gray-50 p-10 md:ml-[15%]">

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-semibold text-gray-800">Products</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex text-[14px] items-center gap-2 cursor-pointer bg-indigo-600 text-white px-3 py-1 rounded-full hover:bg-indigo-700 transition"
        >
          <Plus size={16} /> Add Product
        </button>
      </div>

      <AdminProductsTable products={vendorProducts} loading={loading} />
      {showModal && <AddProductModal onClose={() => setShowModal(false)} />}

    </div>
  );
}
