import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import 'dotenv/config';
import {selectUserByUsername} from '../models/user-model.mjs';

// INSECURE LOGIN uses harcoded passwords only
// returns user object if username & password match
const postLogin = async (req, res, next) => {
  try {
    const {username, password} = req.body;
    const user = await selectUserByUsername(username); // here all users info is selected from db

    if (user.error) {
      const error = new Error(user.message || 'An error occurred');
      error.status = user.error;
      return next(error);
    }

    const match = await bcrypt.compare(password, user.password);

    if (match) {
      delete user.password;
      const token = jwt.sign(user, process.env.JWT_SECRET, {expiresIn: '24h'}); //and here all that user info (like the id) are added to the jwt(json web token)
      return res.json({message: 'logged in successfully', user, token});
    } else {
      const error = new Error('Invalid username or password');
      error.status = 401;
      return next(error);
    }
  } catch (error) {
    console.error('Error during login:', error);
    error.status = 500;
    next(error);
  }
};

const getMe = async (req, res, next) => {
    console.log('getMe', req.user);
    if (req.user) {
        res.json({message: 'token ok', user: req.user});
    } else {
        const error = new Error('Unauthorized: User not authenticated');
        error.status = 401;
        return next(error);
    }
};

export {postLogin, getMe};
