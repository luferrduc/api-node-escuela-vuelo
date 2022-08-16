const express = require ('express');
const router = express.Router();

const mysqlConnection = require('../database');


router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM mant_aeronave', (err, rows, fields) =>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

router.get('/:idAeronave', (req, res) => {
    const { idAeronave } = req.params;
    //console.log(id);
    mysqlConnection.query('SELECT * FROM mant_aeronave WHERE id_aeronave = ?', [idAeronave], (err, rows, fields) => {
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

module.exports = router;