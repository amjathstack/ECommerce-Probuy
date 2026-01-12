import { NextResponse } from "next/server";
import connectDB from "../../../../config/connectDB";
import userModel from "../../../../models/User";
import { hash } from "bcrypt";

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

export async function POST(request) {
    try {

        const formData = await request.formData();
        const data = Object.fromEntries(formData.entries());
        const password = data.password;
        let hashedPassword = await hash(password, 10);

        await connectDB();
        await userModel.create({ ...data, password: hashedPassword });

        return NextResponse.json({ status: true, message: 'User account created successfully!' });

    } catch (error) {

        return NextResponse.json({ status: false, message: error.message });

    }
}