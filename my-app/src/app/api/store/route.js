import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import userModel from "../../../../models/User";
import cloudinary from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function POST(req) {
    try {

        const body = await req.formData();

        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ status: false, message: UnAuthorized })
        }

        const title = body.get("name");
        const description = body.get("description");
        const image = body.get("image");

        const isFile =
            image &&
            typeof image === "object" &&
            typeof image.arrayBuffer === "function" &&
            image.size > 0;

        let updatedProfile = '';

        if (isFile) {
            const bytes = await image.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const result = await cloudinary.uploader.upload(`data:image/png;base64,${buffer.toString("base64")}`, {
                folder: "myApp/uploads",
            });

            updatedProfile = result.secure_url;
        }

        const response = await userModel.updateOne({ _id: session?.user?.id }, {
            $set: {
                userId: session?.user?.id,
                title,
                description,
                profileImage: updatedProfile,
                isSeller: true,
                earnings: 0
            }
        });

        return NextResponse.json({ status: true, message: response });


    } catch (error) {

        return NextResponse.json({ status: false, message: error.message });

    }
}