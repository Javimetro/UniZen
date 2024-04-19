import {
  deleteMeasurementById,
  insertMeasurement,
  listAllMeasurements,
  listAllMeasurementsByUserId,
  updateMeasurementById,
} from '../models/calendar-model.mjs';

import {
  selectUserByEmail,
} from '../models/user-model.mjs';

import jwt from 'jsonwebtoken';

const getMeasurements = async (req, res) => {
const result = await listAllMeasurements();
if (result.error) {
  return res.status(result.error).json(result);
}
return res.json(result);
};

const getMeasurementById = async (req, res) => {

const kubiosData = jwt.decode(req.user.kubiosIdToken)
const user = await selectUserByEmail(kubiosData.email)

const result = await listAllMeasurementsByUserId(user.user_id);
if (result.error) {
  return res.status(result.error).json(result);
}
return res.json(result);
};

const postMeasurement = async (req, res) => {
console.log('req.user.user_id at start of postMeasurement:', req.user.user_id);

const { Date, avg_readiness, color_code } = req.body;
console.log('user_id before use:', req.user.user_id);

// Extract user_id from req.user
const newMeasurement = {
  user_id: req.user.user_id, // get user_id from req.user
  Date,
  avg_readiness,
  color_code
};

// Check that all needed fields are included in request
if (newMeasurement.user_id && Date && avg_readiness && color_code !== null && color_code !== undefined) {
  const result = await insertMeasurement(newMeasurement);
  if (result.error) {
    return res.status(result.error).json(result);
  }
  return res.status(201).json(result);
} else {
  return res.status(400).json({error: 400, message: 'bad request'});
}
};

const putMeasurement = async (req, res) => {
const summary_id = req.params.id;
const { user_id, Date, avg_readiness, color_code } = req.body;
// Check that all needed fields are included in request
if (user_id && Date && avg_readiness && color_code) {
  const result = await updateMeasurementById({summary_id, ...req.body});
  if (result.error) {
    return res.status(result.error).json(result);
  }
  return res.status(201).json(result);
} else {
  return res.status(400).json({error: 400, message: 'bad request'});
}
};

const deleteMeasurement = async (req, res) => {
const result = await deleteMeasurementById(req.params.id);
if (result.error) {
  return res.status(result.error).json(result);
}
return res.json(result);
};

export { getMeasurements, getMeasurementById, postMeasurement, putMeasurement, deleteMeasurement};
