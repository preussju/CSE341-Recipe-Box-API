const validator = require('../helpers/validate');

const validateCategory = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    description: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const validateUser = (req, res, next) => {
  const validationRule = {
    githubId: 'required|string',
    name: 'required|string',
    email: 'string',
    profilePicture: 'string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const validateRecipe = (req, res, next) => {
  const validationRule = {
    title: 'required|string',
    description: 'required|string',
    ingredients: 'required|array',
    instructions: 'required|array',
    prepTime: 'required|integer|min:0',
    cookTime: 'required|integer|min:0',
    servings: 'required|integer|min:1',
    categoryId: 'required|string',
    userId: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const validateRating = (req, res, next) => {
  const validationRule = {
    recipeId: 'required|string',
    userId: 'required|string',
    score: 'required|integer|min:1|max:5',
    comment: 'string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = { validateCategory, validateUser, validateRecipe, validateRating };