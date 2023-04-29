import { useState, useEffect, createContext } from 'react';
import clienteAxios from '../config/axios';

const AuthContext = createContext(); // Esto define el context, donde van a almacenarse los datos - con useContext se EXTRAEN los datos

const AuthProvider = (props) => {

    const { children } = props;/*El children son todos los componentes que estan dentro del Authprovider en la APP.jsx, es un prop dedicado de react y si no coloco los children, no va a printear nada en pantalla */

    const [ cargando, setCargando ] = useState(true);
    const [ auth, setAuth ] = useState({}); // Este state al estar en el elemento padre del app.jsx, permite que este disponible en toda la aplicación

    useEffect( () => {
        const autenticaUsuario = async () => {
            const token = localStorage.getItem('token');

            if(!token) {
                setCargando(false)
                return
            }

            const config = { // como bajo el token del servidor, lo autentico cada vez que inicie en la página y si token es true, le paso por headers la authorization
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } = await clienteAxios('/veterinarios/perfil', config);
                setAuth(data);
            } catch (error) {
                console.log(error.response.data.msg);
                setAuth({})
            }
            setCargando(false)
        }
        autenticaUsuario();
    }, [])

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        setAuth({});
    }

    const actualizarPerfil = async (datos) => {
        console.log(datos._id)
        const token = localStorage.getItem('token');

        if(!token) {
            setCargando(false)
            return
        }
        const config = { 
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const data = await clienteAxios.put(`veterinarios/perfil/${datos._id}`, datos, config)
            return {
                msg: "Almacenado correctamente",
                error: false
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    const guardarPassword = async (datos) => {
        const token = localStorage.getItem('token');

        if(!token) {
            setCargando(false)
            return
        }
        const config = { 
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await clienteAxios.put('/veterinarios/actualizar-password', datos, config);
            return {
                msg: data.msg,
                error: false
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    return(
        <AuthContext.Provider // El value le paso un objeto que va a contener todos los valores que van a estar disponibles cuando mande a llamar el hook useAuth
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesion,
                actualizarPerfil,
                guardarPassword
            }}
        >

            {children} 

        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext;