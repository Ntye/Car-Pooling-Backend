import { connect } from '@/dbCobfiguration/dbConfiguration'
import Rental from "@/models/rentalModel";
import { NextResponse } from "next/server";

connect();

export async function GET(request, { params }) {
	try {
		const { id } = params;
		const rental = await Rental.findById(id);

		if (!rental) {
			return NextResponse.json({ error: "Rental not found" }, { status: 404 });
		}

		return NextResponse.json(rental, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: error.message, status: 500 });
	}
}


export async function PUT(request, { params }) {
	try {
		const { id } = params;
		const reqBody = await request.json();
		const { rental_id, city, quarter, bail, description, photo, available, price, start_date, finish_date, is_home, user_id } = reqBody;

		const updatedRental = await Rental.findByIdAndUpdate(
			id,
			{ rental_id, city, quarter, bail, description, photo, available, price, start_date, finish_date, is_home, user_id },
			{ new: true, runValidators: true }
		);

		if (!updatedRental) {
			return NextResponse.json({ error: "Rental not found" }, { status: 404 });
		}

		return NextResponse.json({
			message: "Rental updated successfully",
			success: true,
			rental: updatedRental,
			status: 200
		});

	} catch (error) {
		return NextResponse.json({ error: error.message, status: 500 });
	}
}


export async function DELETE(request, { params }) {
	try {
		const { id } = params;

		const deletedRental = await Rental.findByIdAndDelete(id);

		if (!deletedRental) {
			return NextResponse.json({ error: "Rental not found" }, { status: 404 });
		}

		return NextResponse.json({
			message: "Rental deleted successfully",
			success: true,
			rental: deletedRental,
			status: 200
		});

	} catch (error) {
		return NextResponse.json({ error: error.message, status: 500 });
	}
}

