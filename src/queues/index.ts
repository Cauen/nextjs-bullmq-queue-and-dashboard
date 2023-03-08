import { queuer as mailQueue } from './mailQueue'
import { queuer as reportQueue } from './reportQueue'
import { queuer as imapQueue } from './imapQueue'
import { Queuer } from './types'

const queuers: Queuer[] = [
  mailQueue,
  reportQueue,
  imapQueue,
]

export default {
  queues: queuers.map(el => el.queue),
  initWorkers: async () => {
    await Promise.all(queuers.map(el => {
      console.log("Starting queue " + el.queue.name)
      return el.worker()
    }))
  },
}