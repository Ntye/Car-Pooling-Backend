import mongoose from "mongoose";

const homeSchema = new mongoose.Schema({
	rooms: {
		type: Number,
		required: [true, "Please provide the number of rooms"],
	},
	rental_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Rental',
		required: true,
	},
}, { timestamps: true });

const Home = mongoose.models.Home || mongoose.model("Home", homeSchema);

export default Home;