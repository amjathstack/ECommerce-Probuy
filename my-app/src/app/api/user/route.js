import { NextResponse } from "next/server";
import connectDB from "../../../../config/connectDB";
import userModel from "../../../../models/User";
import authenticate from "../../../../middleware/authenticate";

export async function GET(req) {

    try {

        const uid = await authenticate(req);
        await connectDB();
        const user = await userModel.find({ firebaseUid: uid });
        return NextResponse.json({ status: true, message: user });

    } catch (error) {

        return NextResponse.json({ status: false, message: error.message });

    }

}

export async function POST(req) {

    try {

        const body = await req.formData();
        const name = body.get('name');
        const email = body.get('email');
        const firebaseUid = body.get('firebaseUid');

        await connectDB();
        await userModel.create({ firebaseUid, name, email });
        return NextResponse.json({ status: true, message: 'User created successfully' });

    } catch (error) {

        return NextResponse.json({ status: false, message: error.message });

    }
}