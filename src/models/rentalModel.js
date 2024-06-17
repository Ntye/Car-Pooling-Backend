import mongoose from "mongoose";

const rentalSchema = new mongoose.Schema({
	rental_id: {
		type: String,
		required: [true, "Please provide a rental ID"],
	},
	city: {
		type: String,
	},
	quarter: {
		type: String,
	},
	bail: {
		type: String,
	},
	description: {
		type: String,
	},
	photo: {
		type: String,
	},
	available: {
		type: Boolean,
		default: true,
	},
	price: {
		type: Number,
	},
	start_date: {
		type: Date,
	},
	finish_date: {
		type: Date,
	},
	is_home: {
		type: Boolean,
		default: false,
	},
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
}, { timestamps: true });

const Rental = mongoose.models.Rental || mongoose.model("Rental", rentalSchema);

export default Rental;
