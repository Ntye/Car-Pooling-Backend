import mongoose from 'mongoose';

export async function connect() {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		mongoose.connection.on('connected', () => {
			console.log('MongoDB connected successfully');
		})
	} catch (error) {
		console.log("Something went wrong!");
		console.log(error);
		process.exit();
	}
}