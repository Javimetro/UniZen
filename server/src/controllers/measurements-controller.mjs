import 'dotenv/config';
import fetch from 'node-fetch';
// import {customError} from '../middlewares/error-handler.mjs';

// Kubios API base URL should be set in .env
const baseUrl = process.env.KUBIOS_API_URI;

/**
* Get user data from Kubios API
* @async
* @param {Request} req Request object including Kubios id token
* @param {Response} res
* @param {NextFunction} next
*/
const getUserData = async (req, res, next) => {
    try {
        const {kubiosIdToken} = req.user;
        const headers = new Headers();
        headers.append('User-Agent', process.env.KUBIOS_USER_AGENT);
        headers.append('Authorization', kubiosIdToken);

        // Get the selected date from the request, default to January 1, 2024
        const fromDate = req.query.date || new Date('2024-01-01T00:00:00Z').toISOString();

        const response = await fetch(
            `${baseUrl}/result/self?from=${encodeURIComponent(fromDate)}`,
            {
                method: 'GET',
                headers: headers,
            },
        );
        const results = await response.json();
        return res.json(results);
    } catch (error) {
        // Pass the error to the error handling middleware
        next(error);
    }
};

/**
* Get user info from Kubios API
* @async
* @param {Request} req Request object including Kubios id token
* @param {Response} res
* @param {NextFunction} next
*/
const getUserInfo = async (req, res, next) => {
    try{
        const {kubiosIdToken} = req.user;
        const headers = new Headers();
        headers.append('User-Agent', process.env.KUBIOS_USER_AGENT);
        headers.append('Authorization', kubiosIdToken);

        const response = await fetch(baseUrl + '/user/self', {
            method: 'GET',
            headers: headers,
        });
        const userInfo = await response.json();
        return res.json(userInfo);
    } catch (error) {
        // Pass the error to the error handling middleware
        next(error);
    }

};

export {getUserData, getUserInfo};
