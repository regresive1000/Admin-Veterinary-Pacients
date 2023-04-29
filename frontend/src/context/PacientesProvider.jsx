import {createContext, useState, useEffect} from 'react';
import clienteAxios from '../config/axios';


const PacienteContext = createContext();

const PacientesProvider = ({children}) => {

    const [ pacientes, setPacientes ] = useState([]);
    const [ paciente, setPaciente ] = useState({});

    useEffect( () => {
        const obtenerPacientes = async () => {

            try {
                const token = localStorage.getItem('token');
                if(!token) return;

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}` // la authorization para recibir el response del metodo POST
                    }
                }

                const { data } = await clienteAxios('/pacientes', config);
                setPacientes(data);
                
            } catch (error) {
                console.log(error);
            }

        }
        obtenerPacientes()

    }, [])


    const guardarPaciente = async (paciente) => {

        console.log(paciente)

        const token = localStorage.getItem('token');
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if(paciente.id) { // Si esta editando va a esta parte del if
            try {
                const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config);
                console.log(`/pacientes/${paciente._id}`)
                const pacientesActualizado = pacientes.map( pacienteState => pacienteState.id === data._id ? data : pacienteState) // Actualiza la lista de pacientes
            } catch (error) {
                console.log(error)
            }
        } else { 
            //Si es un nuevo registro va a este condicional
            try {   
                const { data } = await clienteAxios.post('/pacientes', paciente, config)
                const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data; //Genera un nuevo objeto(pacienteAlmacenado) sin las propiedades a su izquierda
                setPacientes([pacienteAlmacenado, ...pacientes]);
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }
        
    }

    const setEdicion = (paciente) => {
        setPaciente(paciente);
    }

    return (
        <PacienteContext.Provider
            value={{
                pacientes,
                guardarPaciente,
                setEdicion,
                paciente
            }}
        >
            {children}
        </PacienteContext.Provider>
    )
}

export {
    PacientesProvider
}

export default PacienteContext;