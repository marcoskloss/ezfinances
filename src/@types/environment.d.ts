declare namespace NodeJS {
    export interface ProcessEnv {
        AUTH_KEY: string;
        MONGO_URL: string;
        APP_PORT: string;
        UI_ORIGIN: string;
    }
}
