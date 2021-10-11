import { Server } from '@src/server';
import { log } from '@src/util/logger';

let server: Server;

beforeAll(async () => {
    jest.spyOn(log, 'error').mockImplementation();

    server = new Server(Number(process.env.APP_PORT));
    await server.init();
    server.start();
});

afterAll(async () => {
    await server.close();
});
