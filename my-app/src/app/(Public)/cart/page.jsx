// "use client";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { clearCart, clearToCart, deleteCartItems, removeFromCart, updateCart, updateCartItems } from "@/features/cart/cartSlice";
// import AddAddressCard from "@/components/AddAddressCard";
// import { fetchAddress } from "@/features/address/addressSlice";
// import { addToOrder, addToOrderItems } from "@/features/order/orderSlice";
// import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";

// export default function CartPage() {

//     const dispatch = useDispatch();
//     const router = useRouter();
//     const { cartItems } = useSelector((state) => state.cart);
//     const { addressList } = useSelector((state) => state.address);
//     const [addressForm, setAddressForm] = useState(false);
//     const { user } = authUser();
//     const token = auth.currentUser?.accessToken || "";

//     const [address, setAddress] = useState('Select the address');
//     const [paymentMethod, setPaymentMethod] = useState('Select the payment Method');

//     const [showAddresses, setShowAddresses] = useState(false);
//     const [showPaymentM, setShowPaymentM] = useState(false);

//     const subTotal = cartItems.reduce((currentValue, item) => { return item.price * item.quantity + currentValue }, 0);
//     const tax = subTotal * 10 / 100
//     const total = subTotal + tax

//     const removeItem = (id) => {
//         dispatch(deleteCartItems(id));
//         dispatch(removeFromCart({ productId: id }));
//     };

//     const updateQuantity = (id, qty) => {
//         const item = cartItems.find((i) => i.productId === id)
//         if (qty === -1) {
//             if (item.quantity !== 1) {
//                 dispatch(updateCartItems({ productId: id, quantity: qty }));
//                 dispatch(updateCart(user?._id));
//             }
//         } else {
//             dispatch(updateCartItems({ productId: id, quantity: qty }));
//             dispatch(updateCart());
//         }

//     };

//     const handlePlaceOrder = () => {

//         if (address === 'Select the address') {
//             return toast.warn('Please select the address!')
//         } else if (paymentMethod === 'Select the payment Method') {
//             return toast.warn('Please select the payment method!')
//         } else {
//             const data = {
//                 orderId: 8474775,
//                 items: cartItems,
//                 subTotal: subTotal,
//                 tax: tax,
//                 total: total,
//                 paymentStatus: 'Pending',
//                 paymentMethod: paymentMethod,
//                 address: address,
//                 status:'Pending',
//                 createdAt: Date.now(),
//             };

//             dispatch(addToOrderItems(data));
//             dispatch(addToOrder({ order: data, token }));
//             dispatch(clearCart())
//             dispatch(clearToCart());
//             router.push('/public/order')
//         }

//     }


//     return (
//         <div className="w-full flex justify-center">
//             {addressForm && <AddAddressCard onClose={setAddressForm} />}
//             <div className="w-[90%] sm:mt-[80px] mt-[30px]">
//                 <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
//                     Your Shopping Cart
//                 </h1>

//                 {cartItems?.length === 0 ? (
//                     <div className="text-center text-gray-500 py-20">
//                         <p className="text-lg font-medium">Your cart is empty 🛒</p>
//                         <a
//                             href="/public"
//                             className="mt-4 inline-block text-indigo-600 hover:text-indigo-500 font-medium"
//                         >
//                             Continue Shopping
//                         </a>
//                     </div>
//                 ) : (
//                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">


//                         <div className="lg:col-span-2">
//                             <div className="flex border-b justify-around border-gray-400 pb-3 font-semibold grid grid-cols-5 text-center">
//                                 <div>Item</div>
//                                 <div>Title</div>
//                                 <div>Price</div>
//                                 <div>Quantity</div>
//                                 <div>Action</div>
//                             </div>

//                             {cartItems?.map((item) => (
//                                 <div key={item.productId} className="border-b border-gray-400 py-4 grid grid-cols-5 items-center text-center">

//                                     <div className="flex felx-start">
//                                         <img className="w-14 h-14 md:w-20 md:h-20 object-cover" src={item.image} alt={item.title} />
//                                     </div>

//                                     <div>
//                                         <h5 className="text-left sm:text-sm text-[13px]">{item.title.length <= 5 ? item.title.slice(0, 20) : item.title.slice(0, 25)+'...' }</h5>
//                                         <p className="text-[14px] text-gray-500">{item.description}</p>
//                                     </div>

