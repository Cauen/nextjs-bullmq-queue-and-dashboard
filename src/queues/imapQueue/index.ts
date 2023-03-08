import { redisOptions } from "../config";
import { Worker, QueueScheduler } from "bullmq";
import { Queuer } from "../types";
import { createQueueMQ, sleep } from "../utils";

const queue = createQueueMQ("imapQueue");

export const queuer = {
  queue,
  adders: {
    add: (data: { name: string }) =>
      queue.add(
        "Add",
        { color: "yellow" },
        {
          repeat: {
            pattern: "*/1 * * * *",
          },
        }
      ),
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
        console.log("Pulling imap")
        job.updateProgress(50)
        await sleep(1000)
        job.updateProgress(100)
      },
      { connection: redisOptions }
    );
  },
} satisfies Queuer;
