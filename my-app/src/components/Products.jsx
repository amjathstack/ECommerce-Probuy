import React, { useEffect, useState } from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import { addToCart, addToCartItems } from '@/features/cart/cartSlice';

const Products = () => {

  const [activeCategory, setActiveCategory] = useState('All');
  const [savedProducts, setSavedProducts] = useState([]);
  const { data: session } = useSession();
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  async function fetchSavedProducts() {

    const response = await axios.get('/api/save_products');

    if (response) {
      setSavedProducts(response.data.message)
    }

  }

  async function saveProduct(productId) {

    const response = await axios.post('/api/save_products', { productId }, { headers: { 'Content-type': 'application/json' } });

    if (savedProducts.includes(productId)) {
      setSavedProducts(Prev => Prev.filter((i) => i !== productId));
    } else {
      setSavedProducts(Prev => Prev ? [...Prev, productId] : [productId]);
      toast.success(response.data.message)
    }
  }

  useEffect(() => {
    fetchSavedProducts()
  }, [])

  return (
    <section className="w-full mx-auto px-6 sm:px-6 lg:px-50 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">

        <div>
          <h2 className="text-xl md:text-3xl font-bold text-slate-900">Recommended for You</h2>
          <p className="text-slate-500 mt-1">Curated products from our top-rated vendors</p>
        </div>

        <div className="flex items-center gap-3 w-auto pb-2 md:pb-0">
          {['All', 'Electronics', 'Fashion', 'Accessories', 'Home'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${activeCategory === cat
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-400'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-20">

        {Array.isArray(products) && products?.map((product) => (

          <div key={product?._id} className="group h-60 md:h-95 bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300">

            <div className="h-[60%] w-full relative aspect-square overflow-hidden bg-slate-100">
              <Link href={`/product/${product._id}`}>
                <Image
                  width={1000}
                  height={1000}
                  src={product?.image[0]}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </Link>
              <div className="absolute top-3 right-3 flex flex-col gap-2 transform translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                <button onClick={() => {
                  if (session) {
                    saveProduct(product?._id);
                  } else {
                    toast.error("Please log in to save products")
                  }

                }} className="p-2 z-50 bg-white rounded-full shadow-md text-slate-600 hover:text-red-500 transition-colors">
                  <Heart className={savedProducts.includes(product?._id) ? "fill-red-500 stroke-red-500" : ""} size={18} />
                </button>
              </div>
            </div>


            <div className="p-5">

              <div className="flex items-center justify-between mb-1">

                <span className="text-[8px] md:text-[10px] uppercase tracking-widest font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                  {product.category}
                </span>

                <div className="flex items-center text-yellow-500">
                  <Star size={14} fill="currentColor" />
                  <span className="text-xs font-bold ml-1 text-slate-700">{product.rating}</span>
                </div>

              </div>

              <h3 className="text-[13px] md:text-[18px] font-semibold text-slate-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                {product.title}
              </h3>

              <p className="text-xs text-slate-400 mb-4">by <span className="underline cursor-pointer hover:text-slate-600">{product.vendorId.title}</span></p>

              <div className="mb-6 flex items-start justify-between">
                <div>
                  <span className="text-xl font-black text-slate-900">${product.price}</span>
                </div>
                <button onClick={() => {
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
                  formData.append('quantity', 1);

                  dispatch(addToCart(formData));
                  dispatch(addToCartItems({ vendorId: product?.vendorId, productId: product?._id, title: product?.title, image: product?.image, price: product?.price, quantity: 1 }));

                }} className="hidden md:flex items-center justify-center p-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors">
                  <ShoppingCart size={18} />
                </button>
              </div>
            </div>
          </div>

        ))}



      </div>

      <div className="mt-12 text-center">
        <button className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 font-bold rounded-xl hover:bg-indigo-600 hover:text-white transition-all">
          View All Products
        </button>
      </div>
    </section>
  );
};

export default Products;