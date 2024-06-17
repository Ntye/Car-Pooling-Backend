import { connect } from '@/dbCobfiguration/dbConfiguration'
import Picture from "@/models/pictureModel";
import { NextResponse } from "next/server";

connect();

export async function GET(request, { params }) {
	try {
		const { id } = params;
		const picture = await Picture.findById(id);

		if (!picture) {
			return NextResponse.json({ error: "Picture not found" }, { status: 404 });
		}

		return NextResponse.json(picture, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: error.message, status: 500 });
	}
}

export async function PUT(request, { params }) {
	try {
		const { id } = params;
		const reqBody = await request.json();
		const { picture_id, link, rental_id } = reqBody;

		const updatedPicture = await Picture.findByIdAndUpdate(
			id,
			{ picture_id, link, rental_id },
			{ new: true, runValidators: true }
		);

		if (!updatedPicture) {
			return NextResponse.json({ error: "Picture not found" }, { status: 404 });
		}

		return NextResponse.json({
			message: "Picture updated successfully",
			success: true,
			picture: updatedPicture,
			status: 200
		});

	} catch (error) {
		return NextResponse.json({ error: error.message, status: 500 });
	}
}

export async function DELETE(request, { params }) {
	try {
		const { id } = params;

		const deletedPicture = await Picture.findByIdAndDelete(id);

		if (!deletedPicture) {
			return NextResponse.json({ error: "Picture not found" }, { status: 404 });
		}

		return NextResponse.json({
			message: "Picture deleted successfully",
			success: true,
			picture: deletedPicture,
			status: 200
		});

	} catch (error) {
		return NextResponse.json({ error: error.message, status: 500 });
	}
}

