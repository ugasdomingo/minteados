// Import tools
import { Schema, model } from "mongoose";

//Create Regiter Schema
const arteSchema = new Schema({
	initialDate: {
		type: Date,
		default: Date.now(),
	},
	finalDate: {
		type: Date,
		default: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000),
	},
	title: {
		type: String,
		required: true,
		trim: true,
	},
	image: {
		public_id: {
			type: String,
			required: true,
		},
		secure_url: {
			type: String,
			required: true,
		},
	},
	link: {
		type: String,
		required: true,
		unique: true,
	},
	show: {
		type: Boolean,
		default: true,
	},
	description: {
		type: String,
		default: "El dueño no ha suministrado una descripción",
		trim: true,
	},
	category: {
		type: String,
		required: true,
	},
	uid: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
});

export default model("Arte", arteSchema);
