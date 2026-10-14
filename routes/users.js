const router = require('express').Router();
const usersController = require('../controllers/users');

const validation = require('../middleware/validate');

router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUserById);

router.post('/', usersController.createUser);
router.put('/:id', usersController.updateUser);

router.delete('/:id', usersController.deleteUser);

module.exports = router;