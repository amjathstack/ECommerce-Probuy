"use client";
import { X } from "lucide-react";
import upload_icon from '../../public/icons/upload_icon.svg'
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, clearProductDetails, fetchProductTitle } from "@/features/products/productSlice";
import { auth } from "@/firebase";

export default function AddProductModal({ onClose }) {

    const { productTitle, loading } = useSelector((state) => state.products)
    const token = auth.currentUser?.accessToken || "";

    const arr = productTitle
        .split("\n")
        .filter(line => line.trim() !== "")
        .map(line => line.replace(/\*\*/g, "").trim());
    const dispatch = useDispatch();
    const fileInputUseRef1 = useRef(null);
    const [files, setFiles] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [stockCount, setStockCount] = useState('');
    const [firstFiletracker, setFirstFiletracker,] = useState(true)

    const fileInputChange1 = (file) => {
        setFiles((prev) => [...prev, file]);
        setPreviewUrls((prev) => [...prev, URL.createObjectURL(file)]);
        if (firstFiletracker) {
            const formData = new FormData();
            formData.append('image', file)
            dispatch(fetchProductTitle(formData));
            setFirstFiletracker(false)
        }

    }

    const handleClickPhoto1 = () => {
        if (fileInputUseRef1.current) {
            fileInputUseRef1.current.click()
        }
    }

    const handleRemoveImage = (f) => {
        setFiles((prev) => prev.filter((_, i) => i !== f));
        setPreviewUrls((prev) => prev.filter((_, i) => i !== f));
    }

    const handleSubmit = (e) => {

        e.preventDefault();
        const formData = new FormData;

        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('stockCount', stockCount);

        files.forEach((file) => formData.append('image', file));

        dispatch(addProduct({formData, token}));
        setFirstFiletracker(true);
        dispatch(clearProductDetails());
        onClose();
    }

    const closeCard = () => {
        onClose()
        dispatch(clearProductDetails());
    }

    useEffect(() => {
        if (arr[0]) {
            let titleArray = arr[0].split('');
            titleArray.forEach((char, index) => {
                setTimeout(() => {
                    setTitle((prev) => prev + char);
                }, 70 * index); 
            });
        }
        if (arr[1]) {
            let descriptionArray = arr[1].split('');
            descriptionArray.forEach((char, index) => {
                setTimeout(() => {
                    setDescription((prev) => prev + char);
                }, 40 * index); 
            });
        }
    }, [productTitle]);




    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 py-20 overflow-scroll-y">
            <div className="bg-white rounded-xl shadow-lg p-6 px-8 relative">
                <button
                    onClick={() => closeCard()}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                >
                    <X size={20} />
                </button>

                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                    Add New Product
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">


                    <div className="flex w-full items-center gap-1" >

                        {previewUrls.length > 0 && previewUrls.map((f, i) =>
                            <div className="relative" key={i}>
                                <Image
                                    src={f}
                                    alt={`Uploaded image ${i + 1}`}
                                    width={90}
                                    height={90}
                                    className="w-[90px] h-[90px] border border-gray-200 object-cover rounded-lg"
                                />
                                <button
                                    className="flex items-center justify-center absolute top-[5px] right-[5px] text-[red] rounded-full w-4 h-4 bg-gray-100"
                                    onClick={() => handleRemoveImage(i)}
                                    type="button"
                                >
                                    <span className="mb-[2px]">-</span>
                                </button>
                            </div>
                        )}

                        {files.length + 1 <= 5 &&
                            <div>
                                <Image onClick={() => handleClickPhoto1()} className="w-[90px] border border-gray-200" src={upload_icon} alt={upload_icon} />
                                <input type="file" ref={fileInputUseRef1} onChange={(e) => Array.from(e.target.files).forEach(fileInputChange1)} className="hidden" />
                            </div>
                        }


                    </div>

                    <div className="mt-8">
                        <label className="block text-sm font-medium mb-1">Product Name</label>
                        <input
                            type="text"
                            disabled={loading}
                            placeholder={loading ? 'Title Generating...' : 'Enter the title'}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title || ""}
                        />
                    </div>

                    <div className="mt-8">
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                            placeholder={loading ? 'Description Generating...' : 'Enter the description'}
                            className="w-full h-35 max-h-40 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                        />
                    </div>

                    <div className="mt-5">
                        <label className="block text-sm font-medium mb-1">Category</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
                            onChange={(e) => setCategory(e.target.value)}
                            value={category}
                        />

                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-5">
                        <div>
                            <label className="block text-sm font-medium mb-1">Price ($)</label>
                            <input
                                type="number"
                                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
                                onChange={(e) => setPrice(e.target.value)}
                                value={price}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Stock</label>
                            <input
                                type="number"
                                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
                                onChange={(e) => setStockCount(e.target.value)}
                                value={stockCount}
                            />
                        </div>

                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition mt-5"
                    >
                        Save Product
                    </button>
                </form>
            </div>
        </div>
    );
}
