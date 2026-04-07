import { useState } from "react";
import axios from "axios";

function AddMatch() {
  const [form, setForm] = useState({
    teamA: "",
    teamB: "",
    scoreA: "",
    scoreB: "",
    overs: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/api/matches", form);
    alert("Match Added!");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/10 p-4 rounded-xl mt-6">
      <h2>Add Match</h2>

      {Object.keys(form).map(key => (
        <input
          key={key}
          placeholder={key}
          className="block mb-2 p-2 w-full"
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        />
      ))}

      <button className="bg-green-500 px-4 py-2 rounded">
        Add
      </button>
    </form>
  );
}

export default AddMatch;