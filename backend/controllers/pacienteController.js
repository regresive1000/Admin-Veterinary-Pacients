import Paciente from '../models/Paciente.js'


const agregarPaciente = async (req, res) => {
    const paciente = new Paciente(req.body);
    paciente.veterinario = req.veterinario._id;
    try {
        const pacienteGuardado = await paciente.save()
        res.json(pacienteGuardado)
    } catch (error) {
        console.log(error)
    }
}

const obtenerPacientes = (req, res) => {

}

export {
    agregarPaciente,
    obtenerPacientes
}