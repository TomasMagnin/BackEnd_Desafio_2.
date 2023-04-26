const fs = require("fs");

class ProductManager{

    constructor(path){
        this.id = 1;        // Creamos un objeto con el ID.
        this.path = path;   // Creamos un objeto con la ruta que le pasamos.
    }

    async addProduct(newProduct) {

        //console.log(newProduct);
        
        const {title, description, price, thumbnail, code, stock} = newProduct; // Desestructuramos las propiedaes del objeto newProduct, para asignarlas a variables separadas que le especificamos y luego asignara los valores correspondientes a las del objeto newProduct.
        const products = await this.getProducts()                              // usando el metodo get traemos la informacion de nuestro sistema de archivos.
        const findCode = products.some(item => item.code == code);             // Buscamos si se repite el codigo.

        if(title && description && price && thumbnail && code && stock) {   
            let product = {
                id: this.id ++,
                title,
                description,
                price,
                thumbnail,
                code, 
                stock
            }
                if(!findCode){
                    products.push(product);
                    return findCode ? console.log(" Error code exist! ") : await fs.promises.writeFile(this.path, JSON.stringify(product, null, 2)) && console.log(" Product Added");
                }
           
        } else {
            console.log("Validar Campos");
        }
       
        
    };

    async getProducts() {
        let product = [];
        if(fs.existsSync(this.path)){
            const dataFile = await fs.promises.readFile(this.path, "utf-8");
            product = JSON.parse(dataFile);
        }
        return product
    };

    async getProductById(id) { 
        
        let products = await this.getProducts();
        const findById =  products.find(item =>item.id == id);
        return findById ? products[id-1] : console.log("Not found");
    };

    async updateProduct(id, change){
        const products =await this.getProducts();
        const productIndex = products.findIndex((product) => {
           return product.id === id});
        if(productIndex === -1){
            return console.log("Not Product");
        }
        const productFind = products[productIndex];
        const productUpdate = {...productFind, ...change};
        await fs.promises.writeFile(this.path, JSON.stringify(products));     
    }


    async deleteProduct(id){
        const products = await this.getProducts();
        if(!products.some(item => item.id === id)){
            return " Producto no Encontrado";
        }
        const newProducts = products.filter((product) => product.id !== id);
        await fs.promises.writeFile(this.path, JSON.stringify(newProducts, null, 2));
    };
}





let poductManager = new ProductManager("./products.json")   // Creo una nueva instancia u objeto de la clase ProductManager.


function main(productManager) {                             // Creo una funcion main, para poder ejecutar los metodos de la clase y ademas crear la variable con los datos a registrar.
    const products = [
        {   title: 'Pantalon Rojo', 
            description: 'Talle L', 
            price: '1000', 
            thumbnail: 'http.img1',
            code: 455, 
            stock: 10,
        },
        {   title: 'Pantalon Verde', 
            description: 'Talle M', 
            price: '2000', 
            thumbnail: 'http.img2',
            code: 456, 
            stock: 20,
        },
        {   title: 'Pantalon Amarillo', 
            description: 'Talle S', 
            price: '3000', 
            thumbnail: 'http.img3',
            code: 456, 
            stock: 30,
        }
    ];



     console.log("Ahora vamos a traer los productos");
    productManager.getProducts().then((response) =>
    console.log(response));


    console.log( "Vamos Agregar un los Productos");
    products.forEach(item => {
        productManager.addProduct(item).then((response) =>
        console.log(response));
    })
    
    console.log("Ahora vamos a buscar Productos por ID = 2");
    productManager.getProductById(2).then((response) =>
        console.log(response));
   
        console.log("Ahora vamos a actualizar el precio de Producto  ID = 2 a $200");
    productManager.updateProduct(2, "stock: 200").then((response) =>
        console.log(response));

        console.log("Ahora vamos a eliminar el producto 3");
        productManager.deleteProduct(3).then((response) =>
            console.log(response));


   

};

main(poductManager)     // Paso por parametro a la funcion main mi nueva instancia de la clase.





