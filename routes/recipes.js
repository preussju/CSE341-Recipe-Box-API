const router = require('express').Router();
const recipesController = require('../controllers/recipes');

const validation = require('../middleware/validate');

router.get('/', recipesController.getAllRecipes);
router.get('/:id', recipesController.getRecipeById);

router.post('/', validation.validateRecipe, recipesController.createRecipe);
router.put('/:id',validation.validateRecipe, recipesController.updateRecipe);

router.delete('/:id', recipesController.deleteRecipe);

module.exports = router;