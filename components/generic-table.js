//TODO: to be deleted (only reference)
import React from 'react';

export default function Table({ columns, data, actions }) {
  return (
    <table className="divide-y divide-gray-200">
      <thead className="bg-gray-100">
        <tr>
          {columns.map((col, index) => (
            <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              {col.header}
            </th>
          ))}
          {actions && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length + (actions ? 1 : 0)} className="px-6 py-4 text-center text-gray-500">No data available.</td>
          </tr>
        ) : (
          data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="px-6 py-4 text-gray-500">
                  {col.render ? col.render(row) : row[col.accessor]}
                </td>
              ))}
              {actions && (
                <td className="px-6 py-4">
                  {actions(row)}
                </td>
              )}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
