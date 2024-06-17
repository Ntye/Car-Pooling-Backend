import {connect} from "@/dbCobfiguration/dbConfiguration";
import User from '@/models/userModel';
import { NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

connect();

export async function GET(request, { params }) {
	try {
		const user = await User.findOne({
			$or: [
				{ email: params.id },
				{ username: params.id }
			],
		});

		if (!user) {
			return NextResponse.json(
				{ error: 'User not found' },
				{ status: 404 }
			);
		}

		return NextResponse.json(
			user,
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{ error: error.message },
			{ status: 500 }
		);
	}
}

export async function PUT(request, { params }) {
	try {
		const reqBody = await request.json();
		const { username, name, email, password, telephone, has_lost, is_driver, owns_house } = reqBody;

		const user = await User.findOne({
			$or: [
				{ email: params.id },
				{ username: params.id }
			],
		});

		if (!user) {
			return NextResponse.json(
				{ error: "User not found" },
				{ status: 404 }
			);
		}

		if (username) {
			const existingUsername = await User.findOne({ username });
			if (existingUser) {
				return NextResponse.json({ error: 'Username already exists' }, { status: 400 });
			}
			user.username = username;
		}
		if (email) {
			const existingUsername = await User.findOne({ email });
			if (existingUser) {
				return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
			}
			user.email = email;
		}
		if (password) {
			const salt = await bcryptjs.genSalt(10);
			user.password = await bcryptjs.hash(password, salt);
		}
		if (telephone) user.telephone = telephone;
		if (has_lost) user.has_lost = has_lost;
		if (is_driver) user.is_driver = is_driver;
		if (owns_house) user.owns_house = owns_house;

		const updatedUser = await user.save();
		return NextResponse.json(updatedUser);
	} catch (error) {
		return NextResponse.json(
			{ error: error.message },
			{ status: 500 }
		);
	}
}

export async function DELETE(request, { params }) {
	try {
		const user = await User.findOne({ username: params.username });
		if (!user) {
			return NextResponse.json(
				{ error: "User not found" },
				{ status: 404 }
			);
		}

		await user.deleteOne();
		return NextResponse.json(
			{ message: "User deleted successfully" }
		);
	} catch (error) {
		return NextResponse.json(
			{ error: error.message },
			{ status: 500 }
		);
	}
}
