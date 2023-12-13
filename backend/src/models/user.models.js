import {Schema, model} from "mongoose";
import paginate from 'mongoose-paginate-v2'
import {cartModel} from "./carts.models.js"


const userSchema = new Schema ({
    first_name: {
        type: String,
        required: true 
    },
    last_name: {
        type: String,
        required: true,
        index: true
    },
    age: {
        type: Number,
        required: true 
    },
    email: {
        type: String,
        unique: true,
        required: true 
    },
    password: {
        type: String,
        required: true 
    },
    rol: {
        type:String,
        default: 'user'
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'carts'
    }
})


userSchema.plugin(paginate) //implemento el método paginate en schema

userSchema.pre('save', async function (next){
    try{
        const newCart= await cartModel.create({})
        this.cart= newCart._id

    }catch(error){
        next(error)
    }

} )

// parámetros: nombre de colección y schema
export const userModel = model('users', userSchema)