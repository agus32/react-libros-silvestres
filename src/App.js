import { NavBar } from './components/NavBar';
import './App.css';
import { DeletePerson, GetPeople } from './components/ApiHandler';
import { useEffect,React,useState } from 'react';
import { PeopleForm } from './components/personas/PeopleForm';
import { DataPersonTable } from './components/personas/DataTable';
import { Route, Routes } from 'react-router-dom';
import { NuevoLibro } from './components/libros/NuevoLibro';
import { AddBook }  from './components/libros/AddBook';

function App() {

  const [authors,setAuthors] = useState([]);
  const Home = () => (
    <div className='bdy'>
      <span className='title'>Libros Silvestres</span>
    </div>);
  const Autores = () => {
     

    const fetchAuthors = async () => {
      const data = await GetPeople('autor');
      setAuthors(data);
      console.log(data);
    }

    useEffect(() => {fetchAuthors()},[]);

    return(
    <div> 
      <PeopleForm type={"autor"} setPeople={setAuthors} prevPeople={authors}/>
      <DataPersonTable data={authors} setPeople={setAuthors} type={"Autores"}/>
    </div>
    );
  }

  const Ilustradores = () => {
    const [illustrators,setIllustrators] = useState([]);

    const fetchIllustrators = async () => {
      const data = await GetPeople('ilustrador');
      setIllustrators(data);
      console.log(data);
    }

    useEffect(() => {fetchIllustrators()},[]);

    return(
    <div> 
      <PeopleForm type={"ilustrador"} setPeople={setIllustrators} prevPeople={illustrators}/>
      <DataPersonTable data={illustrators} setPeople={setIllustrators} type={"Ilustradores"}/>
    </div>
    );
  }


  return (
    <div className='App'>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/lista-libros" element={<AddBook/>}/>
        <Route path="/nuevo-libro" element={<NuevoLibro setPeople={setAuthors} prevPeople={authors} />}/>
        <Route path="/ventas" element={<h1>a</h1>}/>
        <Route path="/autores" element={<Autores/>}/>
        <Route path="/ilustradores" element={<Ilustradores/>}/>
      </Routes>
    </div>
  );
}

export default App;


