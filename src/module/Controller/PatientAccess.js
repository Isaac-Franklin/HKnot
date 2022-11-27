const AllPatients = require("../../models/patientSchema")
const bcrypt = require("bcrypt")
const { generateToken } = require("../../utils/token")



async function patientSignup(req, res) {
    const { first_name, last_name, username, email, phone_number, hiv_status, drug_dosage, time_of_dosage1, time_of_dosage2, nationality, state, city, password } = req.body;
    try {
        const checkUsernameUnique = await AllPatients.findOne({ username: username });
        if (checkUsernameUnique) {
            return res.status(400).json({ message: "This Username Is Already Takenn" })
        }
        const checkEmailUnique = await AllPatients.findOne({ email: email });
        if (checkEmailUnique) {
            return res.status(400).json({ message: "This Email Is Already Taken" })
        }
        const checkPhoneNumberUnique = await AllPatients.findOne({ phone_number: phone_number });
        if (checkPhoneNumberUnique) {
            return res.status(400).json({ message: "This Phone Number Is Already Taken" })
        }
        // if (password !== retype_password) {
        //     res.status(401).json({ message: "Passwords Do Not Match" })
        // }

        let salt = await bcrypt.genSalt();
        const hashedPwd = await bcrypt.hash(password, salt)

        if (!hashedPwd) {
            return res.status(400).json({ message: "Something Went Wrong!" })
        }

        await AllPatients.create({
            firstname: first_name,
            lastname: last_name,
            username: username,
            email: email,
            phone_number: phone_number,
            hiv_status: hiv_status,
            drug_dosage: drug_dosage,
            time_of_dosage1: time_of_dosage1,
            time_of_dosage2: time_of_dosage2,
            nationality: nationality,
            state: state,
            city: city,
            password: hashedPwd,
            retype_password: hashedPwd,
        })
        return res.status(200).json({ message: "Signup Successful!" })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ mesaage: "error occured" })
    }
}


async function patientLogin(req, res) {
    const { email, password } = req.body;
    try {
        const checkPatienceexist = AllPatients.findOne({ email: email })
        if (!checkPatienceexist) {
            res.status(400).json({ message: "Email Does Not Exist!" })
        }
        const dehashedPwd = bcrypt.compare(password, checkPatienceexist.password)
        if (!dehashedPwd) { res.status(400).json({ message: "Password Is Incorrect" }) }

        const data = {
            userId: checkPatienceexist._id,
            username: checkPatienceexist.username
        }
        // Create web token and send to user
        const token = await generateToken(data)
        return res.status(200).json({ message: "Login was successful!" }, token)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "error" });
    }
}




module.exports = { patientSignup, patientLogin }











// {
//     "first_name": "Thelma",
//     "last_name": "Chimdi",
//     "username": "friday",
//     "email": "Thelmachi@gmail.com",
//     "phone_number": 1234567323,
//     "hiv_status": "positive",
//     "drug_dosage": "Ones",
//     "time_of_dosage1": "2022-11-02",
//     "time_of_dosage2": "2022-11-02",
//     "nationality": "Nigeria",
//     "state": "Ogun",
//     "city": "Ogoni",
//     "password": "2112"
// }
