import { createContext, useContext, useMemo, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext({ user: null, token: null, autenticado: false, logout: () => {}, login: async () => {}, register: async () => {} });
export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('user')); } catch { return null; }
  });
  async function login(email, password) {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', data.token); localStorage.setItem('user', JSON.stringify(data.user));
    setToken(data.token); setUser(data.user);
  }
  async function register(name, email, password) {
    const { data } = await api.post('/auth/register', { name, email, password });
    localStorage.setItem('token', data.token); localStorage.setItem('user', JSON.stringify(data.user));
    setToken(data.token); setUser(data.user);
  }
  function logout() { localStorage.removeItem('token'); localStorage.removeItem('user'); setToken(null); setUser(null); }
  const value = useMemo(() => ({ token, user, login, register, logout, autenticado: Boolean(token) }), [token, user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function useAuth() { return useContext(AuthContext); }
