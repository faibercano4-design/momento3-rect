import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
export default function Login() {
  const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [error, setError] = useState('');
  const { login } = useAuth(); const navigate = useNavigate();
  async function enviar(e) { e.preventDefault(); setError(''); try { await login(email, password); navigate('/'); } catch (err) { setError(err.response?.data?.mensaje || 'No se pudo iniciar sesión. Verifica tus datos y el servidor.'); } }
  return <section className="auth-page"><form className="auth-card" onSubmit={enviar}><h1>Iniciar sesión</h1><p>Ingresa para acceder al catálogo deportivo.</p><label>Correo electrónico<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required /></label><label>Contraseña<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required minLength="6" /></label>{error && <p role="alert">{error}</p>}<button type="submit">Entrar</button><p>¿No tienes cuenta? <Link to="/registro">Regístrate</Link></p></form></section>;
}
