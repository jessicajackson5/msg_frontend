
import productsRepository from "../repositories/products.repository.js"

class ProductsController {
    create (request, response){
        
        /* 
        Request es un objeto
        request.body es una propiedad del objeto request que contiene la carga util (la informacion, el mensaje) de la consulta DEL CLIENTE
        */
        console.log("body:", request.body)
        const {products} = productsRepository.create({
            title: request.body.title,
            price: request.body.price
        })
        response.send({
            message: 'Recibido!!',
            ok: true,
            products
        })
    }
    getAll(request, response){
        
        const {products, ok} = productsRepository.getAll()
        response.send({
            ok: true,
            products: products
        })
    }
}
const productsController = new ProductsController()
export default productsController