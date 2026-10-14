const router = require('express').Router();
const recipesController = require('../controllers/recipes');

const {isAuthenticated} = require("../middleware/authenticate")
const validation = require('../middleware/validate');

router.get('/', recipesController.getAllRecipes);
router.get('/:id', recipesController.getRecipeById);

router.post('/', isAuthenticated, validation.validateRecipe, recipesController.createRecipe);
router.put('/:id',isAuthenticated, validation.validateRecipe, recipesController.updateRecipe);

router.delete('/:id',isAuthenticated, recipesController.deleteRecipe);

module.exports = router;