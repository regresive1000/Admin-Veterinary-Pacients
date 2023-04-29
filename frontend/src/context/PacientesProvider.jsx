import {createContext, useState, useEffect} from 'react';
import clienteAxios from '../config/axios';
import useAuth from '../hooks/useAuth';

const PacienteContext = createContext();

const PacientesProvider = ({children}) => {

    const [ pacientes, setPacientes ] = useState([]);
    const [ paciente, setPaciente ] = useState({});
    const { auth } = useAuth();

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

    }, [auth]);


    const guardarPaciente = async (paciente) => {

        const token = localStorage.getItem('token');
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if(paciente._id) { // Si esta editando va a esta parte del if
            try {
                const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config);
                const pacienteActDB = data.pacienteActualizado;
                const pacientesActualizado = pacientes.map( pacienteState => {
                    if(pacienteState._id === pacienteActDB._id) {
                        return pacienteActDB
                    }
                    return pacienteState // Actualiza la lista de pacientes, armando una coopia
                }); 
                console.log(pacientesActualizado);
                setPaciente({});
                setPacientes(pacientesActualizado);
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

    const eliminarPaciente = async (id, nombre) => {
        
        const confirmar = confirm(`¿Confirmas que deseas eliminar al paciente ${nombre}?`)

        if(!confirmar) return

        const token = localStorage.getItem('token');
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const data = await  clienteAxios.delete(`/pacientes/${id}`, config)
            const pacientesActualizado = pacientes.filter( pacienteState => {
                return pacienteState._id !== id 
            });
            setPacientes(pacientesActualizado);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <PacienteContext.Provider
            value={{
                pacientes,
                guardarPaciente,
                setEdicion,
                paciente,
                eliminarPaciente
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