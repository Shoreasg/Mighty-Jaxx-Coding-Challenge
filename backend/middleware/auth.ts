const jwt = require('jsonwebtoken')
import { Request, Response, NextFunction } from "express";

//auth middleware, check if its an authenticated user who send the request.
export const authMiddleWare = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization; //get header jwt token
    if (authHeader) // if jwt token exist, verify jwt
    {
        const token = authHeader.split(" ")[1]; // remove bearer and get the token
        jwt.verify(token, process.env.JWTSECRET, (err: any, user: any) => { //verify jwt
            if (err) {
                //if error, tell user that their token is invalid
                return res.status(403).json({ Error: "Token is not valid!" });
            }

            // if token is valid at this stage, get the payload user email,then add the user email in the req body.
            req.user = user.email; // req.user, define the type on custom.d.ts
            next();
        })
    } else {
        res.status(401).json("You are not authenticated!");
    }
}