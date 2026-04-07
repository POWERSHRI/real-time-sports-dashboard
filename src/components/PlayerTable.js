function PlayerTable() {
  const players = [
    { name: "Virat Kohli", runs: 85, balls: 60 },
    { name: "Rohit Sharma", runs: 70, balls: 50 },
    { name: "Smith", runs: 65, balls: 55 }
  ];

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6">
      <h3 className="text-xl font-semibold mb-4">Player Stats</h3>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th>Name</th>
            <th>Runs</th>
            <th>Balls</th>
          </tr>
        </thead>

        <tbody>
          {players.map((p, index) => (
            <tr key={index} className="border-b">
              <td>{p.name}</td>
              <td>{p.runs}</td>
              <td>{p.balls}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PlayerTable;