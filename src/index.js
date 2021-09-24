import { appendFile } from "fs/promises";
import fastify from "fastify";

const app = fastify({ logger: true });

app.route({
  method: `GET`,
  url: `/`,
  schema: {
    querystring: {
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
      await appendFile(`data.txt`, `${request.query.name} <${request.query.email}>` + "\n");
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

