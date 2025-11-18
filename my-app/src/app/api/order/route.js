import { NextResponse } from "next/server";
import ordersModel from "../../../../models/Order";
import connectDB from "../../../../config/connectDB";
import authenticate from "../../../../middleware/authenticate";
import userModel from "../../../../models/User";

export async function POST(req) {
    try {

        const uid = await authenticate(req);
        if (!uid) {
            return NextResponse.json({ message: 'User not found!' });
        }
        const body = await req.json();

        const { orderId, items, subTotal, tax, total, paymentStatus, paymentMethod, address } = body;
        const user = await userModel.findOne({ firebaseUid: uid })
        await connectDB();
        const response = await ordersModel.create({
            userId: user?._id, orderId, items, subTotal: Number(subTotal), tax: Number(tax), total: Number(total), paymentStatus, paymentMethod, address
        })

        return NextResponse.json({ status: true, message: response });

    } catch (error) {

        return NextResponse.json({ status: false, message: error.message })

    }
}

export async function GET(req) {
    try {

        const uid = await authenticate(req);

        if (!uid) {
            return NextResponse.json({ message: 'User not found!' });
        }

        const user = await userModel.findOne({ firebaseUid: uid });

        await connectDB();

        const data = await ordersModel.find({ userId: user?._id });

        return NextResponse.json({ status: true, message: data });

    } catch (error) {

        return NextResponse.json({ status: false, message: error.message })

    }
}