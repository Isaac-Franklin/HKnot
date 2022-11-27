const mongoose = require("mongoose");
// const { Schema } = mongoose;

const PatientSchema = new mongoose.Schema(
	{
		firstname: { type: String },
		lastname: { type: String },
		username: { type: String, unique: true, required: true },
		email: { type: String, unique: true, required: true },
		phone_number: { type: Number, unique: true, required: true },
		hiv_status: { type: String, default: "Positive" },
		drug_dosage: { type: String, required: true },
		drug_time1: { type: String },
		drug_time2: { type: String },
		nationality: { type: String, required: true },
		state: { type: String, required: true },
		city: { type: String, required: true },
		password: { type: String },
		account_type: { type: String, default: "user" },
	},
	{
		timestamps: true,
	}
);

const Patient = mongoose.model("Patient", PatientSchema);

module.exports = Patient;

// _
