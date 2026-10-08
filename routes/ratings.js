const router = require('express').Router();
const ratingsController = require('../controllers/ratings');

router.get('/', ratingsController.getRatingsByRecipe);
router.get('/:id', ratingsController.getRatingById);

router.post('/', ratingsController.createRating);
router.put('/:id', ratingsController.updateRating);
router.delete('/:id', ratingsController.deleteRating);

module.exports = router;