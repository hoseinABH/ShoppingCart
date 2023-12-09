import { Col, Row } from 'react-bootstrap';
import { StoreCard } from '@components/Card';
// Data
import storeData from '../data/items.json';

export function Store() {
  return (
    <div>
      <h1>Store</h1>
      <Row md={2} xs={1} lg={3} className="g-3">
        {storeData.map((item) => {
          return (
            <Col key={item.id}>
              <StoreCard {...item} />
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
