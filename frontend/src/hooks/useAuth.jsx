import { useContext } from 'react';
import AuthContext from '../context/AuthProvider';

// Esto es mi custom hook

const useAuth = () => {
    return useContext(AuthContext); // Hace disponible los valores del provider
};

export default useAuth;