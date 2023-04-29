import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Header from '../components/Header';
import Footer from '../components/Footer';

function RutaProtegida() {

    const { auth, cargando } = useAuth();

    if(cargando) return 'cargando...' // mientras esta esperando, muestra esto

    return (
        <>
            <Header />
                {auth?._id ? (
                    <main className='container mx-auto mt-20'> 
                        <Outlet />
                    </main>
                    ): <Navigate to="/" />  /* Valida si auth es true or false y si le da acceso a la navegación privada, sino redirect a root */  } 
            <Footer />
        </>
    )
}

export default RutaProtegida