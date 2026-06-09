import { useState } from 'react';
import { LockKeyhole, LogIn } from 'lucide-react';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('admin@uniesbam.edu.br');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      await onLogin({ email, password });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-page">
      <section className="login-panel">
        <div className="login-brand">
          <div className="brand-mark large">U</div>
          <div>
            <p>Sistema Academico</p>
            <h1>UNIESBAM</h1>
          </div>
        </div>
        <form onSubmit={submit} className="form">
          <label>
            Email
            <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required />
          </label>
          <label>
            Senha
            <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" required />
          </label>
          {error && <div className="alert">{error}</div>}
          <button className="primary-button" disabled={loading}>
            {loading ? <LockKeyhole size={18} /> : <LogIn size={18} />}
            Entrar
          </button>
        </form>
      </section>
    </main>
  );
}
