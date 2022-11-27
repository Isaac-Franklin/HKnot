const mongoose = require("mongoose");
// const { Schema } = mongoose;

const PatientSchema = new mongoose.Schema(
    {
        firstname: { type: String },
        lastname: { type: String },
        username: { type: String, unique: true, required: true },
        email: { type: String, unique: true, required: true },
        phone_number: { type: Number, unique: true, required: true },
        hiv_status: { type: String, required: true, default: "Positive" },
        drug_dosage1: { type: String, required: true },
        time_of_dosage1: { type: Date },
        time_of_dosage2: { type: Date },
        nationality: { type: String, required: true },
        state: { type: String, required: true },
        city: { type: String, required: true },
        password: { type: String },
        retype_password: { type: String },
    },
    {
        timestamps: true,
    }
);

const Patient = mongoose.model("Patient", PatientSchema);

module.exports = Patient;


// _