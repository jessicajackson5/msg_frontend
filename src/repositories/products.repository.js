const products = [
    { title: 'Tv Samsung', price: 4000, id: 1 },
    { title: 'Tv LG', price: 5000, id: 2 },
    { title: 'Tv Noblex', price: 6000, id: 3 }
];

/* 
Forma nro 1: orientada a objetos para crear un producto:
Creamos una clase de producto

class Product{
    constructor({title, price}){
        this.title = title
        this.price = price
    }
} 
    
Cuando creamos un producto instanciamos esta clase

new Product({title, price})
*/

class ProductsRepository {
    create({ title, price}) { 
        /* 
            Crear un objeto
            agregar ese objeto al array
        */
        const product = {title, price}
        products.push(product)
        return {
            products: products
        } 
    };
    getAll(){
        return {
            products: products, 
            ok: true
        }
    }
}
const productsRepository = new ProductsRepository()
export default productsRepository