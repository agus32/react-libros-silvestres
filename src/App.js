import { NavBar } from './components/NavBar';
import './App.css';
import { GetPersonas, GetPeople } from './components/ApiHandler';
import { useEffect,React,useState } from 'react';
import { DataPersonTable } from './components/personas/DataTable';
import { Route, Routes } from 'react-router-dom';
import { NuevoLibro } from './components/libros/NuevoLibro';
import { AddBook }  from './components/libros/AddBook';

function App() {

  const Home = () => (
    <div className='bdy'>
      <span className='title'>Libros Silvestres</span>
    </div>);

  const Autores = () => {

    const [authors,setAuthors] = useState([]);
    const fetchAuthors = async () => {
        const data = await GetPeople('autor');
        setAuthors(data);
        console.log(data);
      }

    useEffect(() => {
      fetchAuthors();
    }, []);

    return(
    <div> 
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
      <DataPersonTable data={illustrators} setPeople={setIllustrators} type={"Ilustradores"}/>
    </div>
    );
  }

  const CrearLibro = () => {
    const [personas,setPersonas] = useState([]);

    const fetchPersonas = async () => {
      const data = await GetPersonas();
      setPersonas(data);
      console.log(data);
    }
    useEffect(() => {fetchPersonas()},[]);

    return(
      <NuevoLibro personas={personas}/>
    );
  }



  return (
    <div className='App'>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/lista-libros" element={<AddBook/>}/>
        <Route path="/nuevo-libro" element={<CrearLibro/>}/>
        <Route path="/ventas" element={<h1>a</h1>}/>
        <Route path="/autores" element={<Autores/>}/>
        <Route path="/ilustradores" element={<Ilustradores/>}/>
      </Routes>
    </div>
  );
}

export default App;


