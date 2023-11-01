import { Schema, model } from "mongoose";

const msgsSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    postTime: {
        type: Date,
        default: Date.now //Devolve la fecha actual
    }
})

export const msgsModel = model('messages', msgsSchema)