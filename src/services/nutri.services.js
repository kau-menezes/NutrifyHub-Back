import AppError from "../AppError.js";
import Pacient from "../models/pacient.model.js";
import Nutricionist from "../models/nutricionist.model.js";
import Diet from "../models/diet.model.js";
import dietRecipe from "../models/dietRecipe.model.js";
import User from "../models/user.model.js";

import crypt from "bcryptjs"

export async function insertPacient(req, res) {

    const password = crypt.hashSync(req.body.password);

    const user = await User.create({
        name: req.body.name, 
        email: req.body.email,
        password: password,
        userType: 2
    });
    
    const pacient = await Pacient.create({
        userID: user.userID, 
        nutricionistID: req.params.nutriID
    });

    user.password = undefined;
    
    if (user) return res.status(200).json({user, pacient});

}

export async function insertDiet(req, res) {

    console.log("\n\n\n\n\n\n\n\n", req.body, "\n\n\n\n\n\n\n\n");

    const diet = await Diet.create({
        totalCalories: req.body.calories, 
        waterIntake: req.body.water,
        protein: req.body.protein,
        carbs: req.body.carbs,
        fat: req.body.fat,
        nutricionistID: req.params.nutriID
    });
    
    const pacient = await Pacient.findByPk(req.params.pacientID);

    pacient.update({
        dietID: diet.dietID,
    });

    req.body.recipes.forEach( async (recipe) => {
        await dietRecipe.create({
            period: recipe.period,
            dietID: diet.dietID,
            recipeID: recipe.recipeID
        })
    });

    if (diet) return res.status(200).json({diet, pacient});

}

export async function getPacient(req, res) {
    
    if (res.locals.userType == 1) {
       
        const pacients = await User.findAll({
            include: {
                model: Pacient, 
                as: "Pacient",
                required: true,
                where: { nutricionistID: req.params.nutriID }
            },
        }); 

        res.json(pacients);

    } else {
        res.status(403).json({ error: 'Forbidden' });
    }

}

export async function getNutriByID(req, res) {

    console.log(req.params.id)

    if (res.locals.userType == 1) {
       
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

export const deletePacient = async (req, res) => {

    
    console.log(req.params.userID);
    
    const user = await User.findByPk(req.params.userID);
    console.log(user);

    await user.destroy();

    res.status(204).send()
}