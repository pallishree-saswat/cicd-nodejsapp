import {useContext} from 'react';
import {useNavigate} from "react-router-dom";
import { Nav ,Navbar,Container} from 'react-bootstrap';
import AuthContext from '../authContext/index';
const Header = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { isAuthenticated ,logout,user} = authContext;
  return (
      <Navbar className="mb-2" collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Shree Learning</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {isAuthenticated && user ?
            <Nav.Link href="/create">Create</Nav.Link>
            :""}
          </Nav>
          <Nav>

          { isAuthenticated && user ? <>
              <Nav.Link>Welcome {user.name}</Nav.Link>
              <Nav.Link onClick={() => {
                logout();
                navigate("/login");
              }}>
                Logout
              </Nav.Link>

          </>:<>
                <Nav.Link href='/register'>Register </Nav.Link>
                <Nav.Link href='/login'>
                  Login
                </Nav.Link>
          </>}
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header