import * as http from 'http';
import * as database from '@src/database';
import express, { Express, Request, Response, Router } from 'express';
import cors from 'cors';
import { log } from './util/logger';
import { handleCustomError } from './controllers/handleCustomError';
import { httpResponse } from './util/http';

export class Server {
    constructor(
        private app: Express,
        private routes: Router,
        private port = 3333
    ) {}

    private server?: http.Server;

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
        this.app.use(this.routes);
    }

    private setupErrorHandler(): void {
        this.app.use(this.handleErrors);
    }

    private handleErrors(error: Error, _: Request, res: Response): Response {
        const errorData = handleCustomError(error);
        return httpResponse({
            response: res,
            ...errorData,
        });
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
