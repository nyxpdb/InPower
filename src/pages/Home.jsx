import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-background py-5">
      <Container className="text-center">
        <h1 className="display-4 fw-bold mb-4">Arthur Sena & Julio Cesar</h1>
        <p className="lead mb-4">
          Site de catálago de eletrônicos!
        </p>

        <div className="mb-5">
          <a
            href="https://github.com/ASsena"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-dark mx-2"
          >
            GitHub Arthur
          </a>
          <a
            href="https://github.com/nyxpdb"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-dark mx-2"
          >
            GitHub Julio
          </a>
        </div>

        <Button
          variant="primary"
          size="lg"
          className="mb-5"
          onClick={() => navigate("/")}
        >
          Ver Produtos
        </Button>

        <h2 className="mb-4 mt-5">Tecnologias Utilizadas</h2>
        <Row className="g-4 justify-content-center">
          <Col xs={6} md={3}>
            <Card className="p-3 shadow-sm border-0">
              <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" height="80" />
              <Card.Body>
                <Card.Title>React</Card.Title>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={6} md={3}>
            <Card className="p-3 shadow-sm border-0">
              <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" height="80" />
              <Card.Body>
                <Card.Title>JavaScript</Card.Title>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={6} md={3}>
            <Card className="p-3 shadow-sm border-0">
              <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/commons/b/b2/Bootstrap_logo.svg" height="80" />
              <Card.Body>
                <Card.Title>Bootstrap</Card.Title>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={6} md={3}>
            <Card className="p-3 shadow-sm border-0">
              <Card.Img variant="top" src="https://assets.vercel.com/image/upload/front/favicon/vercel/76x76.png" height="80" />
              <Card.Body>
                <Card.Title>Vercel</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
