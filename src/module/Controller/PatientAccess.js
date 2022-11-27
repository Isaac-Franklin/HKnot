const AllPatients = require("../../models/patientSchema");
const bcrypt = require("bcrypt");
const { generateAccessToken } = require("../../utils/accessToken");

async function patientSignup(req, res) {
	const {
		first_name,
		last_name,
		username,
		email,
		phone_number,
		hiv_status,
		drug_dosage,
		drug_time1,
		drug_time2,
		nationality,
		state,
		city,
		password,
	} = req.body;
	try {
		const CheckUsernameUnique = await AllPatients.findOne({
			username: username,
		});
		if (CheckUsernameUnique) {
			return res
				.status(400)
				.json({ message: "This Username Is Already Taken" });
		}
		const CheckEmailUnique = await AllPatients.findOne({ email: email });
		if (CheckEmailUnique) {
			return res
				.status(400)
				.json({ message: "This Username Is Already Taken" });
		}
		const CheckPhoneNumberUnique = await AllPatients.findOne({
			phone_number: phone_number,
		});
		if (CheckPhoneNumberUnique) {
			return res
				.status(400)
				.json({ message: "This Username Is Already Taken" });
		}

		let salt = await bcrypt.genSalt();
		const hashedPwd = await bcrypt.hash(password, salt);
		if (!hashedPwd) {
			return res.status(400).json({ message: "Something Went Wrong!" });
		}

		await AllPatients.create({
			firstname: first_name,
			lastname: last_name,
			username: username,
			email: email,
			phone_number: phone_number,
			hiv_status: hiv_status,
			drug_dosage: drug_dosage,
			drug_time1: drug_time1,
			drug_time2: drug_time2,
			nationality: nationality,
			state: state,
			city: city,
			password: hashedPwd,
			retype_password: hashedPwd,
		});
		return res.status(200).json({ message: "Signup Successful!" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ mesaage: "error occured" });
	}
}

async function patientLogin(req, res) {
	const { email, password } = req.body;
	try {
		const checkPatientExist = await AllPatients.findOne({ email: email });
		if (!checkPatientExist) {
			return res.status(400).json({ message: "Email Does Not Exist!" });
		}
		const CheckPasswordHash = await bcrypt.compare(
			password,
			checkPatientExist.password
		);
		if (!CheckPasswordHash) {
			return res.status(400).json({ message: "Password Is Incorrect" });
		}
		const token = generateAccessToken({
			userId: checkPatientExist._id,
			username: checkPatientExist.username,
		});
		return res
			.status(200)
			.json({ message: "Login was successful!", token: token });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "error" });
	}
}

module.exports = { patientSignup, patientLogin };