//                                     <div>
//                                         <p className="text-indigo-600 font-semibold sm:text-sm text-[13px]">${item.price}</p>
//                                     </div>

//                                     <div className="flex justify-center items-center gap-3">
//                                         <button
//                                             onClick={() => updateQuantity(item.productId, -1)}
//                                             className="md:px-3 md:py-1 p-0 md:border rounded-full hover:bg-gray-100"
//                                         >
//                                             −
//                                         </button>
//                                         <span className="font-medium sm:text-sm text-[13px]">{item.quantity}</span>
//                                         <button
//                                             onClick={() => updateQuantity(item.productId, 1)}
//                                             className="md:px-3 md:py-1 p-0 md:border rounded-full hover:bg-gray-100"
//                                         >
//                                             +
//                                         </button>
//                                     </div>

//                                     <div>
//                                         <button
//                                             onClick={() => removeItem(item.productId)}
//                                             className="text-sm text-red-500 hover:text-red-600"
//                                         >
//                                             Remove
//                                         </button>
//                                     </div>

//                                 </div>
//                             ))}

//                         </div>


//                         <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 h-fit">
//                             <h2 className="text-xl font-semibold text-gray-800 mb-4">
//                                 Order Summary
//                             </h2>

//                             <div onClick={showAddresses ? () => setShowAddresses(false) : () => setShowAddresses(true)} className="relative bg-gray-100 p-2 pl-6 text-sm border border-gray-400 z-2">
//                                 <button>
//                                     {address === 'Select the address' ? 'Select the address' : address.streetAddress1 + ' ' + address.streetAddress2 + ' ' + address.city}
//                                 </button>
//                                 {
//                                     showAddresses &&
//                                     <div className="absolute left-0 top-[37px] w-full bg-gray-200">
//                                         {addressList.map((a, i) => {
//                                             return <div key={i} onClick={() => setAddress({
//                                                 fullName: a.fullName,
//                                                 phoneNumber: a.phoneNumber,
//                                                 streetAddress1: a.streetAddress1,
//                                                 streetAddress2: a.streetAddress2,
//                                                 city: a.city,
//                                                 province: a.province,
//                                                 postalCode: a.postalCode
//                                             })} className="w-full p-2 pl-5 hover:bg-gray-300">{a.streetAddress1 + '  ' + a.streetAddress2 + '  ' + a.city}</div>
//                                         })}
//                                         <button onClick={() => setAddressForm(true)} className="w-full p-2 hover:bg-gray-300">+ Add Addresse</button>
//                                     </div>
//                                 }
//                             </div>

//                             <div onClick={showPaymentM ? () => setShowPaymentM(false) : () => setShowPaymentM(true)} className="mt-4 relative bg-gray-100 p-2 pl-6 text-sm border border-gray-400">
//                                 <button>
//                                     {paymentMethod === 'Select the payment Method' ? 'Select the payment Method' : paymentMethod}
//                                 </button>
//                                 {
//                                     showPaymentM &&
//                                     <div className="absolute left-0 top-[37px] w-full bg-gray-200">

//                                         <div onClick={() => setPaymentMethod('COD')} className="w-full p-2 pl-5 hover:bg-gray-300">COD</div>
//                                         <div onClick={() => setPaymentMethod('Online')} className="w-full p-2 pl-5 hover:bg-gray-300">Online</div>

//                                     </div>
//                                 }
//                             </div>

//                             <div className="space-y-2 text-sm mt-6">
//                                 <div className="flex justify-between text-gray-600">
//                                     <span>Subtotal</span>
//                                     <span>${subTotal}</span>
//                                 </div>
//                                 <div className="flex justify-between text-gray-600">
//                                     <span>Tax (10%)</span>
//                                     <span>${tax.toFixed(2)}</span>
//                                 </div>
//                                 <hr className="my-2 border-gray-200" />
//                                 <div className="flex justify-between font-semibold text-gray-800">
//                                     <span>Total</span>
//                                     <span>${total.toFixed(2)}</span>
//                                 </div>
//                             </div>

//                             <button onClick={() => handlePlaceOrder()} className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full py-3 font-medium transition">
//                                 Place the Order
//                             </button>

//                             <a
//                                 href="/products"
//                                 className="block text-center text-sm text-indigo-600 mt-3 hover:underline"
//                             >
//                                 Continue Shopping
//                             </a>
//                         </div>

//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }
