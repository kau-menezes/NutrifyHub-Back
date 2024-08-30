import Pacient from "../models/pacient.model.js";
import User from "../models/user.model.js";

export async function createPacient(req, res) {

    /*
        BODY DA REQUISIÇÃO:
        - user info
        - id dieta
    
    */

    const user = await User.create(req.body)

    const pacient = await Pacient.create({
        userID: user.userID, 
        dietID: req.body.dietID
    })

    user.password = undefined;
    
    if (user) return res.status(200).json(user);

}

export async function updatePacient (req, res) {

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