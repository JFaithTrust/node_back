const BaseError = require('../errors/base.error');
const tokenService = require('../services/token.service');

module.exports = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if(!authorization){
      next(BaseError.UnauthorizedError('User not authorized'))
    }

    const accessToken = authorization.split(' ')[1];
    if(!accessToken){
      next(BaseError.UnauthorizedError('User not authorized'))
    }

    const userData = tokenService.validateAccessToken(accessToken);
    if(!userData){
      next(BaseError.UnauthorizedError('User not authorized'))
    }

    req.user = userData;
  } catch (error) {
    next(
      BaseError.UnauthorizedError('User not authorized')
    );
  }
}