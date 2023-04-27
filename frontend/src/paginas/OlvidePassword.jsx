import { Link } from 'react-router-dom';
import { useState } from 'react';
import clienteAxios from '../config/axios';
import Alerta from '../components/Alerta';

const OlvidePassword = () => {

  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState({})
  const [formSubmit, setFormSubmit] = useState(false); // Print de si hubo un error al enviar un mail o no

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await clienteAxios.post('/veterinarios/olvide-password', { email });
      if(response) {
        setAlerta({msg: response.data.msg, error: false});
      }
    } catch (error) {
      console.log(error)
      setAlerta({msg: error.response.data.msg, error: true})
    }
    setFormSubmit(true);
  };

  return (
  <>
  <div>
      <h1 className="text-indigo-600 font-black text-6xl">
        Recupera tu acceso y no pierdas {""}
        <span className="text-black">tus Pacientes</span>
      </h1>
  </div>

  <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
    {formSubmit &&
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
          Email
        </label>
        <input
          type="email"
          placeholder="Ingresa tu Email"
          className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      
      <input
        type="submit"
        value="Enviar instrucciones"
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

export default OlvidePassword