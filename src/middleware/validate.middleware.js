import AppError from "../AppError.js";

import pkg from 'jsonwebtoken';
const { verify } = pkg;


export async function validateToken(req, res, next) {

    console.log("Validando token...")
    
    let token = req.headers.authorization;

    if (!token) {
        return next(new AppError('No token provided', 401));
    }

    token = token.replace("Bearer ", "")

    verify(
        token, 
        String(process.env.SECRET_KEY),


        (err, decoded) => {

            if (err) {
                throw new AppError(err.message, 401);
            }


            if (decoded) {
                res.locals.userID = decoded.userID;
                res.locals.userType = decoded.userType;
            } else {
                throw new AppError('Invalid token', 401);
            }
        }
    );


    next();
}