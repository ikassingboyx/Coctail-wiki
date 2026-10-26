import "dotenv/config";

import cors from "@fastify/cors";
import sensible from "@fastify/sensible";
import Fastify from "fastify";

const app = Fastify({ logger: true });

await app.register(cors, {
  origin: true,
});

await app.register(sensible);

app.get("/api/v1/health", async () => {
  return {
    status: "ok",
    service: "cocktail-wiki-api",
    timestamp: new Date().toISOString(),
  };
});

const port = Number(process.env.PORT ?? 3000);
const host = process.env.HOST ?? "0.0.0.0";

try {
  await app.listen({ port, host });
} catch (error) {
  app.log.error(error);
  process.exit(1);
}
