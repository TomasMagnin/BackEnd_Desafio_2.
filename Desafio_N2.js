class ProductManager{
    products

    constructor(){
        this.products = [];
        this.id = 1;
    }

    addProduct(title, description, price, thumbnail, code, stock) {
       
       const findCode = this.products.find(item => item.code == code); 

        if(title & description & price & thumbnail & code & stock) {   
            let product = {
                id: this.id ++,
                title,
                description,
                price,
                thumbnail,
                code, 
                stock
            }

            if(findCode) {
                console.log(" Error code exist !!!!!!!! ");
                
            } else {
                this.products.push(product);
                console.log(" Product Added Exit ");
            }
        } else {
            console.log("Validar Campos");
        }

    }

    getProducts() {
        console.log(this.products);
    }

    getProductById(id) {
      const findById =  this.products.find 
    }

}

let poductManager = new ProductManager()

poductManager.addProduct('Titile1', 'Primer Producto', '5', 'http.img1', 455, 40);
poductManager.addProduct('Titile1', 'Primer Producto', '5', 'http.img1', 457, 40);
poductManager.addProduct('Titile3', 'Segundo Producto', '15', 'http.img3', 456, 40);
poductManager.getProducts();