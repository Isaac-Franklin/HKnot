const AllPatients = require("../../models/patientSchema")
const bcrypt = require("bcrypt")



async function patientSignup(req, res) {
    const { firstname, lastname, username, email, phone_number, hiv_status, drug_dosage1, drug_dosage2, nationality, state, city, password, retype_password } = req.body
    try {
        const checkusernameunique = AllPatients.findOne({ username: username });
        if (checkusernameunique) {
            res.status(400).json({ message: "This Username Is Already Taken" })
        }
        const checkemailunique = AllPatients.findOne({ email: email });
        if (checkemailunique) {
            res.status(400).json({ message: "This Username Is Already Taken" })
        }
        const checkphone_numberunique = AllPatients.findOne({ phone_number: phone_number });
        if (checkphone_numberunique) {
            res.status(400).json({ message: "This Username Is Already Taken" })
        }
        if (password != retype_password) {
            res.status(401).json({ message: "Passwords Do Not Match" })
        }
        let salt = await bcrypt.genSalt();
        const hashedPwd = await bcrypt.hash(password, salt)
        if (!hashedPwd) {
            res.status(400).json({ message: "Something Went Wrong!" })
        }

        await AllPatients.create({
            firstname: firstname,
            lastname: lastname,
            username: username,
            email: email,
            phone_number: phone_number,
            hiv_status: hiv_status,
            drug_dosage1: drug_dosage1,
            drug_dosage2: drug_dosage2,
            nationality: nationality,
            state: state,
            city: city,
            password: hashedPwd,
            retype_password: hashedPwd,
        })
        return res.status(200).json({ message: "Signup Successful!" })

    } catch (error) {
        console.log(error)
        res.status(500).json({ mesaage: "error occured" })
    }
}


async function patientLogin(req, res) {
    const { email, password } = req.body;
    try {
        const checkpatienceexist = AllPatients.findOne({ email: email })
        if (!checkpatienceexist) {
            res.status(400).json({ message: "Email Does Not Exist!" })
        }
        const dehashedPwd = bcrypt.compare(password, AllPatients.password)
        if (!dehashedPwd) {
            res.status(400).json({ message: "Password Is Incorrect" })
        }
        return res.status(200).json({ message: "Login was successful!" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "error" });
    }
}




module.exports = [patientSignup, patientLogin]
