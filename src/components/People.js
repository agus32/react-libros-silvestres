import React from "react";
import { DeletePerson } from "./ApiHandler";
import Button from 'react-bootstrap/Button';

export const People = ({person}) => {

    return (
        <tr>
              <td>{person.id}</td>
              <td>{person.nombre}</td>
              <td>{person.email}</td>
              <td><Button variant="outline-danger">❌</Button></td>
        </tr>
    );
}