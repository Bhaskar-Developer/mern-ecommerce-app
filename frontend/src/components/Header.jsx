import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap"
import { logout } from '../actions/userActions'
import SearchBox from './SearchBox'

const Header = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect >
      <Container>
        <Navbar.Brand as={Link} to="/">ProShop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <SearchBox />
          <Nav style={{ marginLeft: 'auto' }} >
            <Nav.Link as={Link} to="/cart"><i className="fas fa-shopping-cart" ></i>Cart</Nav.Link>
            { userInfo ? (
              <NavDropdown title={userInfo.name} id='username' >
                <Nav.Link style={{ color: '#1a1a1a' }} as={Link} to='/profile'>Profile</Nav.Link>
                <NavDropdown.Item onClick={logoutHandler} >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) :  (
              <Nav.Link as={Link} to="/login"><i className="fas fa-user" ></i> Sign In</Nav.Link>
            )}
            { userInfo && userInfo.isAdmin && (
              <NavDropdown title='Admin' id='adminmenu' >
                <Nav.Link 
                  style={{ color: '#1a1a1a' }} 
                  as={Link} 
                  to='/admin/userlist'>
                    Users
                </Nav.Link>

                <Nav.Link 
                  style={{ color: '#1a1a1a' }} 
                  as={Link} 
                  to='/admin/productlist'>
                    Products
                </Nav.Link>

                <Nav.Link 
                  style={{ color: '#1a1a1a' }} 
                  as={Link} 
                  to='/admin/orderlist'>
                    Orders
                </Nav.Link>
                
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </header>
  )
}

export default Header