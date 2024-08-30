import Nutricionist from "../models/nutricionist.model.js";
import User from "../models/user.model.js";

import crypt from "bcryptjs"

export async function getNutri(req, res) {

    if (res.locals.userType === 0) {
        try {
            const nutris = await Nutricionist.findAll();
            res.json(nutris);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(403).json({ error: 'Forbidden' });
    }

}

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

export async function updateNutri (req, res) {

    // encontrando o user pelo id que deve ser passado na url
    const user = await User.findByPk(request.params.id);
    
    // método do próprio sequelize para atualizar os campos
    user.update(request.body);

    // devolvendo o usuário atualizado para o frontend com o status code mais adequado
    // 200 OK 
    user.password = undefined;
    response.status(200).json(user);
}

export const deleteNutri = async (request, response) => {

    await User.destroy({ where: { id: request.params.id } })

    response.status(204).send()
}