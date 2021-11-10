import mongoose, { Schema, Document, Model } from 'mongoose';

export interface TransactionData {
    _id?: string;
    title: string;
    description?: string;
    date: Date;
    group?: string;
    user: string;
}

const schema = new Schema(
    {
        amount: { type: Number, required: true },
        title: { type: String, required: true, maxLength: 30 },
        description: { type: String, maxLength: 40 },
        date: { type: Date, required: true },
        group: { type: Schema.Types.ObjectId, ref: 'Group' },
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
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

export interface TransactionModel
    extends Omit<TransactionData, '_id'>,
        Document {}

export const Transaction: Model<TransactionModel> = mongoose.model(
    'Transaction',
    schema
);
