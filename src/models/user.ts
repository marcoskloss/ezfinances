import { AuthService } from '@src/services/auth';
import { log } from '@src/util/logger';
import mongoose, { Document, Model } from 'mongoose';

export interface UserData {
    _id?: string;
    name: string;
    email: string;
    password: string;
}

export interface UserModel extends Omit<UserData, '_id'>, Document {}

const schema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: { type: String, required: true },
    },
    {
        toJSON: {
            transform: (_, ret) => {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            },
        },
    }
);

schema.pre<UserModel>('save', async function (): Promise<void> {
    if (!this.password && !this.isModified('password')) return;

    try {
        const hashedPassword = await AuthService.hashPassword(this.password);
        this.password = hashedPassword;
    } catch (error) {
        log.error(`Error when hashing the password for user ${this.name}`);
    }
});

export const User: Model<UserModel> = mongoose.model('User', schema);
