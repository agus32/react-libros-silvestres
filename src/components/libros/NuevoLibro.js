
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import { useState,React } from "react";

import { PeopleForm } from '../personas/PeopleForm';

const ModalNuevaPersona = ({type,setAuthors,authors}) => {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
  
    return (
      <>
        <Button variant="outline-primary" onClick={handleShow}>
            Nuevo {type}
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Nuevo {type}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <PeopleForm type={type.toLowerCase()} setPeople={setAuthors} prevPeople={authors}/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Enviar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}







export const NuevoLibro = ({setAuthors,authors}) => {


    return (
    <div className="container mt-5">
    <Form>

        <Form.Group className="mb-3" controlId="titulo">
            <Form.Label>Titulo</Form.Label>
            <Form.Control placeholder="Titulo" />
        </Form.Group>

        <Row className="mb-3">
            <Form.Group as={Col} controlId="isbn">
            <Form.Label>ISBN</Form.Label>
            <Form.Control  placeholder="ISBN" />
            </Form.Group>

            <Form.Group as={Col} controlId="fecha-edicion">
            <Form.Label>Fecha de Edicion</Form.Label>
            <Form.Control type="date" />
            </Form.Group>
        </Row>

        <Row className="mb-3">
            <Form.Group as={Col} controlId="precio">
            <Form.Label>Precio</Form.Label>
            <Form.Control placeholder="0.00" />
            </Form.Group>

            <Form.Group as={Col} controlId="stock">
            <Form.Label>Stock Inicial</Form.Label>
            <Form.Control type="number" placeholder="0" />
            </Form.Group>
        </Row>

        <Form.Label>Autores</Form.Label>
        <div className="mb-3">
            <ModalNuevaPersona type="Autor" setPeople={setAuthors} prevPeople={authors} />{'  '}
            <Button variant="outline-primary">Autor ya existente</Button>
        </div>

        <Form.Label>Ilustradores</Form.Label>
        <div className="mb-3">
            <ModalNuevaPersona type="Ilustrador" setPeople={setAuthors} prevPeople={authors} />{'  '}
            <Button variant="outline-primary">Ilustrador ya existente</Button>
        </div>
        
        <Button variant="primary" type="submit">
            Enviar
        </Button>
    </Form>
    </div>
    );
}