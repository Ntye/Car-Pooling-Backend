import {connect} from "@/dbCobfiguration/dbConfiguration";
import User from "@/models/userModel";
import {NextResponse} from "next/server";
import bcryptjs from "bcryptjs"

connect();

export async function POST(request) {
	try {
		const reqBody = await request.json();
		const { email, password } = reqBody;

		const user = await User.findOne({ email });

		if (!user) {
			return NextResponse.json(
				{ error: "Invalid email or password" },
				{ status: 401 }
			);
		}

		const isMatch = await bcryptjs.compare(password, user.password);
		if (!isMatch) {
			return NextResponse.json(
				{ error: "Invalid email or password" },
				{ status: 401 }
			);
		}

		return NextResponse.json(
			{
				message: "Login successful",
				success: true,
				user
			}
		);
	} catch (error) {
		return NextResponse.json(
			{ error: error.message },
			{ status: 500 }
		);
	}
}
