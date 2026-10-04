import { NextResponse } from "next/server";
import productsModel from "../../../../../models/Products";

export async function GET(req) {

    try {

        const { searchParams } = new URL(req.url);
        const Id = searchParams.get("productId");

        const response = await productsModel.findById(Id)
            .populate("vendorId", "title name email profileImage")
            .populate("reviews.userId", "name email profileImage");

        if (!response) {
            return NextResponse.json({ status: false, message: "Product not found" });
        }

        return NextResponse.json({ status: true, message: response });

    } catch (error) {

        return NextResponse.json({ status: false, message: error.message });


    }

}