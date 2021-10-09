import dotenv from 'dotenv';

const getPath = (): string => {
    const env = process.env.NODE_ENV;

    if (env === 'production') return '.env';
    if (env === 'test') return '.env.test';
    return '.env.development';
};

dotenv.config({ path: getPath() });
