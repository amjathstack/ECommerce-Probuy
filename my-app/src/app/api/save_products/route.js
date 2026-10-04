import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import userModel from "../../../../models/User";

export async function POST(req) {

    try {

        const session = await getServerSession(authOptions);

        const body = await req.json();
        const { productId } = body;

        if (!session) {
            return NextResponse.json({ status: false, message: "Unauthorized!" });
        }

        if (!productId) {
            return NextResponse.json({ status: false, message: "ProductId not found" });
        }

        const user = await userModel.findById(session?.user?.id);

        if (!user) {
            return NextResponse.json({ status: false, message: "Unauthorized!" });
        }

        if (user?.savedProducts.includes(productId)) {
            await userModel.findByIdAndUpdate(session?.user?.id, { $pull: { savedProducts: productId } }, { new: true });
            return NextResponse.json({ status: false, message: "Done" });
        }

        const response = await userModel.findByIdAndUpdate(session?.user?.id, { $push: { savedProducts: productId } }, { new: true });

        if (!response) {
            return NextResponse.json({ status: false, message: "Not saved" });
        }

        return NextResponse.json({ status: true, message: "Product saved!" });


    } catch (error) {

        return NextResponse.json({ status: false, message: error.message });

    }

}

export async function GET() {

    try {

        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ status: false, message: "Unauthorized!" });
        }

        const response = await userModel.findById(session?.user?.id);

        return NextResponse.json({ status: true, message: response.savedProducts });


    } catch (error) {

        return NextResponse.json({ status: false, message: error.message });


    }

}