const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


async function signup(req, res) {

    try {
        const {email, password} = req.body;

        const hashedPassword = bcrypt.hashSync(password, 8);

        await User.create({email, password: hashedPassword});

        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(400);
    }
}

async function login(req, res) {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({ email });

        if(!user) {
            return res.status(404).json({ 'message': "Email is not registered!" });
        }

        const passwordMatch = bcrypt.compareSync(password, user.password);

        if(!passwordMatch) {
            return res.status(401).json({ 'error': "Password does not match" });
        }

        const exp = Date.now() + 1000*60*60*24*30;
        const token = jwt.sign({ sub: user._id, exp }, process.env.SECRET_KEY);

        res.cookie("Authorization", token, {
            expires: new Date(exp),
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
        });

        return res.sendStatus(200);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}


async function logout(req, res) {
    try {
        res.clearCookie('Authorization');
        return res.sendStatus(200);
    } catch (error) {
        return res.sendStatus(400);
    }
}

function checkAuth(req, res){
    try {
        console.log(req.user);
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

module.exports = {
    signup,
    login,
    logout,
    checkAuth
}