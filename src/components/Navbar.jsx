import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

import '../sass/navbar.scss';

//Import icon
import { FaCartShopping } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { MdHistory } from "react-icons/md";



function Navbars() {
    const token = sessionStorage.getItem('token'); 

    return (
        <Navbar key="md" expand="md" className="navbar mb-3">
            <Container fluid>
                <Navbar.Brand href="/home" className="icon-brand">FOODR</Navbar.Brand>
                <Form className="d-flex ms-5">
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2 input-search"
                        aria-label="Search"
                    />
                    <button className='btn-search'><FaSearch size={25}/></button>
                </Form>
                <Navbar.Toggle aria-controls="offcanvasNavbar-expand-md" />
                <Navbar.Offcanvas
                    id="offcanvasNavbar-expand-md"
                    aria-labelledby="offcanvasNavbarLabel-expand-md"
                    placement="end"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvasNavbarLabel-expand-md" className="icon-brand">
                            FOODR
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="box-menu-nav">
                            <Nav.Link href="/home"><GoHomeFill size={25} className='me-1'/>Home</Nav.Link>
                            <Nav.Link href={token ? "/history" : "/auth"}><MdHistory size={25} className='me-1'/>History</Nav.Link>
                            <Nav.Link href={token ? "/cart" : "/auth"}><FaCartShopping size={25} className='me-1'/></Nav.Link>

                           
                            {token ? 
                                 <NavDropdown
                                    title={<FaUserAlt size={25}/>}
                                    id="offcanvasNavbarDropdown-expand-md"
                                    align="end"
                                 >
                                 <NavDropdown.Item href="#profile"><FiUser />Profile</NavDropdown.Item>
                                 <NavDropdown.Item href="#setting"><IoSettingsOutline />Setting</NavDropdown.Item>
                                 <NavDropdown.Divider />
                                 <NavDropdown.Item href="#logout"><MdLogout />Logout</NavDropdown.Item>
                                </NavDropdown>
                             :
                                <NavDropdown
                                    title={<FaUserAlt size={25}/>}
                                    id="offcanvasNavbarDropdown-expand-md"
                                    align="end"
                                >
                                    <NavDropdown.Item href="/auth"><FiUser />Sign In</NavDropdown.Item>
                                </NavDropdown>
                            }

                        </Nav>
                        
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}

export default Navbars;