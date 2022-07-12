import { CSSProperties } from 'react';
// UI Frameworks
import { Button, Container, Nav, Navbar as NavbarBs } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
// Hooks;
import { useCart } from '../context/cart';

const CART_ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 494.67 494.67"
    fill="currentColor"
  >
    <path
      d="M421.621,116.048h-56.939v-3.735C364.682,50.383,314.299,0,252.369,0h-9.45c-61.93,0-112.313,50.384-112.313,112.313v3.735
H73.049c-8.297,0-15.026,6.727-15.026,15.025v348.572c0,8.299,6.729,15.025,15.026,15.025h348.572
c8.299,0,15.025-6.728,15.025-15.025V131.073C436.648,122.774,429.92,116.048,421.621,116.048z M166.073,112.313
c0-42.372,34.473-76.846,76.846-76.846h9.45c42.373,0,76.695,34.474,76.695,76.846l-0.021,36.722
c0,9.792-7.838,17.729-17.629,17.729c-9.793,0-17.729-7.938-17.729-17.729c0-0.041,0.008-0.082,0.008-0.123l-0.019-32.863h-92.147
v32.863h-0.006c0,0.041,0.006,0.082,0.006,0.123c0,9.792-7.938,17.729-17.729,17.729c-9.792,0-17.729-7.938-17.729-17.729
L166.073,112.313z"
    />
  </svg>
);

const badgeStyles = {
  color: 'white',
  width: '1.5rem',
  height: '1.5rem',
  position: 'absolute',
  bottom: 0,
  right: 0,
  transform: 'translate(25% , 25%)',
} as CSSProperties;

export function Navbar() {
  const { openCart, cartQuantity } = useCart();
  return (
    <NavbarBs sticky="top" className="bg-white shadow-sm mb-3">
      <Container>
        <Nav className="me-auto">
          <Nav.Link to="/" as={NavLink}>
            Home
          </Nav.Link>
          <Nav.Link to="/store" as={NavLink}>
            Store
          </Nav.Link>
          <Nav.Link to="/about" as={NavLink}>
            About
          </Nav.Link>
        </Nav>
        {cartQuantity !== 0 ? (
          <Button
            style={{ width: '3rem', height: '3rem', position: 'relative' }}
            variant="outline-primary"
            className="rounded-circle"
            onClick={openCart}
          >
            {CART_ICON}
            <div
              style={badgeStyles}
              className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
            >
              {cartQuantity}
            </div>
          </Button>
        ) : null}
      </Container>
    </NavbarBs>
  );
}
