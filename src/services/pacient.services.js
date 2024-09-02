import Diet from "../models/diet.model.js";
import dietRecipe from "../models/dietRecipe.model.js";
import Pacient from "../models/pacient.model.js";
import Recipe from "../models/recipe.model.js";
import User from "../models/user.model.js";

export async function getDiet(req, res) {

    const pacientDietID = await Pacient.findByPk(req.params.pacientID);
    
    console.log(pacientDietID.dietID);

    const diet = await Diet.findOne({
        include: [
            {
                model: dietRecipe,
                required: true,
                attributes: ['recipeID', 'dietID'],
                include: [
                    {
                        model: Recipe,
                        attributes: ['name'] // Include the recipe name
                    }
                ]
            }
            

        ],
        where: { dietID: pacientDietID.dietID }

    });

    console.log(diet);
    

    res.status(200).json(diet)

}