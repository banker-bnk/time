"use client";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState } from 'react';

export default function LineDetail({ line, turns, }) {
  //TODO: no ser tan negro
  const filteredTurns = turns.filter(turn => turn.line_id === line.id);

  const [joined, setJoined] = useState(() => {
    const userTurn = turns.find(turn => turn.line_id === line.id);
    return userTurn ? { joined: true, turnId: userTurn.id } : { joined: false, turnId: null };
  });

  const [absoluteUrl, setAbsoluteUrl] = useState('');

  useEffect(() => {
    const currentUrl = window.location.href;
    setAbsoluteUrl(currentUrl);
  }, []);

  const handleJoin = async () => {
    const response = await fetch('/api/turns', {
      method: 'POST',
      body: JSON.stringify({ lineId: line.id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { id: turnId } = await response.json();

    setJoined({ joined: true, turnId });
  };

  const handleLeave = async () => {
    const turnId = joined.turnId;

    if (!turnId) return;

    await fetch(`/api/turns/${turnId}`, {
      method: 'DELETE',
    });

    setJoined({ joined: false, turnId: null });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold">{line.name}</h2>
      <p className="text-gray-600">ID: {line.id}</p>

      {/* Render QR code with the line.id */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Line QR Code</h3>
        <QRCodeCanvas value={absoluteUrl} size={128} />
      </div>

      {filteredTurns.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Turns</h3>
          <ul className="list-disc pl-6">
            {filteredTurns.map((turn) => (
              <p key={turn.id} className="text-gray-700">
                Turn ID: {turn.id}, Position: {turn.position}
              </p>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-4">
        {!joined.joined ? (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleJoin}
          >
            Join
          </button>
        ) : (
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={handleLeave}
          >
            Leave
          </button>
        )}
      </div>

      <a
        href="/lines"
        className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Back to Lines List
      </a>
    </div>
  );
}
