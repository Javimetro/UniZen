import express from 'express';
import {authenticateToken} from '../middlewares/authentication.mjs';
import {getUserData, getUserInfo} from '../controllers/measurements-controller.mjs';

/**
 * @apiDefine Authentication
 * @apiHeader {String} Authorization Bearer token for authentication.
 */

const measurementsRouter = express.Router();

/**
 * @api {get} /user-data Get user's data
 * @apiName GetUserData
 * @apiGroup Measurements
 * @apiUse Authentication
 *
 * @apiSuccess {Object} userData User's measurements data from Kubios.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "status": "ok",
 *         "results": [
 *             {
 *                 "create_timestamp": "2024-02-09T08:29:42.101768+00:00",
 *                 "daily_result": "2024-02-09",
 *                 "measure_id": "1c4938e4-6b8c-4a42-aab5-a1915e4781aa",
 *                 "measured_timestamp": "2024-02-09T10:28:03+02:00",
 *                 "result": {
 *                     "artefact": 0,
 *                     "artefact_level": "GOOD",
 *                     "freq_domain": {
 *                         "HF_peak": 0.15,
 *                         "HF_power": 3457.139128534207,
 *                         "HF_power_nu": 38.122300221602146,
 *                         "HF_power_prc": 37.197418334145894,
 *                         "LF_HF_power": 1.6229054490214851,
 *                         "LF_peak": 0.11333333333333333,
 *                         "LF_power": 5610.609929723553,
 *                         "LF_power_nu": 61.868888758871094,
 *                         "LF_power_prc": 60.36789290401707,
 *                         "VLF_peak": 0.04,
 *                         "VLF_power": 225.48166645434668,
 *                         "VLF_power_prc": 2.426091505706579,
 *                         "tot_power": 9294.029756255093
 *                     },
 *                     "mean_hr_bpm": 53.96814885938483,
 *                     "mean_rr_ms": 1111.766871165644,
 *                     "pns_index": 2.7085521323651665,
 *                     "readiness": 62.5,
 *                     "recovery": 62.5,
 *                     "respiratory_rate": 9.03,
 *                     "rmssd_ms": 110.04296181096832,
 *                     "sd1_ms": 78.05513023467918,
 *                     "sd2_ms": 131.30284961447265,
 *                     "sdnn_ms": 108.46518821782632,
 *                     "sns_index": -1.6190422310945491,
 *                     "stress_index": 4.026585998876701
 *                 },
 *                 "result_id": "5f71af12-8c3b-40ca-b325-74108377a4f2",
 *                 "result_type": "readiness",
 *                 "user_comment": "Sleep well. Good energy level. ",
 *                 "user_happiness": 4
 *             }
 *         ]
 *     }
 */
measurementsRouter.get('/user-data', authenticateToken, getUserData);

/**
 * @api {get} /user-info Get user's information
 * @apiName GetUserInfo
 * @apiGroup Measurements
 * @apiUse Authentication
 *
 * @apiSuccess {Object} userInfo User's information.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "status": "ok",
 *         "user": {
 *             "birthdate": "1990-10-09",
 *             "email": "seppo@metropolia.fi",
 *             "family_name": "Seppoliini",
 *             "gender": "male",
 *             "given_name": "Seppo",
 *             "height": 1.53,
 *             "sub": "3801e8bd-909c-40a5-8f3b-fe082fca8e31",
 *             "weight": 65
 *         }
 *     }
 */
measurementsRouter.get('/user-info', authenticateToken, getUserInfo);
measurementsRouter.get('/user-info', authenticateToken, getUserInfo);

export default measurementsRouter;
