const fs = require('fs');
const path = require('path');


const productDataPath = path.join(__dirname, '../database/productData.json');
const productDataText = fs.readFileSync(productDataPath, 'utf-8');
const products = JSON.parse(productDataText);


module.exports = {
    home: (req, res) => {
        const indexProducts = [];
        indexProducts.push(products.find(product => product.title === 'Billetera'));
        indexProducts.push(products.find(product => product.title === 'Facón'));
        indexProducts.push(products.find(product => product.title === 'Boina'));
        indexProducts.push(products.find(product => product.title === 'Pantalón'));
        indexProducts.push(products.find(product => product.title === 'Alfajores'));
        indexProducts.push(products.find(product => product.title === 'Vino'));
        indexProducts.push(products.find(product => product.title === 'Mate'));
        indexProducts.push(products.find(product => product.title === 'Bombilla'));

        res.render('index', { indexProducts: indexProducts})
    },




};