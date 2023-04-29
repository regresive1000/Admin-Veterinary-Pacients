import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
import RutaProtegida from './layout/RutaProtegida';
import Login from './paginas/Login';
import Registrar from './paginas/Registrar';
import OlvidePassword from './paginas/OlvidePassword';
import ConfirmarCuenta from './paginas/ConfirmarCuenta';
import CambioPassword from './paginas/CambioPassword';
import AdministrarPacientes from './paginas/AdministrarPacientes';
import EditarPerfil from './paginas/EditarPerfil';
import CambiarPassword from './paginas/CambiarPassword';

import { AuthProvider } from './context/AuthProvider';
import { PacientesProvider } from './context/PacientesProvider';


function App() {


  // AuthProvider y por ahi entra el context engloba todos los componentes para que el context este disponible en todos ellos
  return (

    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>

            <Route path='/' element={<AuthLayout />}>
              <Route index element={<Login />} /> /* Index hace que AuthLayout (que es la pagina principal), la convierte en la raiz */
              <Route path="registrar" element={<Registrar />} /> /* Path son las extensiones de la raíz y las secciones a printear */
              <Route path="olvide-password" element={<OlvidePassword />} />
              <Route path="olvide-password/:token" element={<CambioPassword />} />
              <Route path="confirmar/:token" element={<ConfirmarCuenta />} />
            </Route>

            <Route path='/admin' element={<RutaProtegida />}>
              <Route index element={<AdministrarPacientes />} />
              <Route path='perfil' element={<EditarPerfil />} />
              <Route path='cambiar-password' element={<CambiarPassword />} />
            </Route>

          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
