import pino from 'pino';

const pinoLogger = pino({
    prettyPrint: {
        ignore: 'pid, hostname',
    },
});

const log = {
    error: (err: any): void => pinoLogger.error(err),
    info: (info: any): void => pinoLogger.info(info),
};

export { log };
