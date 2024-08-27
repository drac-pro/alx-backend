import { createClient, print } from "redis";

const client = createClient()

client
  .on('connect', () =>
    console.log('Redis client connected to the server')
  )
  .on('error', (err) =>
    console.log(`Redis client not connected to the server: ${err.message}`)
  );

const schools = {
    'Portland': 50,
    'Seattle': 80,
    'New York': 20,
    'Bogota': 20,
    'Cali': 40,
    'Paris': 2,
}

for (const [city, value] of Object.entries(schools)) {
    client.hset('HolbertonSchools', city, value, print);
}

client.hgetall('HolbertonSchools', (err, result) => {
    if (err) {
      console.log(`Error retrieving the hash: ${err.message}`);
    } else {
      console.log(result);
    }
  });
