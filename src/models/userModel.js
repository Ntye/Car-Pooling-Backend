import mongoose from "mongoose";

// Define the user schema
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please provide a name"],
	},
	username: {
		type: String,
		required: [true, "Please provide a username"],
		unique: true,
	},
	email: {
		type: String,
		required: [true, "Please provide an email"],
		unique: true,
	},
	telephone: {
		type: String,
		required: [true, "Please provide a telephone number"],
	},
	password: {
		type: String,
		required: [true, "Please provide a password"],
	},
	has_lost: {
		type: Boolean,
		required: [true, "Please provide a value for has_lost"],
	},
	is_driver: {
		type: Boolean,
		required: [true, "Please provide a value for is_driver"],
	},
	owns_house: {
		type: Boolean,
		required: [true, "Please provide a value for owns_house"],
	},
});

// Create the user model
const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
