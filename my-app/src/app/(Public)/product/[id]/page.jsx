"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import back_icon from '../../../../../public/icons/back.svg'
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/features/products/productSlice";
import { addToCart, addToCartItems } from "@/features/cart/cartSlice";
import user_icon from '../../../../../public/icons/user.svg'
import { addComment, addToComment, clearCommentList, fetchComments } from "@/features/comments/commentSlice";
import RatingStar from "@/components/RatingStar";
import { toast } from "react-toastify";


export default function ProductView({ params }) {

  const router = useRouter()
  const resolvedParams = React.use(params);
  const id = resolvedParams?.id
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { commentList = [] } = useSelector((state) => state.comment);
  const totalRating = commentList.length && commentList.reduce((sum, c) => sum + c.rating, 0);
  const totalComment = commentList.length;
  const [rating, setRating] = useState(0);


  const { products } = useSelector((state) => state.products)

  const product = products.find((item) => item._id === id);
  const [mainImage, setMainImage] = useState(product?.image[0]);
  const existItemInCart = cartItems?.find((i) => i.productId === product?._id)

  const [quantity, setQuantity] = useState(1);
  const [comment, setComment] = useState("");

  const handleAddComment = (e) => {
    e.preventDefault();
    if (rating <= 0) {
      return toast.error('Please select the star rating!')
    }

    const formData = new FormData();
    formData.append('productId', product?._id);
    formData.append('userId', user?._id);
    formData.append('rating', rating);
    formData.append('comment', comment);

    dispatch(addToComment({ formData }));
    dispatch(addComment({ comment, productId: product?._id, rating, userId: { _id: user?._id, name: user?.name, profileImage: user?.profileImage } }));
    setRating(0);
    setComment('')
  };

  const handleAddToCart = () => {
    if (!user?._id) {
      alert("Please log in to add items to your cart");
      return;
    }

    const formData = new FormData();
    formData.append('productId', product?._id);
    formData.append('title', product?.title);
    formData.append('image', product?.image[0]);
    formData.append('price', product?.price);
    formData.append('quantity', quantity);

    dispatch(addToCart(formData));
    dispatch(addToCartItems({ productId: product?._id, title: product?.title, image: product?.image, price: product?.price, quantity }));

  };

  const back = () => {
    router.push('/');
    dispatch(clearCommentList());
  }

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  // useEffect(() => {
  //   dispatch(fetchComments({ productId: product?._id }));
  // }, [dispatch, product?._id]);

  useEffect(() => {
    setMainImage(product?.image[0]);
  }, [product?.image[0]])

  return (
    <div className="min-h-screen bg-gray-50 pt-8 w-full felx justify-center">
      <div className="w-full mx-auto p-6 md:p-10 lg:w-[90%] relative">
        <button onClick={() => back()} className="p-1 hover:bg-gray-100 rounded-full absolute top-5" ><Image className="w-[27px] md:w-[35px] lg:w-[33px]" src={back_icon} alt="back_icon" /></button>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">

          <div className="w-[100%] flex flex-col items-center lg:items-start">
            <div className="flex items-center justify-center w-[100%] aspect-[4/3] overflow-hidden rounded-xl border border-gray-100 lg:w-[80%] md:w-[80%]">
              <img
                src={mainImage}
                alt={product?.title || "Product Image"}
                className="object-cover rounded-lg"
              />


            </div>

            <div className="w-[100%] mt-4 flex gap-3 lg:w-[80%] md:w-[80%]">
              {product?.image.map((image, idx) => (
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
            <h1 className="text-3xl font-bold text-gray-800">{product?.title}</h1>
            <p className="mt-2 text-sm text-gray-500">⭐/ {(totalRating / totalComment).toFixed(2)}</p>

            <div className="mt-4 text-2xl font-semibold text-indigo-600">
              ${product?.price.toFixed(2)}
            </div>

            <p className="mt-4 text-gray-700 leading-relaxed">{product?.description}</p>

            <p className="mt-4 text-gray-700">Availibility : {product?.stockCount > 0 ? <span className="text-[green]">In stock</span> : <span className="text-[red]">Sold out</span>}</p>

            <div className="mt-6 flex items-center gap-2">
              <span className="text-sm font-medium text-gray-600">Quantity:</span>
              <div className="flex items-center border rounded-full overflow-hidden">
                <button
                  onClick={() => setQuantity((Prev) => Prev > 1 ? Prev - 1 : 1)}
                  className="px-3 py-1 text-lg font-semibold text-gray-600 hover:bg-gray-100"
                >
                  −
                </button>
                <span className="flex justify-center w-[45px] text-gray-800">{quantity}</span>
                <button
                  onClick={() => setQuantity((Prev) => Prev < product.stockCount ? Prev + 1 : product.stockCount)}
                  className="px-3 py-1 text-lg font-semibold text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {!existItemInCart ?
              <div className="mt-6 flex gap-3">
                <button onClick={() => handleAddToCart()} className="flex-1 rounded-full bg-indigo-600 text-white py-3 font-medium hover:bg-indigo-700">
                  Add to Cart
                </button>
                <button className="flex-1 rounded-full border border-indigo-600 text-indigo-600 py-3 font-medium hover:bg-indigo-50">
                  Buy Now
                </button>
              </div>
              : <div className="mt-6 flex gap-3">
                <button onClick={() => router.push('/public/cart')} className="flex rounded-full border border-indigo-600 text-indigo-600 py-3 px-33 font-medium hover:bg-indigo-50">
                  View Cart
                </button>
              </div>
            }

          </div>
        </div>


        <div className="mt-10 border-t pt-6">
          <h2 className="text-lg font-semibold text-gray-800">Customer Reviews</h2>

          <div className="mt-4 space-y-4">
            {Array.isArray(commentList) && commentList?.map((c, i) => (
              <div key={i} className="mt-2 p-4 bg-gray-50 rounded-lg border border-gray-100 w-full lg:w-[50%]">
                <div className="flex gap-2 items-center">
                  <Image src={c.userId.profileImage || user_icon} width={10} height={10} className="w-6 border border-gray-300 rounded-full" alt="profile-image" />
                  <p className="text-[13px] text-gray-800">{c.userId._id === user?._id ? "You" : c.userId.name}</p>
                </div>

                <p className="text-gray-600 text-sm mt-1">{c.comment}</p>
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
