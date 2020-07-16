const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename), 
    'data', 
    'products.json'
);


const getProductsFromFile = cb => {
    fs.readFile(p,(err, fileContent) => {
        if (err){
            cb([ ]);
        }
        else{
            cb(JSON.parse(fileContent)) ;
        }  
    });
}

module.exports = class Product {
    constructor(tittle, imageUrl, description, date){
        this.title = tittle;
        this.imageUrl = imageUrl;
        this.description = description;
        this.date = date;
    }

    save(){
        getProductsFromFile(products =>{
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), err =>{
                console.log(err);
            });
        });
    }

    static fetchAll(cb){
        getProductsFromFile(cb);
    }
}