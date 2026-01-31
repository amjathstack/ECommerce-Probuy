"use client";
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import AdminProductsTable from "@/components/AdminProductsTable";
import AddProductModal from "@/components/AddProductsModel";
import { useDispatch, useSelector } from "react-redux";
import { fetchVendorProducts } from "@/features/products/productSlice";
import productDeleteConfirm from "@/components/productDeleteConfirm";
import axios from "axios";
import { toast } from "react-toastify";


export default function AdminProducts() {

  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const { vendorProducts } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchVendorProducts());
  }, []);

  return (
    <div className="w-full md:w-[85%] bg-gray-50 p-10 md:ml-[15%]">

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Products</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition"
        >
          <Plus size={18} /> Add Product
        </button>
      </div>

      <AdminProductsTable products={vendorProducts} />
      {showModal && <AddProductModal onClose={() => setShowModal(false)}/>}

    </div>
  );
}
