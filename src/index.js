import { appendFile } from "fs/promises";
import fastify from "fastify";

const app = fastify({ logger: true });

app.route({
  method: `POST`,
  url: `/`,
  schema: {
    body: {
      email: { type: `string` }
    },
    response: {
      200: {
        type: `object`,
        properties: {
          success: { type: `boolean` }
        }
      }
    }
  },
  handler: async (request, reply) => {
    try {
      await appendFile(`data.txt`, request.body.email + "\n");
      return { success: true };
    } catch(err) {
      app.log.error(err);
      return { success: false };
    }
  }
});

try {
  await app.listen(3000);
} catch(err) {
  app.log.error(err);
  process.exit(1);
}

