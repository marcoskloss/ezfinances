import './config';
import './util/module-alias';
import express from 'express';
import { Server } from './server';
import { routes } from '@src/routes';
import { log } from './util/logger';

enum ExitStatus {
    Failure = 1,
}

const app = express();

(async (): Promise<void> => {
    try {
        const server = new Server(app, routes, Number(process.env.APP_PORT));
        await server.init();
        server.start();
    } catch (error) {
        log.error(`App exited with error ${error}`);
        process.exit(ExitStatus.Failure);
    }
})();
