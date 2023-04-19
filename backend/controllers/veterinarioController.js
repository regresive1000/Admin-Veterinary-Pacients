import Veterinario from "../models/Veterinario.js";
import generarJWT from "../helpers/generarJWT.js";

const registrar = async (req, res) => {
    const {nombre, email, password} = req.body;

    // prevenir usuarios duplicados
    const existeUsuario = await Veterinario.findOne( {email: email} )

    if(existeUsuario) {
        const error = new Error('Usuario ya registrado');
        return res.status(400).json({msg: error.message});
    }

    try{
        //Guardar un nuevo Veterinario
        const veterinario = new Veterinario(req.body);
        const veterinarioGuardado = await veterinario.save();

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

    res.json({msj: 'Confirmando cuenta...'});
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

export {
    registrar,
    perfil,
    confirmar,
    autenticar
}
