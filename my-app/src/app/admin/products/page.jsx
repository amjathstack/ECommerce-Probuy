"use client";
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import AdminProductsTable from "@/components/AdminProductsTable";
import AddProductModal from "@/components/AddProductsModel";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/features/products/productSlice";
import productDeleteConfirm from "@/components/productDeleteConfirm";


export default function AdminProducts() {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products)
  

  useEffect(() => {
    dispatch(fetchProducts());
    console.log(products)
  }, []);

  return (
    <div className="w-[85%] bg-gray-50 p-10 ml-[15%]">
      
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Products</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition"
        >
          <Plus size={18} /> Add Product
        </button>
      </div>

      <AdminProductsTable products={products} />
      {showModal && <AddProductModal onClose={() => setShowModal(false)} />}
  
    </div>
  );
}
