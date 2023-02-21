import { NavBar } from './components/NavBar';
import './App.css';
import { DeletePerson, GetPeople } from './components/ApiHandler';
import { useEffect,React,useState } from 'react';
import { PeopleTable } from './components/PeopleTable';
import { PeopleForm } from './components/PeopleForm';
import { SearchBar } from './components/SearchBar';
import { DataPersonTable } from './components/DataTable';
import { Route, Routes } from 'react-router-dom';

function App() {

  const Home = () => (<h1>Bienvenido</h1>);
  const Autores = () => {
    const [authors,setAuthors] = useState([]); 

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
        <Route path="/libros" element={<h1>a</h1>}/>
        <Route path="/ventas" element={<h1>a</h1>}/>
        <Route path="/autores" element={<Autores/>}/>
        <Route path="/ilustradores" element={<Ilustradores/>}/>
      </Routes>
    </div>
  );
}

export default App;


