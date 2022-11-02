const {Router} = require('express');
const db = require('../database');
const router = Router();

//AddType
router.post('/addType', (req, res) => {
    const {typeName, typeDescription} = req.body;

    if(typeName && typeDescription)
    {
        try
        {
            db.promise().query(`Insert Into tblType (typeName, typeDescription) VALUES ('${typeName}', '${typeDescription}')`);
            res.status(200).send({message: 'Type Added'});
        }
        catch(err)
        {
            res.status(500).send({message: 'Error Adding Type'});
        }
    }
    else
    {
        res.status(418).send({message: 'Please enter a type name and description'});
    }
});

//Remove Type
router.post('/removeType', (req, res) => {
    const {typeID} = req.body;

    if(typeID)
    {
        try
        {
            db.promise().query(`Delete From tblType Where typeID = ${typeID}`);
            res.status(200).send({message: 'Type Removed'});
        }
        catch(err)
        {
            res.status(500).send({message: 'Error Removing Type'});
        }
    }
    else
    {
        res.status(418).send({message: 'Please enter a type ID'});
    }
});

//Update Type
router.post('/updateType', (req, res) => {
    const {typeID, typeName, typeDescription} = req.body;

    if(typeID && typeName && typeDescription)
    {
        try
        {
            db.promise().query(`Update tblType Set typeName = '${typeName}', typeDescription = '${typeDescription}' Where typeID = ${typeID}`);
            res.status(200).send({message: 'Type Updated'});
        }
        catch(err)
        {
            res.status(500).send({message: 'Error Updating Type'});
        }
    }
    else
    {
        res.status(418).send({message: 'Please enter a type ID, name, and description'});
    }
});

//Get Type
router.get('/getType', (req, res) => {
    const {typeName} = req.body;

    if(typeName)
    {
        try
        {
            db.promise().query(`Select * From tblType Where typeName = ${typeName}`)
            .then(([rows, fields]) => {
                res.status(200).send(rows);
            });
        }
        catch(err)
        {
            res.status(500).send({message: 'Error Getting Type'});
        }
    }
    else
    {
        res.status(418).send({message: 'Please select a type'});
    }
});

module.exports = router;

