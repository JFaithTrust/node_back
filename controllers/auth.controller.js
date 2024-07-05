const authService = require('../services/auth.service');
const { validationResult } = require('express-validator');
const BaseError = require('../errors/base.error.js');

class AuthController{
  async register(req, res, next){
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(BaseError.BadRequestError("Error with validation", errors.array()));
      }

      const {email, password} = req.body;
      const data = await authService.register(email, password);
      res.cookies('refreshToken', data.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true});
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async activation(req, res, next){
    try {
      const {id} = req.params;
      await authService.activation(id);
      return res.redirect(process.env.CLIENT_URL);
    }catch (error){
      next(error);
    }
  }

  async login(req, res, next){
    const {email, password} = req.body;
    try {
      const data = await authService.login(email, password);
      res.cookies('refreshToken', data.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true});
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next){
    const {refreshToken} = req.cookies;
    try {
      const token = await authService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.status(200).json({token});
    } catch (error) {
      next(error);
    }
  }

  async refresh(req, res, next){
    const {refreshToken} = req.cookies;
    try {
      const data = await authService.refresh(refreshToken);
      res.clearCookie('refreshToken');
      res.cookies('refreshToken', data.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true});
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async getUsers(req, res, next){
    try {
      const users = await authService.getUsers();
      return res.json(users);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();