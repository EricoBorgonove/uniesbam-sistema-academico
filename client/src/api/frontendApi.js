// CONEXAO FRONTEND -> BACKEND
// Este arquivo centraliza todas as chamadas HTTP que o React faz para a API Express.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3333/api';

export function getToken() {
  return localStorage.getItem('uniesbam_token');
}

export function setSession({ token, user }) {
  localStorage.setItem('uniesbam_token', token);
  localStorage.setItem('uniesbam_user', JSON.stringify(user));
}

export function getUser() {
  const data = localStorage.getItem('uniesbam_user');
  return data ? JSON.parse(data) : null;
}

export function clearSession() {
  localStorage.removeItem('uniesbam_token');
  localStorage.removeItem('uniesbam_user');
}

export async function api(path, options = {}) {
  const token = getToken();
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers
    }
  });

  if (response.status === 204) return null;

  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(body.message || 'Erro ao comunicar com a API.');
  }
  return body;
}
