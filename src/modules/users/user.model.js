import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import { passwordReg } from './user.validations'

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
    minlength:[6, 'Passwoord need to be longer'],
    validate:{
      validator(password){
          return passwordReg.test(password);
      },
      message: '{VALUE} is not a valid passwoord!',
    },
  },
});

export default mongoose.model('User', UserSchema);
