const fs = require('fs');
const path = require('path');

const productDataPath = path.join(__dirname, '../database/productData.json');
const productDataText = fs.readFileSync(productDataPath, 'utf-8');
const products = JSON.parse(productDataText);

/*
const products = [
    {
        id: 1,
        category: 'Ropa',
        title: 'Alpargatas',
        freight: undefined,
        price: 8.99,
        size: 'Del 29 al 45',
        description: 'Las clásicas alpargatas argentinas de tela, con refuerzo en capellada y talón, apellada de algodón y suela de goma sintética.',
        img: "../images/alpargatas.jpg",
    },
    {
        id: 2,
        category: 'Alimentos',
        title: 'Dulce de leche',
        freight: undefined,
        size: '450grs',
        price: 4.99,
        description: 'El dulce argentino por excelencia. Libre de gluten y de culpa.',
        img: "/images/ddl.jpg",
    },
    {
        id: 3,
        category: 'Bebidas',
        title: 'Fernet',
        freight: undefined,
        size: '750 ml.',
        price: 12.99,
        description: 'Símbolo de la inmigración italiana a Argentina, bébase frío con cola o soda.',
        img: "/images/fernet.jpg",
    },
    {
        id: 4,
        category: 'Yerba',
        title: 'Yerba',
        freight: undefined,
        size: '1 kg.',
        price: 3.99,
        description: 'Una cebada que remonta a la pampa húmeda. No sobrepasar el agua de los 80° y ¡cebarse sobre la bombilla que la yerba no es pasto y no está regando el jardín!',
        img: "/images/yerba.jpg",
    },
    {
        id: 5,
        category: 'Bebidas',
        title: 'Vino',
        freight: undefined,
        size: '750 ml',
        price: 3.49,
        description: 'Vino del Valle de Uco a 1700 mts sobre el nivel del mar con uvas irrigadas con agua de deshielo cordillerano andino.',
        img: "/images/vino.jpg",
    },
    {
        id: 6,
        category: 'Regionales',
        title: 'Mate con bombilla',
        freight: undefined,
        size: 'Imperial',
        price: 6.79,
        description: 'Mate imperial de porongo con virola de alpaca y forrado en cuero, trabajado artesanalmente, bombilla pico de loro de alpaca.',
        img: "/images/mate-bombilla.jpg",
    }
];
*/

module.exports = {
    home: (req, res) => {
        const indexProducts = [];
        indexProducts.push(products.find(product => product.title === 'Billetera'));
        indexProducts.push(products.find(product => product.title === 'Facón'));
        indexProducts.push(products.find(product => product.title === 'Boina'));
        indexProducts.push(products.find(product => product.title === 'Pantalón'));

        console.log(indexProducts[0]);
        console.log(indexProducts[1]);
        console.log(indexProducts[2]);
        console.log(indexProducts[3]);
        res.render('index', { indexProducts: indexProducts})
    },
    login: (req, res) => {
        res.render('login')
    },
    productCart: (req, res) => {
        res.render('productCart')
    },
/*
    productDetail: (req, res) => {
        res.render('productDetail')
    },
*/    
    productDetail: (req, res) => {
        const productSelected = products.filter( (product)=>{
            return product.id == req.params.id;
        });
        if (product){
            res.render('productDetail', {
                product: product,
            })
        } else {
            res.render('./errors/error404')
        };
    },

    productList: (req, res) => {
        const productCategory = products.filter( product => 
            product.category == req.params.categorySelected);

        res.render('productList', {productCategory: productCategory});
    },

    register:(req, res) => {
        res.render('register')
    }
};