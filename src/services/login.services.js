import { where } from "sequelize";
import User from "../models/user.model.js";
import crypt from "bcryptjs"
import AppError from "../AppError.js";
import Token from "jsonwebtoken";

export async function loginVerifyService(req, res) {

    const user = await User.findOne({
        where: { email: req.body.email }
    })

    if (!user) throw new AppError("Usuário não encontrado", 404)

    if (!crypt.compareSync(req.body.password, user.password)) throw new AppError("Senha incorreta filhao", 401)
    
    res.status(200).json({
        token: Token.sign(
            { userID: user.userID, userType: user.userType },
            "secret",
            {  })
    })
}