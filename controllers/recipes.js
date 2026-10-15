const mongodb = require('../data/database');

const getAllRecipes = async (req, res) => {
        //#swagger.tags=['Recipes']
    try {
        const db = mongodb.getDatabase();
        const recipes = await db.collection('recipes').find().toArray();

        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving recipes.' });
    }
};

const getRecipeById = async (req, res) => {
         //#swagger.tags=['Recipes']
    try {
        const { ObjectId } = require('mongodb');
        const db = mongodb.getDatabase();

        const recipe = await db.collection('recipes').findOne({
            _id: new ObjectId(req.params.id)
        });

        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found.' });
        }

        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving the recipe.' });
    }
};

const createRecipe = async (req, res) => {
            //#swagger.tags=['Recipes']
    try {
        const db = mongodb.getDatabase();

        const recipe = {
            title: req.body.title,
            description: req.body.description,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions,
            prepTime: req.body.prepTime,
            cookTime: req.body.cookTime,
            servings: req.body.servings,
            categoryId: req.body.categoryId,
            userId: req.body.userId,
            createdAt: new Date()
        };

        const result = await db.collection('recipes').insertOne(recipe);

        res.status(201).json({
            id: result.insertedId
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the recipe.' });
    }
};

const updateRecipe = async (req, res) => {
            //#swagger.tags=['Recipes']
    try {
        const { ObjectId } = require('mongodb');
        const db = mongodb.getDatabase();

        const recipe = {
            title: req.body.title,
            description: req.body.description,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions,
            prepTime: req.body.prepTime,
            cookTime: req.body.cookTime,
            servings: req.body.servings,
            categoryId: req.body.categoryId,
            userId: req.body.userId
        };

        const result = await db.collection('recipes').updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: recipe }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Recipe not found.' });
        }

        res.status(200).json({ message: 'Recipe updated successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the recipe.' });
    }
};

