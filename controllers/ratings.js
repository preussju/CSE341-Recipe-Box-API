const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAllRatings = async (req, res) => {
    //#swagger.tags=['Ratings']
    try {
        const db = mongodb.getDatabase();
        const ratings = await db.collection('ratings').find().toArray();

        res.status(200).json(ratings);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving ratings.' });
    }
};

const getRatingById = async (req, res) => {
    //#swagger.tags=['Ratings']
    try {
        const db = mongodb.getDatabase();

        const rating = await db.collection('ratings').findOne({
            _id: new ObjectId(req.params.id)
        });

        if (!rating) {
            return res.status(404).json({ error: 'Rating not found.' });
        }

        res.status(200).json(rating);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving the rating.' });
    }
};

const createRating = async (req, res) => {
    //#swagger.tags=['Ratings']
    try {
        const db = mongodb.getDatabase();

        const rating = {
            recipeId: new ObjectId(req.params.recipeId),
            userId: new ObjectId(req.body.userId),
            score: req.body.score,
            comment: req.body.comment,
            createdAt: new Date()
        };

        const result = await db.collection('ratings').insertOne(rating);

        res.status(201).json({
            id: result.insertedId
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the rating.' });
    }
};

const updateRating = async (req, res) => {
    //#swagger.tags=['Ratings']
    try {
        const db = mongodb.getDatabase();

        const rating = {
            score: req.body.score,
            comment: req.body.comment
        };

        const result = await db.collection('ratings').updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: rating }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Rating not found.' });
        }

        res.status(200).json({ message: 'Rating updated successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the rating.' });
    }
};

const deleteRating = async (req, res) => {
    //#swagger.tags=['Ratings']
    try {
        const db = mongodb.getDatabase();

        const result = await db.collection('ratings').deleteOne({
            _id: new ObjectId(req.params.id)
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Rating not found.' });
        }

        res.status(200).json({ message: 'Rating deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the rating.' });
    }
};

module.exports = {
    getAllRatings,
    getRatingById,
    createRating,
    updateRating,
    deleteRating
};