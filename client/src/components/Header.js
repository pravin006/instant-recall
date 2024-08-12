import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom'

import logo from './assets/logo.png'

function Header() {
    return (
        <Navbar bg="dark" data-bs-theme="dark" expand="xs" className="bg-body-tertiary" style={{height: '8vh'}}>
          <Container>
                <NavLink to="/" style={{textDecoration: 'none'}}>
                    <div className="d-flex align-items-center">
                        <img src={logo} width="40" height="40" alt="Logo"/>
                        <Navbar.Brand>InstantRecall</Navbar.Brand>
                    </div>
                </NavLink>
          </Container>
        </Navbar>
    );
}

export default Header