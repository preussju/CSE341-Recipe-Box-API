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

