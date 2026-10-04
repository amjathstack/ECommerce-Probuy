import { NextResponse } from "next/server";
import productsModel from "../../../../models/Products";

export async function POST(req) {
    try {

        const body = await req.formData()

        const productId = body.get('productId');
        const userId = body.get('userId');
        const rating = body.get('rating');
        const comment = body.get('comment');

        const response = await productsModel.findByIdAndUpdate(
            productId,
            {
                $push: {
                    reviews: {
                        userId,
                        rating: Number(rating),
                        comment,
                    }
                }
            },
            { new: true }
        );

        return NextResponse.json({ status: true, message: response });

    } catch (error) {

        return NextResponse.json({ status: false, message: error.message });

    }
}