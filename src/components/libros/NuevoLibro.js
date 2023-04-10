
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import { useState,useEffect,React } from "react";
import { PostLibro } from '../ApiHandler';


const ModalNuevaPersona = ({type,setPerson,person}) => {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = name === "dni" ? parseInt(event.target.value) : event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setPerson([...person,inputs]);
        handleClose();
        setInputs({});
    }
  
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
          <Form onSubmit={handleSubmit}>
                <Form.Label>Nombre</Form.Label>
                <Form.Control className="mb-3" name="nombre" placeholder="Nombre" value={inputs.nombre || ""} onChange={handleChange}/>
                <Form.Label>Email</Form.Label>                                      
                <Form.Control className="mb-3" name="email" placeholder="Email" value={inputs.email || ""} onChange={handleChange}/>
                <Form.Label>DNI</Form.Label>                                     
                <Form.Control className="mb-3" type="number" max="99999999" name="dni" placeholder="DNI" value={inputs.dni || 0} onChange={handleChange}/>                     
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Enviar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}


function ModalPersonaExistente({ options, onSave,type }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  
  const [selectedOption, setSelectedOption] = useState(-1);

  const handleOpenClick = () => {
    setSelectedOption(options[0].id);
    handleShow();
  };

  const handleSaveClick = () => {
    if(selectedOption !== -1) {
    const option = options.find(option => option.id == selectedOption);
    onSave(option);
    }
    handleClose();
    
  };

  return (
    <>
    <Button variant="outline-primary" onClick={handleOpenClick}>
      {type} ya existente
    </Button>
    <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{type} ya existente</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <select value={selectedOption} onChange={e => setSelectedOption(e.target.value)}>
              {options.map(option => (
                <option key={option.id} value={option.id}>{option.nombre}</option>
              ))}
            </select>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleSaveClick}>
              Enviar
            </Button>
          </Modal.Footer>
        </Modal>
    </>
  );
}



export const NuevoLibro = ({personas}) => {

    const [autores, setAutores] = useState([]);

    useEffect(() => {   
        }, [autores]);

    const [ilustradores, setIlustradores] = useState([]);

    

    useEffect(() => {
    }, [ilustradores]);

    const handleAutorDelete = ({dni}) => {
        setAutores(autores.filter(autor => autor.dni !== dni));
    }

    const handleIlustradorDelete = ({dni}) => {
        setIlustradores(ilustradores.filter(ilustrador => ilustrador.dni !== dni));
    }


    const [selectedAuthors, setSelectedAuthors] = useState([]);
    const [selectedIlustrators, setSelectedIlustrators] = useState([]);

    const handleSaveAuthor = (author) => {
      if (selectedAuthors.some(autor => autor.id === author.id)) {
        alert("El autor ya fue seleccionado");
        return;
      } else {
        setSelectedAuthors([...selectedAuthors, author]);
      }
    };

    const handleSaveIlustrator = (ilustrator) => {
      if (selectedIlustrators.some(ilustrador => ilustrador.id === ilustrator.id)) {
        alert("El ilustrador ya fue seleccionado");
        
        return;
      } else {
        setSelectedIlustrators([...selectedIlustrators, ilustrator]);
        
      }
    };

    const handleExistentesDelete = ({id,type}) => {
      if (type === "autor") {
        setSelectedAuthors(selectedAuthors.filter(autor => autor.id != id));
      }else{
        setSelectedIlustrators(selectedIlustrators.filter(ilustrador => ilustrador.id != id));
      }
      
    }

    const handleSubmit = async (event) => {
      event.preventDefault();
      const listaAutores = autores.concat(selectedAuthors.map(item => ({id: item.id})));
      const listaIlustradores = ilustradores.concat(selectedIlustrators.map(item => ({id: item.id})));
      const libro =JSON.stringify({
        titulo: event.target.titulo.value,
        isbn: event.target.isbn.value,
        fecha_edicion: event.target["fecha-edicion"].value,
        precio: parseFloat(event.target.precio.value),
        stock: parseInt(event.target.stock.value),
        autores: listaAutores,
        ilustradores: listaIlustradores,
      });
      PostLibro(libro);
      
    }
  



    return (
    <div className="container mt-5">
    <Form onSubmit={handleSubmit}>

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
            <Form.Control placeholder="0.00" type="number" step="0.01" />
            </Form.Group>

            <Form.Group as={Col} controlId="stock">
            <Form.Label>Stock Inicial</Form.Label>
            <Form.Control type="number" placeholder="0" />
            </Form.Group>
        </Row>

        <Form.Label>Autores</Form.Label>
        <div className="mb-3">
            {autores.map((autor) => (
                <div>
                    <span className="align-middle"key={autor.dni}>{autor.nombre}</span> 
                    <button type="button" className="btn-close align-middle" aria-label="Close" onClick={() => handleAutorDelete({dni: autor.dni})}/>
                </div>
            ))}
            {selectedAuthors.map((autor) => (
              <div>
                <span className="align-middle"key={autor.id}>{autor.nombre}</span>
                <button type="button" className="btn-close align-middle" aria-label="Close" onClick={() => handleExistentesDelete({id: autor.id, type: "autor"})}/>
              </div>
            ))}
            <ModalNuevaPersona type="Autor" setPerson={setAutores} person={autores} />{'  '}
            <ModalPersonaExistente type="Autor" options={personas} onSave={handleSaveAuthor}/>
        </div>

        <Form.Label>Ilustradores</Form.Label>
        <div className="mb-3">
            {ilustradores.map((ilustrador) => (
                <div>
                    <span className="align-middle"key={ilustrador.dni}>{ilustrador.nombre}</span>
                    <button type="button" className="btn-close align-middle" aria-label="Close" onClick={() => handleIlustradorDelete({dni: ilustrador.dni})}/>
                </div>
            ))}
            {selectedIlustrators.map((ilustrador) => (
              <div>
                <span className="align-middle"key={ilustrador.id}>{ilustrador.nombre}</span>
                <button type="button" className="btn-close align-middle" aria-label="Close" onClick={() => handleExistentesDelete({id: ilustrador.id, type: "ilustrador"})}/>
              </div>
            ))}
            
            <ModalNuevaPersona type="Ilustrador" setPerson={setIlustradores} person={ilustradores} />{'  '}
            <ModalPersonaExistente type="Ilustrador" options={personas} onSave={handleSaveIlustrator}/>
        </div>
        
        <Button variant="primary" type="submit">
            Enviar
        </Button>
    </Form>
    </div>
    );
}