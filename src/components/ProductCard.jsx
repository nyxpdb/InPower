import React from "react";
import { Card, Col, Button } from "react-bootstrap";

const ProductCard = ({ product, onSelect, onEdit, onDelete }) => {
  return (
    <Col md={4} className="mb-4">
      <Card className="shadow">
        <Card.Img variant="top" src={product.image} height="200" style={{ objectFit: "cover" }} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>
            Marca: {product.brand} <br />
            Preço: R$ {product.price}
          </Card.Text>
          <div className="d-flex justify-content-between">
            <Button variant="dark" onClick={() => onSelect(product)}>Ver</Button>
            <Button variant="outline-dark" onClick={() => onEdit(product)}>Editar</Button>
            <Button variant="danger" onClick={() => onDelete(product.id)}>Apagar</Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ProductCard;