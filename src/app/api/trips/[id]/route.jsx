import { connect } from '@/dbCobfiguration/dbConfiguration'
import Trip from "@/models/tripModel";
import { NextResponse } from "next/server";

connect();

export async function GET(request, { params }) {
	try {
		const { id } = params;
		const trip = await Trip.findById(id);

		if (!trip) {
			return NextResponse.json({ error: "Trip not found" }, { status: 404 });
		}

		return NextResponse.json(trip, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: error.message, status: 500 });
	}
}

export async function PUT(request, { params }) {
	try {
		const { id } = params;
		const reqBody = await request.json();
		const { departure_time, departure, arrival, spaces, price, passagers } = reqBody;

		const updatedTrip = await Trip.findByIdAndUpdate(
			id,
			{ departure_time, departure, arrival, spaces, price, passagers },
			{ new: true, runValidators: true }
		);

		if (!updatedTrip) {
			return NextResponse.json({ error: "Trip not found" }, { status: 404 });
		}

		return NextResponse.json({
			message: "Trip updated successfully",
			success: true,
			trip: updatedTrip,
			status: 200
		});

	} catch (error) {
		return NextResponse.json({ error: error.message, status: 500 });
	}
}

export async function DELETE(request, { params }) {
	try {
		const { id } = params;

		const deletedTrip = await Trip.findByIdAndDelete(id);

		if (!deletedTrip) {
			return NextResponse.json({ error: "Trip not found" }, { status: 404 });
		}

		return NextResponse.json({
			message: "Trip deleted successfully",
			success: true,
			trip: deletedTrip,
			status: 200
		});

	} catch (error) {
		return NextResponse.json({ error: error.message, status: 500 });
	}
}
