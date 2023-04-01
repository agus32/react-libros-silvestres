import React from "react";

const API_PORT = 3002;


export const GetPeople = async (type) => {
    // type =  'autor' || 'ilustrador' ?tipo=${type}
    
    const URL = `http://localhost:${API_PORT}/persona?tipo=${type}`;
    try{
        const response = await fetch(URL);
        const data = await response.json();
        return data;
    }catch(error){
        console.log(error);
    }
}

export const PostPeople = async (inputs) => {
    const URL = `http://localhost:${API_PORT}/persona`;
    try{
        const response = await fetch(URL, {
            method: "POST",
            body: JSON.stringify(inputs),
            headers: {"Content-type": "application/json; charset=UTF-8"}
            });
        const data = await response.json();
        return data;
    }catch(error){
        console.log(error);
    }
}


export const PostPerson = async (inputs) => {
    try{
        const response = await fetch(`http://localhost:${API_PORT}/persona`, {
            method: "POST",
            body: JSON.stringify(inputs),
            headers: {"Content-type": "application/json; charset=UTF-8"}
            });
        const data = await response.json();
        
        !response.ok ? alert(data.error) : alert("Persona creada con exito");
        return data;
    }catch(error){
        console.log(error);
    }
}




export const DeletePerson = async (id) => { 
    const URL = `http://localhost:${API_PORT}/persona/${id}`;
    try{
        const response = await fetch(URL, {
            method: "DELETE",
            headers: {"Content-type": "application/json; charset=UTF-8"}
            });
        const data = await response.json();
        return data;
    }catch(error){
        console.log(error);
    }
}




