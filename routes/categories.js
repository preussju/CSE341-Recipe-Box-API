const router = require('express').Router();
const categoriesController = require('../controllers/categories');

const {isAuthenticated} = require("../middleware/authenticate")
const validation = require('../middleware/validate');

router.get('/', categoriesController.getAllCategories);
router.get('/:id', categoriesController.getCategoryById);

router.post('/', isAuthenticated, validation.validateCategory, categoriesController.createCategory);
router.put('/:id', isAuthenticated, validation.validateCategory, categoriesController.updateCategory);

router.delete('/:id',isAuthenticated, categoriesController.deleteCategory);

module.exports = router;