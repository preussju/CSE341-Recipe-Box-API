const mongodb = require('../data/database');

const getAllCategories = async (req, res) => {
    try {
        const db = mongodb.getDatabase();
        const categories = await db.collection('categories').find().toArray();

        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving categories.' });
    }
};

const getCategoryById = async (req, res) => {
    try {
        const { ObjectId } = require('mongodb');
        const db = mongodb.getDatabase();

        const category = await db.collection('categories').findOne({
            _id: new ObjectId(req.params.id)
        });

        if (!category) {
            return res.status(404).json({ error: 'Category not found.' });
        }

        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving the category.' });
    }
};

const createCategory = async (req, res) => {
    try {
        const db = mongodb.getDatabase();

        const category = {
            name: req.body.name,
            description: req.body.description,
            createdAt: new Date()
        };

        const result = await db.collection('categories').insertOne(category);

        res.status(201).json({
            id: result.insertedId
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the category.' });
    }
};

const updateCategory = async (req, res) => {
    try {
        const { ObjectId } = require('mongodb');
        const db = mongodb.getDatabase();

        const category = {
            name: req.body.name,
            description: req.body.description
        };

        const result = await db.collection('categories').updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: category }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Category not found.' });
        }

        res.status(200).json({ message: 'Category updated successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the category.' });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { ObjectId } = require('mongodb');
        const db = mongodb.getDatabase();

        const result = await db.collection('categories').deleteOne({
            _id: new ObjectId(req.params.id)
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Category not found.' });
        }

        res.status(200).json({ message: 'Category deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the category.' });
    }
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};