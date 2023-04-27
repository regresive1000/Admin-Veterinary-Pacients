import axios from 'axios';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ConfirmarCuenta = () => {
  const params = useParams();
  
  const token = params.token;
  console.log(token)
  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `http://localhost:4000/api/veterinarios/confirmar/${token}`;
        const { data } = await axios(url);
        console.log(data)
      } catch (error) {
        console.log(error);
      }
    }
    confirmarCuenta();
  }, [])

  

  return (
    <>
      <h1 className="text-indigo-600 font-black text-6xl">
        Confirma tu Cuenta y Comienza a Administrar {""}
        <span className="text-black"> Pacientes</span></h1>

      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>


      </div>
    </>
    )
  }
  
  export default ConfirmarCuenta