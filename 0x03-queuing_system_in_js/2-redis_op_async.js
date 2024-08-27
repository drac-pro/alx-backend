import { createClient, print } from "redis";
import { promisify } from "util";

const client = createClient()

client
  .on('connect', () =>
    console.log('Redis client connected to the server')
  )
  .on('error', (err) =>
    console.log(`Redis client not connected to the server: ${err.message}`)
  );

  const getAsync = promisify(client.get).bind(client);

/**
 * Set a value for a key in Redis.
 * @param {string} schoolName - The key to set.
 * @param {any} value - The value to assign.
 */
function setNewSchool(schoolName, value) {
    client.set(schoolName, value, print);
}

/**
 * Get the value of a key from Redis and log it to the console.
 * @param {string} schoolName - The key to retrieve.
 */
async function displaySchoolValue(schoolName) {
  try {
    const result = await getAsync(schoolName);
    console.log(result);
  } catch (err) {
    console.log(`Error retrieving value for ${schoolName}: ${err.message}`);
  }
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
