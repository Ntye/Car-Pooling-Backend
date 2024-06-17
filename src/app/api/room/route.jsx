import { connect } from '@/dbCobfiguration/dbConfiguration'
import Room from "@/models/roomModel";
import { NextResponse } from "next/server";

connect();

export async function POST(request) {
	try {
		const reqBody = await request.json();
		const { area, home_id } = reqBody;

		const newRoom = new Room({
			area,
			home_id,
		});

		const savedRoom = await newRoom.save();

		return NextResponse.json({
			message: "Room created successfully",
			success: true,
			room: savedRoom,
			status: 201
		});

	} catch (error) {
		return NextResponse.json({ error: error.message, status: 500 });
	}
}

export async function GET() {
	try {
		const rooms = await Room.find();
		return NextResponse.json(rooms, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: error.message, status: 500 });
	}
}

