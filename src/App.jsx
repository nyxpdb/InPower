import React, { useEffect, useState } from "react";
import { Container, Row, Button, Spinner, Alert } from "react-bootstrap";
import ProductList from "./components/ProductList";
import ProductModal from "./components/ProductModal";
import ProductFormModal from "./components/ProductFormModal";
import ConfirmModal from "./components/ConfirmModal"; 
import { getProducts, saveProduct, deleteProduct, updateProduct } from "./services/productService";

function App() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const fetchProducts = async () => {
    try {
      const productsData = await new Promise((resolve) => {
        setTimeout(() => {
          const data = getProducts();
          resolve(data);
        }, 2000);
      });
      setProducts(productsData);
    } catch (err) {
      setNotification({ message: "Erro ao carregar produtos. Tente novamente.", variant: "danger" });
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchProducts().then(() => setLoading(false));
  }, []);

  const handleSave = async (product) => {
    setLoading(true);
    setNotification(null);
    try {
      if (product.id) {
        await new Promise((resolve) => {
          setTimeout(() => {
            updateProduct(product);
            resolve();
          }, 500);
        });
        setNotification({ message: "Produto atualizado com sucesso!", variant: "success" });
      } else {
        await new Promise((resolve) => {
          setTimeout(() => {
            saveProduct(product);
            resolve();
          }, 500);
        });
        setNotification({ message: "Produto criado com sucesso!", variant: "success" });
      }
      await fetchProducts();
    } catch (err) {
      setNotification({ message: "Erro ao salvar produto. Tente novamente.", variant: "danger" });
    } finally {
      setLoading(false);
      setShowForm(false);
      setEditingProduct(null);
    }
  };

  const handleDelete = async () => {
    if (!confirmDeleteId) return;
    setLoading(true);
    setNotification(null);
    try {
      await new Promise((resolve) => {
        setTimeout(() => {
          deleteProduct(confirmDeleteId);
          resolve();
        }, 500);
      });
      setNotification({ message: "Produto excluído com sucesso!", variant: "success" });
      await fetchProducts();
    } catch (error) {
      setNotification({ message: "Erro ao excluir produto. Tente novamente.", variant: "danger" });
    } finally {
      setLoading(false);
      setConfirmDeleteId(null);
    }
  };

  return (
    <div>
      <div className="bg-dark text-white py-3 d-flex justify-content-between align-items-center px-4">
        <h1 className="m-0 fs-4">InPower Catalog</h1>
        <Button variant="light" onClick={() => setShowForm(true)}>
          {loading ? <Spinner size="sm" animation="border" /> : "Cadastrar Produto"}
        </Button>
      </div>

      <Container className="py-4">
        <div className="mb-4 p-4 bg-white rounded shadow-sm">
          <h2 className="mb-3">Bem-vindo!</h2>
          <p className="text-muted">Gerencie os produtos da InPower de forma fácil e rápida. Cadastre, visualize, edite e exclua conforme necessário.</p>
        </div>

        {notification && (
          <Alert variant={notification.variant} onClose={() => setNotification(null)} dismissible>
            {notification.message}
          </Alert>
        )}

        {loading ? (
          <div className="d-flex justify-content-center py-5">
            <Spinner animation="border" variant="dark" style={{ width: '3rem', height: '3rem' }} />
          </div>
        ) : (
          <Row>
            <ProductList
              products={products}
              onSelect={setSelectedProduct}
              onEdit={(prod) => {
                setEditingProduct(prod);
                setShowForm(true);
              }}
              onDelete={(id) => setConfirmDeleteId(id)}
            />
          </Row>
        )}

        <ProductModal product={selectedProduct} onHide={() => setSelectedProduct(null)} />
        <ProductFormModal
          show={showForm}
          onHide={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
          onSave={handleSave}
          product={editingProduct}
        />
        <ConfirmModal
          show={!!confirmDeleteId}
          onHide={() => setConfirmDeleteId(null)}
          onConfirm={handleDelete}
          title="Confirmar Exclusão"
          body="Deseja realmente excluir este produto?"
        />
      </Container>
    </div>
  );
}

export default App;
