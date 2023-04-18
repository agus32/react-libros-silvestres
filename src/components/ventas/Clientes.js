import React from "react";
import DataTable from 'react-data-table-component';
import { DeleteCliente, PutCliente, PostCliente} from '../ApiHandler';
import { Modal, Button, Form , InputGroup,Row,Col,Table} from 'react-bootstrap';


export const Clientes = ({clientes,setClientes}) => {
    const [filterText, setFilterText] = React.useState('');
	const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
    const [showModal, setModalShow] = React.useState(false);
    const [clienteEdit, setClienteEdit] = React.useState({});
	
	const filteredItems = clientes.filter(
		item => item.nombre && item.nombre.toLowerCase().includes(filterText.toLowerCase()),
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




    const handleButtonClick = (e, id) => {
        e.preventDefault();
        setClienteEdit(clientes.find((item) => item.id === id));
        setModalShow(true);
    };
    const handleDeleteCliente = async (id) => {
        const response = await DeleteCliente(id);
        if(response.success){
            setClientes (clientes.filter((item) => item.id !== id));
    
        }
    }
   

	return (
    <div className='container mt-1'>
      <AltaClienteForm setClientes={setClientes} clientes={clientes}/>
      <ModalEditarClientes cliente={clienteEdit} clientes={clientes} setClientes={setClientes} setShow={setModalShow} show={showModal}/>
      <DataTable
			title="Clientes"
			columns={columns(handleButtonClick,handleDeleteCliente)}
			data={filteredItems}
			pagination
			paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
			subHeader
			subHeaderComponent={subHeaderComponentMemo}
			persistTableHead
            expandableRows
            expandableRowsComponent={<p>hola</p>}
			
		/>
        
    </div>
		
	);
}



const columns = (handleButtonClick,handleDeleteCliente) => ([
    {
        name: 'ID',
        selector: row => row.id,
        sortable: true,
    },
    {
        name: 'Nombre',
        selector: row => row.nombre,
        sortable: false,
    },
    {
        name: 'Email',
        selector: row => row.email,
        sortable: false,
    },
    {
        name: 'CUIT',
        selector: row => row.cuit,
        sortable: false,
    },
    {
        name: "Accion",
        button: true,
        cell: (row) => (
            <>
            <button
                    className="btn btn-outline btn-xs"
                    onClick={(e) => handleButtonClick(e, row.id)}
                >
                    ✏️
                </button>{' '}
                <button type="button" className="btn-close align-middle" aria-label="Close" 
                    onClick={() => handleDeleteCliente(row.id)}
                />
            </>
  
        )
    } 
]);





const ModalEditarClientes = ({cliente,setClientes,show,setShow,clientes}) => {

    const handleClose = () => setShow(false);
    const id = cliente.id;

    const handleSubmit = async (event) => {
        event.preventDefault();
        const edit =JSON.stringify({
            nombre: event.target.nombre.value,
            email: event.target.email.value,
            cuit: event.target.cuit.value
          });
        handleClose();
        const response = await PutCliente({edit,id});
        if(response.success){
            const aux = clientes.map((item) => {
                if(item.id === cliente.id){
                    item.nombre = event.target.nombre.value;
                    item.email = event.target.email.value;
                    item.cuit = event.target.cuit.value;
                }
                return item;
            });
            console.log(aux);
        } 

    }
     
    return (

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Cliente</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form onSubmit={handleSubmit}>
                <Form.Label>Nombre</Form.Label>
                <Form.Control className="mb-3" name="nombre" defaultValue={cliente.nombre}/>
                <Form.Label>Email</Form.Label>                                      
                <Form.Control className="mb-3" name="email"  defaultValue={cliente.email}/>
                <Form.Label>Cuit</Form.Label>                                     
                <Form.Control className="mb-3"   name="cuit"  defaultValue={cliente.cuit}/>
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


const AltaClienteForm = ({setClientes,clientes}) => {

    const handleSubmit = async(event) => {
        event.preventDefault();
        const cliente =JSON.stringify({
            nombre: event.target.nombre.value,
            email: event.target.email.value,
            cuit: event.target.cuit.value,
            tipo:1
            });

        const response = await PostCliente(cliente);
        if(response.success){
            setClientes([...clientes,response.data]);
        }
    }

    return (
        <div className="container mt-5">
        <h4>Nuevo Cliente</h4>
        <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Col sm>
                    
                    <Form.Control className="mb-3" name="nombre" placeholder="Nombre"/>
                </Col>
                <Col sm>
                    
                    <Form.Control className="mb-3" name="email" placeholder="Email"/>
                </Col>
                <Col sm>
                    
                    <Form.Control className="mb-3" name="cuit" placeholder="CUIT"/>
                </Col>
                <Col sm>
                <Button variant="primary" type='submit'>Enviar</Button>
                </Col>
            </Row>
        </Form>
        </div>
    );
}
        

const ExpandedComponent = ({ data }) => {
    //fetch data.id ventas

    //listar ventas

    const response=[{},{},{}]
    return (
        <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
    );
}








const FilterComponent = ({ filterText, onFilter, onClear }) => (
    
    <InputGroup>
        <Form.Control 
            id="search"
            type="text"
            placeholder="Buscar por nombre..."
            value={filterText}
            onChange={onFilter} />
        <Button variant="outline-secondary" onClick={onClear}>x</Button>
    </InputGroup>
    

);