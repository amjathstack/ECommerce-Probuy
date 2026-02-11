import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import ordersModel from "../../../../models/Order";
import connectDB from "../../../../config/connectDB";
import subOrdersModel from "../../../../models/SubOrder";
import orderItemsModel from "../../../../models/OrderItem";
import userModel from "../../../../models/User";

export async function POST(req) {
    try {

        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ message: 'User not found!' });
        }

        const body = await req.json();
        const { items, subTotal, tax, total, paymentStatus, paymentMethod, address } = body;

        const subOrders = [];

        for (const item of items) {

            const exitOrder = subOrders.find((i) => i.vendorId === item.vendorId);

            if (exitOrder) {
                exitOrder.items.push(item)
                exitOrder.subTotal += item.price * item.quantity
            } else {
                const newOrder = {
                    vendorId: item.vendorId,
                    items: [item],
                    subTotal: item.price * item.quantity

                }
                subOrders.push(newOrder)
            }
        }

        await connectDB();

        const order_response = await ordersModel.create({
            customerId: session?.user?.id,
            subTotal,
            tax,
            total,
            paymentStatus,
            paymentMethod,
            address
        });

        if (!order_response) {
            return NextResponse.json({
                status: true, message: "Order was not created!"
            });
        }

        for (const order of subOrders) {

            const subOrder_response = await subOrdersModel.create({
                orderId: order_response._id,
                vendorId: order.vendorId,
                subTotal: order.subTotal,
            });

            await userModel.findByIdAndUpdate(order.vendorId, { $inc: { earnings: order.subTotal } }, { new: true });

            for (const item of order.items) {
                const data = {
                    ...item,
                    orderId: order_response._id,
                    subOrderId: subOrder_response._id,
                }

                await orderItemsModel.create(data);
            }


        }

        return NextResponse.json({
            status: true, message: "Full Order placed successfully"
        });

    } catch (error) {

        return NextResponse.json({ status: false, message: error.message })

    }
}

export async function GET() {
    try {

        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ message: 'User not found!' });
        }

        await connectDB();

        const orders = await ordersModel.find({ customerId: session?.user?.id });

        const allOrders = [];

        for (const order of orders) {

            const orderObj = order.toObject();

            const products = await orderItemsModel.find({ orderId: orderObj._id });

            orderObj.items = products;
            allOrders.push(orderObj);

        }

        return NextResponse.json({ status: true, message: allOrders });

    } catch (error) {

        return NextResponse.json({ status: false, message: error.message })

    }
}