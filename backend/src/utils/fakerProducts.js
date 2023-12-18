import {faker} from '@faker-js/faker';
import express from 'express'

const app= express()

const modelProduct = async () =>{
    return {
        _id: faker.database.mongodbObjectId(),
        title: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        price:faker.commerce.price(),
        stock: faker.number.int({max: 100}),
        category: faker.commerce.productAdjective(),
        status: faker.datatype.boolean(),
        code: faker.finance.creditCardNumber(),
        thumbnails: faker.image.avatar(),
    }
}

export const randomFakeProducts=async(cant) =>{
    const products = [];

    for (let i =0; i< cant; i ++){
        const product =await modelProduct();
        products.push(product);
    }
    return products;
}

/*console.log(modelProduct(10))*/

const commonError ={
    'missing_field' :'Falta completar campo obligatorio',
    'invalid_data': 'Los datos ingresados son incorrectos ',
}