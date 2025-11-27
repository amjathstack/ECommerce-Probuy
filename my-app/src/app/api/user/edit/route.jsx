import { NextResponse } from "next/server";
import userModel from "../../../../../models/User";
import { v2 as cloudinary } from "cloudinary";
import authenticate from "../../../../../middleware/authenticate";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export async function POST(req) {
    try {

        const uid = await authenticate(req);
        const body = await req.formData();
        const name = body.get('name');
        const profile = body.get('profile');

        const user = await userModel.findOne({firebaseUid:uid});

        if (profile) {
            const bytes = await profile.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const result = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: 'myApp/uploads' },
                    (error, result) => {
                        if (error) reject(error)
                        else resolve(result);
                    });
                stream.end(buffer);

            })
            user.name = name;
            user.profileImage = result.secure_url;
            await user.save()

            return NextResponse.json({status:true, message:'User updated!'})
        } else {
            user.name = name;
            await user.save();
            return NextResponse.json({status:true, message:'User updated!'})
        }

    } catch (error) {
        return NextResponse.json({status:false, message:error.message})
    }
}