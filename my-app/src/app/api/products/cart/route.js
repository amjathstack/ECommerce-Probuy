import connectDB from "../../../../../config/connectDB";
import { NextResponse } from "next/server";
import userModel from "../../../../../models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";


export async function POST(req) {
    try {

        const session = await getServerSession(authOptions);

        const body = await req.formData();
        const productId = body.get("productId");
        const title = body.get("title");
        const image = body.get("image");
        const price = body.get("price");
        const quantity = body.get("quantity");

        await connectDB();

        if (!session) {
            return NextResponse.json({ success: false, message: "Unauthorized!" });
        }

        const user = await userModel.findById(session?.user?.id);
        const existingItem = user.cart.find((i) => i.productId.toString() === productId.toString());

        if (existingItem) {
            existingItem.quantity = existingItem.quantity + Number(quantity);
            await user.save();
            return NextResponse.json({ success: true, message: user.cart });
        }

        user.cart.push({ productId, title, image, price, quantity })
        await user.save()
        return NextResponse.json({ success: true, message: user.cart });

    } catch (error) {

        console.error("Error adding to cart:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });

    }
}

export async function GET() {
    try {

        const session = await getServerSession(authOptions);

        await connectDB();
        if (!session) {
            return NextResponse.json(
                { success: false, error: "UnAuthorized" },
                { status: 400 }
            );
        }
        const user = await userModel.findById(session?.user?.id);

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

export async function DELETE(req) {
    try {

        const session = await getServerSession(authOptions);

        await connectDB();
        if (!session) {
            return NextResponse.json(
                { success: false, error: "UnAuthorized" },
                { status: 400 }
            );
        }

        const body = await req.json();
        const { productId } = body;

        const user = await userModel.findById(session?.user?.id);
        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        user.cart = user.cart.filter(item => item.productId.toString() !== productId.toString());
        await user.save();

        return NextResponse.json({ success: true, message: "Item removed", cart: user.cart });
    } catch (error) {
        console.error("Error removing from cart:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function PUT(req) {

    try {

        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { success: false, error: "userId is required" },
                { status: 400 }
            );
        }

        const body = await req.json();
        const { cartData } = body;

        await connectDB();
        const user = await userModel.findById(session?.user?.id);

        if (user) {
            user.cart = cartData
        }

        await user.save()
        return NextResponse.json({ status: true, message: user.cart });

    } catch (error) {

        return NextResponse.json({ status: false, message: error.message });

    }

}