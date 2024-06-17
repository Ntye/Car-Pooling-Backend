import { connect } from '@/dbCobfiguration/dbConfiguration'
import Home from "@/models/homeModel";
import { NextResponse } from "next/server";

connect();

export async function GET(request, { params }) {
	try {
		const { id } = params;
		const home = await Home.findById(id);

		if (!home) {
			return NextResponse.json({ error: "Home not found" }, { status: 404 });
		}

		return NextResponse.json(home, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: error.message, status: 500 });
	}
}

export async function PUT(request, { params }) {
	try {
		const { id } = params;
		const reqBody = await request.json();
		const { rooms, rental_id } = reqBody;

		const updatedHome = await Home.findByIdAndUpdate(
			id,
			{ rooms, rental_id },
			{ new: true, runValidators: true }
		);

		if (!updatedHome) {
			return NextResponse.json({ error: "Home not found" }, { status: 404 });
		}

		return NextResponse.json({
			message: "Home updated successfully",
			success: true,
			home: updatedHome,
			status: 200
		});

	} catch (error) {
		return NextResponse.json({ error: error.message, status: 500 });
	}
}

export async function DELETE(request, { params }) {
	try {
		const { id } = params;

		const deletedHome = await Home.findByIdAndDelete(id);

		if (!deletedHome) {
			return NextResponse.json({ error: "Home not found" }, { status: 404 });
		}

		return NextResponse.json({
			message: "Home deleted successfully",
			success: true,
			home: deletedHome,
			status: 200
		});

	} catch (error) {
		return NextResponse.json({ error: error.message, status: 500 });
	}
}

