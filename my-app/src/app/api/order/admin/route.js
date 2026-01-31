import { NextResponse } from "next/server";
import connectDB from "../../../../../config/connectDB";
import ordersModel from "../../../../../models/Order";

export async function GET(req) {

    try {
        const uid = await authenticate(req);
        if (!uid) {
            return NextResponse.json({ message: 'User not found!' });
        }
        await connectDB();
        const response = await ordersModel.find();
        return NextResponse.json({ status: true, message: response });


    } catch (error) {

        return NextResponse.json({ status: false, message: error.message });

    }

}