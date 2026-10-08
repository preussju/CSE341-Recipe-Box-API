//const passport = require('passport');
const router = require('express').Router();

router.use('/', require('./swagger'));

router.use('/categories', require('./categories'));
router.use('/recipes', require('./recipes'));
router.use('/users', require('./users'));
router.use('/ratings', require('./ratings'));

//router.get('/login', passport.authenticate('github'), (req, res) => { }); for oauth
 
// router.get('/logout', function (req, res, next) {                        for oauth
//     req.logout(function (err){
//         if (err) { return next(err); }
//         res.redirect('/');
//     });
// });

module.exports = router;