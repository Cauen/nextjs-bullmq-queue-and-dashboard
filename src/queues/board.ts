import {
  FastifyAdapter,
  createBullBoard,
  BullMQAdapter,
} from "@bull-board/fastify";
import { Queue } from 'bullmq';

const serverAdapter = new FastifyAdapter();

export const initDashboards = (queues: Queue[]) => {
  const { ...board } = createBullBoard({
    queues: queues.map(queue => new BullMQAdapter(queue)),
    serverAdapter,
  });

  return { serverAdapter, ...board }
}
