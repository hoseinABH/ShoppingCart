// UI Frameworks
import { Button, Stack } from 'react-bootstrap';
// Hooks
import { useCart } from '../context/cart';
// Utilities
import { formatCurrency } from '../utils';
// Data
import storeItems from '../data/items.json';

interface Props {
  id: number;
  quantity: number;
}

export function CartItem(props: Props) {
  const { removeFromCart } = useCart();
  const item = storeItems.find((i) => i.id === props.id);

  if (item == null) return null;
  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={item.imgUrl}
        style={{ width: '125px', height: '75px', objectFit: 'cover' }}
      />
      <div className="me-auto">
        <div>
          {item.name}{' '}
          {props.quantity > 1 && (
            <span className="text-muted" style={{ fontSize: '.65rem' }}>
              x{props.quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: '.75rem' }}>
          {formatCurrency(item.price)}
        </div>
      </div>
      <div> {formatCurrency(item.price * props.quantity)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(item.id)}
      >
        &times;
      </Button>
    </Stack>
  );
}
