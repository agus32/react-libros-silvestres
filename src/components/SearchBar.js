import{react, useState} from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

export const SearchBar = ({search}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        search(searchTerm);
    }
    return (
        <div className='container col-xs-2 mt-3'>
            <h3>Busqueda</h3>
            <Col sm={3} className="my-1">
            <Form onSubmit={handleSubmit}>
                <Form.Control className="" type="text" placeholder="Buscar.." value={searchTerm} onChange={handleChange}/>
            </Form>
            </Col>
        </div>
    );
}

