import * as database from '@src/database';

export class Server {
    constructor(private port = 3333) {}

    public async initDatabaseConnection(): Promise<void> {
        await database.connect();
    }

    public async closeDatabaseConnection(): Promise<void> {
        await database.close();
    }
}
