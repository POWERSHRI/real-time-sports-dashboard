function ScoreCard({ match }) {
  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-5 rounded-2xl shadow-lg hover:scale-105 transition transform duration-300">
      <h2 className="text-lg font-semibold text-gray-200 mb-2">
        Live Match
      </h2>

      <p className="text-xl font-bold mb-2">
        {match.teamA} vs {match.teamB}
      </p>

      <div className="space-y-1 text-gray-300">
        <p>{match.teamA}: {match.scoreA}</p>
        <p>{match.teamB}: {match.scoreB}</p>
        <p>Overs: {match.overs}</p>
      </div>
    </div>
  );
}

export default ScoreCard;