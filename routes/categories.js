const router = require('express').Router();
const categoriesController = require('../controllers/categories');

const validation = require('../middleware/validate');

router.get('/', categoriesController.getAllCategories);
router.get('/:id', categoriesController.getCategoryById);

router.post('/', validation.validateCategory, categoriesController.createCategory);
router.put('/:id', validation.validateCategory, categoriesController.updateCategory);

router.delete('/:id', categoriesController.deleteCategory);

module.exports = router;