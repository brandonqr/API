import mongoose, { Schema } from 'mongoose';//libreria de la base de datos
import validator from 'validator';//para validar los los campos
import { hashSync, compareSync } from 'bcrypt-nodejs';//para encriptar la contraseña
import jwt from 'jsonwebtoken';
import { passwordReg } from './user.validations';
import constants from '../../config/constants'

const UserSchema = new Schema({
  email:{
    type: String,
    unique: true,
    required: [true, 'email is required!'],
    trim: true,
    validate: {
      validator(email){
        return validator.isEmail(email);
      },
      message: '{VALUE} is not a valid email!'
    },
  },
  firstName:{
    type: String ,
    required: [true, 'FirsName is required!'],
    trim: true,
  },
  lastName:{
    type: String ,
    required: [true, 'Lastname is required!'],
    trim: true,
  },
  userName:{
    type: String ,
    required: [true, 'Username is required!'],
    trim: true,
    unique: true,
  },
  password: {
    type: String ,
    required: [true, 'Password is required!'],
    trim: true,
    minlength:[6, 'Password need to be longer'],
    validate:{
      validator(password){
          return passwordReg.test(password);
      },
      message: '{VALUE} is not a valid password!',
    },
  },
});
UserSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password=this.hashPassword(this.password);
    return next();

  }
  return next();
});
UserSchema.methods = {
  hashPassword(password){
    return hashSync(password);
  },
  authenticateUser(password){
    return compareSync(password, this.password)
  },
  createToken(){
    return jwt.sign({
      _id:this._id,
    },
    constants.JWT_SECRET,
  );},
  toJSON(){
    return{
      _id: this._id,
      userName:this.userName,
      token:`JWT ${this.createToken()}`
    }
  }

};
export default mongoose.model('User', UserSchema);
