const {Router} = require('express');
const db = require('../database');
const router = Router();

//Login
router.get('/login', async(req, res) => {
    
    const {Username, userPassword} = req.body;

    if(Username && userPassword)
    {
        try
        {
            const CustomerID = await db.promise().query(`Select * From tblCustomer Where Username = '${Username}' And userPassword = '${userPassword}'`);
            if(rows.length > 0)
            {
                res.status(200).send({message: 'Login Successful'});

                db.promise().query(`Insert Into tblShoppingSession (customerID) Values ('${CustomerID}')`);
                
            }
            else
            {
                res.status(418).send({message: 'Login Failed'});
            }
        }
        catch(err)
        {
            res.status(500).send({message: 'Error Logging In'});
        }
    }
    else
    {
        res.status(418).send({message: 'Please enter a username and password'});
    }
}
    );

//Register
router.post('/register', async(req, res) => {

    const {Username,  firstName, lastName, email, userPassword,} = req.body;

    if(Username &&  firstName && lastName && email && userPassword )
    {
        try
        {
            await db.promise().query(`Insert Into tblCustomer (username, firstName, lastName, email, userPassword,) VALUES ('${Username}', '${firstName}', '${lastName}', '${email}', '${userPassword}')`);
            res.status(200).send({message: 'Registration Successful'});
        }
        catch(err)
        {
            res.status(500).send({message: 'Error Registering'});
        }
    }
    else
    {
        res.status(418).send({message: 'Please enter all fields'});
    }
});

//Delete Account
router.delete('/deleteAccount', async(req, res) => {
    
        const {Username, userPassword} = req.body;
    
        if(Username && userPassword)
        {
            try
            {
                await db.promise().query(`Delete From tblCustomer Where username = ${Username} && userPassword = ${userPassword}`);
                res.status(200).send({message: 'Account Deleted'});
            }
            catch(err)
            {
                res.status(500).send({message: 'Error Deleting Account'});
            }
        }
        else
        {
            res.status(418).send({message: 'Please enter a customer ID'});
        }
});

//Update
router.put('/update', async(req, res) => {

    const {Username,  firstName, lastName, email, userPassword,} = req.body;

    if(Username &&  firstName && lastName && email && userPassword )
    {
        try
        {
            await db.promise().query(`Update tblCustomer Set username = '${Username}', firstName = '${firstName}', lastName = '${lastName}', email = '${email}', userPassword = '${userPassword}'`);
            res.status(200).send({message: 'Update Successful'});
        }
        catch(err)
        {
            res.status(500).send({message: 'Error Updating'});
        }
    }
    else
    {
        res.status(418).send({message: 'Please enter all fields'});
    }
});

module.exports = router;
