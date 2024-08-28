/**
 * creates jobs for push notification
 * @param {Array} jobs - array of objects 
 * @param {Object} queue - kue queue 
 */
function createPushNotificationsJobs(jobs, queue) {
  if (!Array.isArray(jobs)) throw new Error('Jobs is not an array');

  jobs.forEach((jobData) => {
    const job = queue.create('push_notification_code_3', jobData)
      .save((err) => {
        if (!err) console.log(`Notification job created: ${job.id}`);
      });

    job
      .on('complete', (result) =>
        console.log(`Notification job ${job.id} completed`)
      )
      .on('failed', (err) =>
        console.log(`Notification job ${job.id} failed: ${err.message}`)
      )
      .on('progress', (progress, data) =>
        console.log(`Notification job ${job.id} ${progress}% complete`)
      );
  });
}

export default createPushNotificationsJobs;
