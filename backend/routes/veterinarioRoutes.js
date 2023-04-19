import express from 'express';
import { registrar, perfil, confirmar, autenticar, olvidePassword, comprobarToken, nuevoPassword } from '../controllers/veterinarioController.js';
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();

// Area publica
router.post('/', registrar);
router.get('/confirmar/:token', confirmar);
router.post('/login', autenticar);
router.post('/olvide-password', olvidePassword); // Solicitud de que user se olvido el password y envio de mail

router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword) 
                                            // Link con token de autenticación para cambiar password
                                                                    // Formulario de envio con nuevo password

// Area privada
router.get('/perfil', checkAuth, perfil);


export default router;