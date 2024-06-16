import { connect } from "@/dbCobfiguration/dbConfiguration";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request) {
	try {
		const reqBody = await request.json();
		const { identifier, password } = reqBody;

		const user = await User.findOne({
			$or: [
				{ email: identifier },
				{ username: identifier }
			],
		});

		if (!user) {
			return NextResponse.json(
				{ error: "Invalid username or email" },
				{ status: 401 }
			);
		}

		const isMatch = await bcryptjs.compare(password, user.password);
		if (!isMatch) {
			return NextResponse.json(
				{ error: "Invalid password" },
				{ status: 401 }
			);
		}

		return NextResponse.json({
			message: "Login successful",
			success: true,
			user,
		});
	} catch (error) {
		return NextResponse.json(
			{ error: error.message },
			{ status: 500 }
		);
	}
}
