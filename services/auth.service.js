const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const UserDto = require('../dtos/user.dto');
const tokenService = require('./token.service');
const mailService = require('./mail.service');
const BaseError = require('../errors/base.error');

class AuthService{
  async register(email, password){
    const existUser = await userModel.findOne({email});

    if(existUser){
      throw BaseError.BadRequestError(`User with email ${email} already exist`);
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({email, password: hashPassword});
    const userDto = new UserDto(user);

    await mailService.sendMail(email, `${process.env.API_URL}/api/activation/${userDto.id}`);

    const tokens = tokenService.generateToken({...userDto});

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {user: userDto, ...tokens};
  }

  async activation(userId){
    const user = await userModel.findById(userId);

    if(!user){
      BaseError.BadRequestError('User not found');
    }

    user.isActivated = true;
    await user.save();
  }

  async login(email, password){
    const user = await userModel.findOne({email});
    if(!user){
      throw BaseError.BadRequestError(`User with email ${email} not found`);
    }

    const isPassword = await bcrypt.compare(password, user.password);
    if(!isPassword){
      throw BaseError.BadRequestError('Wrong password');
    }

    const userDto = new UserDto(user);

    const tokens = tokenService.generateToken({...userDto});

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {user: userDto, ...tokens};
  }

  async logout(refreshToken){
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken){
    if(!refreshToken){
      throw BaseError.UnauthorizedError('User not authorized');
    }

    const userPayload = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);

    if(!userPayload || !tokenFromDb){
      throw BaseError.UnauthorizedError('User not authorized');
    }

    const user = await userModel.findById(userPayload.id);
    const userDto = new UserDto(user);

    const tokens = tokenService.generateToken({...userDto});

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {user: userDto, ...tokens};
  }

  async getUsers(){
    return await userModel.find();
  }
}

module.exports = new AuthService;