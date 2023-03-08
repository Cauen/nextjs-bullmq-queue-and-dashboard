export const configs = {
  redis: {
    port: Number(process.env.REDIS_PORT) || 6379,
    host: process.env.REDIS_HOST || "localhost",
    password: process.env.REDIS_PASSWORD || "",
  }
}