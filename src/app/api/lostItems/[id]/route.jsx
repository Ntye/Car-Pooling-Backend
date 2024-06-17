import { connect } from '@/dbCobfiguration/dbConfiguration'
import LostItem from "@/models/lostItemModel";
import { NextResponse } from "next/server";

connect();

export async function GET(request, { params }) {
	try {
		const { id } = params;
		const lostItem = await LostItem.findById(id);

		if (!lostItem) {
			return NextResponse.json({ error: "Lost item not found" }, { status: 404 });
		}

		return NextResponse.json(lostItem, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: error.message, status: 500 });
	}
}

export async function PUT(request, { params }) {
	try {
		const { id } = params;
		const reqBody = await request.json();
		const { lost_item_id, category, brand, colour, description, type_id, object_id, is_signaled, user_id } = reqBody;

		const updatedLostItem = await LostItem.findByIdAndUpdate(
			id,
			{ lost_item_id, category, brand, colour, description, type_id, object_id, is_signaled, user_id },
			{ new: true, runValidators: true }
		);

		if (!updatedLostItem) {
			return NextResponse.json({ error: "Lost item not found" }, { status: 404 });
		}

		return NextResponse.json({
			message: "Lost item updated successfully",
			success: true,
			lostItem: updatedLostItem,
			status: 200
		});

	} catch (error) {
		return NextResponse.json({ error: error.message, status: 500 });
	}
}

export async function DELETE(request, { params }) {
	try {
		const { id } = params;

		const deletedLostItem = await LostItem.findByIdAndDelete(id);

		if (!deletedLostItem) {
			return NextResponse.json({ error: "Lost item not found" }, { status: 404 });
		}

		return NextResponse.json({
			message: "Lost item deleted successfully",
			success: true,
			lostItem: deletedLostItem,
			status: 200
		});

	} catch (error) {
		return NextResponse.json({ error: error.message, status: 500 });
	}
}
