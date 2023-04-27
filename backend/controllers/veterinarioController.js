import Veterinario from "../models/Veterinario.js";
import generarJWT from "../helpers/generarJWT.js";
import generarId from "../helpers/generarId.js";
import emailRegistro from "../helpers/emailRegistro.js";
import emailOlvidePassword from "../helpers/emailOlvidePassword.js";

const registrar = async (req, res) => {
    const {nombre, email} = req.body;

    // prevenir usuarios duplicados
    const existeUsuario = await Veterinario.findOne( {email: email} )

    if(existeUsuario) {
        const error = new Error('Usuario ya registrado');
        return res.status(400).json({msg: error.message});
    }

    try{
        //Gar un nuevo Veterinario
        const veterinario = new Veterinario(req.body);
        const veterinarioGuardado = await veterinario.save();

        //Enviar email
        emailRegistro({
            email,
            nombre,
            token: veterinarioGuardado.token
        });

        res.json({msj: 'Registrando usuario...'})

    } catch (error){
        console.log(error)
    }

    
};

const perfil = (req, res) => {

    const { veterinario } = req;

    res.json({perfil: veterinario})
};

const confirmar = async (req, res) => {
    const token = req.params.token;
    
    const usuarioConfirmar = await Veterinario.findOne({ token }); //lo pongo una vez, porque al ser autodeclarativa da por entendido que llave y valor son lo mismo
    if(!usuarioConfirmar) {
        const error = new Error('Token no valido');
        return res.status(404).json({ msg: error.message });
    }

    try {
        usuarioConfirmar.confirmado = true;
        usuarioConfirmar.token = null;
        await usuarioConfirmar.save();

        res.json({ msg: "Usuario confirmado correctamente" })
    } catch (error) {
        console.log(error)
    }
};

const autenticar = async (req, res) => {

    const { email, password } = req.body;
    
    // Comprobar si el usuario existe
    const usuario = await Veterinario.findOne({email});

    if(!usuario) {
        const error = new Error('El Usuario no existe');
        return res.status(403).json({ msg: error.message });
    }

    // Comprobar si el usuario esta confirmado o no
    if(!usuario.confirmado) {
        const error = new Error('Tu cuenta no ha sido confirmada');
        return res.status(403).json({ msg: error.message });
    }

    // Revisar el password
    if( await usuario.comprobarPassword(password)) {
        // Autenticar
        res.json({ token: generarJWT(usuario.id) })
    } else {
        const error = new Error('El password es incorrecto');
        return res.status(403).json({ msg: error.message });
    }
    
};

const olvidePassword = async (req, res) => {
    const { email } = req.body // req.body es info del body
    
    const existeVeterinario = await Veterinario.findOne( {email} );

    if(!existeVeterinario) {
        const error = new Error('No existe el usuario')     // SIEMPRE MANEJAR LOS ERRORES DE LOS CONTROLLER, SINO SE QUEDA LA PETICIÓN PENDIENTE
        return res.status(400).json({ msg: error.message })
    }
    
    try {
        existeVeterinario.token = generarId(); // Genera el token por el que se va a enviar por mail 
                                                // para verificar que el usuario quiere restablecer su contraseña
        await existeVeterinario.save();
        emailOlvidePassword({
            nombre: existeVeterinario.nombre,
            token: existeVeterinario.token,
            email
        });
        res.json({ msg: 'Hemos enviado un email con las instrucciónes'})
    } catch (err) {
        console.log(err)
    }
    
};

const comprobarToken = async (req, res) => {
    const { token } = req.params; // req.params es info de la URL
    const existeTokenVeterinario = await Veterinario.findOne({ token }); // Verifica si es un token valido que exista en el DB

    if(!existeTokenVeterinario) {
        const error = new Error('El link para reestablecer la contraseña es incorrecto o expiro');
        return res.status(400).json({msg: error.message});
    } else {
        res.json({ msg: 'Token Valido y el usuario existe' })
    }

};

const nuevoPassword = async (req, res) => {

    const { token } = req.params;
    const { password } = req.body;
    
    const veterinario = await Veterinario.findOne({ token });

    if(!veterinario) { // Verifica que el token este en orden
        const error = new Error('Hubo un error');
        return res.status(400).json({msg: error.message});
    }

    try { // Cambia el password (es hasheado en el Model) y reinicia el token a null (convirtiendolo en solo de un uso)
        veterinario.token = null;
        veterinario.password = password;
        await veterinario.save();

        res.json({msg: 'Password modificado correctamente'});
    } catch (error) {
        console.log(error)
    }
};

export {
    registrar,
    perfil,
    confirmar,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword
}
