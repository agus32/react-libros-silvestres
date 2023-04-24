import { NavBar } from './components/NavBar';
import './App.css';
import { GetPersonas, GetPeople, GetLibros, GetClientes} from './components/ApiHandler';
import { useEffect,React,useState } from 'react';
import { DataPersonTable } from './components/personas/DataTable';
import { Route, Routes } from 'react-router-dom';
import { NuevoLibro } from './components/libros/NuevoLibro';
import { ListaLibros } from './components/libros/ListaLibros';
import { Clientes } from './components/ventas/Clientes';
import { Ventas } from './components/ventas/Ventas';


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
  const ListarLibros = () => {
    const [personas,setPersonas] = useState([]);

    const fetchPersonas = async () => {
      const data = await GetPersonas();
      setPersonas(data);
      console.log(data);
    }

    const [libros,setLibros] = useState([]);
    const fetchLibros = async () => {
      const data = await GetLibros();
      setLibros(data);
      console.log(data);
    }
    useEffect(() => {fetchLibros();fetchPersonas();},[]);
    return(
      <ListaLibros libros={libros} people={personas}/>
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

  const ShowClientes = () => {
    const [clientes,setClientes] = useState([]);

    const fetchClientes = async () => {
      const data = await GetClientes();
      setClientes(data);
      console.log(data);
    }
    useEffect(() => {fetchClientes()},[]);
    return(
      <Clientes clientes={clientes} setClientes={setClientes}/>
    );
  }

  const ShowVentas = () => {
   
    return(
      <Ventas/>
    );
  }




  return (
    <div className='App'>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/lista-libros" element={<ListarLibros/>}/>
        <Route path="/nuevo-libro" element={<CrearLibro/>}/>
        <Route path="/ventas" element={<ShowVentas/>}/>
        <Route path="/clientes" element={<ShowClientes/>}/>
        <Route path="/autores" element={<Autores/>}/>
        <Route path="/ilustradores" element={<Ilustradores/>}/>
      </Routes>
    </div>
  );
}

export default App;


