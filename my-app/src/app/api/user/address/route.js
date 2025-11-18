import { NextResponse } from "next/server";
import connectDB from "../../../../../config/connectDB";
import userModel from "../../../../../models/User";
import authenticate from "../../../../../middleware/authenticate";

export async function POST(req) {

    try {

        const uid = await authenticate(req);   
        const body = await req.json();
        const { 
            fullName,
            phoneNumber,
            streetAddress1,
            streetAddress2,
            city,
            province,
            postalCode } = body;

        await connectDB()

        const user = await userModel.findOne({firebaseUid:uid});

        if (user) {
            user.addresses = [...user.addresses, {
                fullName,
                phoneNumber,
                streetAddress1,
                streetAddress2,
                city,
                province,
                postalCode
            }]

            await user.save();
        }

        return NextResponse.json({ status: true, message: user.addresses })


    } catch (error) {
        return NextResponse.json({ status: false, message: error.message })
    }
}


export async function GET(req) {
    try {
        const uid = await authenticate(req);     
        await connectDB();
        const user = await userModel.findOne({ firebaseUid: uid });

        return NextResponse.json({
            status: true,
            message: user.addresses,
        });

    } catch (error) {
        return NextResponse.json({ status: false, message: error.message }, { status: 401 });
    }
}
