const express = require('express');
const app = express();
const port = 3000;


//Middleware to parse JSON requests
app.use(express.json());

//Sample products data
const products = [
    {id: 1, name: 'Product 1', price: 100},
    {id: 2, name: 'Product 2', price: 200},
    {id: 3, name: 'Product 3', price: 300},

];

//Endpoint to get all products
app.get('/api/products', (req, res) => {
    res.json(products);
});


//Endpoint to get a product by ID
app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if(!product) return res.status(404).send('Product not found');
    res.json(product);
});


//Endpoint to create a new product
app.get('/api/products', (req, res) => {
    const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price,
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
})

//Endpoint to update a product
app.put('/api/proucts/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if(!product) return res.status(404).send('Product Not Found');

    product.name = req.body.name;
    product.price = req.body.price;
    res.json(product);
})

//Endpoint to delete a product
app.delete('/api/products/:id', (req, res) => {
    const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
    if (productIndex === -1 ) return res.status(404).send("Product Not Found");

    const deletedProduct = products.splice(productIndex, 1);
    res.json(deletedProduct);
})

//Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});