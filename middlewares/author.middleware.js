const BaseError = require('../errors/base.error');
const postModel = require('../models/post.model');

module.exports = async (req, res, next) => {
  try{
    const post = await postModel.findById(req.params.id);
    const authorId = req.user.id;

    if(post.author.toString() !== authorId) {
      return next(BaseError.BadRequestError('Only author can edit this post.'));
    }

    next();
  }
  catch (error) {
    next(BaseError.BadRequestError('Only author can edit this post.'));
  }
}