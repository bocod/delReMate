const products = [

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
        const id = req.params.id;
        const product = products.find( (product)=>{
            return id == product.id;
        });
        if (product){
            res.render('productDetail', {
                product: product,
            })
        } else {
            res.send('error')
        };
    },
    register:(req, res) => {
        res.render('register')
    }
};