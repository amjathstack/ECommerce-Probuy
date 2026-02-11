import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import productsModel from "../../../../../models/Products";
import cloudinary from "cloudinary";
import { NextResponse } from "next/server";
import connectDB from "../../../../../config/connectDB";

const cloudinaryV2 = cloudinary.v2;

cloudinaryV2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export async function GET() {
    try {

        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ status: false, message: 'User not found!' }, { status: 404 });
        }

        const allProducts = await productsModel.find({ vendorId: session?.user?.id });

        return NextResponse.json({ status: true, message: allProducts }, { status: 200 });

    } catch (error) {

        return NextResponse.json({ status: false, message: error.message }, { status: 500 });

    }
}


export async function POST(req) {

    try {

        const session = await getServerSession(authOptions);

        if (!session) {
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
                    const stream = cloudinaryV2.uploader.upload_stream(
                        { folder: 'myApp/uploads' },
                        (error, result) => {
                            if (error) reject(error)
                            else resolve(result);
                        });
                    stream.end(buffer);

                })

                finalImagesArray.push(result.secure_url);

            }

        }

        await connectDB();

        const response = await productsModel.create({
            vendorId: session?.user?.id,
            title,
            price: Number(price),
            image: finalImagesArray,
            description,
            category,
            stockCount: Number(stockCount)
        });

        console.log(response);

        return NextResponse.json({ status: true, message: response });

    } catch (error) {

        console.log(error.message);

        return NextResponse.json({ message: error.message });
    }

}



export async function PUT(req) {

    try {

        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ message: 'User not found!' });
        }

        const formData = await req.formData();
        const productId = formData.get('productId');
        const title = formData.get('title');
        const price = formData.get('price');
        const image = formData.getAll('image');
        const description = formData.get('description');
        const category = formData.get('category');
        const stockCount = formData.get('stockCount');

        const finalImagesArray = [];

        if (image.length > 0) {

            for (const file of image) {

                if ((file instanceof File)) {
                    const bytes = await file.arrayBuffer();
                    const buffer = Buffer.from(bytes);

                    const result = await new Promise((resolve, reject) => {
                        const stream = cloudinaryV2.uploader.upload_stream(
                            { folder: 'myApp/uploads' },
                            (error, result) => {
                                if (error) reject(error)
                                else resolve(result);
                            });
                        stream.end(buffer);

                    })

                    finalImagesArray.push(result.secure_url);

                } else {

                    finalImagesArray.push(file)

                }

            }

        }

        await connectDB();

        const data = {
            title,
            price: Number(price),
            description,
            category,
            stockCount: Number(stockCount)
        };

        if (image && finalImagesArray) {
            data.image = finalImagesArray
        }

        const response = await productsModel.findByIdAndUpdate(productId, data, { new: true });

        return NextResponse.json({ status: true, message: response });

    } catch (error) {

        return NextResponse.json({ message: error.message });
    }

}



export async function DELETE(req) {
    try {

        const body = await req.json();
        const { productId } = body;

        const product = await productsModel.findByIdAndDelete(productId);

        return NextResponse.json({ status: true, message: product });

    } catch (error) {

        return NextResponse.json({ status: false, message: error.message });

    }
}


