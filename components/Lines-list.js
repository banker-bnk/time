"use client";

import { useState } from 'react';

export default function LinesList({ lines, userTurns }) {
  const [joinedLines, setJoinedLines] = useState(() => {
    const initialLines = {};
    userTurns.forEach(turn => {
      initialLines[turn.line_id] = { joined: true, turnId: turn.id };
    });
    return initialLines;
  });

  const handleJoin = async (lineId) => {
    const response = await fetch('/api/turns', {
      method: 'POST',
      body: JSON.stringify({ lineId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { id: turnId } = await response.json();

    setJoinedLines((prev) => ({
      ...prev,
      [lineId]: { joined: true, turnId },
    }));
  };

  const handleLeave = async (lineId) => {
    const turnId = joinedLines[lineId]?.turnId;

    if (!turnId) return;

    await fetch(`/api/turns/${turnId}`, {
      method: 'DELETE',
    });

    setJoinedLines((prev) => ({
      ...prev,
      [lineId]: { joined: false, turnId: null },
    }));
  };

  return (
    <div className="container mx-auto p-4">
      {lines.map((line) => (
        <div
          key={line.id}
          className="bg-white p-4 rounded-lg shadow-md mb-4 flex justify-between items-center"
        >
          <div>
            <h2 className="text-xl font-bold">{line.name}</h2>
            <p className="text-gray-600">ID: {line.id}</p>
          </div>
          <div className="flex space-x-2">
            <a 
              href={`/lines/${line.id}`} 
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              View Details
            </a>
            {!joinedLines[line.id]?.joined ? (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => handleJoin(line.id)}
              >
                Join
              </button>
            ) : (
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={() => handleLeave(line.id)}
              >
                Leave
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
