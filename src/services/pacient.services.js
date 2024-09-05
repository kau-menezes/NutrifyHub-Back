import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek.js'
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import { Sequelize } from "sequelize";

dayjs.extend(customParseFormat);
dayjs.extend(isoWeek);


import Calendar from "../models/calendar.model.js";
import Diet from "../models/diet.model.js";
import dietRecipe from "../models/dietRecipe.model.js";
import Pacient from "../models/pacient.model.js";
import Recipe from "../models/recipe.model.js";
import AppError from '../AppError.js';


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

    console.log(req.body)

    try {
        const { week, entries } = req.body;

        // Validate request body
        if (!week || !entries || !Array.isArray(entries)) {
            return new AppError("Bad Request: missing parameters", 400)
        }

        // Use a promise-based approach to handle async operations
        const promises = [];

        for (const day of entries) {
            const { date, recipes } = day;

            // Debugging: Check the raw date value
            console.log('Received date:', date);

            // Ensure date is provided and not undefined
            if (!date) {
                return new AppError("Bad Request: missing date entry somewhere", 400)

            }

            // Parse and validate the date
            const parsedDate = dayjs(date, 'DD/MM/YYYY', true);

            console.log(parsedDate);
            

            for (const recipe of recipes || []) {

                const { period, recipeID } = recipe;

                if (!period || !recipeID) {
                    return new AppError("Bad Request: missing recipe or period for this date", 400)
                }

                    promises.push(Calendar.create({
                        day: parsedDate.toDate(), // Ensure day is included
                        week: req.body.week,
                        period, 
                        recipeID, 
                        pacientID: req.params.pacientID
                    }));
            }
        }

        await Promise.all(promises);

        res.status(200).json({ message: 'Recipes successfully inserted into the calendar.' });
        
    } catch (error) {

        res.status(500).json({ error: error.message });
    }


}

export async function getPlanning(req, res) {

    // const planning = await Calendar.findAll({ 
    //     where: { week: req.params.week }, 
    //     attributes: ['day', 'recipeID']

    // if (planning.length == 0) {
    //     res.status(204).json({message: "No planned meals for this week"} )
    // }

    // const planningData = planning.map(plannedDay => plannedDay.toJSON());

    // const updatedPlannedRecipes = await Promise.all(planningData.map(async ( plannedDay ) => {
    //     const recipe = await Recipe.findByPk(plannedDay.recipeID, {
    //         attributes: ['name'] 
    //     });
        
    //     return {
    //         ...plannedDay,
    //         name: recipe ? recipe.name : 'Not found'
    //     };
    // }));

    const startOfYear = dayjs().year(req.params.year).startOf('year');

    // Calculate the start date of the specified week
    const startOfWeek = startOfYear.isoWeek(req.params.week).startOf('isoWeek');
    
    // Create an array of dates for the week
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
        weekDates.push(startOfWeek.add(i, 'day').format('YYYY-MM-DD'));
    }

    const planning = await Calendar.findAll({
        attributes: [
            'day',
            'recipeID',
            'period'
        ],
        where: { week: req.params.week },
        group: ['day', 'recipeID', 'period'] // Group by day, recipeID, and period
    });
    
    if (planning.length === 0) {



        return res.status(200).json({ weekRecipes: [], week: req.params.week });
    }
    
    // Convert planning to a plain JSON object
    const planningData = planning.map(plannedDay => plannedDay.toJSON());
    
    // Create a map to group recipes by day and period
    const groupedByDayAndPeriod = planningData.reduce((acc, curr) => {
        const { day, recipeID, period } = curr;
        if (!acc[day]) {
            acc[day] = {};
        }
        if (!acc[day][period]) {
            acc[day][period] = [];
        }
        acc[day][period].push({ recipeID });
        return acc;
    }, {});
    
    // Fetch recipe names and update grouped data
    const updatedPlannedRecipes = await Promise.all(Object.keys(groupedByDayAndPeriod).map(async (day) => {
        const periods = groupedByDayAndPeriod[day];
        const recipesByPeriod = await Promise.all(Object.keys(periods).map(async (period) => {
            const recipes = await Promise.all(periods[period].map(async ({ recipeID }) => {
                const recipe = await Recipe.findByPk(recipeID, {
                    attributes: ['name']
                });
                return {
                    recipeID,
                    name: recipe ? recipe.name : 'Not found'
                };
            }));
    
            return {
                period,
                recipes
            };
        }));
    
        return {
            day,
            periods: recipesByPeriod
        };
    }));
    
    res.status(200).json({weekRecipes: updatedPlannedRecipes, week: req.params.week});
    
    
}