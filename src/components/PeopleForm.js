import React from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { PostPerson } from "./ApiHandler";


export const PeopleForm = ({type,setPeople,prevPeople}) => {
    const typeNumber = type === "autor" ? 0 : 1;

    const [inputs, setInputs] = useState({"tipo": typeNumber});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = await PostPerson(inputs);
        console.log(data);
        if (data.success) setPeople([...prevPeople,data.data]);
    }
    
    return (
        <div className="container mt-5">
            <h3>Nuevo {type}</h3>
            <Form onSubmit={handleSubmit}>
                <Row className="align-items-center">
                    <Col sm={3} className="my-1">
                        <Form.Control name="nombre" placeholder="Nombre" value={inputs.nombre || ""} onChange={handleChange}/>
                    </Col>
                    <Col sm={3} className="my-1">
                        <Form.Control name="email" placeholder="Email" value={inputs.email || ""} onChange={handleChange}/> 
                    </Col>
                    <Col sm={3} className="my-1">
                        <Form.Control type="number" max="99999999" name="dni" placeholder="DNI" value={inputs.dni || ""} onChange={handleChange}/> 
                    </Col>
                    <Col xs="auto" className="my-1">
                        <Button type="submit">Enviar</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}
