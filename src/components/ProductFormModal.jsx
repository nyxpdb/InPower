import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const initialForm = {
  id: null,
  name: "",
  brand: "",
  price: "",
  image: "",
  description: ""
};

const ProductFormModal = ({ show, onHide, onSave, product }) => {
  const [formData, setFormData] = useState(initialForm);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    if (product) setFormData(product);
    else setFormData(initialForm);
  }, [product]);

  const formatPrice = (value) => 
  {

    value = value.replace(/\D/g, "");

    value = (Number(value) / 100).toFixed(2);

    value = value.replace(".", ",");
    value = `R$ ${value}`;

    return value;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "price") {
      setFormData({ ...formData, [name]: formatPrice(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = () => {
    onSave(formData);
    onHide();
    setMessage({ text: "Produto salvo com sucesso!", type: "success" });
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);  
  };

  const handleCancel = () => {
    onHide();
    setMessage({ text: "Ação cancelada.", type: "warning" });
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);  
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{formData.id ? "Editar" : "Cadastrar"} Produto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {message.text && (
          <Alert variant={message.type}>
            {message.text}
          </Alert>
        )}
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nome</Form.Label>
            <Form.Control name="name" value={formData.name} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Marca</Form.Label>
            <Form.Control name="brand" value={formData.brand} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Preço</Form.Label>
            <Form.Control
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Imagem</Form.Label>
            <Form.Control name="image" value={formData.image} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descrição</Form.Label>
            <Form.Control as="textarea" name="description" value={formData.description} onChange={handleChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={handleCancel}>Cancelar</Button>
        <Button variant="dark" onClick={handleSubmit}>Salvar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductFormModal;
