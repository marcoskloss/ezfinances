import mongoose, { Mongoose } from 'mongoose';

export const connect = async (): Promise<Mongoose> =>
    await mongoose.connect(process.env.MONGO_URL, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

export const close = (): Promise<void> => mongoose.connection.close();
