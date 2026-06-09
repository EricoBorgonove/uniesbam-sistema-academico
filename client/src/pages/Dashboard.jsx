import { useEffect, useState } from 'react';
import { BookOpen, ClipboardList, GraduationCap, School } from 'lucide-react';
import { api } from '../api/frontendApi.js';
import Panel from '../components/ui/Panel.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import ClassAverageList from '../features/dashboard/ClassAverageList.jsx';
import StatCard from '../features/dashboard/StatCard.jsx';

const cards = [
  { key: 'students', label: 'Alunos', icon: GraduationCap },
  { key: 'teachers', label: 'Professores', icon: School },
  { key: 'classes', label: 'Turmas ativas', icon: BookOpen },
  { key: 'enrollments', label: 'Matriculas', icon: ClipboardList }
];

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api('/dashboard').then(setData).catch(() => {});
  }, []);

  if (!data) return <div className="loading">Carregando painel...</div>;

  return (
    <section className="stack">
      <div className="stats-grid">
        {cards.map((card) => {
          return (
            <StatCard key={card.key} icon={card.icon} label={card.label} value={data.totals[card.key]} />
          );
        })}
      </div>

      <Panel>
        <SectionHeading title="Medias por turma" />
        <ClassAverageList items={data.classAverages} />
      </Panel>
    </section>
  );
}
