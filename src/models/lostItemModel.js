import mongoose from "mongoose";

const lostItemSchema = new mongoose.Schema({
	lost_item_id: {
		type: String,
		required: [true, "Please provide a lost item ID"],
	},
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
	type_id: {
		type: String,
	},
	object_id: {
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
