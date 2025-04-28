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
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (product) setFormData(product);
    else setFormData(initialForm);
  }, [product]);

  const formatPrice = (value) => {
    value = value.replace(/\D/g, "");
    value = (Number(value) / 100).toFixed(2);
    value = value.replace(".", ",");
    value = `R$ ${value}`;
    return value;
  };

  const validateUrl = (url) => {
    const regex = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z0-9]{2,}(\/[^\s]*)?$/i;
    return regex.test(url);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "price") {
      setFormData({ ...formData, [name]: formatPrice(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "O nome do produto é obrigatório.";
    if (!formData.brand) newErrors.brand = "A marca do produto é obrigatória.";
    if (!formData.price || formData.price === "R$ NaN,00") newErrors.price = "O preço é obrigatório e deve ser válido.";
    if (!formData.image) newErrors.image = "A imagem do produto é obrigatória.";
    if (formData.image && !validateUrl(formData.image)) newErrors.image = "A URL da imagem deve ser válida.";
    if (!formData.description) newErrors.description = "A descrição do produto é obrigatória.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSave(formData);
      onHide();
      setMessage({ text: "Produto salvo com sucesso!", type: "success" });
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    } else {
      setMessage({ text: "Por favor, corrija o campo em vermelho.", type: "danger" });
    }
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
            <Form.Control
              name="name"
              value={formData.name}
              onChange={handleChange}
              isInvalid={!!errors.name}
            />
            {errors.name && <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Marca</Form.Label>
            <Form.Control
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              isInvalid={!!errors.brand}
            />
            {errors.brand && <Form.Control.Feedback type="invalid">{errors.brand}</Form.Control.Feedback>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Preço</Form.Label>
            <Form.Control
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              isInvalid={!!errors.price}
            />
            {errors.price && <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Imagem</Form.Label>
            <Form.Control
              name="image"
              value={formData.image}
              onChange={handleChange}
              isInvalid={!!errors.image}
            />
            {errors.image && <Form.Control.Feedback type="invalid">{errors.image}</Form.Control.Feedback>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
              isInvalid={!!errors.description}
            />
            {errors.description && <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>}
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
