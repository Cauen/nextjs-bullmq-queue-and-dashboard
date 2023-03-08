import { redisOptions } from "./config";
import { Queue } from "bullmq";

export const createQueueMQ = (name: string) =>
  new Queue(name, { connection: redisOptions });

export const sleep = (t: number) =>
  new Promise((resolve) => setTimeout(resolve, t));
