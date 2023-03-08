import { ConnectionOptions } from "bullmq";

export const redisOptions: ConnectionOptions = {
  port: 6379,
  host: "localhost",
  password: "",
  // tls: false,
};
