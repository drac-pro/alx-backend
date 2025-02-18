import { createClient } from "redis";

const subscriber = createClient()
const channelName = 'holberton school channel';

subscriber
  .on('connect', () => {
    console.log('Redis client connected to the server');
    subscriber.subscribe(channelName);
  }
  )
  .on('error', (err) =>
    console.log(`Redis client not connected to the server: ${err.message}`)
  )
  .on('message', (channel, message) => {
    console.log(message);
    if (message === 'KILL_SERVER') {
      subscriber.unsubscribe(channelName);
      subscriber.quit()
    }
  });
