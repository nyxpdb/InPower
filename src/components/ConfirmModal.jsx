import React from "react";
import { Modal, Button } from "react-bootstrap";

function ConfirmModal({ show, onHide, onConfirm, title, body }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="lg" 
      dialogClassName="modal-dialog-scrollable"
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmModal;
