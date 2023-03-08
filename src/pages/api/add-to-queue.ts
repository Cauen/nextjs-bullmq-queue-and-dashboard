import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { queuer } from "@/queues/mailQueue";
import { default as queues } from "@/queues";

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
})
  .get(async (req, res) => {
    const titleQuery = req.query.title
    const title = typeof titleQuery === "object" && titleQuery.join("|")
      || typeof titleQuery === "string" && titleQuery
      || "Default title"

    await queues.initWorkers()
    const added = await queuer.adders.add({ title })
    console.log({ added })
    res.send("Hello world");
  })
  .post((req, res) => {
    res.json({ hello: "world" });
  })
  .put(async (req, res) => {
    res.end("async/await is also supported!");
  })
  .patch(async (req, res) => {
    throw new Error("Throws me around! Error can be caught and handled.");
  });

export default handler;
