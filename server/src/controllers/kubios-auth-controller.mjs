
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';
import { v4 } from 'uuid';
import { errorHandler } from '../middlewares/error-handler.mjs';
import {
  insertUser,
  selectUserByEmail,
  selectUserById,
} from '../models/user-model.mjs';

/**
 * Authentication resource controller using Kubios API for login
* @module controllers/auth-controller
* @author mattpe <mattpe@metropolia.fi>
* @requires jsonwebtoken
* @requires bcryptjs
* @requires dotenv
* @requires models/user-model
* @requires middlewares/error-handler
* @exports postLogin
* @exports getMe
*/


// Kubios API base URL should be set in .env
const baseUrl = process.env.KUBIOS_API_URI;

/**
* Creates a POST login request to Kubios API
* @async
* @param {string} username Username in Kubios
* @param {string} password Password in Kubios
* @return {string} idToken Kubios id token
*/

const kubiosLogin = async (username, password) => {
  // Generate a CSRF token
  const csrf = v4();

  // Set the headers for the request
  const headers = new Headers();
  headers.append('Cookie', `XSRF-TOKEN=${csrf}`);
  headers.append('User-Agent', process.env.KUBIOS_USER_AGENT);

  // Set the request parameters
  const searchParams = new URLSearchParams();
  searchParams.set('username', username);
  searchParams.set('password', password);
  searchParams.set('client_id', process.env.KUBIOS_CLIENT_ID);
  searchParams.set('redirect_uri', process.env.KUBIOS_REDIRECT_URI);
  searchParams.set('response_type', 'token');
  searchParams.set('scope', 'openid');
  searchParams.set('_csrf', csrf);

  // Set the options for the fetch request
  const options = {
    method: 'POST',
    headers: headers,
    redirect: 'manual',
    body: searchParams,
  };

  let response;
  try {
    // Send the login request to Kubios API
    response = await fetch(process.env.KUBIOS_LOGIN_URL, options);
  } catch (err) {
    console.error('Kubios login error', err);
    throw errorHandler('Login with Kubios failed', 500);
  }

  // Get the location header from the response
  const location = response.headers.raw().location[0];

  // If login fails, the location contains 'login?null'
  if (location.includes('login?null')) {
    throw errorHandler(
      'Login with Kubios failed due to bad username/password',
      401,
    );
  }

  // If login is successful, the Kubios response location header
  // contains id_token, access_token, and expires_in
  const regex = /id_token=(.*)&access_token=(.*)&expires_in=(.*)/;
  const match = location.match(regex);
  const idToken = match[1];

  return idToken;
};

/**
* Get user info from Kubios API
* @async
* @param {string} idToken Kubios id token
* @return {object} user User info
*/
const kubiosUserInfo = async (idToken) => {
  // Set the headers for the request
  const headers = new Headers();
  headers.append('User-Agent', process.env.KUBIOS_USER_AGENT);
  headers.append('Authorization', idToken);

  // Send a GET request to the Kubios API to fetch user info
  const response = await fetch(baseUrl + '/user/self', {
    method: 'GET',
    headers: headers,
  });

  // Parse the response as JSON
  const responseJson = await response.json();

  // Check if the response status is 'ok'
  if (responseJson.status === 'ok') {
    // Return the user info from the response
    return responseJson.user;
  } else {
    // If the response status is not 'ok', throw an error
    throw errorHandler('Kubios user info failed', 500);
  }
};

/**
* Sync Kubios user info with local db
* @async
* @param {object} kubiosUser User info from Kubios API
* @return {number} userId User id in local db
*/
const syncWithLocalUser = async (kubiosUser) => {
  // Check if user exists in local db
  let userId;
  const result = await selectUserByEmail(kubiosUser.email);
  // If user with the email not found, create new user, otherwise use existing
  if (result.error) {
    // Create user
    const newUser = {
      username: kubiosUser.given_name,
      email: kubiosUser.email
    };
    const newUserResult = await insertUser(newUser);
    userId = newUserResult.user_id;
  } else {
    userId = result.user_id;
  }
  console.log('syncWithLocalUser userId', userId);
  return userId;
};

/**
* User login
* @async
* @param {object} req
* @param {object} res
* @param {function} next
* @return {object} user if username & password match
*/
const postLogin = async (req, res, next) => {
  const {username, password} = req.body;4
  // console.log('login', req.body);
  try {
    // Try to login with Kubios
    const kubiosIdToken = await kubiosLogin(username, password);
    const kubiosUser = await kubiosUserInfo(kubiosIdToken);
    const localUserId = await syncWithLocalUser(kubiosUser);
    // Include kubiosIdToken in the auth token used in this app
    // NOTE: What is the expiration time of the Kubios token?

    console.log(process.env.JWT_SECRET)

    const token = jwt.sign(
      {userId: localUserId, kubiosIdToken},
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    );
    return res.json({
      message: 'Logged in successfully with Kubios',
      user: kubiosUser,
      user_id: localUserId,
      token,
    });
  } catch (err) {
    console.error('Kubios login error', err);
    return next(err);
  }
};

/**
* Get user info based on token
* @async
* @param {object} req
* @param {object} res
* @return {object} user info
*/
const getMe = async (req, res) => {
  const user = await selectUserById(req.user.userId);
  res.json({user, kubios_token: req.user.kubiosIdToken});
};

export {postLogin, getMe};
