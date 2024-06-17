import { connect } from '@/dbCobfiguration/dbConfiguration'
import LostItem from "@/models/lostItemModel";
import { NextResponse } from "next/server";

connect();

export async function POST(request) {
	try {
		const reqBody = await request.json();
		const { lost_item_id, category, brand, colour, description, type_id, object_id, is_signaled, user_id } = reqBody;

		const newLostItem = new LostItem({
			lost_item_id,
			category,
			brand,
			colour,
			description,
			type_id,
			object_id,
			is_signaled,
			user_id,
		});

		const savedLostItem = await newLostItem.save();

		return NextResponse.json({
			message: "Lost item created successfully",
			success: true,
			lostItem: savedLostItem,
			status: 201
		});

	} catch (error) {
		return NextResponse.json({ error: error.message, status: 500 });
	}
}

export async function GET() {
	try {
		const lostItems = await LostItem.find();
		return NextResponse.json(lostItems, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: error.message, status: 500 });
	}
}
