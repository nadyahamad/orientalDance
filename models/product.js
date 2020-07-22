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
    constructor(classId, class_name, imageUrl, description, level, studio_num){
        this.classId = classId;
        this.class_name = class_name;
        this.imageUrl = imageUrl;
        this.description = description;
        this.studio_num = studio_num;
    }

    save(){   
        getProductsFromFile(products =>{
            if (this.classId){
                const existingProductIndex = products.findIndex(
                    prod => prod.classId === this.classId
                );
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                    console.log(err);
                });
            } 
            else {
            this.classId = Math.random().toString();
            products.push(this);
                fs.writeFile(p, JSON.stringify(products), err =>{
                    console.log(err);
                });
            }
        });
    }

    static deleteById(classId){
        getProductsFromFile(products => {
            const updatedProducts = products.fliter( prod => prod.classId !== classId);
            fs.writeFile(p, JSON.stringify(updatedProducts), err =>{
                if(!err);
            });
         });
    }

    static fetchAll(cb){
        getProductsFromFile(cb);
    }

    static findById(classId, cb){
        getProductsFromFile(products => {
        const product = products.find(p => p.classId === classId);
        cb(product);
        });
    }

};