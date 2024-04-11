import promisePool from '../utils/database.mjs';

async function insertMeasurements(kubiosData, userId) {
    // Iterate over each item in the results array
    for (const item of kubiosData.results) {
      const measurement = {
        user_id: userId,
        timestamp: new Date(item.measured_timestamp), // Converting the measured_timestamp to a Date object
        artefact: item.result.artefact,
        artefact_level: item.result.artefact_level,
        mean_hr_bpm: item.result.mean_hr_bpm,
        mean_rr_ms: item.result.mean_rr_ms,
        pns_index: item.result.pns_index,
        readiness: item.result.readiness,
        rmssd_ms: item.result.rmssd_ms,
        sd1_ms: item.result.sd1_ms,
        sd2_ms: item.result.sd2_ms,
        sdnn_ms: item.result.sdnn_ms,
        sns_index: item.result.sns_index,
        stress_index: item.result.stress_index
      };

      // Define your SQL query for inserting data
      const sql = `
        INSERT INTO measurements
          (user_id, timestamp, artefact, artefact_level, mean_hr_bpm, mean_rr_ms, pns_index,
           readiness, rmssd_ms, sd1_ms, sd2_ms, sdnn_ms, sns_index, stress_index)
        VALUES
          (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      // Parameters for the SQL query
      const params = [
        measurement.user_id,
        measurement.timestamp,
        measurement.artefact,
        measurement.artefact_level,
        measurement.mean_hr_bpm,
        measurement.mean_rr_ms,
        measurement.pns_index,
        measurement.readiness,
        measurement.rmssd_ms,
        measurement.sd1_ms,
        measurement.sd2_ms,
        measurement.sdnn_ms,
        measurement.sns_index,
        measurement.stress_index
      ];

      try {
        // Assuming promisePool is your connection pool and query is a method to execute your SQL command
        const [result] = await promisePool.query(sql, params);
        console.log(`Inserted measurement with ID: ${result.insertId}`);
      } catch (error) {
        console.error('Error inserting measurement:', error);
        // Handle the error appropriately in your application
      }
    }
  }


export { insertMeasurements };
