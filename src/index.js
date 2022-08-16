const express = require('express'); 
const morgan = require('morgan');
const app = express();

// CONFIGURACION
app.set('port', process.env.PORT || 3000); 

// MIDLEWARES
app.use(morgan('dev'));
app.use(express.json());

// RUTAS
//app.use('/api',require('./routes'));
app.use('/api/aeronaves', require('./routes/aeronaves'));
app.use('/api/componentes', require('./routes/componentes'));
app.use('/api/pilotos', require('./routes/pilotos'));
app.use('/api/mantencion/componentes', require('./routes/mant_comp'));
app.use('/api/mantencion/aeronaves', require('./routes/mant_aeronave'));

// COMENZANDO EL SERVIDOR
app.listen(app.get('port'), () => {
    console.log('Servidor escuchando en el puerto: ', app.get('port'));
})