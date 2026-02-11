import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import userModel from "../../../../../models/User";
import productsModel from "../../../../../models/Products";
import subOrdersModel from "../../../../../models/SubOrder";
import ordersModel from "../../../../../models/Order";
import { NextResponse } from "next/server";

export async function GET() {

    try {

        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ status: false, message: "UnAuthorized!" });
        }

        const vendor = await userModel.findById(session?.user?.id);
        if (!vendor || !vendor.isSeller) {
            return NextResponse.json({ status: false, message: "Vendor is not found!" });
        }

        const allProducts = await productsModel.find({ vendorId: vendor?._id });

        const allOrders = await subOrdersModel.find({ vendorId: vendor?._id });

        const allMainOrderIds = allOrders.map((o) => o.orderId);

        const mainOrders = await ordersModel.find({ _id: { $in: allMainOrderIds } }).populate("customerId").sort({ createdAt: -1 });

        const nonDuplicatedMainOrders = [...new Map(mainOrders.map(item => [item.customerId._id, item])).values()];

        const data = {
            totalEarnings: vendor.earnings,
            allProducts: allProducts.reduce((t, i) => t += i.stockCount, 0),
            allOrders: allOrders.length,
            customers: nonDuplicatedMainOrders.length,
            currentOrders: mainOrders
                .slice(0, 3)
        }

        return NextResponse.json({ status: true, message: data });


    } catch (error) {

        return NextResponse.json({ status: false, message: error.message });

    }

}