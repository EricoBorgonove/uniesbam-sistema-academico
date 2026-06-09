export default function StatCard({ icon: IconComponent, label, value }) {
  return (
    <article className="stat-card">
      <IconComponent size={22} />
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}
