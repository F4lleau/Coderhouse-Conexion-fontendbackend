import { userModel } from "../models/user.models.js";

export const getUser = async (req,res)=>{
    const { limit, page } = req.query;
    try {
        const users = await userModel.findAll(limit, page);
        res.status(200).send({respuesta: 'ok', mensaje: users})
    } catch (error){
        res.status(400).send({respuesta: 'Error', mensaje: error})
    }
}

export const getUserById = async (req,res)=>{
    const {id} = req.params
    try {
        const user = await userModel.findById(id);
        if (user)
            res.status(200).send({respuesta: 'ok', mensaje: user})
        else 
            res.status(404).send({respuesta: 'Error', mensaje: 'User not found'})
    } catch (error){
        res.status(400).send({respuesta: 'Error', mensaje: error})
    }
}

export const putUserById = async (req,res)=>{
    const {id} = req.params
    const {first_name, last_name, age, email, password} = req.body
    try {
        const user = await userModel.updateById(id, {first_name, last_name, age, email, password});
        if (user)
            res.status(200).send({respuesta: 'ok', mensaje: user})
        else 
            res.status(404).send({respuesta: 'Error', mensaje: 'User not found'})
    } catch (error){
        res.status(400).send({respuesta: 'Error', mensaje: error})
    }
}

export const deleteUser = async (req,res)=>{
    const {id} = req.params
    try {
        const user = await userModel.deleteById(id);
        if (user)
            res.status(200).send({respuesta: 'ok', mensaje: user})
        else 
            res.status(404).send({respuesta: 'Error', mensaje: 'User not found'})
    } catch (error){
        res.status(400).send({respuesta: 'Error', mensaje: error})
    }
}