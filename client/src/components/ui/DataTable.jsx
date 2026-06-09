import { Edit3, Trash2 } from 'lucide-react';

export default function DataTable({ columns, rows, onEdit, onDelete }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{labelize(column)}</th>
            ))}
            <th>Acoes</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((item) => (
            <tr key={item.id}>
              {columns.map((column) => (
                <td key={column}>{formatCell(item[column])}</td>
              ))}
              <td className="actions">
                {onEdit && (
                  <button className="icon-button" onClick={() => onEdit(item)} title="Editar">
                    <Edit3 size={17} />
                  </button>
                )}
                {onDelete && (
                  <button className="icon-button danger" onClick={() => onDelete(item.id)} title="Excluir">
                    <Trash2 size={17} />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!rows.length && <p className="empty">Nenhum registro encontrado.</p>}
    </div>
  );
}

function labelize(value) {
  return value.replaceAll('_', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatCell(value) {
  if (typeof value === 'boolean') return value ? 'Sim' : 'Nao';
  if (value === null || value === undefined || value === '') return '-';
  return value;
}
