const router = require('express').Router();
const ratingsController = require('../controllers/ratings');

const validation = require('../middleware/validate');

router.get('/', ratingsController.getAllRatings);
router.get('/:id', ratingsController.getRatingById);

router.post('/', validation.validateRating, ratingsController.createRating);
router.put('/:id', validation.validateRating, ratingsController.updateRating);

router.delete('/:id', ratingsController.deleteRating);

module.exports = router;