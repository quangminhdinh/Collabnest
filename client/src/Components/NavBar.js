import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';
import logo from '../assets/img/v32.jpg';


const NavBar = props => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    return (
        <Navbar id="nav1" color="white" light expand="md">
            <div className="container">
                <NavbarBrand tag={Link} to="/"><img height='40px' src={logo} alt="logo"/> <span className="bn-lgo align-middle">Collabnest</span></NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                <div className="mr-auto"></div>
                <Nav navbar>
                    <NavItem>
                        <NavLink tag={Link} to="/signin">Sign in </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/signup">Create account </NavLink>
                    </NavItem>
                </Nav>
                </Collapse>
            </div>
        </Navbar>
    );
}

export default NavBar;