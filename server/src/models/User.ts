import { Schema, model, Document} from 'mongoose'

interface IUserDocument extends Document{
    name: string;
    email: string;
    password: string;
    role: 'user' | 'admin'
}

const userSchema = new Schema({
    name: {type: String, required: true},
    email: { type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {
        type: String,
        enum: ['user','admin'],
        default: 'user'
    }
}, {timestamps: true})

export const User = model<IUserDocument>('User', userSchema)