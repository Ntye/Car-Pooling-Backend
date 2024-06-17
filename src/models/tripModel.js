import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
	departure_time: {
		type: String,
		required: [true, "Please provide a departure time"],
	},
	departure: {
		type: String,
		required: [true, "Please provide a departure point"],
	},
	arrival: {
		type: String,
		required: [true, "Please provide an arrival point"],
	},
	spaces: {
		type: Number,
		required: [true, "Please provide the number of available spaces"],
	},
	price: {
		type: Number,
		required: [true, "Please provide the price"],
	},
	driver_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	passagers: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: 'User'
	},
});

const Trip = mongoose.models.Trip || mongoose.model("Trip", tripSchema);

export default Trip;