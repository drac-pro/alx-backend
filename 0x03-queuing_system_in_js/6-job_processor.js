import kue, { Job } from 'kue';

const queue = kue.createQueue();

/**
 * sends a notification to a phone number
 * @param {string} phoneNumber - phone number
 * @param {string} message - message
 */
function sendNotification(phoneNumber, message) {
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
}

queue.process('push_notification_code', (job, done) => {
  const { phoneNumber, message } = job.data;
  sendNotification(phoneNumber, message);
  done();
});
