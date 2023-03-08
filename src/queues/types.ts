import { Queue, Job } from "bullmq";

export type Queuer = {
  worker: () => Promise<void>,
  queue: Queue,
  adders?: Record<string, (data: any) => Promise<Job>>
}