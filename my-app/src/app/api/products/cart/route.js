import connectDB from "../../../../../config/connectDB";
import { NextResponse } from "next/server";
import userModel from "../../../../../models/User";


// export async function POST(req) {
//     try {
//         const uid = await authenticate(req);
//         const body = await req.json();
//         const { productId, title, image, price, quantity } = body;
//         await connectDB();
//         const user = await userModel.findOne({firebaseUid:uid});
//         const existingItem = user.cart.find((i) => i.productId.toString() === productId.toString());

//         if (existingItem) {
//             existingItem.quantity = existingItem.quantity + Number(quantity);
//             await user.save();
//             return NextResponse.json({ success: true, message: user.cart });
//         }

//         user.cart.push({ productId, title, image, price, quantity })
//         await user.save()
//         return NextResponse.json({ success: true, message: user.cart });

//     } catch (error) {

//         console.error("Error adding to cart:", error);
//         return NextResponse.json({ success: false, error: error.message }, { status: 500 });

//     }
// }

export async function GET(req) {
    try {
        const uid = await authenticate(req);
        await connectDB();
        if (!uid) {
            return NextResponse.json(
                { success: false, error: "userId is required" },
                { status: 400 }
            );
        }
        const user = await userModel.findOne({ firebaseUid:uid });

        return NextResponse.json({
            status: true,
            message: user.cart,
        });
    } catch (error) {
        console.error("Error", error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

// export async function DELETE(req) {
//     try {
//         const uid = await authenticate(req); 
//         await connectDB();
//         const body = await req.json();
//         const { productId } = body;

//         const user = await userModel.findOne({firebaseUid:uid});
//         if (!user) {
//             return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
//         }

//         user.cart = user.cart.filter(item => item.productId.toString() !== productId.toString());
//         await user.save();

//         return NextResponse.json({ success: true, message: "Item removed", cart: user.cart });
//     } catch (error) {
//         console.error("Error removing from cart:", error);
//         return NextResponse.json({ success: false, error: error.message }, { status: 500 });
//     }
// }

// export async function PUT(req){

//     try {
        
//         const uid = await authenticate(req);
//         const body = await req.json();
//         const { cartData } = body;

//         await connectDB();
//         const user = await userModel.findOne({firebaseUid:uid});

//         if(user){
//             user.cart = cartData
//         }

//         await user.save()
//         return NextResponse.json({status:true, message:user.cart});

//     } catch (error) {
    
//         return NextResponse.json({ status:false, message:error.message });

//     }

// }