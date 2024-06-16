import {connect} from "@/dbCobfiguration/dbConfiguration";
import User from "@/models/userModel";
import {NextResponse} from "next/server";
import bcryptjs from "bcryptjs"

connect();

export async function POST(request) {
	try {
		const reqBody = await request.json();
		const {username, name, email, password, telephone, has_lost, is_driver, owns_house} =reqBody;

		console.log(reqBody);

		// check if user already exists
		const user = await User.findOne({username})

		if(user) {
			return NextResponse.json(
				{error: "User already exists"},
				{status: 400}
			);
		}

		const lost = false

		// hash password
		const salt = await bcryptjs.genSalt(10);
		const hashedPassword = await bcryptjs.hash(password, salt);

		const newUser = new User({
			username,
			name,
			email,
			password: hashedPassword,
			telephone,
			has_lost: false,
			is_driver: false,
			owns_house: false,
		});

		const savedUser = await newUser.save();
		console.log(savedUser);
		return NextResponse.json(
			{
				message: "User created successfully",
				success: true,
				savedUser,
				status: 201
			}
		)

	} catch (error) {
		return NextResponse.json(
			{error: error.message,
				status: 500,
				message: "YO"
			}
		)
	}
}
