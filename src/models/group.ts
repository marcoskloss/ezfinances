import mongoose, { Schema, Document, Model } from 'mongoose';

export interface GroupData {
    _id?: string;
    title: string;
    active: boolean;
    user: string;
}

const schema = new mongoose.Schema(
    {
        title: { type: String, required: true, maxLength: 20 },
        active: { type: Boolean, default: true },
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

export interface GroupModel extends Omit<GroupData, '_id'>, Document {}
export const Group: Model<GroupModel> = mongoose.model('Group', schema);
