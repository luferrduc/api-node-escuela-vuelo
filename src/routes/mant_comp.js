const express = require ('express');
const router = express.Router();

const mysqlConnection = require('../database');


router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM mant_componentes', (err, rows, fields) =>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

router.get('/:idComponente', (req, res) => {
    const { idComponente } = req.params;
    //console.log(id);
    mysqlConnection.query('SELECT * FROM mant_componentes WHERE id_componente = ?', [idComponente], (err, rows, fields) => {
        if(!err){
            res.json(rows);
        }else{
            res.json({ error: "No existe un componente con ese id"})
            console.log(err);
        }

    });
});

// router.put('/', (req,res) =>{
//     const { id, estado } = req.params;

//     mysqlConnection.query('UPDATE componentes SET id_estado =? WHERE id_componente =?',[estado, id], (err,rows,fields) => {
//         if(!err){
//             res.json(rows[0]);
//         }else{
//             console.log(err);
//         }
//     });
// });

module.exports = router;