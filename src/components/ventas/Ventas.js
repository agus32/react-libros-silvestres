import {Button, Col, Row, Form} from 'react-bootstrap';
import React from 'react';


const libros = [
    {
      "titulo": "el aleph 4",
      "isbn": "007",
      "fecha_edicion": "2023-08-04T03:00:00.000Z",
      "precio": 1.01,
      "stock": 2
    },
    {
      "titulo": "corazon de seda",
      "isbn": "12223111",
      "fecha_edicion": "2023-04-15T03:00:00.000Z",
      "precio": 1293,
      "stock": 2
    },
    {
      "titulo": "as de picas",
      "isbn": "123123",
      "fecha_edicion": "2377-02-12T03:00:00.000Z",
      "precio": 123.33,
      "stock": 30
    },
    {
      "titulo": "assdas",
      "isbn": "123123123",
      "fecha_edicion": "2377-02-12T03:00:00.000Z",
      "precio": 123.33,
      "stock": 34
    },
    {
      "titulo": "hamlet",
      "isbn": "1233",
      "fecha_edicion": "2022-03-22T03:00:00.000Z",
      "precio": 100.5,
      "stock": 37
    },
    {
      "titulo": "futbol total 3",
      "isbn": "123312",
      "fecha_edicion": "2002-02-02T03:00:00.000Z",
      "precio": 123.2,
      "stock": 0
    },
    {
      "titulo": "el aleph",
      "isbn": "1233221",
      "fecha_edicion": "2021-04-01T03:00:00.000Z",
      "precio": 2333.12,
      "stock": 17
    },
    {
      "titulo": "futbol total",
      "isbn": "213122",
      "fecha_edicion": "2002-02-02T03:00:00.000Z",
      "precio": 123.2,
      "stock": 2
    },
    {
      "titulo": "futbol total",
      "isbn": "21312221",
      "fecha_edicion": "2002-02-02T03:00:00.000Z",
      "precio": 123.2,
      "stock": 2
    },
    {
      "titulo": "asd",
      "isbn": "22",
      "fecha_edicion": "2023-04-10T03:00:00.000Z",
      "precio": 123,
      "stock": 2
    },
    {
      "titulo": "reeerw",
      "isbn": "234",
      "fecha_edicion": "2023-04-13T03:00:00.000Z",
      "precio": 234,
      "stock": 234
    },
    {
      "titulo": "Breviario",
      "isbn": "9876543212",
      "fecha_edicion": "2023-01-02T03:00:00.000Z",
      "precio": 4500,
      "stock": 0
    },
    {
      "titulo": "Breviario 2 la secuela",
      "isbn": "9876543213",
      "fecha_edicion": "2023-01-02T03:00:00.000Z",
      "precio": 4500,
      "stock": 0
    },
    {
      "titulo": "Breviario 3",
      "isbn": "9876543218",
      "fecha_edicion": "2023-01-02T03:00:00.000Z",
      "precio": 4500,
      "stock": 0
    }
  ];

const ClientArray = [
    {
      "id": 2,
      "nombre": "Agronomia pampa",
      "email": "Agronomia@gmail.com",
      "cuit": "30711245355",
      "tipo": 1,
      "cond_fiscal": "",
      "razon_social": "AGRONOMIA PAMPA S.R.L.",
      "domicilio": "RUTA 11 1522 - SAN JUSTO SANTA FE"
    },
    {
      "id": 3,
      "nombre": "Agricola",
      "email": "Agricola@gmail.com",
      "cuit": "30711242933",
      "tipo": 1,
      "cond_fiscal": "",
      "razon_social": "AGRICOLA CARLOS KEEN SA",
      "domicilio": "ALVEAR MARCELO T. DE 684 Piso:1 Dpto:A - CAPITAL FEDERAL CIUDAD AUTONOMA BUENOS AIRES"
    },
    {
      "id": 6,
      "nombre": "Libreria",
      "email": "libreria3@gmail.com",
      "cuit": "30708889802",
      "tipo": 1,
      "cond_fiscal": "",
      "razon_social": "LIBRERIA COMIENZOS S.R.L.",
      "domicilio": "PROVINCIAS UNIDAS 684 - ROSARIO SUD SANTA FE"
    },
    {
      "id": 7,
      "nombre": "pescaderia",
      "email": "pescaderia@gmail.com",
      "cuit": "30714217557",
      "tipo": 1,
      "cond_fiscal": "",
      "razon_social": "",
      "domicilio": ""
    },
    {
      "id": 8,
      "nombre": "pescaderia 2",
      "email": "pescaderia@gmail.com",
      "cuit": "30715605917",
      "tipo": 1,
      "cond_fiscal": "",
      "razon_social": "",
      "domicilio": ""
    },
    {
      "id": 9,
      "nombre": "Carniceria",
      "email": "carne@gmail.com",
      "cuit": "30715050478",
      "tipo": 1,
      "cond_fiscal": "",
      "razon_social": "",
      "domicilio": ""
    },
    {
      "id": 10,
      "nombre": "Carniceria 2",
      "email": "carne@gmail.com",
      "cuit": "30667180062",
      "tipo": 1,
      "cond_fiscal": "",
      "razon_social": "CARNICERIA ARMENDARIZ SRL",
      "domicilio": "PELLEGRINI 686 - SAN PEDRO BUENOS AIRES"
    }
  ];

  const medio_pago = [
    "efectivo",
    "debito",
    "credito",
    "mercadopago",
    "transferencia"
  ];

