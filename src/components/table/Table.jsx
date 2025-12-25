import React from "react";
import "./Table.css";

function Table({ columns, data, onRowClick }) {
  return (
    <div className="table-wrapper">
      <table className="custom-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)}>{col.label}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {(data?.length === 0 || data == undefined) ? (
            <tr>
              <td colSpan={columns.length} className="no-data text-center">
                No data Found
              </td>
            </tr>
          ) : (
            data?.map((row, index) => (
              <tr
                key={row.id ?? index}
                onClick={() => onRowClick && onRowClick(row)}
              >
                {columns.map((col) => (
                  <td key={String(col.key)}>
                    {col.render
                      ? col.render(row)
                      : String(row[col.key])}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
