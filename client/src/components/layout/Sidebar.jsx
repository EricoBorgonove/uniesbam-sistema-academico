export default function Sidebar({ items, currentPage, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">U</div>
        <div>
          <strong>UNIESBAM</strong>
          <span>Gestao Academica</span>
        </div>
      </div>
      <nav>
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <button
              className={currentPage === item.key ? 'nav-item active' : 'nav-item'}
              key={item.key}
              onClick={() => onNavigate(item.key)}
              title={item.label}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
