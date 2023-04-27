import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import conectarDB from './config/db.js';
import veterinarioRoutes from './routes/veterinarioRoutes.js';
import pacienteRoutes from './routes/pacienteRoutes.js';

const app = express();
app.use(express.json());

dotenv.config();

conectarDB();

const dominiosPermitidos = ["http://localhost:5173"]; // Los dominios que estan permitidos en la petición

const corsOptions = {
    origin: function(origin, callback) {
        if(dominiosPermitidos.indexOf(origin) !== -1 ) { // Si el origenesta en la lista de dominios permitidos y el -1 quiere decir si no lo encontro
            // El Origen del Request esta permitido
            callback(null, true); // Null es el error, true le permite el acceso
        } else {
            callback(new Error('No permitido por CORS'));
        }
    }
}

app.use(cors(corsOptions));

app.use('/api/veterinarios', veterinarioRoutes);
app.use('/api/pacientes', pacienteRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`)
});


