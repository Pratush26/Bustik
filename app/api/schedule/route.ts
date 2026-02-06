import { ConnectDB } from "@/lib/connectDb";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const { db } = await ConnectDB();
        const data = await db.collection("schedules").find({}).toArray();
        return NextResponse.json(data ?? { success: false, message: "Something went wrong!" });

    } catch (err) {
        console.error(err);
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}