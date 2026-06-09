import Sidebar from './Sidebar.jsx';
import Topbar from './Topbar.jsx';

export default function AppLayout({ navItems, page, title, user, onNavigate, onLogout, children }) {
  return (
    <div className="shell">
      <Sidebar items={navItems} currentPage={page} onNavigate={onNavigate} />
      <main className="content">
        <Topbar title={title} user={user} onLogout={onLogout} />
        {children}
      </main>
    </div>
  );
}
