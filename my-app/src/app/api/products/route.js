import { NextResponse } from "next/server";
import connectDB from "../../../../config/connectDB";
import productsModel from "../../../../models/Products";



export async function GET(req) {
  try {
    await connectDB();
    const products = await productsModel.find().populate("vendorId");
    return NextResponse.json({ status: true, message: products })

  } catch (error) {
    return NextResponse.json({
      status: false,
      message: error.message
    });
  }
}

// export async function PUT(req) {
//   try {
//     const uid = await authenticate(req);
//     await connectDB();

//     const user = await userModel.findOne(
//       { firebaseUid: uid }
//     );

//     if (!user) {
//       return NextResponse.json({
//         status: false,
//         message: "userId is required"
//       });
// }
//     user.cart = [];

//     await user.save();

//     return NextResponse.json({
//       status: true,
//       message: user.cart
//     });

//   } catch (error) {
//     return NextResponse.json({
//       status: false,
//       message: error.message
//     });
//   }
// }


