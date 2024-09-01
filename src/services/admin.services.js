import AppError from "../AppError.js";
import Nutricionist from "../models/nutricionist.model.js";
import User from "../models/user.model.js";

import crypt from "bcryptjs"

export async function insertNutri(req, res) {

    const password = crypt.hashSync(req.body.password);

    const user = await User.create({
        name: req.body.name, 
        email: req.body.email,
        password: password,
        userType: 1
    });

    const nutri = await Nutricionist.create({
        userID: user.userID, 
        CRN: req.body.CRN
    });

    user.password = undefined;
    
    if (user) return res.status(200).json(user);

}

export async function getNutri(req, res) {

    if (res.locals.userType == 0) {
       
        const nutris = await User.findAll({
            include: {
                model: Nutricionist,
                required: true
            }
        });

        res.json(nutris);

    } else {
        res.status(403).json({ error: 'Forbidden' });
    }

}

export async function getNutriByID(req, res) {

    console.log(req.params.id)

    if (res.locals.userType == 0) {
       
        const nutri = await User.findOne({
            include: {
                model: Nutricionist,
                required: true
            }, 
            where: { userID: req.params.id}
        });

        nutri.password = undefined;
        res.json(nutri);

    } else {
        res.status(403).json({ error: 'Forbidden' });
    }

}

export async function updateNutri (req, res) {

    // encontrando o user pelo id que deve ser passado na url
    const user = await User.findByPk(req.params.id);

    if (req.body.password) {
        req.body.password = crypt.hashSync(req.body.password)
    }
    // método do próprio sequelize para atualizar os campos
    user.update(req.body);

    // devolvendo o usuário atualizado para o frontend com o status code mais adequado
    // 200 OK 
    res.status(200).json({ ...user.toJSON(), password: undefined });
}

export const deleteNutri = async (req, res) => {

    const user = await User.findByPk(req.params.id);

    await user.destroy();

    res.status(204).send()
}