import mongoose from "mongoose";

const lostItemSchema = new mongoose.Schema({
	category: {
		type: String,
	},
	brand: {
		type: String,
	},
	colour: {
		type: String,
		maxlength: 50,
	},
	description: {
		type: String,
	},
	is_signaled: {
		type: Boolean,
		default: false,
	},
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
}, { timestamps: true });

const LostItem = mongoose.models.LostItem || mongoose.model("LostItem", lostItemSchema);

export default LostItem;
