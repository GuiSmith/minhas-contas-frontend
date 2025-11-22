// Bibliotecas
import { Routes, Route } from 'react-router-dom';

// UI
import NavBar from '@ui/NavBar';
import PaginaInexistente from '@ui/PaginaInexistente';

// Rotas
import routes from './routes.jsx';


function App() {

  return (
    <>
      <section className='app-container'>
        <NavBar />
        <div className='mt-3 page-wrapper d-flex align-items-top justify-content-center'>
          <Routes>
            {routes.map(({ path, element }, index) => (
              <Route key={index} path={path} element={element} />
            ))}
            <Route key={'inexistente'} path='*' element={<PaginaInexistente />} />
          </Routes>
        </div>
      </section>
    </>
  )
}

export default App
