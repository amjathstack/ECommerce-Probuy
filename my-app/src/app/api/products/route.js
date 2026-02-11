import { NextResponse } from "next/server";
import connectDB from "../../../../config/connectDB";
import productsModel from "../../../../models/Products";



export async function GET() {

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


