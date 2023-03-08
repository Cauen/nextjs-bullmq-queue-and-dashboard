import { configs } from "@/configs";
import { ConnectionOptions } from "bullmq";

export const redisOptions: ConnectionOptions = configs.redis;
