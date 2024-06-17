import {connect} from '@/dbCobfiguration/dbConfiguration'
import Room from "@/models/roomModel";
import { NextResponse } from "next/server";

connect();

export async function GET(request, { params }) {
	try {
		const { id } = params;
		const room = await Room.findById(id);

		if (!room) {
			return NextResponse.json({ error: "Room not found" }, { status: 404 });
		}

		return NextResponse.json(room, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: error.message, status: 500 });
	}
}


export async function PUT(request, { params }) {
	try {
		const { id } = params;
		const reqBody = await request.json();
		const { area, home_id } = reqBody;

		const updatedRoom = await Room.findByIdAndUpdate(
			id,
			{ area, home_id },
			{ new: true, runValidators: true }
		);

		if (!updatedRoom) {
			return NextResponse.json({ error: "Room not found" }, { status: 404 });
		}

		return NextResponse.json({
			message: "Room updated successfully",
			success: true,
			room: updatedRoom,
			status: 200
		});

	} catch (error) {
		return NextResponse.json({ error: error.message, status: 500 });
	}
}

export async function DELETE(request, { params }) {
	try {
		const { id } = params;

		const deletedRoom = await Room.findByIdAndDelete(id);

		if (!deletedRoom) {
			return NextResponse.json({ error: "Room not found" }, { status: 404 });
		}

		return NextResponse.json({
			message: "Room deleted successfully",
			success: true,
			home: deletedRoom,
			status: 200
		});

	} catch (error) {
		return NextResponse.json({ error: error.message, status: 500 });
	}
}


