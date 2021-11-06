import * as http from 'http';
import * as database from '@src/database';
import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { log } from './util/logger';
import { handleCustomError } from './controllers/handleCustomError';
import { httpResponse } from './util/http';
import { routes } from '@src/routes';

export class Server {
    constructor(private port = 3333) {}

    private server?: http.Server;
    private app: Express = express();

    public async init(): Promise<void> {
        this.setupExpress();
        await this.initDatabaseConnection();
        this.setupErrorHandler();
    }

    public start(): void {
        this.server = this.app.listen(this.port, () => {
            log.info(`Server listening on port ${this.port}`);
        });
    }

    private setupExpress(): void {
        this.app.use(express.json());
        this.app.use(cors({ origin: process.env.UI_ORIGIN }));

        this.app.use(this.routeLogger);

        this.app.use(routes);

        this.app.use((_, res) => {
            res.status(404).end();
        });
    }

    private setupErrorHandler(): void {
        this.app.use(this.handleErrors);
    }

    private handleErrors(error: Error, _: Request, res: Response): Response {
        const errorData = handleCustomError(error);
        return httpResponse({
            response: res,
            ...errorData,
            status: errorData.status ?? 500,
        });
    }

    private routeLogger(req: Request, res: Response, next: NextFunction): void {
        const { ip, method, url } = req;

        const msg = `[${ip}] - ${method} - Receiving request ${url}`;

        log.info(msg);

        res.on('finish', () => {
            log.info(
                `[${ip}] - ${method} - Response finished ${url} with status code ${res.statusCode}`
            );
        });

        next();
    }

    public async initDatabaseConnection(): Promise<void> {
        await database.connect();
    }

    public async close(): Promise<void> {
        await database.close();
        if (this.server) {
            await new Promise((resolve, reject) => {
                this.server?.close((err) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(true);
                });
            });
        }
    }
}
