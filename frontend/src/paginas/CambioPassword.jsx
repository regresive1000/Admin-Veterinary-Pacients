import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';

function CambioPassword() {

    const { token } = useParams();
    console.log(token)
    const [ password, setPassword] = useState("");
    const [ confirmarPassword, setConfirmarPassword] = useState("");
    const [ alerta, setAlerta ] = useState({});
    const [formSubmit, setFormSubmit] = useState(false); 
    const [ tokenVerificado, setTokenVerificado] = useState(true);

    useEffect( () => { //Verifica al cargar la página que todo este en orden
        const verifyToken = async () => {
            try {
                response = await clienteAxios(`/veterinarios/olvide-password/${token}`);
                setTokenVerificado(true);
            } catch (error) {
                console.log(error.response.data.msg)
                setAlerta({msg: error.response.data.msg, error: true});
                setTokenVerificado(false);
                document.getElementsByClassName('div-hide-error').display = "none";
            }
        } 
        verifyToken();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormSubmit(true);
        if(password === '') {
            setAlerta({ msg: 'Hay campos vacios', error: true })
            return;
        }
        if(password !== confirmarPassword) {
            setAlerta({ msg: 'Los passwords no son iguales', error: true });
            return;
        }
    
        if(password.length < 8) {
            setAlerta({ msg: 'El password es muy corto', error: true });
            return;
        }

        try {
            const response = await clienteAxios.post(`/veterinarios/olvide-password/${token}`, {
                password
            });
            setAlerta({msg: response.data.msg, error: false});
           // setAlerta({msg: data.response.data.msg, error: false})

        } catch (error) {
            setAlerta({msg: error.response.data.msg, error: true})
        }
    }

  return (
    <>
    
    {!tokenVerificado &&
        <div className='absolute right-0 left-0 p-40'>
            <Alerta
                alerta={alerta}
            />
        </div>
    }

    <div className={`${!tokenVerificado? 'hidden' : 'block' }`}>
        <h1 className="text-indigo-600 font-black text-6xl">
            Recupera tu acceso y no pierdas {""}
            <span className="text-black">tus Pacientes</span>
        </h1>
    </div>

    <div className={`${!tokenVerificado? 'hidden' : 'block' } mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white div-hide-error`}>
        
        { formSubmit &&
            <Alerta 
            alerta={alerta}
            />    
        }
        
    
        <form
            onSubmit={handleSubmit}
        >
            <div className="my-5">
                <label
                    htmlFor="" className=" text-gray-600 block text-xl font-bold"
                >
                    Ingresa un Nuevo Password
                </label>
                <input
                    type="password"
                    placeholder="Ingresa la Nueva Contraseña"
                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />

                <label
                    htmlFor="" className="mt-3 text-gray-600 block text-xl font-bold"
                >
                    Confirma el Password
                </label>
                <input
                    type="password"
                    placeholder="Confirma la Contraseña"
                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                    value={confirmarPassword}
                    onChange={e => setConfirmarPassword(e.target.value)}
                />
            </div>

            <input
                type="submit"
                value="Cambiar Password"
                className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white  font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
            />

        </form>

        <nav className='mt-10 lg:flex lg:justify-between'>
            <Link
                to="/"
                className='block text-center my-5 text-gray-500'
            >
                ¿Ya tienes una cuenta? Inicia Sesión
            </Link>
            <Link
                to="/registrar"
                className='block text-center my-5 text-gray-500'
            >
                ¿No tienes una cuenta? Registrate
            </Link>
        </nav>
    </div>

    </>
  )
}

export default CambioPassword