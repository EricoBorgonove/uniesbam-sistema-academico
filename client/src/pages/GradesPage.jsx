import { useEffect, useMemo, useState } from 'react';
import { Plus, Save, Trash2 } from 'lucide-react';
import { api } from '../api/frontendApi.js';
import Panel from '../components/ui/Panel.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';

export default function GradesPage({ lookups, onChanged }) {
  const [grades, setGrades] = useState([]);
  const [form, setForm] = useState({ enrollment_id: '', label: 'Nota 1', value: 0, weight: 1 });
  const [error, setError] = useState('');

  const enrollments = useMemo(() => lookups.enrollments || [], [lookups.enrollments]);
  const selectedEnrollment = useMemo(
    () => enrollments.find((item) => item.id === form.enrollment_id),
    [enrollments, form.enrollment_id]
  );

  async function load() {
    setGrades(await api('/grades'));
  }

  useEffect(() => {
    load().catch((err) => setError(err.message));
  }, []);

  async function submit(event) {
    event.preventDefault();
    setError('');
    try {
      await api('/grades', { method: 'POST', body: JSON.stringify(form) });
      setForm((current) => ({ ...current, label: 'Nota 1', value: 0, weight: 1 }));
      await load();
      await onChanged?.();
    } catch (err) {
      setError(err.message);
    }
  }

  async function remove(id) {
    await api(`/grades/${id}`, { method: 'DELETE' });
    await load();
    await onChanged?.();
  }

  return (
    <section className="workspace-grid">
      <Panel>
        <SectionHeading title="Lancar nota" />
        <form className="form compact" onSubmit={submit}>
          <label>
            Aluno e turma
            <select
              value={form.enrollment_id}
              onChange={(event) => setForm((current) => ({ ...current, enrollment_id: event.target.value }))}
              required
            >
              <option value="">Selecione</option>
              {enrollments.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.student_name} - {item.class_name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Avaliacao
            <input
              value={form.label}
              onChange={(event) => setForm((current) => ({ ...current, label: event.target.value }))}
              required
            />
          </label>
          <label>
            Nota
            <input
              type="number"
              min="0"
              max="10"
              step="0.01"
              value={form.value}
              onChange={(event) => setForm((current) => ({ ...current, value: event.target.value }))}
              required
            />
          </label>
          <label>
            Peso
            <input
              type="number"
              min="0.1"
              step="0.1"
              value={form.weight}
              onChange={(event) => setForm((current) => ({ ...current, weight: event.target.value }))}
              required
            />
          </label>
          {selectedEnrollment && (
            <div className="summary-box">
              <span>Media atual</span>
              <strong>{Number(selectedEnrollment.average).toFixed(2)}</strong>
            </div>
          )}
          {error && <div className="alert">{error}</div>}
          <button className="primary-button">
            <Save size={18} />
            Salvar nota
          </button>
        </form>
      </Panel>

      <Panel className="table-panel">
        <SectionHeading title="Notas lancadas" />
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Aluno</th>
                <th>Turma</th>
                <th>Avaliacao</th>
                <th>Nota</th>
                <th>Peso</th>
                <th>Acoes</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((grade) => (
                <tr key={grade.id}>
                  <td>{grade.student_name}</td>
                  <td>{grade.class_name}</td>
                  <td>{grade.label}</td>
                  <td>{grade.value}</td>
                  <td>{grade.weight}</td>
                  <td className="actions">
                    <button className="icon-button danger" onClick={() => remove(grade.id)} title="Excluir nota">
                      <Trash2 size={17} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!grades.length && <p className="empty">Nenhuma nota lancada.</p>}
        </div>
      </Panel>
    </section>
  );
}
