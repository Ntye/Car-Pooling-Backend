import { connect } from '@/dbCobfiguration/dbConfiguration'
import Picture from "@/models/pictureModel";
import { NextResponse } from "next/server";

connect();

export async function POST(request) {
	try {
		const reqBody = await request.json();
		const { picture_id, link, rental_id } = reqBody;

		const newPicture = new Picture({
			picture_id,
			link,
			rental_id,
		});

		const savedPicture = await newPicture.save();

		return NextResponse.json({
			message: "Picture created successfully",
			success: true,
			picture: savedPicture,
			status: 201
		});

	} catch (error) {
		return NextResponse.json({ error: error.message, status: 500 });
	}
}

export async function GET() {
	try {
		const pictures = await Picture.find();
		return NextResponse.json(pictures, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: error.message, status: 500 });
	}
}

