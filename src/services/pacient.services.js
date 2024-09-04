import Diet from "../models/diet.model.js";
import dietRecipe from "../models/dietRecipe.model.js";
import Pacient from "../models/pacient.model.js";
import Planner from "../models/planner.model.js";
import Recipe from "../models/recipe.model.js";
import plannerDays from "../models/plannerDays.model.js"

export async function getDiet(req, res) {

    console.log("\n\n\n\n\n\n\n\n", req.params.pacientID, "\n\n\n\n\n\n\n\n");
    
    try {
        const pacient = await Pacient.findByPk(req.params.pacientID);
        
        if (!pacient) {
            return res.status(404).json({ message: 'Pacient not found' });
        }
        
        const diet = await Diet.findOne({
            include: [
                {
                    model: dietRecipe,
                    required: true,
                    attributes: ['recipeID', 'dietID','period']
                }
            ],
            where: { dietID: pacient.dietID }
        });

        if (!diet) {
            return res.status(404).json({ message: 'Diet not found' });
        }

        const updatedDietRecipes = await Promise.all(diet.DietRecipes.map(async (dietRecipe) => {
            const recipe = await Recipe.findByPk(dietRecipe.dataValues.recipeID, {
                attributes: ['name'] // Only include the 'name' attribute
            });
            
            return {
                ...dietRecipe.dataValues,
                name: recipe ? recipe.dataValues.name : 'Not found'
            };
        }));

        const updatedDiet = {
            ...diet.dataValues,
            DietRecipes: updatedDietRecipes
        };

        res.status(200).json(updatedDiet);

    } catch (error) {
        console.error('Error fetching diet and recipes:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export async function insertPlanning(req, res) {

    if (!Planner.findOne({where: {startOfWeek: req.body.startOfWeek}})) {
        const newPlanner = await Planner.create({
            startOfWeek: req.body.startOfWeek,
            pacientID: req.params.pacientID
        })
    }

    const planningPromises = [];

    for (const [day, periods] of Object.entries(req.body.planning)) {
        for (const [period, recipeID] of Object.entries(periods)) {
            planningPromises.push(
                PlannerDays.create({
                    dayOfWeek: day,
                    period: period,
                    recipeID: recipeID,
                    plannerID: planner.plannerID
                })
            );
        }
    }

}