import { connect } from '@/dbCobfiguration/dbConfiguration'
import Trip from "@/models/tripModel";
import { NextResponse } from "next/server";

connect();

export async function POST(request) {
	try {
		const reqBody = await request.json();
		const { departure_time, departure, arrival, spaces, price, driver_id, passagers } = reqBody;

		const newTrip = new Trip({
			departure_time,
			departure,
			arrival,
			spaces,
			price,
			driver_id,
			passagers,
		});

		const savedTrip = await newTrip.save();

		return NextResponse.json({
			message: "Trip created successfully",
			success: true,
			trip: savedTrip,
			status: 201
		});

	} catch (error) {
		return NextResponse.json({ error: error.message, status: 500 });
	}
}

export async function GET() {
	try {
		const trips = await Trip.find();
		return NextResponse.json(trips, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: error.message, status: 500 });
	}
}
