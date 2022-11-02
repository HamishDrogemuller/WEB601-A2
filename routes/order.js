const {Router} = require('express');
const db = require('../database');
const router = Router();

//AddToCart
router.post('/AddToCart', (req, res) => {

    const {productID, Quantity} = req.body;

    const Created_At = new Timestamp();

    if(productID && Quantity)
    {
        try
        {
            db.promise().query(`Insert Into tblCart (productID, Quantity, Created_At) VALUES ('${productID}', '${Quantity}', '${Created_At}')`);
            res.status(200).send({message: 'Product Added to Cart'});
        }
        catch(err)
        {
            res.status(500).send({message: 'Error Adding Product to Cart'});
        }
    }
    else 
    {
        res.status(418).send({message: 'Please enter all fields'});
    }
});

//RemoveFromCart
router.delete('/RemoveFromCart', (req, res) => {
    
    const {productID} = req.body;

    if(productID)
    {
        try
        {
            db.promise().query(`Delete From tblCart Where productID = ${productID}`);
            res.status(200).send({message: 'Product Removed from Cart'});
        }
        catch(err)
        {
            res.status(500).send({message: 'Error Removing Product from Cart'});
        }
    }
    else
    {
        res.status(418).send({message: 'Please enter a product ID'});
    }
});

//PlaceOrder
router.post('/PlaceOrder', (req, res) => {

    const {OrderTotal} = req.body;

    const ProductID = db.promise().query(`Select productID From tblCart`);
    const Quantity = db.promise().query(`Select Quantity From tblCart`);
    const Created_At = new Timestamp();
    const CustomerID = db.promise().query(`Select CustomerID From tblShoppingSession`);

    if(ProductID && Quantity && OrderTotal)
    {
        try
        {
            db.promise().query(`Insert Into tblOrder (CustomerID, StatusID, Total, Created_At) VALUES ('${CustomerID}', '1', '${OrderTotal}', '${Created_At}')`);
            const OrderID = db.promise().query(`Select OrderID From tblOrder Where CustomerID = ${CustomerID}`);
            db.promise().query(`Insert Into tblOrderItem (OrderID, ProductID, Quantity, OrderTotal) VALUES ('${OrderID}', '${ProductID}', '${Quantity}', '${OrderTotal}')`);
            res.status(200).send({message: 'Order Placed'});
        }
        catch(err)
        {
            res.status(500).send({message: 'Error Placing Order'});
        }    
    }
    else
    {
        res.status(418).send({message: 'Please enter all fields'});
    }
});

//DeleteOrder
router.delete('/DeleteOrder', (req, res) => {
    
        const {OrderID} = req.body;
    
        if(OrderID)
        {
            try
            {
                db.promise().query(`Delete From tblOrder Where OrderID = ${OrderID}`);
                res.status(200).send({message: 'Order Deleted'});
            }
            catch(err)
            {
                res.status(500).send({message: 'Error Deleting Order'});
            }
        }
        else
        {
            res.status(418).send({message: 'Please enter an order ID'});
        }
    });

module.exports = router;


