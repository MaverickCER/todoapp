import 'module-alias/register';

import { config } from '@/contracts/config.constants.js';
import { logger } from '@/utils';
import bodyParser from 'body-parser';
import cluster from 'cluster';
import express from 'express';
import morgan from 'morgan';
import * as os from 'os';
import routes from './routes';

const ALLOWED_LIST: string = '*'; // config.ALLOWED_LIST.split(',').map((str) => new RegExp(str));

/**
 * Main entry point for nooro-core.
 */
async function main(): Promise<void> {
  if (!process.versions.node.startsWith('20')) {
    console.log(`Incorrect version of Node, expected 16.x but got ${process.versions.node}`);
    return;
  }

  if (cluster.isPrimary) {
    console.log(`Starting Primary Process: ${process.pid}, env: ${process.env.NODE_ENV}`);

    const cpuCores = os.cpus();
    const numWorkers =
      config.NUM_WORKERS > 0 && config.NUM_WORKERS <= cpuCores.length ? config.NUM_WORKERS : cpuCores.length;

    for (let i = 0; i < numWorkers; i++) {
      logger.info(`Spawning worker ${i}`);
      const worker = cluster.fork();

      worker.on('message', (data: { message: string }) => {
        if (data.message === 'configuration_request') {
          worker.send({ message: 'configuration_response', keys: config });
        }
      });
    }

    cluster.on('exit', (worker, code, signal) => {
      logger.warn(`Worker ${worker.process.pid} died: ${code || signal}`);
      const newWorker = cluster.fork();

      newWorker.on('message', (data: { message: string }) => {
        if (data.message === 'configuration_request') {
          newWorker.send({ message: 'configuration_response', keys: config });
        }
      });
    });
  } else {
    process.on('message', (data: { message: string; keys: Record<string, any> }) => {
      if (data?.message === 'configuration_response') {
        childProcess();
      }
    });

    process.send?.({ message: 'configuration_request' });
  }
}

[`exit`, `SIGINT`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`, `SIGTERM`].forEach((eventType) => {
  process.on(eventType as NodeJS.Signals, (error) => {
    logger.warn(`Process[${process.pid}] caught ${eventType}]`);
    if (eventType === 'uncaughtException') {
      logger.error(`Uncaught Exception: ${error}`);
    }
  });
});

/**
 * Starts the child process with necessary configurations.
 */
function childProcess(): void {
  const app = express();
  app.disable('x-powered-by');
  app.use(bodyParser.urlencoded({ extended: true }));

  logger.info(`Allowed domains: ${ALLOWED_LIST}`);
  app.use(bodyParser.json({ limit: '50mb' }));

  morgan.token('process-id', () => `Process[${process.pid}]`);
  app.use(morgan(':process-id :date[iso] :remote-addr :method :url :status :res[content-length] - :response-time ms'));

  app.listen(config.PORT_CORE, () => {
    logger.info(`Worker ${process.pid} listening on port ${config.PORT_CORE}`);
    routes(app);
  });

  app.on('error', (error: unknown) => {
    const message = logger.parseError(error);
    logger.error(message);

    process.exit(1);
  });
}

main().catch((err) => {
  const message = logger.parseError(err);
  logger.error(`Unhandled Error: ${message}`);
});
