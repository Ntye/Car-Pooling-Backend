import {connect} from "@/dbCobfiguration/dbConfiguration";
import User from '@/models/userModel';
import { NextResponse } from 'next/server';

connect();

export async function GET() {
	try {
		const users = await User.find({});
		return NextResponse.json(users);
	} catch (error) {
		return NextResponse.json(
			{ error: error.message },
			{ status: 500 }
		);
	}
}