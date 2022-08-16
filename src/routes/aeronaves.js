const express = require ('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM aeronaves', (err, rows, fields) =>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    //console.log(id);
    mysqlConnection.query('SELECT * FROM aeronaves WHERE patente_aeronave = ?', [id], (err, rows, fields) => {
        if(!err){
            res.json(rows[0]);
        }else{  
            res.json({ error: "No existe una aeronave con esa patente"});
            console.log(err);
        }
    });
});

router.get('/estado/:id', (req, res) => {
    const { id } = req.params;
    console.log(id);
    mysqlConnection.query(`SELECT a.patente_aeronave, a.descripcion_aeronave, a.horas_vuelo, a.fec_ultimo_mant,e.descripcion "estado" FROM aeronaves a JOIN estado e ON a.id_estado = e.id WHERE a.patente_aeronave = ?`, [id], (err, rows, fields) => {
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err);
        }
    });
});





module.exports = router;