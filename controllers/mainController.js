const products = [
    {
        id: 1,
        title: 'Alpargatas',
        freight: undefined,
        price: 8.99,
        size: 'Del 29 al 45',
        description: 'Las clásicas alpargatas argentinas de tela, con refuerzo en capellada y talón, apellada de algodón y suela de goma sintética.',
        img: "/images/alpargatas.jpg",
    },
    {
        id: 2,
        title: 'Dulce de leche',
        freight: undefined,
        size: '450grs',
        price: 4.99,
        description: 'El dulce argentino por excelencia. Libre de gluten y de culpa.',
        img: "/images/ddl.jpg",
    },
    {
        id: 3,
        title: 'Fernet',
        freight: undefined,
        size: '750 ml.',
        price: 12.99,
        description: 'Símbolo de la inmigración italiana a Argentina, bébase frío con cola o soda.',
        img: "/images/fernet.jpg",
    },
    {
        id: 4,
        title: 'Yerba',
        freight: undefined,
        size: '1 kg.',
        price: 3.99,
        description: 'Una cebada que remonta a la pampa húmeda. No sobrepasar el agua de los 80° y ¡cebarse sobre la bombilla que la yerba no es pasto y no está regando el jardín!',
        img: "/images/yerba.jpg",
    },
    {
        id: 5,
        title: 'Vino',
        freight: undefined,
        size: '750 ml',
        price: 3.49,
        description: 'Vino del Valle de Uco a 1700 mts sobre el nivel del mar con uvas irrigadas con agua de deshielo cordillerano andino.',
        img: "/images/vino.jpg",
    },
    {
        id: 6,
        title: 'Mate con bombilla',
        freight: undefined,
        size: 'Imperial',
        price: 6.79,
        description: 'Mate imperial de porongo con virola de alpaca y forrado en cuero, trabajado artesanalmente, bombilla pico de loro de alpaca.',
        img: "/images/mate-bombilla.jpg",
    }
];

module.exports = {
    home: (req, res) => {
        res.render('index')
    },
    login: (req, res) => {
        res.render('login')
    },
    productCart: (req, res) => {
        res.render('productCart')
    },
    productDetail: (req, res) => {
        res.render('productDetail')
    },
    /*
    productDetail: (req, res) => {
        const id = req.params.id;
        const product = products.find( (product)=>{
            return id == product.id;
        });
        if (product){
            res.render('productDetail', {
                product: product,
            })
        } else {
            res.render('./errors/error404')
        };
    },*/
    register:(req, res) => {
        res.render('register')
    }
};