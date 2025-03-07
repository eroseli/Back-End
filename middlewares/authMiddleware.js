const jwt = require('jsonwebtoken');

// Autorizacion
const authMiddleware = (req, res, next) =>{

    const bearerHeader = req.headers['authorization'];

    if( typeof bearerHeader == 'undefined' ){ 
        return res.sendStatus(403) ;
    }

    const bearerToken = bearerHeader.split(" ")[1];

    jwt.verify(bearerToken, process.env.JWT_SECRET, (error, authData)=>{

        if (error) {
            res.sendStatus(403);
            console.log("Se genero el siguiente error"+error);
            return;
        }
        else{
            // res.json({
            //     mensaje:"Usuario  Encontrado correctamente",
            //     authData
            // });
            // next();
            req.user = authData.user;
            next();
        }

   });
};

module.exports = authMiddleware;