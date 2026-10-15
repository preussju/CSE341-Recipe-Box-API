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

// const mongodb = require('../data/database');
// const { ObjectId } = require('mongodb');

// const validateRating = (body) => {
//     const errors = [];

//     if (!Number.isInteger(body.score) || body.score < 1 || body.score > 5) {
//         errors.push('Score must be an integer between 1 and 5.');
//     }

//     if (
//         body.comment !== undefined &&
//         typeof body.comment !== 'string'
//     ) {
//         errors.push('Comment must be a string.');
//     }

//     if (
//         typeof body.comment === 'string' &&
//         body.comment.length > 1000
//     ) {
//         errors.push('Comment cannot exceed 1000 characters.');
//     }

//     if (!ObjectId.isValid(body.userId)) {
//         errors.push('A valid user ID is required.');
//     }

//     return errors;
// };

// const getAllRatings = async (req, res) => {
//     //#swagger.tags=['Ratings']
//     try {
//         const db = mongodb.getDatabase();
//         const ratings = await db.collection('ratings').find().toArray();

//         res.status(200).json(ratings);
//     } catch (error) {
//         console.error('Error retrieving ratings:', error);
//         res.status(500).json({
//             error: 'An error occurred while retrieving ratings.'
//         });
//     }
// };

// const getRatingById = async (req, res) => {
//     //#swagger.tags=['Ratings']
//     try {
//         if (!ObjectId.isValid(req.params.id)) {
//             return res.status(400).json({
//                 error: 'Invalid rating ID.'
//             });
//         }

//         const db = mongodb.getDatabase();

//         const rating = await db.collection('ratings').findOne({
//             _id: new ObjectId(req.params.id)
//         });

//         if (!rating) {
//             return res.status(404).json({
//                 error: 'Rating not found.'
//             });
//         }

//         res.status(200).json(rating);
//     } catch (error) {
//         console.error('Error retrieving rating:', error);
//         res.status(500).json({
//             error: 'An error occurred while retrieving the rating.'
//         });
//     }
// };

// const createRating = async (req, res) => {
//     //#swagger.tags=['Ratings']
//     try {
//         const body = req.body || {};
//         const errors = validateRating(body);

//         if (errors.length > 0) {
//             return res.status(400).json({ errors });
//         }

//         if (!ObjectId.isValid(req.params.recipeId)) {
//             return res.status(400).json({
//                 error: 'Invalid recipe ID.'
//             });
//         }

//         const db = mongodb.getDatabase();

//         const rating = {
//             recipeId: new ObjectId(req.params.recipeId),
//             userId: new ObjectId(body.userId),
//             score: body.score,
//             comment: body.comment?.trim() || '',
//             createdAt: new Date()
//         };

//         const result = await db.collection('ratings').insertOne(rating);

//         res.status(201).json({
//             id: result.insertedId
//         });
//     } catch (error) {
//         console.error('Error creating rating:', error);
//         res.status(500).json({
//             error: 'An error occurred while creating the rating.'
//         });
//     }
// };

// const updateRating = async (req, res) => {
//     //#swagger.tags=['Ratings']
//     try {
//         if (!ObjectId.isValid(req.params.id)) {
//             return res.status(400).json({
//                 error: 'Invalid rating ID.'
//             });
//         }

//         const body = req.body || {};
//         const errors = [];

//         if (
//             body.score !== undefined &&
//             (!Number.isInteger(body.score) || body.score < 1 || body.score > 5)
//         ) {
//             errors.push('Score must be an integer between 1 and 5.');
//         }

//         if (
//             body.comment !== undefined &&
//             typeof body.comment !== 'string'
//         ) {
//             errors.push('Comment must be a string.');
//         }

//         if (
//             typeof body.comment === 'string' &&
//             body.comment.length > 1000
//         ) {
//             errors.push('Comment cannot exceed 1000 characters.');
//         }

//         if (body.score === undefined && body.comment === undefined) {
//             errors.push('At least one field (score or comment) is required.');
//         }

//         if (errors.length > 0) {
//             return res.status(400).json({ errors });
//         }

//         const rating = {};

//         if (body.score !== undefined) {
//             rating.score = body.score;
//         }

//         if (body.comment !== undefined) {
//             rating.comment = body.comment.trim();
//         }

//         const db = mongodb.getDatabase();

//         const result = await db.collection('ratings').updateOne(
//             { _id: new ObjectId(req.params.id) },
//             { $set: rating }
//         );

//         if (result.matchedCount === 0) {
//             return res.status(404).json({
//                 error: 'Rating not found.'
//             });
//         }

//         res.status(200).json({
//             message: 'Rating updated successfully.'
//         });
//     } catch (error) {
//         console.error('Error updating rating:', error);
//         res.status(500).json({
//             error: 'An error occurred while updating the rating.'
//         });
//     }
// };

// const deleteRating = async (req, res) => {
//     //#swagger.tags=['Ratings']
//     try {
//         if (!ObjectId.isValid(req.params.id)) {
//             return res.status(400).json({
//                 error: 'Invalid rating ID.'
//             });
//         }

//         const db = mongodb.getDatabase();

//         const result = await db.collection('ratings').deleteOne({
//             _id: new ObjectId(req.params.id)
//         });

//         if (result.deletedCount === 0) {
//             return res.status(404).json({
//                 error: 'Rating not found.'
//             });
//         }

//         res.status(200).json({
//             message: 'Rating deleted successfully.'
//         });
//     } catch (error) {
//         console.error('Error deleting rating:', error);
//         res.status(500).json({
//             error: 'An error occurred while deleting the rating.'
//         });
//     }
// };

// module.exports = {
//     getAllRatings,
//     getRatingById,
//     createRating,
//     updateRating,
//     deleteRating
// };