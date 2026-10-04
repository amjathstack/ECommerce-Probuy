"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/features/products/productSlice";
import { addToCart, addToCartItems } from "@/features/cart/cartSlice";
import profile from "../../../../../public/icons/profile.jpg";
import RatingStar from "@/components/RatingStar";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import axios from "axios";
import { ChevronRight, EyeIcon, Heart, RefreshCw, ShieldCheck, ShoppingBag, StarIcon, Store, Truck } from "lucide-react";


export default function ProductView({ params }) {

  const router = useRouter()
  const resolvedParams = React.use(params);
  const id = resolvedParams?.id
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);
  const [rating, setRating] = useState(0);
  const [product, setProduct] = useState(null);

  const { data: session } = useSession();



  const [mainImage, setMainImage] = useState(Array.isArray(product?.image) ? product?.image[0] : null);
  const existItemInCart = cartItems?.find((i) => i.productId === product?._id);

  const [reviewList, setReviewList] = useState(product?.reviews || []);

  const [quantity, setQuantity] = useState(1);
  const [comment, setComment] = useState("");


  const handleAddComment = async (e) => {
    e.preventDefault();

    if (!session) {
      toast.warning("Please login to add comments");
    }

    if (rating <= 0) {
      return toast.error('Please select the star rating!');
    }

    const formData = new FormData();
    formData.append('productId', product?._id);
    formData.append('userId', session?.user?.id);
    formData.append('rating', rating);
    formData.append('comment', comment);

    const response = await axios.post("/api/reviews", formData);

    if (response.data.status && response.data.message) {
      setComment(setReviewList(response.data.message))
    } else {
      return toast.error(response.data.message)
    }

    setRating(0);
    setComment('')
  };


  const handleCart = () => {

    if (!session) {
      toast.warning("Please log in to use the cart");
      return;
    }

    const formData = new FormData();
    formData.append('productId', product?._id);
    formData.append('vendorId', product.vendorId?._id);
    formData.append('title', product?.title);
    formData.append('image', product?.image[0]);
    formData.append('price', product?.price);
    formData.append('quantity', quantity);

    dispatch(addToCart(formData));
    dispatch(addToCartItems({ vendorId: product?.vendorId, productId: product?._id, title: product?.title, image: product?.image, price: product?.price, quantity }));

  };

  async function fetchProduct() {

    const response = await axios.get(`/api/products/product_by_id?productId=${id}`);

    if (response) {
      setProduct(response.data.message)
    }

  }

  useEffect(() => {
    dispatch(fetchProducts())
  }, []);

  useEffect(() => {
    setMainImage(Array.isArray(product?.image) ? product?.image[0] : null);
  }, [product]);

  useEffect(() => {
    fetchProduct()
  }, []);

  useEffect(() => {
    if (product) {
      setReviewList(product?.reviews)
    }
  }, [product]);

  return (
    <div className="bg-gray-50 w-full felx justify-center">

      <div className="w-full p-6 md:p-10 lg:px-50 relative">

        <nav className="mx-auto flex items-center gap-2 text-sm text-slate-400">
          <span>Marketplace</span> <ChevronRight size={14} />
          <span>Electronics</span> <ChevronRight size={14} />
          <span className="text-slate-900 font-medium truncate">{product?.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">

          <div className="w-[100%] flex flex-col items-center lg:items-start">
            <div className="flex items-center justify-center w-[100%] aspect-[4/3] overflow-hidden rounded-xl border border-gray-100 lg:w-[80%] md:w-[80%]">

              {
                mainImage &&

                <Image
                  src={mainImage}
                  alt={product?.title || "Product Image"}
                  className="object-cover rounded-lg w-full h-full"
                  width={1000}
                  height={1000}
                />

              }

            </div>

            <div className="w-[100%] mt-4 flex gap-3 lg:w-[80%] md:w-[80%]">
              {Array.isArray(product?.image) && product?.image.map((image, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImage(image)}
                  className={`w-20 h-20 rounded-lg border-2 overflow-hidden ${mainImage === image ? "border-indigo-500" : "border-transparent"
                    }`}
                >
                  <img
                    src={image}
                    alt={`thubnail-${idx}`}
                    className="object-cover rounded-lg w-full"
                  />
                </button>
              ))}
            </div>

          </div>


          <div>

            <div className="space-y-4">

              <div className="flex items-center gap-2">

                <span className="bg-indigo-50 text-indigo-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Top Rated</span>

                <div className="flex items-center text-yellow-400 gap-1 ml-2">
                  <StarIcon size={16} fill="currentColor" />
                  <span className="text-slate-900 font-bold">{product?.rating}</span>
                  <span className="text-slate-400 font-normal">( reviews)</span>
                </div>

              </div>

              <h1 className="text-3xl md:text-3xl font-black text-slate-900 leading-tight mt-2">
                {product?.title}
              </h1>

              <div className="flex items-end gap-3 mt-2">
                <span className="text-2xl font-black text-slate-900">${product?.price}</span>
                <span className="text-slate-400 line-through text-lg">$349.99</span>
              </div>

            </div>

            <p className="text-sm text-slate-500 leading-relaxed mt-2">
              {product?.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-4">

              {
                existItemInCart
                  ?
                  <button className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-95">
                    <EyeIcon size={20} />
                    View cart
                  </button>
                  : <button onClick={() => handleCart()} className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-95">
                    <ShoppingBag size={20} />
                    Add to Cart
                  </button>

              }

              <button className="p-4 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-red-500 hover:border-red-100 transition-all">
                <Heart className="text-[red]" size={24} />
              </button>
            </div>

            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-300 mt-4">

              <div className="flex items-center justify-between">
                <div className="flex pb-3 items-center gap-3">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 font-bold">
                    <Store size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{product?.vendorId?.name}</h4>
                    <p className="text-xs text-slate-400">Verified Probuy Vendor since 2021</p>
                  </div>
                </div>
                <button className="text-xs font-bold text-indigo-600 hover:underline">Visit Store</button>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200">
                <div className="text-center pt-2">
                  <p className="text-sm font-bold"> 52</p>
                  <p className="text-[10px] text-slate-400 uppercase">Rating</p>
                </div>
                <div className="text-center pt-2 border-x border-slate-200">
                  <p className="text-sm font-bold"> 10</p>
                  <p className="text-[10px] text-slate-400 uppercase">Products</p>
                </div>
                <div className="text-center pt-2">
                  <p className="text-sm font-bold text-green-600">98%</p>
                  <p className="text-[10px] text-slate-400 uppercase">Ship Rate</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="flex items-center sm:justify-center gap-2 text-xs text-slate-500 font-medium">
                <Truck size={16} className="text-indigo-600" /> Free Shipping
              </div>
              <div className="flex items-center sm:justify-center gap-2 text-xs text-slate-500 font-medium">
                <RefreshCw size={16} className="text-indigo-600" /> 30-Day Returns
              </div>
              <div className="flex items-center sm:justify-center gap-2 text-xs text-slate-500 font-medium">
                <ShieldCheck size={16} className="text-indigo-600" /> Secure Checkout
              </div>
            </div>

          </div>

        </div>


        <div className="md:w-[50%] mt-10 border-t border-gray-300 pt-6">
          <h2 className="text-lg font-semibold text-gray-800">Customer Reviews</h2>

          <div className="mt-4 space-y-4">
            {Array.isArray(reviewList) && reviewList.length > 0 && reviewList?.map((c, i) => (
              <div key={i} className="mt-2 p-4 bg-gray-50 rounded-lg border border-gray-100 w-full lg:w-[50%]">
                <div className="flex gap-2 items-center">
                  <Image src={c?.userId?.profileImage || profile} width={1000} height={1000} className="w-6 h-6 border border-gray-300 rounded-full" alt="profile-image" />
                  <p className="text-[13px] text-gray-800">{c?.userId?._id === session?.user?.id ? "You" : c?.userId?.name}</p>
                </div>

                <p className="text-gray-600 text-sm mt-1">{c?.comment}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleAddComment} className="mt-6">
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
              Add a Comment
            </label>
            <RatingStar rating={rating} setRating={setRating} />
            <textarea
              required
              id="comment"
              rows="3"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts about this product..."
              className="mt-2 w-full rounded-lg border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="mt-3 rounded-full bg-indigo-600 text-white px-6 py-2 text-sm font-medium hover:bg-indigo-700"
            >
              Post Comment
            </button>
          </form>
        </div>


      </div>
    </div>
  );
}