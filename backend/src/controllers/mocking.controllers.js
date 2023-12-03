import {randomFakeProducts} from "../utils/fakerProducts.js";

export const getFakerProducts =async (req, res) =>{
    try{
        const fakerProducts =await randomFakeProducts(100);
        console.log(fakerProducts)
        res.status(200).send({response: 'ok', message: 'fakerProdcts'})
    }catch(error){
        res.status(500).send({response: 'error', message: 'Error tryng to create Faker Products '})
    }
}