const deleteRecipe = async (req, res) => {
            //#swagger.tags=['Recipes']
    try {
        const { ObjectId } = require('mongodb');
        const db = mongodb.getDatabase();

        const result = await db.collection('recipes').deleteOne({
            _id: new ObjectId(req.params.id)
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Recipe not found.' });
        }

        res.status(200).json({ message: 'Recipe deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the recipe.' });
    }
};

module.exports = {
    getAllRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe
};


// const mongodb = require('../data/database');
// const { ObjectId } = require('mongodb');

// const validateRecipe = (body) => {
//     const errors = [];

//     if (typeof body.title !== 'string' || !body.title.trim()) {
//         errors.push('Title is required.');
//     }

//     if (typeof body.description !== 'string' || !body.description.trim()) {
//         errors.push('Description is required.');
//     }

//     if (!Array.isArray(body.ingredients) || body.ingredients.length === 0) {
//         errors.push('Ingredients must be a non-empty array.');
//     }

//     if (typeof body.instructions !== 'string' || !body.instructions.trim()) {
//         errors.push('Instructions are required.');
//     }

//     if (!Number.isFinite(body.prepTime) || body.prepTime < 0) {
//         errors.push('Prep time must be a non-negative number.');
//     }

//     if (!Number.isFinite(body.cookTime) || body.cookTime < 0) {
//         errors.push('Cook time must be a non-negative number.');
//     }

//     if (!Number.isInteger(body.servings) || body.servings < 1) {
//         errors.push('Servings must be a positive integer.');
//     }

//     if (!ObjectId.isValid(body.categoryId)) {
//         errors.push('A valid category ID is required.');
//     }

//     if (!ObjectId.isValid(body.userId)) {
//         errors.push('A valid user ID is required.');
//     }

//     return errors;
// };


// const getAllRecipes = async (req, res) => {
//         //#swagger.tags=['Recipes']
//     try {
//         const db = mongodb.getDatabase();
//         const recipes = await db.collection('recipes').find().toArray();

//         res.status(200).json(recipes);
//     } catch (error) {
//         res.status(500).json({ error: 'An error occurred while retrieving recipes.' });
//     }
// };

// const getRecipeById = async (req, res) => {
//          //#swagger.tags=['Recipes']
//     try {
        
//         if (!ObjectId.isValid(req.params.id)) {
//             return res.status(400).json({
//                 error: 'Invalid recipe ID.'
//             });
//         }

//         const db = mongodb.getDatabase();

//         const recipe = await db.collection('recipes').findOne({
//             _id: new ObjectId(req.params.id)
//         });

//         if (!recipe) {
//             return res.status(404).json({ error: 'Recipe not found.' });
//         }

//         res.status(200).json(recipe);
//     } catch (error) {
//         res.status(500).json({ error: 'An error occurred while retrieving the recipe.' });
//     }
// };

// const createRecipe = async (req, res) => {
//             //#swagger.tags=['Recipes']
//     try {
//         const errors = validateRecipe(req.body || {});

//         if (errors.length > 0) {
//             return res.status(400).json({ errors });
//         }

//         const db = mongodb.getDatabase();

//         const recipe = {
//             title: req.body.title.trim(),
//             description: req.body.description.trim(),
//             ingredients: req.body.ingredients,
//             instructions: req.body.instructions.trim(),
//             prepTime: req.body.prepTime,
//             cookTime: req.body.cookTime,
//             servings: req.body.servings,
//             categoryId: req.body.categoryId,
//             userId: req.body.userId,
//             createdAt: new Date()
//         };

//         const result = await db.collection('recipes').insertOne(recipe);

//         res.status(201).json({
//             id: result.insertedId
//         });
//     } catch (error) {
//         console.error('Error creating recipe:', error);
//         res.status(500).json({
//             error: 'An error occurred while creating the recipe.'
//         });
//     }
// };

// const updateRecipe = async (req, res) => {
//             //#swagger.tags=['Recipes']
//     try {
//         const errors = validateRecipe(req.body || {});

//         if (errors.length > 0) {
//             return res.status(400).json({ errors });
//         }

//         if (!ObjectId.isValid(req.params.id)) {
//             return res.status(400).json({
//                 error: 'Invalid recipe ID.'
//             });
//         }

//         const db = mongodb.getDatabase();

//         const recipe = {
//             title: req.body.title.trim(),
//             description: req.body.description.trim(),
//             ingredients: req.body.ingredients,
//             instructions: req.body.instructions.trim(),
//             prepTime: req.body.prepTime,
//             cookTime: req.body.cookTime,
//             servings: req.body.servings,
//             categoryId: req.body.categoryId,
//             userId: req.body.userId
//         };

//         const result = await db.collection('recipes').updateOne(
//             { _id: new ObjectId(req.params.id) },
//             { $set: recipe }
//         );

//         if (result.matchedCount === 0) {
//             return res.status(404).json({
//                 error: 'Recipe not found.'
//             });
//         }

//         res.status(200).json({
//             message: 'Recipe updated successfully.'
//         });
//     } catch (error) {
//         console.error('Error updating recipe:', error);
//         res.status(500).json({
//             error: 'An error occurred while updating the recipe.'
//         });
//     }
// };

// const deleteRecipe = async (req, res) => {
//             //#swagger.tags=['Recipes']
//     try {
//         if (!ObjectId.isValid(req.params.id)) {
//             return res.status(400).json({
//                 error: 'Invalid recipe ID.'
//             });
//         }

//         const db = mongodb.getDatabase();

//         const result = await db.collection('recipes').deleteOne({
//             _id: new ObjectId(req.params.id)
//         });

//         if (result.deletedCount === 0) {
//             return res.status(404).json({
//                 error: 'Recipe not found.'
//             });
//         }

//         res.status(200).json({
//             message: 'Recipe deleted successfully.'
//         });
//     } catch (error) {
//         console.error('Error deleting recipe:', error);
//         res.status(500).json({
//             error: 'An error occurred while deleting the recipe.'
//         });
//     }
// };

// module.exports = {
//     getAllRecipes,
//     getRecipeById,
//     createRecipe,
//     updateRecipe,
//     deleteRecipe
// };

