const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename), 
    'data', 
    'cart.json'
);

module.exports = class Cart{
    static addProduct(id, productPrice) {
    //Fetch the previous booking
        fs.readFile(p, (err, fileContent) => {
            let cart = {products: [], totalBookings: 0};
            if (!err){
                cart = JSON.parse(fileContent);    
            }

            //Analyze the cart => Find existing booking
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            //Add new class/ increase the quantity
            if (existingProduct) {
                updatedProduct = {...existingProduct };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            }
            else{
                updatedProduct = { id: id, qty: 1};
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice = cart.totalPrice ;
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            });
        }); 
    }

    static deleteProduct(id, productBook){
        fs.readFile(p, (err, fileContent) => {
            if (err){
                return;
            }
            const updatedCart = {...JSON.parse(fileContent)};
            const product = updatedCart.products.find(prod => prod.classId === classId);
            const productQty = product.qty;

            updatedCart.products = updatedCart.products.filter(
                prod => prod.classId !== classId
            );
            updatedCart.totalBookings = 
                updatedCart.totalBookings - productBook * product.Qty;

            fs.writeFile(p, JSON.stringify(updatedCart), err => {
                console.log(err);
            });
        });

    }
};
