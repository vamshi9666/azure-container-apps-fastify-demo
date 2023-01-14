import { join } from "path";
import AutoLoad, { AutoloadPluginOptions } from "@fastify/autoload";
// import env from "@fastify/env";
import { FastifyPluginAsync } from "fastify";

export type AppOptions = {
  // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>;

// Pass --options via CLI arguments in command to enable these options.
const options: AppOptions = {};

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts
): Promise<void> => {
  // Place here your custom code!

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application

  // const schema = {
  //   type: 'object',
  //   required: [ 'PORT' ],
  //   properties: {
  //     DB_Url: {
  //       type: 'string',
  //       default: 3000
  //     }
  //   }
  // }

  // const options = {
  //   confKey: 'config', // optional, default: 'config'
  //   schema: schema,
  // }

  // void fastify.register(env, {
  //   schema: {

  // })

  void fastify.register(AutoLoad, {
    dir: join(__dirname, "plugins"),
    options: opts,
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  void fastify.register(AutoLoad, {
    dir: join(__dirname, "routes"),
    options: opts,
  });
};

export default app;
export { app, options };
