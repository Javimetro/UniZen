import { listAllEntriesByUserId } from '../models/entry-model.mjs';

const avgHoursSleptCalculator = async (userId) => {
  try {
    // Fetch all entries from the database
    const entries = await listAllEntriesByUserId(userId);

    // Calculate average hours slept by user
    const totalHours = entries.reduce((acc, entry) => acc + entry.sleep_hours, 0); //".sleep_hours" is directly related with db. It is a property of the "entries" object.
    const averageHoursSlept = totalHours / entries.length;

    return averageHoursSlept;
  } catch (error) {
    console.error('Error calculating average hours slept:', error);
    throw error;
  }
};

export { avgHoursSleptCalculator };
