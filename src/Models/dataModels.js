// let data= require('../data/products.json')
let products = require('./products.json')
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(products);
    })
}

function findById(id) {
    return new Promise((resolve, reject) => {
        const product = products.find((p) => p.id === id)
        resolve(product)
    })
}
function create(product) {
    return new Promise((resolve, reject) => {
        const newProduct = { id: uuidv4(), ...product }
        products.push(newProduct)
        if (process.env.NODE_ENV !== "test") {
            fs.writeFileSync('./products.json', JSON.stringify(products), "utf-8", (err) => {
                if (err) {
                    console.log(err);
                }
            });
            // writeDataToFile("./data/products.json", products);
        }
        resolve(newProduct)
    })
}
function update(id, product) {
    return new Promise((resolve, reject) => {
        const index = products.findIndex((p) => p.id === id);
        products[index] = { id, ...product };
        if (process.env.NODE_ENV !== "test") {
            writeDataToFile("./data/products.json", products);
        }
        resolve(products[index]);
    });
}

function remove(id) {
    return new Promise((resolve, reject) => {
        // products = products.filter((product) => {
        //   return product.id !== id;
        // });
        products = products.filter((product) => product.id !== id);

        if (process.env.NODE_ENV !== "test") {
            writeDataToFile("./data/products.json", products);
        }
        resolve();
    });
}


module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}