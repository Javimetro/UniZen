import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import 'dotenv/config';
import {selectUserByUsername} from '../models/user-model.mjs';

// INSECURE LOGIN uses harcoded passwords only
// returns user object if username & password match
const postLogin = async (req, res) => {
  const {username, password} = req.body;
  //console.log('login', req.body);
  const user = await selectUserByUsername(username);
  //console.log(user);
  if (user.error) {
    return res.status(user.error).json(user);
  }
  // compare password and hash, if match, login successful
  const match = await bcrypt.compare(password, user.password); // user.password = hashed password
  // console.log(user.password)
  //console.log(match)
  if (match) {
    delete user.password; // If the passwords match, the function deletes the password from the user object (to avoid sending it in the response),
    const token = jwt.sign(user, process.env.JWT_SECRET, {expiresIn: '24h'}); // A token is created after inputting the password as part of the process of user authentication. This token, a JSON Web Token (JWT), is used to maintain a session for the user without needing to re-enter the password for each request.
    return res.json({message: 'logged in successfully', user, token});
  } else {
    return res
      .status(401)
      .json({error: 401, message: 'invalid username or password'});
  }
};

const getMe = async (req, res) => {
  console.log('getMe', req.user);
  if (req.user) {
    res.json({message: 'token ok', user: req.user});
  } else {
    res.sendStatus(401);
  }
};

export {postLogin, getMe};
