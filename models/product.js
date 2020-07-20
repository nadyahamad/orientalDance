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
    constructor(class_name, imageUrl, description, level, studio_num){
        this.class_name = class_name;
        this.imageUrl = imageUrl;
        this.description = description;
        this.level = level;
        this.studio_num = studio_num;
    }

    save(){
        this.classId = Math.random().toString();
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

    static findById(classId, cb){
        getProductsFromFile(products => {
        const product = products.find(p => p.id === classId);
        cb(product);
        });
    }
};