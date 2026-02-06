import { ConnectDB } from "@/lib/connectDb";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        const date = searchParams.get("date");
        if (!id || !date) return NextResponse.json({ success: false, message: "Id not found" }, { status: 400 });

        const { db } = await ConnectDB();
        const data = await db.collection("bookings").findOne({ _id: new ObjectId(id), date: date });
        return NextResponse.json(data ?? { success: false, message: "Something went wrong!" });

    } catch (err) {
        console.error(err);
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { passenger, phone, seat, bus, date } = await req.json();
        const { db } = await ConnectDB();
        const data = await db.collection("bookings").insertOne({ passenger, phone, seat, bus: new ObjectId(bus), date: new Date(date).toISOString(), createdAt: new Date().toISOString() });
        return NextResponse.json(data ?? { success: false, message: "Something went wrong!" });

    } catch (err) {
        console.error(err);
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}