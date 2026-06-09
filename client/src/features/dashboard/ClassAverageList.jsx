export default function ClassAverageList({ items }) {
  return (
    <div className="average-list">
      {items.map((item) => (
        <div className="average-row" key={item.name}>
          <span>{item.name}</span>
          <meter min="0" max="10" value={item.average} />
          <strong>{Number(item.average).toFixed(2)}</strong>
        </div>
      ))}
      {!items.length && <p className="empty">Nenhuma turma cadastrada.</p>}
    </div>
  );
}
