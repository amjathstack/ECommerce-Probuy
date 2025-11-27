// import { NextResponse } from "next/server";
// import commentModel from "../../../../../models/Comment";

// export async function POST(req) {
//     try {

//         const body = await req.formData()

//         const productId = body.get('productId');
//         const userId = body.get('userId');
//         const rating = body.get('rating');
//         const comment = body.get('comment');

//         const response = await commentModel.create({
//             productId,
//             userId,
//             rating,
//             comment,
//         });

//         return NextResponse.json({ status: true, message: response });

//     } catch (error) {

//         return NextResponse.json({ status: false, message: error.message });

//     }
// }

// export async function GET(req) {
//     try {
//         await authenticate(req);
//         const { searchParams } = new URL(req.url);
//         const productId = searchParams.get("productId");

//         if (!productId) {
//             return NextResponse.json({ status: false, message: "productId required" });
//         }

//         const response = await commentModel.find({productId}).populate('userId', 'name profileImage')

//         return NextResponse.json({ status: true, message: response });

//     } catch (error) {

//         return NextResponse.json({ status: false, message: error.message });

//     }
// }