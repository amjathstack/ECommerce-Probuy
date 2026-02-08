import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import ordersModel from "../../../../../models/Order";
import connectDB from "../../../../../config/connectDB";
import subOrdersModel from "../../../../../models/SubOrder";
import orderItemsModel from "../../../../../models/OrderItem";

export async function GET() {

    try {

        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ status: false, message: "UnAuthorized!" });
        }

        await connectDB();

        const subOrders = await subOrdersModel
            .find({ vendorId: session?.user?.id })
            .lean();

        const subOrderIds = subOrders.map(o => o._id);
        const mainOrderIds = subOrders.map(o => o.orderId);


        const allItems = await orderItemsModel
            .find({ subOrderId: { $in: subOrderIds } })
            .lean();

        const mainOrders = await ordersModel
            .find({ _id: { $in: mainOrderIds } })
            .populate("customerId", "name email")
            .lean();

        const subOrderMap = {};
        subOrders.forEach(so => {
            subOrderMap[so.orderId.toString()] = so;
        });

        const itemsMap = {};
        allItems.forEach(item => {
            const key = item.subOrderId.toString();
            if (!itemsMap[key]) itemsMap[key] = [];
            itemsMap[key].push(item);
        });

        const vendorOrders = mainOrders.map((order) => {

            const vendorSubOrder = subOrderMap[order._id.toString()];

            if (!vendorSubOrder) return null;

            const vendorItems = itemsMap[vendorSubOrder._id.toString()] || [];

            return {
                ...order,
                orderDetails: {
                    ...vendorSubOrder,
                    Items: vendorItems
                }
            }
        });


        return NextResponse.json({ status: true, message: vendorOrders });

    } catch (error) {

        return NextResponse.json({ status: false, message: error.message });

    }

}


export async function PUT(req) {

    try {

        const { subOrderId, status } = await req.json();

        const subOrder = await subOrdersModel.findByIdAndUpdate(subOrderId, { status: status }, { new: true });

        const allSubOrders = await subOrdersModel.find({ orderId: subOrder?.orderId });

        const allSuborderStatus = allSubOrders.map((o) => o.status);

        function CheckingAllSubOrderStatus(arr) {

            if (arr.some((status) => status === "Pending")) {

                return "Pending"

            }

            if (arr.some((status) => status === "Processing")) {

                return "Processing"

            }

            if (arr.every((status) => status === "Delivered")) {

                return "Delivered"

            }

            return "Pending"

        }

        const finalStatus = CheckingAllSubOrderStatus(allSuborderStatus);

        await ordersModel.findByIdAndUpdate(subOrder?.orderId, { orderStatus: finalStatus });

        return NextResponse.json({ status: true, message: subOrder });

    } catch (error) {

        return NextResponse.json({ status: false, message: error.message });

    }

}