const {Router} = require('express');
const db = require('../database');
const router = Router();

//AddProduct
router.post('/addProduct', (req, res) => {

    const {ProductName, ProductDescription, Price, TypeID} = req.body;

    if(ProductName && ProductDescription && Price && TypeID)
    {
        try
        {
            db.promise().query(`Insert Into tblProduct (ProductName, ProductDescription, Price, TypeID) VALUES ('${ProductName}', '${ProductDescription}', '${Price}', '${TypeID}')`);
            res.status(200).send({message: 'Product Added'});
        }
        catch(err)
        {
            res.status(500).send({message: 'Error Adding Product'});
        }
    }
    else
    {
        res.status(418).send({message: 'Please enter all fields'});
    }
});

//Remove Product
router.delete('/removeProduct', (req, res) => {
    const {ProductID} = req.body;

    if(ProductID)
    {
        try
        {
            db.promise().query(`Delete From tblProduct Where ProductID = ${ProductID}`);
            res.status(200).send({message: 'Product Removed'});
        }
        catch(err)
        {
            res.status(500).send({message: 'Error Removing Product'});
        }
    }
    else
    {
        res.status(418).send({message: 'Please enter a product ID'});
    }
});

//Update Product
router.put('/updateProduct', (req, res) => {
    const {ProductID, ProductName, ProductDescription, Price, TypeID} = req.body;

    if(ProductID && ProductName && ProductDescription && Price && TypeID)
    {
        try
        {
            db.promise().query(`Update tblProduct Set ProductName = '${ProductName}', ProductDescription = '${ProductDescription}', Price = '${Price}', TypeID = '${TypeID}' Where ProductID = ${ProductID}`);
            res.status(200).send({message: 'Product Updated'});
        }
        catch(err)
        {
            res.status(500).send({message: 'Error Updating Product'});
        }
    }
    else
    {
        res.status(418).send({message: 'Please enter all fields'});
    }
});

//Get Product
router.get('/getProduct', (req, res) => {
    const {ProductID} = req.body;

    if(ProductID)
    {
        try
        {
            db.promise().query(`Select * From tblProduct Where ProductID = ${ProductID}`);
            res.status(200).send({message: 'Product Found'});
        }
        catch(err)
        {
            res.status(500).send({message: 'Error Finding Product'});
        }
    }
    else
    {
        res.status(418).send({message: 'Please enter a product ID'});
    }
});

module.exports = router;