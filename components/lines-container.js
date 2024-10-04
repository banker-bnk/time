'use client';

import { useState } from 'react';
import Table from './generic-table';
import AddLineForm from './add-line-form';

export default function LinesContainer({ accessToken, lines, userTurns, managedTurns, userId }) {
  const [linesState, setLinesState] = useState(lines);
  const [turnsState, setTurnsState] = useState(userTurns);
  const [managedTurnsState, setManagedTurnsState] = useState(managedTurns);

  const handleLineAdded = async () => {
    const getLinesResponse = await fetch('/api/lines', { method: 'GET' });
    const updatedLines = await getLinesResponse.json();
    setLinesState(updatedLines);
  };

  const handleLineDelete = async (lineId) => {
    await fetch(`/api/lines/${lineId}`, { method: 'DELETE' });
    const updatedLines = linesState.filter(line => line.id !== lineId);
    setLinesState(updatedLines);
  };

  const handleTurnDelete = async (turnId) => {
    await fetch(`/api/turns/${turnId}`, { method: 'DELETE' });
    const updatedTurns = turnsState.filter(turn => turn.id !== turnId);
    setTurnsState(updatedTurns);
  };

  const handleJoin = async (lineId) => {
    await fetch('/api/turns', { method: 'POST', body: JSON.stringify({ lineId })});
    const getTurnsResponse = await fetch('/api/turns', { method: 'GET' });
    const updatedTurns = await getTurnsResponse.json();
    setTurnsState(updatedTurns);
  };

  const nonUserLines = linesState.filter(line => line.operator_id !== userId);
  const userLines = linesState.filter(line => line.operator_id === userId);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Turns</h2>
      <Table
        columns={[
          { header: 'Line ID', accessor: 'line_id' },
          { header: 'Position', accessor: 'position' },
        ]}
        data={turnsState}
        actions={(row) => (
          <button
            onClick={() => handleTurnDelete(row.id)}
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        )}
      />

      <br />

      <h2 className="text-2xl font-bold mb-4">Available Lines</h2>
      <Table
        columns={[
          { header: 'ID', accessor: 'id' },
          { header: 'Name', accessor: 'name' },
        ]}
        data={nonUserLines}
        actions={(row) => (
          <button
            onClick={() => handleJoin(row.id)}
            className="text-green-500 hover:text-green-700"
          >
            Join
          </button>
        )}
      />

      <br />

      <h2 className="text-2xl font-bold mb-4">Your Lines</h2>
      <Table
        columns={[
          { header: 'ID', accessor: 'id' },
          { header: 'Name', accessor: 'name' },
        ]}
        data={userLines}
        actions={(row) => (
          <button
            onClick={() => handleLineDelete(row.id)}
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        )}
      />

      <br />

      <h2 className="text-2xl font-bold mb-4">Your managed turns</h2>
      <Table
        columns={[
          { header: 'Line ID', accessor: 'line_id' },
          { header: 'Position', accessor: 'position' },
          { header: 'User ID', accessor: 'user_id' },
        ]}
        data={managedTurnsState}
        actions={(row) => (
          <button
            onClick={() => handleTurnDelete(row.id)}
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        )}
      />

      <br />

      <AddLineForm onLineAdded={handleLineAdded} />
    </div>
  );
}
