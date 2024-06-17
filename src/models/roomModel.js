import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
	area: {
		type: Number,
		required: [true, "Please provide the area of the room"],
	},
	home_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Home',
		required: true,
	},
}, { timestamps: true });

const Room = mongoose.models.Room || mongoose.model("Room", roomSchema);

export default Room;