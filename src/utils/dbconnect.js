const mongoose = require("mongoose")

const ConnectDatabase = async () => {
    try {
        mongoose.connect(
            "mongodb+srv://franklin:<password>@cluster0.xcjqq5v.mongodb.net/?retryWrites=true&w=majority",
            () => {
                console.log('Database Connected')
            }
        )
    } catch (error) {
        console.error(error)
    }
}
module.exports = ConnectDatabase