import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import PerformanceChart from "../components/PerformanceChart";

function Dashboard() {

  const [matches, setMatches] = useState([]);

  useEffect(() => {

    const socket = new SockJS("http://localhost:8080/ws");
    const client = Stomp.over(socket);

    client.connect({}, () => {

      console.log("WebSocket Connected");

      client.subscribe("/topic/live", (msg) => {
        const data = JSON.parse(msg.body);
        setMatches(data);
      });

    });

  }, []);

  return (
    <div className="relative min-h-screen text-white">

      {/* 🎥 VIDEO BACKGROUND */}
      <video
        autoPlay
        loop
        muted
        className="fixed top-0 left-0 w-full h-full object-cover z-[-1]"
      >
        <source src="/bg.mp4" type="video/mp4" />
      </video>

      {/* 🌑 Overlay */}
      <div className="absolute w-full h-full bg-transparent/0"></div>

      {/* 🔥 MAIN CONTENT */}
      <div className="p-6">

        {/* TITLE */}
        <h1 className="text-3xl md:text-4xl font-extrabold mb-10 text-left text-white">
          Real-Time Sports Analytics Dashboard
        </h1>

        {/* 🔥 FLEX LAYOUT (LEFT + RIGHT) */}
        <div className="flex gap-8">

          {/* ================= LEFT SIDE ================= */}
          <div className="flex flex-col gap-5 w-[400px]">

            {matches.map((m, i) => (

              <div
                key={i}
                className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-md"
              >

                {/* MATCH TITLE */}
                <h2 className="text-base font-semibold mb-1">
                  {m.teamA} vs {m.teamB}
                </h2>

                {/* SCORE */}
                <p className="text-sm">
                  {m.runs ?? 0}/{m.wickets ?? 0}
                </p>

                {/* OVERS */}
                <p className="text-xs mb-2">
                  Overs: {m.overs ?? "0.0"}
                </p>

                {/* 📊 EXTRA ANALYTICS */}
                <div className="grid grid-cols-3 gap-2 text-xs mt-2 mb-2">

                  {/* Run Rate */}
                  <div className="bg-white/10 p-2 rounded text-center">
                    <p className="text-gray-300">RR</p>
                    <p>
                      {m.overs ? (m.runs / parseFloat(m.overs)).toFixed(2) : "0"}
                    </p>
                  </div>

                  {/* Projected */}
                  <div className="bg-white/10 p-2 rounded text-center">
                    <p className="text-gray-300">Proj</p>
                    <p>
                      {m.overs ? Math.floor((m.runs / parseFloat(m.overs)) * 20) : 0}
                    </p>
                  </div>

                  {/* Phase */}
                  <div className="bg-white/10 p-2 rounded text-center">
                    <p className="text-gray-300">Phase</p>
                    <p>
                      {parseFloat(m.overs) < 6
                        ? "Powerplay"
                        : parseFloat(m.overs) < 15
                        ? "Middle"
                        : "Death"}
                    </p>
                  </div>

                </div>

                {/* GRAPH */}
                <div className="h-[270px]">
                  <PerformanceChart history={m.history || []} />
                </div>

              </div>

            ))}

          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="flex flex-col gap-4 w-[300px]">

            {/* Live Matches */}
            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
              <p className="text-sm text-gray-300">Live Matches</p>
              <h2 className="text-xl font-bold">{matches.length}</h2>
            </div>

            {/* Total Runs */}
            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
              <p className="text-sm text-gray-300">Total Runs</p>
              <h2 className="text-xl font-bold">
                {matches.reduce((sum, m) => sum + (m.runs || 0), 0)}
              </h2>
            </div>

            {/* Total Wickets */}
            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
              <p className="text-sm text-gray-300">Total Wickets</p>
              <h2 className="text-xl font-bold">
                {matches.reduce((sum, m) => sum + (m.wickets || 0), 0)}
              </h2>
            </div>

            {/* Highest Score */}
            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
              <p className="text-sm text-gray-300">Highest Score</p>
              <h2 className="text-xl font-bold">
                {matches.length > 0
                  ? Math.max(...matches.map(m => m.runs || 0))
                  : 0}
              </h2>
            </div>

            {/* Avg Score */}
            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
              <p className="text-sm text-gray-300">Avg Score</p>
              <h2 className="text-xl font-bold">
                {
                  matches.length > 0
                    ? Math.floor(
                        matches.reduce((sum, m) => sum + (m.runs || 0), 0) /
                        matches.length
                      )
                    : 0
                }
              </h2>
            </div>

            {/* Match Progress */}
            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
              <p className="text-sm text-gray-300">Match Progress</p>
              <h2 className="text-xl font-bold">
                {matches.length > 0
                  ? Math.floor(
                      (matches.reduce((sum, m) => sum + parseFloat(m.overs || 0), 0) /
                        (matches.length * 20)) * 100
                    )
                  : 0}%
              </h2>
            </div>

            {/* LIVE */}
            <div className="p-4 rounded-xl bg-red-500/20 border border-red-400 text-center animate-pulse">
              🔴 LIVE MATCHES RUNNING
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;