import admin from "@/firebaseAdmin";

export default async function authenticate(req) {
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
        throw new Error("Unauthorized");
    }
    const token = authHeader.split(" ")[1];
    const decoded = await admin.auth().verifyIdToken(token);
    return decoded.uid;
}