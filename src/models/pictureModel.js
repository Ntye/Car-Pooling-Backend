import mongoose from "mongoose";

const pictureSchema = new mongoose.Schema({
	picture_id: {
		type: String,
		required: [true, "Please provide a picture ID"],
	},
	link: {
		type: String,
	},
	rental_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Rental',
		required: true,
	},
}, { timestamps: true });

const Picture = mongoose.models.Picture || mongoose.model("Picture", pictureSchema);

export default Picture;
