import { connect } from '@/dbCobfiguration/dbConfiguration'
import Rental from "@/models/rentalModel";
import { NextResponse } from "next/server";

connect();

export async function POST(request) {
	try {
		const reqBody = await request.json();
		const { rental_id, city, quarter, bail, description, photo, available, price, start_date, finish_date, is_home, user_id } = reqBody;

		const newRental = new Rental({
			rental_id,
			city,
			quarter,
			bail,
			description,
			photo,
			available,
			price,
			start_date,
			finish_date,
			is_home,
			user_id,
		});

		const savedRental = await newRental.save();

		return NextResponse.json({
			message: "Rental created successfully",
			success: true,
			rental: savedRental,
			status: 201
		});

	} catch (error) {
		return NextResponse.json({ error: error.message, status: 500 });
	}
}

export async function GET() {
	try {
		const rentals = await Rental.find();
		return NextResponse.json(rentals, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: error.message, status: 500 });
	}
}

