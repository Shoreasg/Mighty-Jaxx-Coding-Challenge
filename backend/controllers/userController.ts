/* userController. When reach these routes, do something. */
import { Request, Response, Router } from "express";
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const router = Router();

//register user, Create User
router.post("/register", async (req: Request, res: Response) => {

    const { email, password } = req.body;

    try {
        // check if email exist.
        const findUser = await User.findOne({ email });

        // If email exist, means user exist.
        if (findUser) {
            // tell user that email is registered
            return res.status(409).json({ Error: "Email already exists" });
        }

        // hashed the password and store their email and hash password in db

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({ email: email, password: hashedPassword });
        await newUser.save();
        return res.status(200).json({ Message: "Create user successfully" });
    }
    catch (err) {
        return res.status(500).json(err);
    }
})

// login route, 
router.post("/login", async (req: Request, res: Response,) => {
    const { email, password } = req.body;

    try {
        //check if email exist.
        const findUser = await User.findOne({ email });
        //if email don't exist, means user don't exist.
        if (!findUser) {
            // tell user that email don't exist
            return res.status(404).json({ Error: "Email does not exist" });
        }

        // else compare user password with our db hashed password
        const checkPassword = await bcrypt.compare(password, findUser.password);

        if (!checkPassword) {
            //if compared and the result is false, we tell user he entered the wrong credentials
            return res.status(401).json({ Error: "Invalid credentials" });
        }

        //else we create a token and respond the token to frontend
        const jwtToken = await jwt.sign({ email: findUser.email }, process.env.JWTSECRET, { expiresIn: '1h' });

        return res.status(200).json({ accessToken: jwtToken, token_type: 'Bearer', expires_in: "1h" })



    } catch (err) {
        return res.status(500).json(err);
    }


})

router.post("/checkUser", async (req: Request, res: Response,) => { //check if token has expired, if not send the user email to frontend
    const { jwtToken } = req.body;

    try {
        jwt.verify(jwtToken, process.env.JWTSECRET, (err: any, user: any) => {
            if (err) {
                //if error, tell user that their token is invalid
                return res.status(403).json({ Error: "Invalid User / Session Expired, Please relogin" });
            }
            res.status(200).json(user.email)
        })
    } catch (err) {
        return res.status(500).json(err);
    }
})

module.exports = router