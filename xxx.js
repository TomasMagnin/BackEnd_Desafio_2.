//En el metodo getProductById falto agregar el producto modificado al array de preoducts

async updateProduct(id, change){
        const products =await this.getProducts();
        const productIndex = products.findIndex((product) => {
           return product.id === id});
        if(productIndex === -1){
            return console.log("Not Product");
        }
         const productFind = products[productIndex];
        const productUpdate = {...productFind, ...change};
        products[productIndex]= {...productUpdate, id}  /// Te agregue esta linea asi se modifica en el array el productoy mantiene el id
        await fs.promises.writeFile(this.path, JSON.stringify(products, null,2));     
    }






//y despues el metodo addProduct cuando agregaba no devolvia el msj.. Te lo modifique un poquito, quizas vos encontras alguna forma que quede mas linda.



 async addProduct(newProduct) {


        //console.log(newProduct);


        const { title, description, price, thumbnail, code, stock } = newProduct; // Desestructuramos las propiedaes del objeto newProduct, para asignarlas a variables separadas que le especificamos y luego asignara los valores correspondientes a las del objeto newProduct.
        const products = await this.getProducts()                              // usando el metodo get traemos la informacion de nuestro sistema de archivos.
        const findCode = products.some(item => item.code == code);             // Buscamos si se repite el codigo.


        if (title && description && price && thumbnail && code && stock) {


            let product = {id: this.id++ , title,      description,   price, thumbnail,      code,    stock      }
     // Este if te modifique
            if (!findCode) {
                products.push(product);
                console.log(products);
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2))
             
                return " Product Added"
            } else {
                return " Error code exist! "
            }


        } else {
            console.log("Validar Campos");
        }



    };


