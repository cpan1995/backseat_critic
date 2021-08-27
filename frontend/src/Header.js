import React from 'react';
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from 'react-bootstrap';

 function Header () { 
     return(
            <>
            <Navbar bg="dark" variant="dark">
            <Container>
            <Navbar.Brand href="#home">Backseat Critic</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link><NavLink exact to="/">Home</NavLink></Nav.Link>
                <Nav.Link><NavLink to="/search">Search</NavLink></Nav.Link>
                <Nav.Link><NavLink to="/users">Users</NavLink></Nav.Link>
            </Nav>
            </Container>
            </Navbar>
            <br />
        </>
     )
    // return (
    //     <body>
    //         <nav className="head">
    //             <h4 className="title">Backseat Critic</h4>
    //         </nav>
    //         <nav className="options">
    //             <ul class="nav">
    //                 <li><NavLink exact to="/">Home</NavLink></li>
    //                 <li><NavLink to="/search">Search</NavLink></li>
    //                 <li><NavLink to="/users">Users</NavLink></li>
    //             </ul>
    //         </nav>
    //     </body>
    // )
}

export default Header