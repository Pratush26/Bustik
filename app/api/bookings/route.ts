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
        const data = await db.collection("bookings").find({ bus: new ObjectId(id), date: new Date(date).toISOString() }).toArray();
        return NextResponse.json(data);

    } catch (err) {
        console.error(err);
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}