import queues from '@/queues';
import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

const serverAdapter = new ExpressAdapter();

createBullBoard({
  queues: queues.queues.map(el => new BullAdapter(el)),
  serverAdapter: serverAdapter,
});

serverAdapter.setBasePath('/api/admin/queues');

const handler = nc<NextApiRequest, NextApiResponse>({
  attachParams: true,
});

handler
  .use('/api/admin/queues', serverAdapter.getRouter() as NextApiHandler)
  .all(() => ({}));

export default handler;