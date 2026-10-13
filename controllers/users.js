const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAllUsers = async (req, res) => {
    //#swagger.tags=['Users']
    try {
        const db = mongodb.getDatabase();
        const users = await db.collection('users').find().toArray();

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving users.' });
    }
};

const getUserById = async (req, res) => {
    //#swagger.tags=['Users']
    try {
        const db = mongodb.getDatabase();

        const user = await db.collection('users').findOne({
            _id: new ObjectId(req.params.id)
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving the user.' });
    }
};

const createUser = async (req, res) => {
    //#swagger.tags=['Users']
    try {
        const db = mongodb.getDatabase();

        const newUser = {
            githubId: req.body.githubId,
            name: req.body.name,
            email: req.body.email,
            profilePicture: req.body.profilePicture,
            createdAt: new Date()
        };

        const result = await db.collection('users').insertOne(newUser);

        res.status(201).json({
            id: result.insertedId
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the user.' });
    }
};

const updateUser = async (req, res) => {
    //#swagger.tags=['Users']
    try {
        const db = mongodb.getDatabase();

        const user = {
            name: req.body.name,
            email: req.body.email,
            profilePicture: req.body.profilePicture
        };

        const result = await db.collection('users').updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: user }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'User not found.' });
        }

        res.status(200).json({ message: 'User updated successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the user.' });
    }
};

const deleteUser = async (req, res) => {
    //#swagger.tags=['Users']
    try {
        const db = mongodb.getDatabase();

        const result = await db.collection('users').deleteOne({
            _id: new ObjectId(req.params.id)
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'User not found.' });
        }

        res.status(200).json({ message: 'User deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the user.' });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};