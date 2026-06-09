import { useCallback, useEffect, useMemo, useState } from 'react';
import { Plus, Save, Search, X } from 'lucide-react';
import { api } from '../api/frontendApi.js';
import FormField from '../components/forms/FormField.jsx';
import DataTable from '../components/ui/DataTable.jsx';
import Panel from '../components/ui/Panel.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';

export default function EntityPage({ config, endpoint, lookups = {}, onChanged }) {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(config.defaults || {});
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    return items.filter((item) =>
      config.columns.some((column) => String(item[column] ?? '').toLowerCase().includes(term))
    );
  }, [items, search, config.columns]);

  const load = useCallback(async function load() {
    setItems(await api(endpoint));
  }, [endpoint]);

  useEffect(() => {
    load().catch((err) => setError(err.message));
  }, [load]);

  function updateField(name, value) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  function startEdit(item) {
    setEditing(item.id);
    setForm({ ...config.defaults, ...item, password: '' });
  }

  function resetForm() {
    setEditing(null);
    setForm(config.defaults || {});
    setError('');
  }

  async function submit(event) {
    event.preventDefault();
    setError('');

    const fields = config.fields.filter((field) => !(editing && field.hideOnEdit));
    const payload = fields.reduce((acc, field) => ({ ...acc, [field.name]: form[field.name] ?? '' }), {});

    try {
      await api(editing ? `${endpoint}/${editing}` : endpoint, {
        method: editing ? 'PUT' : 'POST',
        body: JSON.stringify(payload)
      });
      resetForm();
      await load();
      await onChanged?.();
    } catch (err) {
      setError(err.message);
    }
  }

  async function remove(id) {
    if (!confirm(`Excluir ${config.name.toLowerCase()}?`)) return;
    await api(`${endpoint}/${id}`, { method: 'DELETE' });
    await load();
    await onChanged?.();
  }

  return (
    <section className="workspace-grid">
      <Panel>
        <SectionHeading
          title={editing ? `Editar ${config.name}` : `Novo ${config.name}`}
          action={
            editing && (
              <button className="icon-button" onClick={resetForm} title="Cancelar edicao">
                <X size={18} />
              </button>
            )
          }
        />
        <form className="form compact" onSubmit={submit}>
          {config.fields
            .filter((field) => !(editing && field.hideOnEdit))
            .map((field) => (
              <FormField
                key={field.name}
                field={field}
                value={form[field.name]}
                onChange={updateField}
                lookups={lookups}
              />
            ))}
          {error && <div className="alert">{error}</div>}
          <button className="primary-button">
            {editing ? <Save size={18} /> : <Plus size={18} />}
            {editing ? 'Salvar' : 'Cadastrar'}
          </button>
        </form>
      </Panel>

      <Panel className="table-panel">
        <SectionHeading
          title={`${config.name}s`}
          action={
            <label className="search-box">
              <Search size={17} />
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar" />
            </label>
          }
        />
        <DataTable columns={config.columns} rows={filtered} onEdit={startEdit} onDelete={remove} />
      </Panel>
    </section>
  );
}
