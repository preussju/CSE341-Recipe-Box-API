const router = require('express').Router();
const ratingsController = require('../controllers/ratings');

const {isAuthenticated} = require("../middleware/authenticate")
const validation = require('../middleware/validate');

router.get('/', ratingsController.getAllRatings);
router.get('/:id', ratingsController.getRatingById);

router.post('/', isAuthenticated, validation.validateRating, ratingsController.createRating);
router.put('/:id',isAuthenticated, validation.validateRating, ratingsController.updateRating);

router.delete('/:id',isAuthenticated, ratingsController.deleteRating);

module.exports = router;