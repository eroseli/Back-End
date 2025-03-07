const express = require('express');
const app = express();
const port = 3000;
const userRoutes = require('./routes/userRoutes');

//habilitar CORS
const cors = require('cors');
app.use(cors());


//Midleware para procesar datos JSON
app.use(express.json());
app.use('/users',userRoutes);

//ruta simple
app.get('/',(req,res)=>{
    res.send('Hola Mundo desde Express');
});

app.listen(port,()=>{
    console.log(`Servidor de Express corriendo en htpp://localhost:${port}`);
});

