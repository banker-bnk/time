"use client";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState } from 'react';

export default function LineDetail({ line, turns }) {
  const filteredTurns = turns.filter(turn => turn.line_id === line.id);

  const [absoluteUrl, setAbsoluteUrl] = useState('');

  useEffect(() => {
    // Construct the absolute URL
    const currentUrl = window.location.href;
    setAbsoluteUrl(currentUrl);
  }, []);
  
  console.log("URL: " + absoluteUrl);

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

      <a
        href="/lines"
        className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Back to Lines List
      </a>
    </div>
  );
}
