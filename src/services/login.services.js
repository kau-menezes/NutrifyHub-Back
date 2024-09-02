import { where } from "sequelize";
import User from "../models/user.model.js";
import crypt from "bcryptjs"
import AppError from "../AppError.js";
import Token from "jsonwebtoken";
import Nutricionist from "../models/nutricionist.model.js";
import Pacient from "../models/pacient.model.js";

export async function loginVerifyService(req, res) {

    const user = await User.findOne({
        where: { email: req.body.email }
    })

    if (!user) throw new AppError("Usuário não encontrado", 404)

    if (!crypt.compareSync(req.body.password, user.password)) throw new AppError("Senha incorreta filhao", 401)

    // console.log(user);
    
    let userInfo;

    switch (user.userType) {
        case 0:
            userInfo = user;
            break;
        
        case 1:
            userInfo = await User.findOne({
                include: {
                    model: Nutricionist, 
                    as: "Nutricionist",
                    required: true,
                    where: { userID: user.userID }
                }
            })

            break;

        case 2:
            userInfo = await User.findOne({
                include: {
                    model: Pacient, 
                    as: "Pacient",
                    required: true,
                    where: { userID: user.userID }
                }
            })

            break;

        default:
            break;
    }

    console.log("\n\n\n", userInfo)
    
    res.status(200).json({
        token: Token.sign(
            { userID: user.userID, userType: user.userType },
            "secret-key",
            {  }
        ),
        userInfo
    })
}