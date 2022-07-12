import { useMemo } from 'react';
// UI Frameworks
import { Offcanvas, Stack } from 'react-bootstrap';
// Components
import { CartItem } from './CartItem';
// Hooks
import { useCart } from '../context/cart';
// Utilities
import { formatCurrency } from '../utils';
// data
import storeItems from '../data/items.json';

interface Props {
  isOpen: boolean;
}

export function CartSidebar(props: Props) {
  const { closeCard, cartItems } = useCart();
  const totalPrice = useMemo(
    () =>
      cartItems.reduce((total, cartItem) => {
        const item = storeItems.find((i) => i.id === cartItem.id);
        return total + (item?.price || 0) * cartItem.quantity;
      }, 0),
    [cartItems, storeItems]
  );
  return (
    <Offcanvas show={props.isOpen} onHide={closeCard} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total {formatCurrency(totalPrice)}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
