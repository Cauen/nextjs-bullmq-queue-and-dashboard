import { redisOptions } from "../config";
import { Worker, QueueScheduler } from "bullmq";
import { Queuer } from "../types";
import { createQueueMQ, sleep } from "../utils";

const queue = createQueueMQ("reportQueue");

export const queuer = {
  queue,
  adders: {
    add: (data: { name: string }) => queue.add("Add", data),
  },
  worker: async () => {
    const queueName = queue.name;
    const queueScheduler = new QueueScheduler(queueName, {
      connection: redisOptions,
    });
    await queueScheduler.waitUntilReady();

    new Worker(
      queueName,
      async (job) => {
        for (let i = 0; i <= 100; i++) {
          await sleep(100);
          await job.updateProgress(i);
          await job.log(`Processing job at interval ${i}`);

          if (Math.random() * 200 < 1) throw new Error(`Random error ${i}`);
        }

        return { jobId: `This is the return value of job (${job.id})` };
      },
      { connection: redisOptions }
    );
  },
} satisfies Queuer;
