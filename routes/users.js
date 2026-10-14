const router = require('express').Router();
const usersController = require('../controllers/users');

const {isAuthenticated} = require("../middleware/authenticate")
const validation = require('../middleware/validate');

router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUserById);

router.post('/',isAuthenticated, validation.validateUser, usersController.createUser);
router.put('/:id',isAuthenticated, validation.validateUser, usersController.updateUser);

router.delete('/:id',isAuthenticated,usersController.deleteUser);

module.exports = router;