const AltaVenta = () =>{
const [librosSeleccionados, setLibrosSeleccionados] = React.useState([]);
const [inputs, setInputs] = React.useState({libro: "", cantidad: ""});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }


const handleSeleccionadoDelete = (isbn) => {
    setLibrosSeleccionados(librosSeleccionados.filter((libro) => libro.libro.isbn !== isbn));
    };

const handleSeleccionadoAdd = (event) => {
    if(inputs.cantidad === "" || inputs.libro === ""){
        alert("Debe completar todos los campos");
        return;
    }else{
      event.preventDefault();
      setLibrosSeleccionados([...librosSeleccionados,{cantidad: inputs.cantidad, libro: libros.find((libro) => inputs.libro === libro.isbn)}]);
      setInputs({libro: "", cantidad: ""});
    }
    
    
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const listaLibros = librosSeleccionados.map((libro) => {
          return {
            isbn: parseInt(libro.libro.isbn),
            cantidad: parseInt(libro.cantidad),
          };
        });        
        const venta =JSON.stringify({
          cliente: parseInt(event.target.cliente.value),
          descuento: parseFloat(event.target.descuento.value),
          medio_pago: parseInt(event.target.medio_pago.value),
          libros: listaLibros
        });
        console.log(venta);
       // PostVenta(venta);
        event.target.reset();
        setLibrosSeleccionados([]);
      }



  return (
    <div className='container mt-3'>
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3 mt-3">
      <Form.Group as={Col} controlId="cliente">
          <Form.Label>Cliente</Form.Label>
          <Form.Select>
            {ClientArray.map((client) => (
                <option key={client.id} value={client.id}>{client.nombre}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} controlId="descuento">
          <Form.Label>Descuento</Form.Label>
          <Form.Control type="number" min="0" max="100" step="0.01" placeholder="0.00" />
        </Form.Group>

        <Form.Group as={Col} controlId="medio_pago">
          <Form.Label>Medio de Pago</Form.Label>
          <Form.Select defaultValue="Choose...">
            {medio_pago.map((medio,index) => (
                <option key={index} value={index}>{medio}</option>
            ))}
          </Form.Select>
        </Form.Group>
      </Row>
      

  <h4>Libros</h4>

      {librosSeleccionados.map((libro) => (
            <div key={libro.libro.isbn}>
                <span className="align-middle">📘{libro.libro.titulo}</span>{' '}
                <span className="align-middle">({libro.cantidad})</span>
                <button type="button" className="btn-close align-middle" aria-label="Close" onClick={() => handleSeleccionadoDelete(libro.libro.isbn)}/>
              </div>
              ))}

    <br/>
    
    <Row className="mb-3 align-items-center">
        <Form.Group as={Col} controlId="libro">
            <Form.Select value={inputs.libro} name="libro" onChange={handleChange}>
                <option value="">Seleccione un libro</option>
                {libros.map((libro) => (
                    <option key={libro.isbn} value={libro.isbn}>{libro.titulo}</option>
                ))}
            </Form.Select>
        </Form.Group>
        
        <Form.Group as={Col} controlId="cantidad">
          <Form.Control type="number" placeholder="Cantidad" name='cantidad'  value={inputs.cantidad||""} onChange={handleChange}/>
        </Form.Group>
        <Col >
        <Button variant="outline-primary" type='submit'onClick={handleSeleccionadoAdd}>
            Agregar
        </Button>
        </Col>
        
    </Row>
  
    <Button variant="primary" type="submit">
        Enviar
    </Button>
    


    </Form>
    </div>
  );
}

export const Ventas = () => {
    return (
        <div className='container mt-3'>
            <h2>Nueva venta</h2>
            <AltaVenta/>
          </div>
    );
}