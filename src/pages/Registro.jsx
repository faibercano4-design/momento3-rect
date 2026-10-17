import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
export default function Registro() {
 const [name,setName]=useState(''); const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [error,setError]=useState(''); const {register}=useAuth(); const navigate=useNavigate();
 async function enviar(e){e.preventDefault();setError('');try{await register(name,email,password);navigate('/');}catch(err){setError(err.response?.data?.mensaje||'No se pudo crear la cuenta.');}}
 return <section className="auth-page"><form className="auth-card" onSubmit={enviar}><h1>Crear cuenta</h1><label>Nombre<input value={name} onChange={e=>setName(e.target.value)} required /></label><label>Correo<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required /></label><label>Contraseña<input type="password" value={password} onChange={e=>setPassword(e.target.value)} minLength="6" required /></label>{error&&<p role="alert">{error}</p>}<button type="submit">Registrarme</button><p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p></form></section>;
}
