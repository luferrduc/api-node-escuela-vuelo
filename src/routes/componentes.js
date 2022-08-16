const express = require ('express');
const router = express.Router();

const mysqlConnection = require('../database');


router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM componentes', (err, rows, fields) =>{
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
    mysqlConnection.query('SELECT * FROM componentes WHERE id_componente = ?', [id], (err, rows, fields) => {
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err);
        }
    });
});



router.put('/modificar/estado/:idComp', (req,res) => {
    const {idComp} = req.params;
    // const sql = `UPDATE componentes SET id_estado = ${idEstado} WHERE id_componente = ${id}`;
    const query = `CALL sp_modificar_estado_componente(${idComp})`;
    mysqlConnection.query(query, (err, rows, fields) => {
        if(!err){
            res.send('Cambio correcto');
        }else{
            console.log(err);
        }
    });
});


router.delete('/eliminar/:id', (req, res) => {
    const { id } = req.params;
    // const sql = `DELETE FROM componentes WHERE id_componente = ${id}`;
    const query = `CALL sp_eliminar_componente(${id})`;
    mysqlConnection.query(query, error => {
        if(!error){
            res.send('Componente eliminado');
        }else{
            console.log(error);
        }
    });

});


module.exports = router;