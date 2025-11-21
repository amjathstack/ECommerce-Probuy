import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import connectDB from "../../../../config/connectDB";
import productsModel from "../../../../models/Products";
import userModel from "../../../../models/User";
import authenticate from "../../../../middleware/authenticate";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

export async function POST(req) {

  try {

    const uid = await authenticate(req);
    if (!uid) {
      return NextResponse.json({ message: 'User not found!' });
    }
    const formData = await req.formData();
    const title = formData.get('title');
    const price = formData.get('price');
    const image = formData.getAll('image');
    const description = formData.get('description');
    const category = formData.get('category');
    const stockCount = formData.get('stockCount');

    const finalImagesArray = [];

    if (image.length > 0) {

      for (const file of image) {

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const result = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: 'myApp/uploads' },
            (error, result) => {
              if (error) reject(error)
              else resolve(result);
            });
          stream.end(buffer);

        })
        finalImagesArray.push(result.secure_url)
      }

    }

    await connectDB();

    await productsModel.create({ title, price: Number(price), image: finalImagesArray, description, category, stockCount: Number(stockCount) })

    console.log('Added')
    return NextResponse.json({ status: true, message: 'Product added successfully!' });

  } catch (error) {
    return NextResponse.json({ message: error.message });
  }

}


export async function GET(req) {
  try {
    await connectDB();
    const products = await productsModel.find();
    return NextResponse.json({ status: true, message: products })

  } catch (error) {
    return NextResponse.json({
      status: false,
      message: error.message
    });
  }
}

export async function PUT(req) {
  try {
    const uid = await authenticate(req);
    await connectDB();

    const user = await userModel.findOne(
      { firebaseUid: uid }
    );

    if (!user) {
      return NextResponse.json({
        status: false,
        message: "userId is required"
      });
    }
    user.cart = [];

    await user.save();

    return NextResponse.json({
      status: true,
      message: user.cart
    });

  } catch (error) {
    return NextResponse.json({
      status: false,
      message: error.message
    });
  }
}
