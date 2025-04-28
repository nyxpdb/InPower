import React from "react";
import { Modal, Button } from "react-bootstrap";

const ProductModal = ({ product, onHide }) => {
  if (!product) return null;  

  return (
    <Modal show={!!product} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{product.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          src={product.image}
          alt={product.name}
          className="img-fluid mb-3"
          style={{ borderRadius: '10px' }}
        />
        <p><strong>Marca:</strong> {product.brand}</p>
        <p><strong>Preço:</strong> R$ {product.price}</p>
        <p><strong>Descrição:</strong> {product.description}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={onHide}>Fechar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductModal;
