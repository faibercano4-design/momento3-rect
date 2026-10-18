import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Inicio from './pages/Inicio';
import Catalogo from './pages/Catalogo';
import Favoritos from './pages/Favoritos';
import Login from './pages/Login';
import Registro from './pages/Registro';
import RutaProtegida from './components/RutaProtegida';
import { FavoritesProvider } from './context/FavoritesContext';
import { AuthProvider, useAuth } from './context/AuthContext';
function Rutas(){const {autenticado}=useAuth();return <Routes><Route path="/login" element={autenticado?<Navigate to="/" replace/>:<Login/>}/><Route path="/registro" element={autenticado?<Navigate to="/" replace/>:<Registro/>}/><Route element={<RutaProtegida/>}><Route path="/" element={<Layout/>}><Route index element={<Inicio/>}/><Route path="catalogo" element={<Catalogo/>}/><Route path="favoritos" element={<Favoritos/>}/></Route></Route><Route path="*" element={<Navigate to={autenticado?'/':'/login'} replace/>}/></Routes>}
export default function App(){return <AuthProvider><FavoritesProvider><BrowserRouter><Rutas/></BrowserRouter></FavoritesProvider></AuthProvider>}
