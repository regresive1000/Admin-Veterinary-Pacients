import Veterinario from "../models/Veterinario.js";

const registrar = async (req, res) => {
    const {nombre, email, password} = req.body;

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
    res.json({msg: "Mostrando perfil..."})
};


export {
    registrar,
    perfil
}
