import './config';
import './util/module-alias';
import { Server } from './server';
import { log } from './util/logger';

enum ExitStatus {
    Failure = 1,
}

(async (): Promise<void> => {
    try {
        const server = new Server(Number(process.env.APP_PORT));
        await server.init();
        server.start();
    } catch (error) {
        log.error(`App exited with error ${error}`);
        process.exit(ExitStatus.Failure);
    }
})();
