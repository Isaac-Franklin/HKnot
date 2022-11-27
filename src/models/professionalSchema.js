const mongoose = require("mongoose");

const ProfessionalSchema = new mongoose.Schema(
    {
        firstname: { type: String },
        lastname: { type: String },
        username: { type: String, unique: true, required: true },
        email: { type: String, unique: true, required: true },
        phone_number: { type: Number, unique: true, required: true },
        professional: { type: String, required: true },
        password: { type: String },
        retype_password: { type: String },
    },
    {
        timestamps: true,
    }
);

const Professional = mongoose.model("Professional", ProfessionalSchema);

module.exports = Professional;


// _