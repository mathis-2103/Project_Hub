import {model, Schema} from 'mongoose';

interface IUser {
    _id?: string;
    email: string;
    password: string;
    password_length: number;
    role: 'client' | 'vendeur';
}

const schema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    password_length: {
        type: Number,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ['client', 'vendeur'],
    },
});

const User = model<IUser>('User', schema);

export type {IUser};
export {User};
