const express = require("express");
const ConnectDatabase = require("./utils/dbconnect")
const PatientRouter = require("./module/PatientRouter")
const ProfessionRouter = require("./module/ProfessionRouter")


const app = express();
app.use(express.json());


app.use("/patient", PatientRouter)
app.use("/professional", ProfessionRouter)

const getData = (req, res) => {
    res.status(200).json({ message: "GET request successful" })
}


app.get("", getData)



app.listen(3000, () => {
    console.log('Connection To Database Successful'),
        ConnectDatabase()
})