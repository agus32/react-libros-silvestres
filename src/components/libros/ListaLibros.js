import DataTable from 'react-data-table-component';
import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import { PutLibro } from '../ApiHandler';
import Modal from 'react-bootstrap/Modal';







export const ListaLibros = ({libros}) => {
    const [filterText, setFilterText] = React.useState('');
	const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
    const [showModal, setModalShow] = React.useState(false);
    const [libroEdit, setLibroEdit] = React.useState({});
	
	const filteredItems = libros.filter(
		item => item.titulo && item.titulo.toLowerCase().includes(filterText.toLowerCase()),
	);
    
    

	const subHeaderComponentMemo = React.useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setResetPaginationToggle(!resetPaginationToggle);
				setFilterText('');
			}
		};

		return (
			<FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
		);
	}, [filterText, resetPaginationToggle]);




    const handleButtonClick = (e, isbn) => {
        e.preventDefault();
        console.log("Row Id", isbn);
        setLibroEdit(libros.find(libro => libro.isbn === isbn));
        setModalShow(true);
        

    };

	return (
    <div className='container mt-3'>
      <ModalEditLibro show={showModal} setShow={setModalShow} libro={libroEdit}/>
      <DataTable
			title="Libros"
			columns={columns(handleButtonClick)}
			data={filteredItems}
			pagination
			paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
			subHeader
			subHeaderComponent={subHeaderComponentMemo}
			persistTableHead
            expandableRows
            expandableRowsComponent={ListaExpandible}
			
		/>
        <ListaExpandible/>
    </div>
		
	);
}

const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

const ListaExpandible = () =>{
    return(
    <div className='container ml-3 mr-3'>
      <Row>
        <Col>
            <h4>Autores</h4>
            <ListGroup>
                <ListGroup.Item>Cras justo odio</ListGroup.Item>
                <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                <ListGroup.Item>Morbi leo risus</ListGroup.Item>
            </ListGroup>
        </Col>
        <Col>
            <h4>Ilustradores</h4>
            <ListGroup>
                <ListGroup.Item>Cras justo odio</ListGroup.Item>
                <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                <ListGroup.Item>Morbi leo risus</ListGroup.Item>
            </ListGroup>
        </Col>
      </Row>
    </div>
    );
}

const FilterComponent = ({ filterText, onFilter, onClear }) => (
    
    <InputGroup>
        <Form.Control 
            id="search"
            type="text"
            placeholder="Buscar por titulo..."
            value={filterText}
            onChange={onFilter} />
        <Button variant="outline-secondary" onClick={onClear}>x</Button>
    </InputGroup>
    

);

const columns = (handleButtonClick) => ([
    {
        name: 'Titulo',
        selector: row => row.titulo,
        sortable: false,
    },
    {
        name: 'ISBN',
        selector: row => row.isbn,
        sortable: false,
    },
    {
        name: 'Precio',
        selector: row => row.precio,
        sortable: true,
    },
    {
        name: 'Stock',
        selector: row => row.stock,
        sortable: true,
    },
    {
        name: 'Fecha de edición',
        selector: row => formatDate(row.fecha_edicion),
        sortable: false,
    },
    {
        name: "Editar",
        button: true,
        cell: (row) => (
            <button
                className="btn btn-outline btn-xs"
                onClick={(e) => handleButtonClick(e, row.isbn)}
            >
                ✏️
            </button>
        )

    }
    
    
]);





function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
  
    return `${day}/${month}/${year}`;
  }


const ModalEditLibro = ({libro,show,setShow}) => {
    const isbn = libro.isbn;
    const handleClose = () => setShow(false);
    const [fechaDefault, setFechaDefault] = React.useState("");


    const handleSubmit = async (event) => {
        event.preventDefault();
        const edit =JSON.stringify({
            titulo: event.target.titulo.value,
            fecha_edicion: event.target["fecha-edicion"].value,
            precio: parseFloat(event.target.precio.value),
            stock: parseInt(event.target.stock.value)
          });
        handleClose();
        PutLibro({edit,isbn});


    }
    
    if(libro.fecha_edicion !== undefined && libro.fecha_edicion.substring(0, 10) !== fechaDefault) setFechaDefault(libro.fecha_edicion.substring(0, 10))
    
    
    return (

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Libro</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form onSubmit={handleSubmit}>
                <Form.Label>Titulo</Form.Label>
                <Form.Control className="mb-3" name="titulo" defaultValue={libro.titulo}/>
                <Form.Label>Precio</Form.Label>                                      
                <Form.Control className="mb-3" name="precio" type="number" step="0.01" defaultValue={libro.precio}/>
                <Form.Label>Stock</Form.Label>                                     
                <Form.Control className="mb-3" type="number"  name="stock"  defaultValue={libro.stock}/>
                <Form.Label>Fecha Edicion</Form.Label>                                     
                <Form.Control className="mb-3" type="date"  name="fecha-edicion"  defaultValue={fechaDefault}/>
                <Button variant="primary" type='submit'>
                Enviar
                </Button>{' '}
                <Button variant="secondary" onClick={handleClose}>
                Cancelar
                </Button>            
            </Form>
          </Modal.Body>
        </Modal>
    );
}