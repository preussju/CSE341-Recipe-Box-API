const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const validateUser = (body, isUpdate = false) => {
    const errors = [];

    if (!isUpdate || body.name !== undefined) {
        if (typeof body.name !== 'string' || !body.name.trim()) {
            errors.push('Name is required and must be a non-empty string.');
        }
    }

    if (!isUpdate || body.email !== undefined) {
        if (
            typeof body.email !== 'string' ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)
        ) {
            errors.push('A valid email is required.');
        }
    }

    if (
        body.profilePicture !== undefined &&
        typeof body.profilePicture !== 'string'
    ) {
        errors.push('Profile picture must be a string.');
    }

    if (!isUpdate) {
        if (typeof body.githubId !== 'string' || !body.githubId.trim()) {
            errors.push('GitHub ID is required.');
        }
    }

    return errors;
};

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

        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                error: 'Invalid user ID.'
            });
        }


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
        const body = req.body || {};
        const errors = validateUser(body);

        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        const db = mongodb.getDatabase();

        const newUser = {
            githubId: body.githubId.trim(),
            name: body.name.trim(),
            email: body.email.trim(),
            profilePicture: body.profilePicture?.trim() || '',
            createdAt: new Date()
        };

        const result = await db.collection('users').insertOne(newUser);

        res.status(201).json({
            id: result.insertedId
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({
            error: 'An error occurred while creating the user.'
        });
    }
};

const updateUser = async (req, res) => {
    //#swagger.tags=['Users']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                error: 'Invalid user ID.'
            });
        }

        const body = req.body || {};
        const errors = validateUser(body, true);

        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        const user = {};

        if (body.name !== undefined) {
            user.name = body.name.trim();
        }

        if (body.email !== undefined) {
            user.email = body.email.trim();
        }

        if (body.profilePicture !== undefined) {
            user.profilePicture = body.profilePicture.trim();
        }

        if (Object.keys(user).length === 0) {
            return res.status(400).json({
                error: 'At least one field must be provided for update.'
            });
        }

        const db = mongodb.getDatabase();

        const result = await db.collection('users').updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: user }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({
                error: 'User not found.'
            });
        }

        res.status(200).json({
            message: 'User updated successfully.'
        });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({
            error: 'An error occurred while updating the user.'
        });
    }
};

const deleteUser = async (req, res) => {
    //#swagger.tags=['Users']
    try {

        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                error: 'Invalid user ID.'
            });
        }

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