
import { NavLink } from 'react-router-dom';

const NavBar = () => {

    const Item = (key, to, text) => {
        return (
            <li className='nav-item' key={key} >
                <NavLink to={to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    {text}
                </NavLink>
            </li>
        )
    };

    const links = [
        {
            to: '/home',
            text: 'Home',
        },
        {
            to: '/bills',
            text: 'Contas'
        },
        {
            to: '/categories',
            text: 'Categorias'
        },
    ];

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">M Contas</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        {links.map((link, index) => Item(index, link.to, link.text))}
                    </ul>
                    <ul className="navbar-nav ms-auto">
                        {Item('cadastro', '/register', 'Registrar-se')}
                        {Item('login', '/login', 'Entrar')}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;