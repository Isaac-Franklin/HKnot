const AllProfesions = require("../../models/professionalSchema")
const bcrypt = require("bcrypt")




async function ProfessionalSignup(req, res) {
    const { first_name, last_name, username, email, phone_number, professional, password } = req.body
    try {
        const checkUsernameUnique = await AllProfesions.findOne({ username: username });
        if (checkUsernameUnique) {
            return res.status(400).json({ message: "This Username Is Already Taken" })
        }
        const checkEmailUnique = await AllProfesions.findOne({ email: email });
        if (checkEmailUnique) {
            return res.status(400).json({ message: "This Email Is Already Taken" })
        }
        const checkPhoneNumberUnique = await AllProfesions.findOne({ phone_number: phone_number });
        if (checkPhoneNumberUnique) {
            return res.status(400).json({ message: "This Phonenumber Is Already Taken" })
        }

        let salt = await bcrypt.genSalt();
        const hashedPwd = await bcrypt.hash(password, salt)

        if (!hashedPwd) {
            return res.status(400).json({ message: "Something Went Wrong!" })
        }

        await AllProfesions.create({
            firstname: first_name,
            lastname: last_name,
            username: username,
            email: email,
            phone_number: phone_number,
            professional: professional,
            password: hashedPwd
        })
        return res.status(200).json({ message: "Signup Successful!" })

    } catch (error) {
        console.log(error)
        res.status(500).json({ mesaage: "error occured" })
    }
}




async function ProfessionalLogin(req, res) {
    const { email, password } = req.body;
    try {
        const checkProfExist = AllProfesions.findOne({ email: email })
        if (!checkProfExist) {
            res.status(400).json({ message: "Email Does Not Exist!" })
        }
        const dehashedPwd = bcrypt.compare(password, checkProfExist.password)
        if (!dehashedPwd) {
            res.status(400).json({ message: "Password Is Incorrect" })
        }
        return res.status(200).json({ message: "Login was successful!" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "error" });
    }
}


module.exports = [ProfessionalSignup, ProfessionalLogin]















// {
//     "first_name": "Chison",
//     "last_name": "Lake",
//     "username": "chikaje",
//     "email": "chika@gmail.com",
//     "phone_number": 4223112323,
//     "professional": "capenter",
//     "password": "123456"
// }
