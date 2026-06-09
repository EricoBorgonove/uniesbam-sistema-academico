import { LogOut } from 'lucide-react';

export default function Topbar({ title, user, onLogout }) {
  return (
    <header className="topbar">
      <div>
        <p>{user.role}</p>
        <h1>{title}</h1>
      </div>
      <button className="ghost-button" onClick={onLogout}>
        <LogOut size={18} />
        Sair
      </button>
    </header>
  );
}
