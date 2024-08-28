import { expect } from "chai";
import sinon from "sinon";
import { createQueue } from "kue";
import createPushNotificationsJobs from "./8-job";

const queue = createQueue();

describe('test_createPushNotificationsJobs', () => {
  before(() => {
    queue.testMode.enter();
  })

  beforeEach(() => {
    queue.testMode.clear();
  });

  after(() => {
    queue.testMode.exit();
  });

  it('should throw an error if jobs is not an array', () =>
    expect(() => createPushNotificationsJobs('!Array', queue)).to.throw('Jobs is not an array')
  );

  it('should create jobs in the queue', () => {
    const jobs = [
      {
        phoneNumber: '4153518780',
        message: 'This is the code 1234 to verify your account'
      },
      {
        phoneNumber: '4153518781',
        message: 'This is the code 4562 to verify your account'
      },
    ];

    createPushNotificationsJobs(jobs, queue);

    expect(queue.testMode.jobs.length).to.equal(2);
    expect(queue.testMode.jobs[0].type).to.equal('push_notification_code_3');
    expect(queue.testMode.jobs[0].data).to.deep.equal(jobs[0]);
  });

  it('should log correct messages for job lifecycle events', () => {
    const jobs = [
      {
        phoneNumber: '4153518780',
        message: 'This is the code 1234 to verify your account'
      },
    ];

    const consoleSpy = sinon.spy(console, 'log');

    createPushNotificationsJobs(jobs, queue);

    const job = queue.testMode.jobs[0];

    job._events.complete();
    job._events.failed(new Error('Job failed'));
    job._events.progress(50);

    expect(consoleSpy.calledWith(`Notification job created: ${job.id}`)).to.be.true;
    expect(consoleSpy.calledWith(`Notification job ${job.id} completed`)).to.be.true;
    expect(consoleSpy.calledWith(`Notification job ${job.id} failed: Job failed`)).to.be.true;
    expect(consoleSpy.calledWith(`Notification job ${job.id} 50% complete`)).to.be.true;

    consoleSpy.restore();
  });
});
