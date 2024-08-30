import Nutricionist from "../models/nutricionist.model";
import User from "../models/user.model";

export async function createNutri(req, res) {

    const user = await User.create({...req.body, CRN: undefined})
    const nutri = await Nutricionist.create({
        userID: user.userID, 
        CRN: req.body.CRN
    })

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