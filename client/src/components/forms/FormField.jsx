export default function FormField({ field, value, onChange, lookups }) {
  if (field.type === 'checkbox') {
    return (
      <label className="check-row">
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(event) => onChange(field.name, event.target.checked)}
        />
        {field.label}
      </label>
    );
  }

  if (field.type === 'select') {
    return (
      <label>
        {field.label}
        <select value={value ?? ''} onChange={(event) => onChange(field.name, event.target.value)} required>
          {field.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    );
  }

  if (field.type === 'lookup') {
    const options = lookups[field.source] || [];
    return (
      <label>
        {field.label}
        <select value={value ?? ''} onChange={(event) => onChange(field.name, event.target.value)} required>
          <option value="">Selecione</option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option[field.labelField || 'name'] || option.email || option.registration}
            </option>
          ))}
        </select>
      </label>
    );
  }

  return (
    <label>
      {field.label}
      <input
        type={field.type || 'text'}
        value={formatInputValue(value)}
        onChange={(event) => onChange(field.name, event.target.value)}
        required={!['email', 'phone', 'birth_date', 'degree'].includes(field.name)}
      />
    </label>
  );
}

function formatInputValue(value) {
  if (!value) return '';
  if (typeof value === 'string' && value.includes('T')) return value.slice(0, 10);
  return value;
}
