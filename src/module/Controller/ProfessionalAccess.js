const AllProfesions = require("../../models/professionalSchema")
const bcrypt = require("bcrypt")




async function ProfessionalSignup(req, res) {
    const { firstname, lastname, username, email, phone_number, professional, password, retype_password } = req.body
    try {
        const checkusernameunique = AllProfesions.findOne({ username: username });
        if (checkusernameunique) {
            res.status(400).json({ message: "This Username Is Already Taken" })
        }
        const checkemailunique = AllProfesions.findOne({ email: email });
        if (checkemailunique) {
            res.status(400).json({ message: "This Username Is Already Taken" })
        }
        const checkphone_numberunique = AllProfesions.findOne({ phone_number: phone_number });
        if (checkphone_numberunique) {
            res.status(400).json({ message: "This Username Is Already Taken" })
        }
        if (password != retype_password) {
            res.status(401).json({ message: "Passwords Do Not Match" })
        }
        let salt = await bcrypt.genSalt();
        const hashedPwd = await bcrypt.hash(password, salt)

        await AllProfesions.create({
            firstname: firstname,
            lastname: lastname,
            username: username,
            email: email,
            phone_number: phone_number,
            professional: professional,
            password: hashedPwd
        })
        return res.status(200).json({ message: "Login Successful!" })

    } catch (error) {
        console.log(error)
        res.status(500).json({ mesaage: "error occured" })
    }
}




async function ProfessionalLogin(req, res) {
    const { email, password } = req.body;
    try {
        const checkprofexist = AllProfesions.findOne({ email: email })
        if (!checkprofexist) {
            res.status(400).json({ message: "Email Does Not Exist!" })
        }
        const dehashedPwd = bcrypt.compare(password, AllProfesions.password)
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
