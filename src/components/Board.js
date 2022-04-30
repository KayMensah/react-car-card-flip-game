import Profiles from "./Profiles";
import { Leaderboard } from "./Database";
import { useState } from "react";

export default function Board() {
  const [period, setPeriod] = useState(0);

  const handleClick = (e) => {
    setPeriod(e.target.dataset.id);
  };
  return (
    <div className="boardstyle">
      <h1 className="leaderboard">Leader Board</h1>

      <div className="duration">
        <button onClick={handleClick} data-id="7">
          7 Days
        </button>
        <button onClick={handleClick} data-id="30">
          30 Days
        </button>
        <button onClick={handleClick} data-id="0">
          All Time
        </button>
      </div>
      <Profiles Leaderboard={Leaderboard}></Profiles>
    </div>
  );
}

between(Leaderboard);
function between(data, between) {
  const today = new Date();
  const previous = new Date(today);
  previous.setDate(previous.getDate() - (between + 1));

  let filter = data.filter((val) => {
    let userDate = new Date(val.dt);
    return previous <= userDate && today >= userDate;
  });

  console.log(filter);
}
