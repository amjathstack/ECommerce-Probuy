import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import ordersModel from "../../../../models/Order";
import connectDB from "../../../../config/connectDB";

export async function POST(req) {
    try {

        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ message: 'User not found!' });
        }

        const body = await req.json();
        const { orderId, items, subTotal, tax, total, paymentStatus, paymentMethod, address } = body;

        const groupedByVendor = items.reduce((acc, item) => {
            const vendorId = item.vendorId

            if (!acc[vendorId]) {
                acc[vendorId] = [];
            }

            acc[vendorId].push(item);

            return acc;
        }, {});

        const subOrders = Object.entries(groupedByVendor).map(
            ([vendorId, vendorItems]) => {

                const subTotal = vendorItems.reduce(
                    (sum, item) => sum + item.price * item.quantity,
                    0
                );

                return {
                    vendorId,
                    items: vendorItems,
                    subTotal,
                    status: "Pending"
                };
            }
        );

        await connectDB();

        const response = await ordersModel.create({
            orderId,
            customerId: session?.user?.id,
            subOrders,
            subTotal,
            tax,
            total,
            paymentStatus,
            paymentMethod,
            address
        })

        return NextResponse.json({
            status: true, message: response
        });

    } catch (error) {

        return NextResponse.json({ status: false, message: error.message })

    }
}

export async function GET(req) {
    try {

        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ message: 'User not found!' });
        }

        await connectDB();

        const data = await ordersModel.find({ customerId: session?.user?.id });

        return NextResponse.json({ status: true, message: data });

    } catch (error) {

        return NextResponse.json({ status: false, message: error.message })

    }
}