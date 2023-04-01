import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


export const AddBook = () => {
  // Estados del formulario
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [authors, setAuthors] = useState([]);
  const [authorOptions, setAuthorOptions] = useState([
    { id: 'author1', name: 'Author 1' },
    { id: 'author2', name: 'Author 2' },
    { id: 'author3', name: 'Author 3' },
  ]);
  const [newAuthor, setNewAuthor] = useState('');
  const [showNewAuthorForm, setShowNewAuthorForm] = useState(false);
  const [showExistingAuthorForm, setShowExistingAuthorForm] = useState(false);

  // Función para manejar el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Title: ${title}`);
    console.log(`Description: ${description}`);
    console.log(`Authors: ${JSON.stringify(authors)}`);
    console.log(`New author: ${newAuthor}`);
  };

  // Función para manejar la adición de un autor existente
  const handleAuthorChange = (event) => {
    const authorId = event.target.value;
    const selectedAuthor = authorOptions.find((author) => author.id === authorId);
    if (!selectedAuthor) return;
    if (authors.includes(selectedAuthor)) return;
    setAuthors((prevState) => [...prevState, selectedAuthor]);
  };

  // Función para manejar la adición de un nuevo autor
  const handleNewAuthor = (event) => {
    event.preventDefault();
    if (!newAuthor) return;
    const newAuthorObj = { id: `author-${Date.now()}`, name: newAuthor };
    if (authors.includes(newAuthorObj)) return;
    setAuthors((prevState) => [...prevState, newAuthorObj]);
    setNewAuthor('');
  };

  // Renderizamos el formulario
  return (
    
    <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Title:</Form.Label>
          <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description:</Form.Label>
          <Form.Control as="textarea" value={description} onChange={(e) => setDescription(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="authors">
          <Form.Label>Authors:</Form.Label>
          <Form.Control as="ul">
            {authors.map((author) => (
              <li key={author.id}>{author.name}</li>
            ))}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" onClick={() => setShowNewAuthorForm(true)}>
          Add New Author
        </Button>
        <Button variant="primary" onClick={() => setShowExistingAuthorForm(true)}>
          Add Existing Author
        </Button>
        <Modal show={showExistingAuthorForm} onHide={() => setShowExistingAuthorForm(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Choose an author</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="author">
              <Form.Label>Select an author:</Form.Label>
              <Form.Control as="select" onChange={handleAuthorChange}>
                  <option value="">Select an author</option>
                  {authorOptions.map((author) => (
                    <option key={author.id} value={author.id}>
                      {author.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowExistingAuthorForm(false)}>
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={showNewAuthorForm} onHide={() => setShowNewAuthorForm(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Add new author</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group controlId="newAuthor">
                <Form.Label>Author name:</Form.Label>
                <Row>
                  <Col xs={8}>
                    <Form.Control type="text" value={newAuthor} onChange={(e) => setNewAuthor(e.target.value)} />
                  </Col>
                  <Col>
                    <Button variant="primary" type="submit" onClick={handleNewAuthor}>
                      Add
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowNewAuthorForm(false)}>
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        
        <Button type="submit">Submit</Button>
    </Form>
    
  );
};

