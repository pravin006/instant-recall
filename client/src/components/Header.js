import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import logo from './assets/logo.png'
import { CiSettings } from "react-icons/ci";

function Header() {
    return (
        <Navbar bg="dark" data-bs-theme="dark" expand="xs" className="bg-body-tertiary">
          <Container>
                <div className="d-flex align-items-center">
                    <img
                    src={logo}
                    width="40"
                    height="40"
                    alt="Logo"
                />
                <Navbar.Brand href="#home">InstantRecall</Navbar.Brand>
            </div>

            <Navbar.Toggle aria-controls="basic-navbar-nav">
                    <CiSettings size={24} />
            </Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">Link</Nav.Link>
                </Nav>
            </Navbar.Collapse>

          </Container>
        </Navbar>
    );
}

export default Header