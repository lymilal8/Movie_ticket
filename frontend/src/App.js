import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Main from './components/Main';
import Addemployee from './components/Addemployee';
import Footer from './components/Footer';
import Addmovie from './components/Addmovie';
import ViewallMovies from './components/ViewallMovies';
import Register from './components/Register';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/"  element={<Login/>}/>
      <Route path="/register"  element={<Register/>}/>
      <Route path="/addmovie" element={<Main child={<Addmovie method="post" data={{movie_name:"",img_url:'',category:"",languages:"",cast:"",description:"",ticket_rate:"",no_seats:""}}/>}/>}/>
      {/* <Route path="/addemployee" element={<Main child={<Addemployee method="post" data={{name:"",address:'',phone:"",email:"",post:"",salary:""}}/>}/>}/> */}
      {/* <Route path="/viewemployee" element={<Main child={<ViewallEmployee/>}/>}/> */}
      <Route path="/movies" element={<Main child={<ViewallMovies/>}/>}/>
      <Route path="/footer"  element={<Footer/>}/>
      
    </Routes>
    </BrowserRouter>
  );
}

export default App;
