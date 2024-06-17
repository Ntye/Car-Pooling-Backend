import { connect } from '@/dbCobfiguration/dbConfiguration'
import Home from "@/models/homeModel";
import { NextResponse } from "next/server";

connect();

export async function POST(request) {
	try {
		const reqBody = await request.json();
		const { rooms, rental_id } = reqBody;

		const newHome = new Home({
			rooms,
			rental_id,
		});

		const savedHome = await newHome.save();

		return NextResponse.json({
			message: "Home created successfully",
			success: true,
			home: savedHome,
			status: 201
		});

	} catch (error) {
		return NextResponse.json({ error: error.message, status: 500 });
	}
}

export async function GET() {
	try {
		const homes = await Home.find();
		return NextResponse.json(homes, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: error.message, status: 500 });
	}
}