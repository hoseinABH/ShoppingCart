import { Button, Card } from 'react-bootstrap';
// Hooks
import { useCart } from '../context/cart';
// Utilities
import { formatCurrency } from '../utils';

interface Props {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
}
export function StoreCard(props: Props) {
  const {
    getItemQuantity,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();
  const quantity = getItemQuantity(props.id);
  return (
    <Card>
      <Card.Img
        variant="top"
        src={props.imgUrl}
        height="200px"
        style={{ objectFit: 'cover' }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{props.name}</span>
          <span className="ms-2 text-muted">{formatCurrency(props.price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button
              className="w-100"
              onClick={() => increaseQuantity(props.id)}
            >
              + Add To Cart
            </Button>
          ) : (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: '.5rem' }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: '.5rem' }}
              >
                <Button onClick={() => decreaseQuantity(props.id)}>-</Button>
                <div>
                  <span className="fs-3">{quantity}</span> in cart
                </div>
                <Button onClick={() => increaseQuantity(props.id)}>+</Button>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeFromCart(props.id)}
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
