const mongoose = require("mongoose");
require("dotenv").config();

const ConnectDatabase = async () => {
	try {
		mongoose.connect(process.env.MONGO_URL, () => {
			console.log("Database Connected");
		});
	} catch (error) {
		console.error(error);
	}
};
module.exports = ConnectDatabase;
