import { Schema, model, Document} from 'mongoose'

interface IUserDocument extends Document{
    name: string;
    email: string;
    password: string;
    role: 'user' | 'admin',
    resetToken: string,
    resetTokenExpiry: Date
}

const userSchema = new Schema({
    name: {type: String, required: true},
    email: { type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {
        type: String,
        enum: ['user','admin'],
        default: 'user'
    },
    resetToken: { type: String },
    resetTokenExpiry: { type: Date },
}, {timestamps: true})

export const User = model<IUserDocument>('User', userSchema)