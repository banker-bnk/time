"use client";

export default function LineDetail({ line, turns }) {
  console.log("DATA: " + JSON.stringify(line));
  console.log("TURNS: " + JSON.stringify(turns));

  // Filter turns to only include those that match the current line's ID
  const filteredTurns = turns.filter(turn => turn.line_id === line.id);
  console.log("FTURNS: " + JSON.stringify(filteredTurns));

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold">{line.name}</h2>
      <p className="text-gray-600">ID: {line.id}</p>

      {/* Render the turns associated with this specific line */}
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
