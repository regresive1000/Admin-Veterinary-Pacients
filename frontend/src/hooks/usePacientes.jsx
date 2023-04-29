import { useContext } from 'react';
import PacientesContext from '../context/PacientesProvider';

// Esto es mi custom hook

const usePacientes = () => {
    return useContext(PacientesContext); // Hace disponible los valores del provider
};

export default usePacientes;