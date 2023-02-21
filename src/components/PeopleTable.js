import React from "react";
import { People } from './People';
import Table from 'react-bootstrap/Table';

export const PeopleTable = ({people}) => {
    return (
      <div className="container mt-2">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
          {people.map((person) => (
            <People key={person.id} person={person}/>
            ))} 
          </tbody>
        </Table>
      </div>
      );
}

