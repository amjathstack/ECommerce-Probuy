import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import storesModel from "../../../../models/Store";
import NextResponse from "next/server";



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export async function POST(req) {
    try {

        const body = await req.json();

        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ status: false, message: UnAuthorized })
        }

        const title = body.get("name");
        const description = body.get("description");
        const image = body.get("image");

        const isFile =
            profileImage &&
            typeof profileImage === "object" &&
            typeof profileImage.arrayBuffer === "function" &&
            profileImage.size > 0;

        let updatedProfile = '';

        if (isFile) {
            const bytes = await profileImage.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const result = await cloudinary.uploader.upload(`data:image/png;base64,${buffer.toString("base64")}`, {
                folder: "myApp/uploads",
            });

            updatedProfile = result.secure_url;
        }

        const response = await storesModel.create({
            userId: session?.user?.id,
            title,
            description,
            image: updatedProfile
        })



    } catch (error) {

    }
}