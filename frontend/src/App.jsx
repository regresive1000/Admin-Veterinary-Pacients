import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
import Login from './paginas/Login';
import Registrar from './paginas/Registrar';
import OlvidePassword from './paginas/OlvidePassword';
import ConfirmarCuenta from './paginas/ConfirmarCuenta';
import CambioPassword from './paginas/CambioPassword';

function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<AuthLayout />}>
          <Route index element={<Login />} /> /* Index hace que AuthLayout (que es la pagina principal), la convierte en la raiz */
          <Route path="registrar" element={<Registrar />} /> /* Path son las extensiones de la raíz y las secciones a printear */
          <Route path="olvide-password" element={<OlvidePassword />} />
          <Route path="olvide-password/:token" element={<CambioPassword />} />
          <Route path="confirmar/:token" element={<ConfirmarCuenta />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
