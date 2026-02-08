import { NextResponse } from "next/server";
import connectDB from "../../../../../config/connectDB";
import userModel from "../../../../../models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req) {

    try {

        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ status: false, message: "Unauthorized" });
        }

        const body = await req.formData();

        const {
            name,
            phoneNumber,
            strAddress1,
            strAddress2,
            city,
            province,
            postalCode } = Object.fromEntries(body.entries());

        await connectDB()

        const user = await userModel.findById(session?.user?.id);

        if (!user) {
            return NextResponse.json({ status: false, message: "User not found" });
        }
        
        user.addresses.push({
            name,
            phoneNumber,
            strAddress1,
            strAddress2,
            city,
            province,
            postalCode
        });

        await user.save();

        return NextResponse.json({ status: true, message: user.addresses });

    } catch (error) {

        return NextResponse.json({ status: false, message: error.message });

    }
}


export async function GET() {
    try {

        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ status: false, message: "Unauthorized" });
        }

        await connectDB();

        const user = await userModel.findById(session?.user?.id);
        if (!user) {
            return NextResponse.json({ status: false, message: "User not found!" });
        }

        return NextResponse.json({ status: true, message: user.addresses });

    } catch (error) {

        return NextResponse.json({ status: false, message: error.message }, { status: 401 });

    }
}
